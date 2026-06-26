import { BetaAnalyticsDataClient } from "@google-analytics/data";

/**
 * Cliente GA4 (Data API). SERVIDOR APENAS.
 * Reusa as credenciais do FIREBASE_SERVICE_ACCOUNT — só precisa dar acesso de
 * "Viewer" ao e-mail dessa service account dentro da propriedade GA4.
 */
let cached: BetaAnalyticsDataClient | null = null;
function client(): BetaAnalyticsDataClient | { error: string } {
  if (cached) return cached;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return { error: "FIREBASE_SERVICE_ACCOUNT não está setada (var vazia ou ausente neste deploy)" };
  let creds: { project_id?: string; client_email?: string; private_key?: string };
  try { creds = JSON.parse(raw); } catch (e) {
    return { error: `FIREBASE_SERVICE_ACCOUNT não é JSON válido (${e instanceof Error ? e.message : "?"})` };
  }
  if (!creds.client_email) return { error: "JSON do service account não tem 'client_email'" };
  if (!creds.private_key) return { error: "JSON do service account não tem 'private_key'" };
  cached = new BetaAnalyticsDataClient({
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key.replace(/\\n/g, "\n"),
    },
  });
  return cached;
}

function propertyId(): string | null {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) return null;
  return id.startsWith("properties/") ? id : `properties/${id}`;
}

export type Bucket = { key: string; value: number };

type GA4Row = { dimensionValues?: ({ value?: string | null } | null)[] | null; metricValues?: ({ value?: string | null } | null)[] | null };
type GA4Resp = { rows?: GA4Row[] | null };
function rows(res: unknown): Bucket[] {
  const r = (res as GA4Resp).rows ?? [];
  return r.map((row) => ({
    key: row.dimensionValues?.[0]?.value ?? "—",
    value: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

export type GA4Snapshot = {
  totals: { users: number; sessions: number; views: number; engagementRate: number; avgSessionMin: number };
  byDay: { day: string; sessions: number; users: number }[];
  topPosts: Bucket[];
  topCountries: Bucket[];
  topDevices: Bucket[];
  topSources: Bucket[];
};

export async function getGA4Snapshot(days = 30): Promise<GA4Snapshot | { error: string }> {
  const c = client();
  const p = propertyId();
  if ("error" in c) return { error: c.error };
  if (!p) return { error: "no-property-id" };

  const range = { startDate: `${days}daysAgo`, endDate: "today" };

  try {
    // 1) Totais (KPIs)
    const [totalsRes] = await c.runReport({
      property: p,
      dateRanges: [range],
      metrics: [
        { name: "totalUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "engagementRate" },
        { name: "averageSessionDuration" },
      ],
    });
    const t = totalsRes.rows?.[0]?.metricValues ?? [];
    const totals = {
      users: Number(t[0]?.value ?? 0),
      sessions: Number(t[1]?.value ?? 0),
      views: Number(t[2]?.value ?? 0),
      engagementRate: Number(t[3]?.value ?? 0),
      avgSessionMin: Number(t[4]?.value ?? 0) / 60,
    };

    // 2) Série diária (sessions / users)
    const [serieRes] = await c.runReport({
      property: p,
      dateRanges: [range],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessions" }, { name: "totalUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    });
    const byDay = (serieRes.rows ?? []).map((r) => {
      const d = r.dimensionValues?.[0]?.value ?? "";
      return {
        day: d.length === 8 ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : d,
        sessions: Number(r.metricValues?.[0]?.value ?? 0),
        users: Number(r.metricValues?.[1]?.value ?? 0),
      };
    });

    // 3) Top posts (paths /blog/...) — usa pageViews
    const [postsRes] = await c.runReport({
      property: p,
      dateRanges: [range],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      dimensionFilter: { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/blog/" } } },
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    });

    // 4) Top países
    const [countryRes] = await c.runReport({
      property: p, dateRanges: [range],
      dimensions: [{ name: "country" }], metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 6,
    });

    // 5) Top devices
    const [deviceRes] = await c.runReport({
      property: p, dateRanges: [range],
      dimensions: [{ name: "deviceCategory" }], metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    });

    // 6) Top sources (de onde vem o tráfego)
    const [sourceRes] = await c.runReport({
      property: p, dateRanges: [range],
      dimensions: [{ name: "sessionSourceMedium" }], metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 6,
    });

    return {
      totals,
      byDay,
      topPosts: rows(postsRes),
      topCountries: rows(countryRes),
      topDevices: rows(deviceRes),
      topSources: rows(sourceRes),
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[ga4] erro:", msg);
    if (msg.includes("PERMISSION_DENIED") || msg.includes("does not have")) {
      return { error: "no-access" };
    }
    return { error: msg.slice(0, 200) };
  }
}
