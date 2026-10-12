import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isEmail(v: unknown): v is string {
  return typeof v === "string" && v.length < 320 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

/**
 * Salva o inscrito no Firestore (collection `blog_subscribers`).
 * Silencioso em caso de erro: fluxo do usuário não pode quebrar.
 */
async function saveSubscriber(email: string, source: string) {
  try {
    const db = adminDb();
    if (!db) return;
    await db
      .collection("blog_subscribers")
      .doc(email.toLowerCase())
      .set(
        {
          email: email.toLowerCase(),
          source,
          createdAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  } catch (err) {
    console.error("[blog-subscribe] save falhou:", err);
  }
}

function welcomeHtml() {
  const base = `https://${site.domain}`;
  return `<div style="background:#EEF4F7;padding:24px 0;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #D5E2E8">
      <tr><td style="background-color:#081A23;background:linear-gradient(135deg,#081A23,#0E3C50);padding:28px 32px">
        <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#38BDF8;font-weight:bold">Inscrição confirmada</div>
        <div style="font-family:Georgia,serif;font-size:26px;color:#F1F6F8;font-weight:bold;margin-top:4px">Você está no blog</div>
      </td></tr>
      <tr><td style="padding:32px">
        <p style="font-size:17px;color:#0B1E27;margin:0 0 12px">Oi!</p>
        <p style="font-size:15px;line-height:1.6;color:#2E4652;margin:0 0 16px">Obrigado por se inscrever. Todo post novo do <a href="${base}/blog" style="color:#0369A1;font-weight:bold">blog</a> chega aqui: tutoriais, análise de notícia e método de vibecoding com engenharia. Sem enrolação, sem hype.</p>
        <p style="font-size:15px;line-height:1.6;color:#2E4652;margin:0 0 24px">Enquanto isso, se ainda não pegou os materiais gratuitos:</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px"><tr><td style="border-radius:12px;background:#38BDF8">
          <a href="${base}/#materiais" style="display:inline-block;padding:12px 24px;font-size:15px;font-weight:bold;color:#0B1E27;text-decoration:none">Baixar guias grátis &rarr;</a>
        </td></tr></table>
        <p style="font-size:14px;line-height:1.6;color:#2E4652;margin:0">Se quiser cancelar a qualquer momento, é só responder este e-mail. A decisão é sua.</p>
        <p style="font-size:14px;line-height:1.6;color:#0B1E27;margin:18px 0 0"><b>Rodrigo Munhoz Reis</b><br><span style="color:#5B7380">CTO &middot; Vibecoding com Engenharia</span></p>
      </td></tr>
      <tr><td style="padding:18px 32px;border-top:1px solid #D5E2E8;background:#F5F9FB">
        <p style="font-size:12px;color:#5B7380;margin:0">Você recebeu este e-mail porque se inscreveu no blog em ${site.domain}. Se não foi você, é só ignorar.</p>
      </td></tr>
    </table>
  </td></tr></table>
</div>`;
}

async function sendWelcome(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[blog-subscribe] RESEND_API_KEY nao configurada");
    return;
  }
  const from = process.env.EMAIL_FROM || "Rodrigo Munhoz Reis <onboarding@resend.dev>";
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Inscrição confirmada no blog (vibecoding com engenharia)",
        html: welcomeHtml(),
      }),
    });
    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      console.error("[blog-subscribe] resend respondeu", r.status, txt);
    }
  } catch (err) {
    console.error("[blog-subscribe] resend falhou:", err);
  }
}

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });
  }
  const source = (body.source ?? "unknown").slice(0, 120);

  // Aguarda ambos: em serverless (Vercel), promise sem await é abortada quando a
  // rota responde. Custo adicional é ~500ms, mas garante que o e-mail sai.
  await Promise.all([saveSubscriber(email, source), sendWelcome(email)]);

  return NextResponse.json({ ok: true });
}
