import { NextResponse } from "next/server";
import { getGA4Snapshot } from "@/lib/ga4-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function isAdmin(req: Request): Promise<boolean> {
  const header = req.headers.get("authorization") || "";
  const idToken = header.startsWith("Bearer ") ? header.slice(7) : "";
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase();
  if (!idToken || !apiKey || !adminEmail) return false;
  try {
    const r = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) }
    );
    if (!r.ok) return false;
    const data = (await r.json()) as { users?: Array<{ email?: string }> };
    const email = (data.users?.[0]?.email || "").toLowerCase();
    return !!email && email === adminEmail;
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const days = Number(url.searchParams.get("days") ?? 30);
  const data = await getGA4Snapshot(Math.max(1, Math.min(90, days)));
  return NextResponse.json(data);
}
