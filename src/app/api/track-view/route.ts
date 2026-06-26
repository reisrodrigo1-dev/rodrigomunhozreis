import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isDataPersonal(v: unknown): v is string {
  return typeof v === "string" && v.length > 0 && v.length <= 320;
}

function deviceFromUA(ua: string): "mobile" | "tablet" | "desktop" | "bot" {
  if (!ua) return "desktop";
  if (/bot|spider|crawl|slurp|facebookexternalhit/i.test(ua)) return "bot";
  if (/iPad|tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

/**
 * Registra a visita a um post com dados ANÔNIMOS de demografia.
 * NÃO guarda IP. País/cidade vêm dos headers de geo do Vercel.
 * Fire-and-forget do cliente — silenciosamente ignora se admin SDK não estiver configurado.
 */
export async function POST(req: Request) {
  let body: { slug?: string; leadEmail?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  const slug = body.slug;
  if (!isDataPersonal(slug)) {
    return NextResponse.json({ ok: false, error: "slug-missing" }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") || "";
  const device = deviceFromUA(ua);
  if (device === "bot") return NextResponse.json({ ok: true, skipped: "bot" });

  const country = req.headers.get("x-vercel-ip-country") || null;
  const city = req.headers.get("x-vercel-ip-city");
  // Cidade vem url-encoded — decodifica com fallback seguro
  let cityDecoded: string | null = null;
  if (city) {
    try { cityDecoded = decodeURIComponent(city); } catch { cityDecoded = city; }
  }
  const referer = req.headers.get("referer") || null;
  let referrerHost: string | null = null;
  if (referer) {
    try {
      const u = new URL(referer);
      referrerHost = u.host;
    } catch {
      /* ignora referer malformado */
    }
  }
  const leadEmail = isDataPersonal(body.leadEmail) ? body.leadEmail.toLowerCase().trim() : null;

  const adb = adminDb();
  if (!adb) return NextResponse.json({ ok: true, skipped: "no-admin" });

  try {
    await adb.collection("page_visits").add({
      slug,
      country,
      city: cityDecoded,
      device,
      referrer: referrerHost,
      leadEmail,
      createdAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track-view] erro:", err);
    return NextResponse.json({ ok: false, error: "save-failed" });
  }
}
