"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getAnalyticsSnapshot, type AnalyticsSnapshot } from "@/lib/analytics-admin";

const COUNTRY: Record<string, string> = {
  BR: "🇧🇷 Brasil", US: "🇺🇸 EUA", PT: "🇵🇹 Portugal", AR: "🇦🇷 Argentina",
  ES: "🇪🇸 Espanha", MX: "🇲🇽 México", FR: "🇫🇷 França", DE: "🇩🇪 Alemanha",
};
const DEVICE: Record<string, string> = { mobile: "📱 Mobile", desktop: "🖥️ Desktop", tablet: "📲 Tablet", bot: "🤖 Bot" };

function fmtDay(d: string): string {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function Card({ title, value, hint }: { title: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
      <p className="mt-1 font-serif text-3xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function TopList({ items, labelMap }: { items: { key: string; value: number }[]; labelMap?: Record<string, string> }) {
  if (items.length === 0) return <p className="text-sm text-muted">Sem dados ainda.</p>;
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.key} className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-ink">{labelMap?.[it.key] ?? it.key}</span>
            <span className="font-mono text-xs text-muted">{it.value}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-line">
            <div className="h-1.5 rounded-full bg-amber" style={{ width: `${(it.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function BlogAnalytics() {
  const [data, setData] = useState<AnalyticsSnapshot | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    getAnalyticsSnapshot()
      .then((s) => { setData(s); setState("ok"); })
      .catch(() => setState("error"));
  }, []);

  if (state === "loading") {
    return <p className="mt-8 text-sm text-muted">Carregando métricas…</p>;
  }
  if (state === "error" || !data) {
    return (
      <div className="mt-8 rounded-xl border border-amber/30 bg-amber-soft/40 p-4">
        <p className="text-sm text-ink/80">
          Não consegui ler as visitas detalhadas. <b>Verifique</b> a regra do <code>page_visits</code> no Firestore
          (read só admin) e a variável <code>FIREBASE_SERVICE_ACCOUNT</code> na Vercel.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="font-serif text-2xl font-semibold">Métricas do blog</h2>
      <p className="mt-1 text-sm text-muted">Últimos 30 dias · dados próprios (não conta bots).</p>

      {/* KPI cards */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Visitas (30d)" value={data.totalVisits} />
        <Card title="Leads identificados" value={data.uniqueLeadEmails} hint="Visitas com e-mail logado" />
        <Card title="Top país" value={COUNTRY[data.topCountries[0]?.key ?? ""] ?? data.topCountries[0]?.key ?? "—"} hint={data.topCountries[0] ? `${data.topCountries[0].value} visitas` : ""} />
        <Card title="Top dispositivo" value={DEVICE[data.topDevices[0]?.key ?? ""] ?? data.topDevices[0]?.key ?? "—"} hint={data.topDevices[0] ? `${data.topDevices[0].value} visitas` : ""} />
      </div>

      {/* Gráfico de linha */}
      <div className="mt-5 rounded-2xl border border-line bg-white p-5">
        <p className="text-xs uppercase tracking-wide text-muted">Visitas por dia · últimos 30 dias</p>
        <div className="mt-3 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.visitsByDay.map((b) => ({ day: fmtDay(b.key), value: b.value }))} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="#eee2cc" strokeDasharray="2 2" />
              <XAxis dataKey="day" interval={Math.floor(data.visitsByDay.length / 8)} fontSize={11} stroke="#9b9078" />
              <YAxis allowDecimals={false} fontSize={11} stroke="#9b9078" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e4dbcb", fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#B5762A" strokeWidth={2.4} dot={{ r: 2.5 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 3 distribuições */}
      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Top países</p>
          <div className="mt-3"><TopList items={data.topCountries} labelMap={COUNTRY} /></div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Top dispositivos</p>
          <div className="mt-3"><TopList items={data.topDevices} labelMap={DEVICE} /></div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Top referenciadores</p>
          <div className="mt-3"><TopList items={data.topReferrers} /></div>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">
        Para métricas avançadas (tempo na página, scroll, funil) use seu painel no <a className="text-amber-deep hover:underline" href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">GA4</a> e
        no <a className="text-amber-deep hover:underline" href="https://vercel.com/analytics" target="_blank" rel="noopener noreferrer">Vercel Analytics</a> — já estão instalados no site.
      </p>
    </div>
  );
}
