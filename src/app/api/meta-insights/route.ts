import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const META_VER = "v21.0";

/** Valida o ID token do Firebase via REST e confirma que o e-mail é o do admin. */
async function isAdmin(req: Request): Promise<boolean> {
  const header = req.headers.get("authorization") || "";
  const idToken = header.startsWith("Bearer ") ? header.slice(7) : "";
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase();
  if (!idToken || !apiKey || !adminEmail) return false;

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
    const data = (await r.json()) as { users?: Array<{ email?: string }> };
    const email = (data.users?.[0]?.email || "").toLowerCase();
    return !!email && email === adminEmail;
  } catch {
    return false;
  }
}

type MetaAction = { action_type: string; value: string };
type MetaInsight = {
  campaign_name?: string;
  spend?: string;
  impressions?: string;
  clicks?: string;
  ctr?: string;
  cpc?: string;
  cpm?: string;
  reach?: string;
  actions?: MetaAction[];
};

export async function GET(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = process.env.META_ACCESS_TOKEN;
  let account = process.env.META_AD_ACCOUNT_ID;
  if (!token || !account) {
    return NextResponse.json({ configured: false });
  }
  if (!account.startsWith("act_")) account = `act_${account}`;

  const fields = [
    "campaign_name",
    "spend",
    "impressions",
    "clicks",
    "ctr",
    "cpc",
    "cpm",
    "reach",
    "actions",
  ].join(",");
  const url =
    `https://graph.facebook.com/${META_VER}/${account}/insights` +
    `?level=campaign&date_preset=maximum&fields=${fields}&limit=200` +
    `&access_token=${encodeURIComponent(token)}`;

  try {
    const r = await fetch(url, { cache: "no-store" });
    const data = (await r.json()) as {
      data?: MetaInsight[];
      error?: { message?: string };
    };
    if (data.error) {
      return NextResponse.json({ configured: true, error: data.error.message || "Erro na Meta API" });
    }

    const campaigns = (data.data || []).map((c) => {
      const actions = c.actions || [];
      const sumOf = (...types: string[]) =>
        actions
          .filter((a) => types.includes(a.action_type))
          .reduce((acc, a) => acc + Number(a.value || 0), 0);
      return {
        campaign: c.campaign_name || "—",
        spend: Number(c.spend || 0),
        impressions: Number(c.impressions || 0),
        clicks: Number(c.clicks || 0),
        ctr: Number(c.ctr || 0),
        cpc: Number(c.cpc || 0),
        cpm: Number(c.cpm || 0),
        reach: Number(c.reach || 0),
        landingViews: sumOf("landing_page_view"),
        leads: sumOf("lead", "offsite_conversion.fb_pixel_lead"),
      };
    });

    return NextResponse.json({ configured: true, currency: "BRL", campaigns });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Falha ao consultar a Meta";
    return NextResponse.json({ configured: true, error: message });
  }
}
