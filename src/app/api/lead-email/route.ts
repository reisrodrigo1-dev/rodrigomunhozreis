import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://rodrigomunhozreis.com.br";

function isEmail(v: unknown): v is string {
  return typeof v === "string" && v.length < 320 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

function welcomeHtml(first: string) {
  const hi = first ? `Oi, ${first}!` : "Oi!";
  return `<div style="background:#f4efe6;padding:24px 0;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4dbcb">
      <tr><td style="background:linear-gradient(135deg,#211b12,#2c2416);padding:28px 32px">
        <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#E9B05C;font-weight:bold">Kit liberado</div>
        <div style="font-family:Georgia,serif;font-size:26px;color:#F6EFE2;font-weight:bold;margin-top:4px">IA Sem Medo</div>
      </td></tr>
      <tr><td style="padding:32px">
        <p style="font-size:17px;color:#1b1813;margin:0 0 14px">${hi}</p>
        <p style="font-size:15px;line-height:1.6;color:#3d372e;margin:0 0 18px">Seu kit está liberado — está tudo numa página só: o e-book, <b>10 robôs de IA</b> e <b>20 skills do Engenho</b>. Salve o link abaixo:</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px"><tr><td style="border-radius:12px;background:#B5762A">
          <a href="${SITE}/obrigado" style="display:inline-block;padding:14px 28px;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none">Acessar meu kit &rarr;</a>
        </td></tr></table>
        <p style="font-size:14px;line-height:1.6;color:#3d372e;margin:0 0 6px">No kit você tem:</p>
        <ul style="font-size:14px;line-height:1.7;color:#3d372e;margin:0 0 18px;padding-left:20px">
          <li>E-book IA Sem Medo (método P.R.O.M.P.T.E.R. + 130 prompts)</li>
          <li>10 robôs de IA prontos (Copiloto do CEO, Estrategista de Marketing&hellip;)</li>
          <li>20 skills do Engenho pra baixar</li>
        </ul>
        <p style="font-size:14px;line-height:1.6;color:#3d372e;margin:0">Abra com calma e me conta o que achou. A decisão é sua.</p>
        <p style="font-size:14px;line-height:1.6;color:#1b1813;margin:18px 0 0"><b>Rodrigo Munhoz Reis</b><br><span style="color:#7c7365">CTO &middot; Vibecoding com Engenharia</span></p>
      </td></tr>
      <tr><td style="padding:18px 32px;border-top:1px solid #e4dbcb;background:#faf7f1">
        <p style="font-size:12px;color:#9b9078;margin:0">Você recebeu este e-mail porque baixou o kit em rodrigomunhozreis.com.br. Se não foi você, é só ignorar.</p>
      </td></tr>
    </table>
  </td></tr></table>
</div>`;
}

/**
 * Envia o e-mail de boas-vindas com o acesso ao kit, via Resend.
 * Chamado pelo formulário de captura (fire-and-forget) — NUNCA bloqueia o download:
 * se a chave não estiver configurada ou o envio falhar, responde sem erro fatal.
 */
export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, error: "not-configured" });

  let body: { email?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  if (!isEmail(email)) return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });

  const first = (body.name ?? "").trim().split(" ")[0] ?? "";
  const from = process.env.EMAIL_FROM || "IA Sem Medo <onboarding@resend.dev>";

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Seu kit IA Sem Medo está liberado 🎁",
        html: welcomeHtml(first),
      }),
    });
    if (!r.ok) {
      console.error("[lead-email] Resend respondeu", r.status, await r.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "send-failed" });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead-email] erro:", err);
    return NextResponse.json({ ok: false, error: "exception" });
  }
}
