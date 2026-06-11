"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchCollection, type Row } from "@/lib/admin-data";

function s(v: unknown): string | undefined {
  const x = typeof v === "string" ? v.trim() : "";
  return x || undefined;
}

function countBy(rows: Row[], key: (r: Row) => string | undefined): [string, number][] {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = key(r);
    if (!k) continue;
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const num = new Intl.NumberFormat("pt-BR");
const pct = (n: number) => `${n.toFixed(2)}%`;

function Bars({ data, empty }: { data: [string, number][]; empty: string }) {
  const max = data.reduce((m, [, n]) => Math.max(m, n), 0) || 1;
  if (data.length === 0) return <p className="px-4 py-4 text-sm text-muted">{empty}</p>;
  return (
    <div className="divide-y divide-line/60">
      {data.map(([k, n]) => (
        <div key={k} className="flex items-center gap-3 px-4 py-2.5">
          <span className="w-44 shrink-0 truncate text-sm text-ink" title={k}>{k}</span>
          <span className="relative h-2 flex-1 rounded-full bg-line/50">
            <span className="absolute inset-y-0 left-0 rounded-full bg-amber" style={{ width: `${(n / max) * 100}%` }} />
          </span>
          <span className="w-8 shrink-0 text-right text-sm font-semibold text-ink">{n}</span>
        </div>
      ))}
    </div>
  );
}

type Campaign = {
  campaign: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  reach: number;
  landingViews: number;
  leads: number;
};

type MetaState =
  | { status: "loading" }
  | { status: "unauth" }
  | { status: "not-configured" }
  | { status: "error"; message: string }
  | { status: "ok"; campaigns: Campaign[] };

async function getIdToken(): Promise<string | null> {
  const { auth } = await import("@/lib/firebase");
  const { onAuthStateChanged } = await import("firebase/auth");
  const user =
    auth.currentUser ??
    (await new Promise<import("firebase/auth").User | null>((resolve) => {
      const off = onAuthStateChanged(auth, (u) => {
        off();
        resolve(u);
      });
    }));
  return user ? user.getIdToken() : null;
}

function MetaCampaigns({ meta }: { meta: MetaState }) {
  const panel = "rounded-2xl border border-line bg-white";

  if (meta.status === "loading")
    return <div className={`${panel} px-4 py-6 text-sm text-muted`}>Carregando campanhas da Meta…</div>;

  if (meta.status === "unauth")
    return <div className={`${panel} px-4 py-6 text-sm text-muted`}>Faça login como admin para ver as campanhas.</div>;

  if (meta.status === "error")
    return (
      <div className={`${panel} px-4 py-6`}>
        <p className="text-sm font-semibold text-amber-deep">Não consegui buscar as campanhas da Meta.</p>
        <p className="mt-1 text-sm text-muted">{meta.message}</p>
        <p className="mt-2 text-xs text-muted">Geralmente é token expirado ou sem permissão <code>ads_read</code>.</p>
      </div>
    );

  if (meta.status === "not-configured")
    return (
      <div className={`${panel} p-6`}>
        <p className="font-serif text-lg font-semibold text-ink">Conecte a Meta para ver gasto e resultados</p>
        <p className="mt-1 text-sm text-muted">
          Os dados completos das campanhas (gasto, cliques, CTR, CPC, CPM) vêm da Marketing API da Meta. Falta
          configurar 2 variáveis de ambiente na Vercel:
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-ink">
          <li>Gere um token (System User, permissão <code>ads_read</code>) no Business Settings da Meta.</li>
          <li>Pegue o ID da conta de anúncios (<code>act_…</code>).</li>
          <li>
            Na Vercel, adicione <code>META_ACCESS_TOKEN</code> e <code>META_AD_ACCOUNT_ID</code> (sem
            <code> NEXT_PUBLIC</code> — são secretos) e faça redeploy.
          </li>
        </ol>
        <p className="mt-3 text-xs text-muted">Peça o passo a passo detalhado que eu te guio na geração do token.</p>
      </div>
    );

  // ok
  const t = meta.campaigns.reduce(
    (a, c) => ({
      spend: a.spend + c.spend,
      impressions: a.impressions + c.impressions,
      clicks: a.clicks + c.clicks,
      landingViews: a.landingViews + c.landingViews,
      leads: a.leads + c.leads,
    }),
    { spend: 0, impressions: 0, clicks: 0, landingViews: 0, leads: 0 }
  );
  const th = "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted";
  const td = "px-3 py-2.5 text-sm text-ink whitespace-nowrap";

  if (meta.campaigns.length === 0)
    return <div className={`${panel} px-4 py-6 text-sm text-muted`}>Nenhuma campanha com dados ainda (pode levar algumas horas após publicar).</div>;

  return (
    <div className={`${panel} overflow-x-auto`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-line">
            <th className={th}>Campanha</th>
            <th className={`${th} !text-right`}>Gasto</th>
            <th className={`${th} !text-right`}>Impr.</th>
            <th className={`${th} !text-right`}>Cliques</th>
            <th className={`${th} !text-right`}>CTR</th>
            <th className={`${th} !text-right`}>CPC</th>
            <th className={`${th} !text-right`}>CPM</th>
            <th className={`${th} !text-right`}>Visu. LP</th>
            <th className={`${th} !text-right`}>Leads</th>
          </tr>
        </thead>
        <tbody>
          {meta.campaigns.map((c) => (
            <tr key={c.campaign} className="border-b border-line/60 last:border-0">
              <td className={`${td} font-medium`}>{c.campaign}</td>
              <td className={`${td} text-right`}>{brl.format(c.spend)}</td>
              <td className={`${td} text-right`}>{num.format(c.impressions)}</td>
              <td className={`${td} text-right`}>{num.format(c.clicks)}</td>
              <td className={`${td} text-right`}>{pct(c.ctr)}</td>
              <td className={`${td} text-right`}>{brl.format(c.cpc)}</td>
              <td className={`${td} text-right`}>{brl.format(c.cpm)}</td>
              <td className={`${td} text-right`}>{num.format(c.landingViews)}</td>
              <td className={`${td} text-right font-semibold`}>{num.format(c.leads)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-line bg-page/60 font-semibold">
            <td className={td}>Total</td>
            <td className={`${td} text-right`}>{brl.format(t.spend)}</td>
            <td className={`${td} text-right`}>{num.format(t.impressions)}</td>
            <td className={`${td} text-right`}>{num.format(t.clicks)}</td>
            <td className={`${td} text-right`}>{pct(t.impressions ? (t.clicks / t.impressions) * 100 : 0)}</td>
            <td className={`${td} text-right`}>{brl.format(t.clicks ? t.spend / t.clicks : 0)}</td>
            <td className={`${td} text-right`}>{brl.format(t.impressions ? (t.spend / t.impressions) * 1000 : 0)}</td>
            <td className={`${td} text-right`}>{num.format(t.landingViews)}</td>
            <td className={`${td} text-right`}>{num.format(t.leads)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function AdminMarketing() {
  const [rows, setRows] = useState<Row[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [meta, setMeta] = useState<MetaState>({ status: "loading" });

  useEffect(() => {
    fetchCollection("leads")
      .then((r) => {
        setRows(r);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = await getIdToken();
        if (!token) return setMeta({ status: "unauth" });
        const r = await fetch("/api/meta-insights", { headers: { Authorization: `Bearer ${token}` } });
        if (r.status === 401) return setMeta({ status: "unauth" });
        const data = await r.json();
        if (!data.configured) return setMeta({ status: "not-configured" });
        if (data.error) return setMeta({ status: "error", message: String(data.error) });
        setMeta({ status: "ok", campaigns: (data.campaigns || []) as Campaign[] });
      } catch {
        setMeta({ status: "error", message: "Falha ao carregar." });
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const total = rows.length;
    const tracked = rows.filter((r) => s(r.utmSource) || s(r.utmMedium) || s(r.utmCampaign)).length;
    const paid = rows.filter((r) => {
      const m = s(r.utmMedium);
      return m ? /paid|cpc|ppc/i.test(m) : false;
    }).length;
    const campaigns = new Set(rows.map((r) => s(r.utmCampaign)).filter(Boolean)).size;
    return { total, tracked, paid, campaigns };
  }, [rows]);

  const byCampaign = useMemo(() => countBy(rows, (r) => s(r.utmCampaign)), [rows]);
  const bySource = useMemo(
    () =>
      countBy(rows, (r) => {
        const src = s(r.utmSource);
        const med = s(r.utmMedium);
        if (src && med) return `${src} / ${med}`;
        if (src) return src;
        const ref = s(r.referrer);
        return ref ? `ref: ${ref}` : undefined;
      }),
    [rows]
  );
  const byForm = useMemo(() => countBy(rows, (r) => s(r.source)), [rows]);

  const card = "rounded-2xl border border-line bg-white p-5";
  const panel = "rounded-2xl border border-line bg-white";
  const panelHead = "border-b border-line px-4 py-3 text-sm font-semibold text-ink";

  const links = [
    { label: "Meta Ads Manager", href: "https://adsmanager.facebook.com" },
    { label: "Gerenciador de Eventos (Pixel)", href: "https://business.facebook.com/events_manager" },
    { label: "Google Analytics (GA4)", href: "https://analytics.google.com" },
    { label: "Ver leads", href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Marketing</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Gasto e resultados das campanhas (Meta) + de onde vêm seus leads. O retorno real é cruzar os dois:
        quanto você gastou × quantos leads entraram.
      </p>

      {/* Campanhas da Meta (dados completos) */}
      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted">Campanhas (Meta Ads)</h2>
      <div className="mt-3">
        <MetaCampaigns meta={meta} />
      </div>

      {state === "error" && (
        <p className="mt-6 text-sm text-amber-deep">Não consegui ler os leads. Verifique o Firestore e as regras.</p>
      )}

      {/* Cartões de leads */}
      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">Leads (do seu banco)</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Leads (total)", value: stats.total },
          { label: "Com origem rastreada", value: stats.tracked },
          { label: "Via tráfego pago", value: stats.paid },
          { label: "Campanhas", value: stats.campaigns },
        ].map((c) => (
          <div key={c.label} className={card}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{c.label}</p>
            <p className="mt-1 font-serif text-3xl font-bold text-ink">{state === "loading" ? "…" : c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className={panel}>
          <h2 className={panelHead}>Por campanha (utm_campaign)</h2>
          <Bars data={byCampaign} empty="Nenhuma campanha rastreada ainda." />
        </div>
        <div className={panel}>
          <h2 className={panelHead}>Por origem (utm_source / medium)</h2>
          <Bars data={bySource} empty="Sem origem de tráfego ainda." />
        </div>
      </div>

      <div className={`mt-6 ${panel}`}>
        <h2 className={panelHead}>Por fonte interna (de qual formulário veio)</h2>
        <Bars data={byForm} empty="Nenhum lead ainda." />
      </div>

      {/* Atalhos */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Painéis externos</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="btn btn-ghost !px-4 !py-2 text-sm"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
