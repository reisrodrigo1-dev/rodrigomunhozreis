"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { auth } from "@/lib/firebase";
import type { GA4Snapshot } from "@/lib/ga4-admin";

type State =
  | { status: "loading" }
  | { status: "unauth" }
  | { status: "ok"; data: GA4Snapshot }
  | { status: "no-credentials" }
  | { status: "no-property-id" }
  | { status: "no-access" }
  | { status: "error"; msg: string };

function fmtNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(Math.round(n));
}
function fmtPct(p: number): string {
  return `${(p * 100).toFixed(1)}%`;
}
function fmtMin(m: number): string {
  const min = Math.floor(m);
  const sec = Math.round((m - min) * 60);
  return `${min}m${String(sec).padStart(2, "0")}s`;
}
function fmtDay(d: string): string {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function KPI({ title, value, hint }: { title: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
      <p className="mt-1 font-serif text-2xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function Bars({ items, formatKey, suffix }: { items: { key: string; value: number }[]; formatKey?: (k: string) => string; suffix?: string }) {
  if (items.length === 0) return <p className="text-sm text-muted">Sem dados ainda.</p>;
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.key} className="text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-ink">{formatKey ? formatKey(it.key) : it.key}</span>
            <span className="shrink-0 font-mono text-xs text-muted">{it.value}{suffix}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-line">
            <div className="h-1.5 rounded-full bg-amber" style={{ width: `${(it.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function GA4Overview() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [days, setDays] = useState<7 | 30 | 90>(30);

  useEffect(() => {
    let alive = true;
    (async () => {
      const user = auth.currentUser;
      if (!user) { if (alive) setState({ status: "unauth" }); return; }
      try {
        const idToken = await user.getIdToken();
        const r = await fetch(`/api/ga4?days=${days}`, { headers: { Authorization: `Bearer ${idToken}` } });
        if (r.status === 401) { if (alive) setState({ status: "unauth" }); return; }
        const data = (await r.json()) as GA4Snapshot | { error: string };
        if (!alive) return;
        if ("error" in data) {
          if (data.error === "no-credentials") setState({ status: "no-credentials" });
          else if (data.error === "no-property-id") setState({ status: "no-property-id" });
          else if (data.error === "no-access") setState({ status: "no-access" });
          else setState({ status: "error", msg: data.error });
        } else {
          setState({ status: "ok", data });
        }
      } catch (err) {
        if (alive) setState({ status: "error", msg: String(err).slice(0, 200) });
      }
    })();
    return () => { alive = false; };
  }, [days]);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Google Analytics 4</h2>
          <p className="mt-1 text-sm text-muted">Dados oficiais do GA4 — sessões, usuários, fonte de tráfego, engajamento.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-line bg-white p-1 text-xs">
          {([7, 30, 90] as const).map((d) => (
            <button key={d} onClick={() => setDays(d)} className={`rounded-full px-3 py-1 ${days === d ? "bg-ink text-white" : "text-muted hover:text-ink"}`}>{d}d</button>
          ))}
        </div>
      </div>

      {state.status === "loading" && <p className="mt-5 text-sm text-muted">Consultando GA4…</p>}

      {(state.status === "no-credentials" || state.status === "no-property-id" || state.status === "no-access") && (
        <div className="mt-5 rounded-xl border border-amber/30 bg-amber-soft/40 p-5">
          <p className="text-sm font-semibold text-ink">GA4 ainda não está conectado.</p>
          {state.status === "no-property-id" && (
            <p className="mt-1 text-xs text-ink/70">Falta a variável <code>GA4_PROPERTY_ID</code> na Vercel (o número da propriedade, ex.: <code>317945612</code>).</p>
          )}
          {state.status === "no-credentials" && (
            <p className="mt-1 text-xs text-ink/70">Falta a variável <code>FIREBASE_SERVICE_ACCOUNT</code> na Vercel (já é usada pelo webhook do Resend).</p>
          )}
          {state.status === "no-access" && (
            <p className="mt-1 text-xs text-ink/70">A service account não tem acesso à propriedade GA4. Adicione o <i>client_email</i> da SA como <b>Leitor (Viewer)</b> no Admin do GA4.</p>
          )}
          <p className="mt-3 text-xs text-ink/70">Veja os 3 passos no topo da página <code>/admin/posts</code>.</p>
        </div>
      )}

      {state.status === "unauth" && <p className="mt-5 text-sm text-muted">Faça login como admin para ver os dados.</p>}
      {state.status === "error" && <p className="mt-5 text-sm text-red-600">Erro: {state.msg}</p>}

      {state.status === "ok" && (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <KPI title="Usuários" value={fmtNum(state.data.totals.users)} />
            <KPI title="Sessões" value={fmtNum(state.data.totals.sessions)} />
            <KPI title="Pageviews" value={fmtNum(state.data.totals.views)} />
            <KPI title="Engajamento" value={fmtPct(state.data.totals.engagementRate)} hint="sessões engajadas / total" />
            <KPI title="Sessão média" value={fmtMin(state.data.totals.avgSessionMin)} />
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-muted">Sessões por dia</p>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={state.data.byDay.map((b) => ({ day: fmtDay(b.day), sessions: b.sessions }))} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                  <defs><linearGradient id="ga4-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B5762A" stopOpacity={0.35}/><stop offset="100%" stopColor="#B5762A" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid stroke="#eee2cc" strokeDasharray="2 2" />
                  <XAxis dataKey="day" interval={Math.max(0, Math.floor(state.data.byDay.length / 8))} fontSize={11} stroke="#9b9078" />
                  <YAxis allowDecimals={false} fontSize={11} stroke="#9b9078" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e4dbcb", fontSize: 12 }} />
                  <Area type="monotone" dataKey="sessions" stroke="#B5762A" strokeWidth={2.4} fill="url(#ga4-fill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-wide text-muted">Top posts do blog</p>
              <div className="mt-3"><Bars items={state.data.topPosts} formatKey={(k) => k.replace(/^\/blog\//, "")} /></div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-wide text-muted">De onde vem o tráfego</p>
              <div className="mt-3"><Bars items={state.data.topSources} /></div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-wide text-muted">Top países</p>
              <div className="mt-3"><Bars items={state.data.topCountries} /></div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-wide text-muted">Dispositivos</p>
              <div className="mt-3"><Bars items={state.data.topDevices} /></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
