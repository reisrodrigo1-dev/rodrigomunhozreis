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

export default function AdminMarketing() {
  const [rows, setRows] = useState<Row[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    fetchCollection("leads")
      .then((r) => {
        setRows(r);
        setState("ok");
      })
      .catch(() => setState("error"));
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
        De onde vêm seus leads. A origem (UTM) é capturada automaticamente quando alguém chega por um
        anúncio ou link com tag — sem depender de API externa.
      </p>

      {state === "error" && (
        <p className="mt-6 text-sm text-amber-deep">
          Não consegui ler os leads. Verifique o Firestore e as regras.
        </p>
      )}

      {/* Cartões de números */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Leads (total)", value: stats.total },
          { label: "Com origem rastreada", value: stats.tracked },
          { label: "Via tráfego pago", value: stats.paid },
          { label: "Campanhas", value: stats.campaigns },
        ].map((c) => (
          <div key={c.label} className={card}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{c.label}</p>
            <p className="mt-1 font-serif text-3xl font-bold text-ink">
              {state === "loading" ? "…" : c.value}
            </p>
          </div>
        ))}
      </div>

      {/* Origem */}
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
        <p className="mt-4 text-xs text-muted">
          Gasto, cliques e CPM ficam nos painéis acima (Meta/GA). Aqui o foco é o que importa pro ROI:
          quantos leads cada origem trouxe.
        </p>
      </div>
    </div>
  );
}
