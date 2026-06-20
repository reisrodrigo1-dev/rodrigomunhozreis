import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Segredo de assinatura do webhook (Resend mostra ao criar o endpoint): whsec_...
const SECRET = process.env.RESEND_WEBHOOK_SECRET;

type ResendEvent = {
  type?: string;
  created_at?: string;
  data?: {
    email_id?: string;
    to?: string | string[];
    from?: string;
    subject?: string;
  };
};

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/**
 * Valida a assinatura Svix usada pelo Resend.
 * Conteúdo assinado: `${svix-id}.${svix-timestamp}.${body}` → HMAC-SHA256 em base64.
 * O header `svix-signature` traz uma lista "v1,<sig> v1,<sig2>".
 */
function verifySignature(payload: string, headers: Headers): boolean {
  if (!SECRET) return false;
  const id = headers.get("svix-id");
  const ts = headers.get("svix-timestamp");
  const sigHeader = headers.get("svix-signature");
  if (!id || !ts || !sigHeader) return false;

  // Proteção contra replay: timestamp dentro de 5 minutos.
  const now = Math.floor(Date.now() / 1000);
  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum) || Math.abs(now - tsNum) > 300) return false;

  const secretBytes = Buffer.from(SECRET.replace(/^whsec_/, ""), "base64");
  const signed = `${id}.${ts}.${payload}`;
  const expected = crypto.createHmac("sha256", secretBytes).update(signed).digest("base64");

  const sigs = sigHeader
    .split(" ")
    .map((s) => s.split(",")[1])
    .filter((s): s is string => Boolean(s));
  return sigs.some((s) => safeEqual(s, expected));
}

export async function POST(req: Request) {
  const raw = await req.text();

  if (!verifySignature(raw, req.headers)) {
    return NextResponse.json({ ok: false, error: "invalid-signature" }, { status: 401 });
  }

  let event: ResendEvent;
  try {
    event = JSON.parse(raw) as ResendEvent;
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const type = event.type ?? "unknown";
  const d = event.data ?? {};
  const to = Array.isArray(d.to) ? d.to.join(", ") : d.to ?? "";

  // Observabilidade: aparece nos logs da Vercel (Deployments → Logs).
  console.log(
    `[resend-webhook] ${type} · to=${to} · subject=${d.subject ?? ""} · id=${d.email_id ?? ""}`
  );

  // Ganchos por tipo de evento — estenda conforme a operação crescer.
  switch (type) {
    case "email.bounced":
    case "email.complained":
      // E-mail inválido / reclamou de spam → candidato a remover da nutrição.
      break;
    case "email.opened":
    case "email.clicked":
      // Lead engajado → candidato a marcar como quente.
      break;
    default:
      break;
  }

  return NextResponse.json({ ok: true });
}

// Alguns testes/validações de webhook fazem um GET — responda 200.
export async function GET() {
  return NextResponse.json({ ok: true });
}
