import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { skills } from "@/lib/skills";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Whitelist de nomes de arquivo permitidos. Derivada dos ids reais de skills.ts —
// NUNCA concatenamos a query crua no path (defesa contra path traversal). Só um
// nome que está neste Set pode ser lido do disco.
const SUITE_FILE = "engenho-skills.zip";
const allowedFiles = new Set<string>([
  SUITE_FILE,
  ...skills.map((s) => `${s.id}.zip`),
]);

/**
 * Valida o ID token do Firebase via REST (identitytoolkit). Diferente de meta-insights,
 * aqui basta QUALQUER usuário logado válido — não precisa ser admin.
 */
async function isLoggedIn(req: Request): Promise<boolean> {
  const header = req.headers.get("authorization") || "";
  const idToken = header.startsWith("Bearer ") ? header.slice(7) : "";
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!idToken || !apiKey) return false;

  try {
    const r = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );
    if (!r.ok) return false;
    const data = (await r.json()) as { users?: Array<{ localId?: string }> };
    // Token válido = pelo menos um usuário retornado pelo lookup.
    return !!data.users?.[0]?.localId;
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  // Gating: só usuário logado baixa.
  if (!(await isLoggedIn(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const suite = searchParams.get("suite");
  const id = searchParams.get("id");

  // Resolve o nome do arquivo a partir da whitelist (nunca da query crua).
  let file: string | null = null;
  if (suite === "1") {
    file = SUITE_FILE;
  } else if (id) {
    const candidate = `${id}.zip`;
    if (allowedFiles.has(candidate)) file = candidate;
  }

  if (!file) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  try {
    // assets/skills/ é PRIVADA (fora de public/). Os zips entram no bundle da função
    // via outputFileTracingIncludes no next.config.mjs.
    const filePath = path.join(process.cwd(), "assets", "skills", file);
    const buf = await readFile(filePath);
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${file}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
