"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchCollection, fmtDate, type Row } from "@/lib/admin-data";

function toDate(ts: unknown): Date | null {
  const v = ts as { toDate?: () => Date } | string | number | null;
  try {
    if (v && typeof v === "object" && "toDate" in v && v.toDate) return v.toDate();
    if (v) return new Date(v as string | number);
  } catch {}
  return null;
}

/** Conta leads por origem (source), ordenado do maior para o menor. */
function bySource(rows: Row[]): { label: string; n: number }[] {
  const m = new Map<string, number>();
  for (const r of rows) {
    const s = String(r.source ?? "—").split(":")[0];
    m.set(s, (m.get(s) ?? 0) + 1);
  }
  return [...m.entries()].map(([label, n]) => ({ label, n })).sort((a, b) => b.n - a.n);
}

/** Conta leads por dia nos últimos 7 dias. */
function last7Days(rows: Row[]): { label: string; n: number }[] {
  const days: { key: string; label: string; n: number }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    days.push({
      key: d.toDateString(),
      label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      n: 0,
    });
  }
  const idx = new Map(days.map((d, i) => [d.key, i]));
  for (const r of rows) {
    const d = toDate(r.createdAt);
    if (!d) continue;
    const i = idx.get(d.toDateString());
    if (i !== undefined) days[i].n += 1;
  }
  return days.map(({ label, n }) => ({ label, n }));
}

function BarChart({ data, title }: { data: { label: string; n: number }[]; title: string }) {
  const max = Math.max(1, ...data.map((d) => d.n));
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="font-serif text-lg font-semibold">{title}</h2>
      {data.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Sem dados ainda.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2.5">
          {data.map((d) => (
            <li key={d.label} className="flex items-center gap-3 text-sm">
              <span className="w-28 shrink-0 truncate text-muted" title={d.label}>{d.label}</span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-paper">
                <span
                  className="block h-full rounded-full bg-amber"
                  style={{ width: `${(d.n / max) * 100}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right font-semibold text-ink">{d.n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Row[]>([]);
  const [downloads, setDownloads] = useState<Row[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    (async () => {
      try {
        const [l, d] = await Promise.all([
          fetchCollection("leads"),
          fetchCollection("downloads"),
        ]);
        setLeads(l);
        setDownloads(d);
        setState("ok");
      } catch {
        setState("error");
      }
    })();
  }, []);

  const sources = useMemo(() => bySource(leads), [leads]);
  const week = useMemo(() => last7Days(leads), [leads]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Visão geral</h1>

      {state === "error" && (
        <div className="mt-6 rounded-xl border border-amber/40 bg-amber-soft/60 p-5 text-sm text-ink-soft">
          Não consegui ler os dados. Confirme se o <b>Firestore</b> está criado e se as{" "}
          <b>regras</b> (firestore.rules) foram publicadas com o seu e-mail de admin.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="text-sm text-muted">Leads capturados</p>
          <p className="mt-1 font-serif text-4xl font-bold text-ink">
            {state === "loading" ? "…" : leads.length}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="text-sm text-muted">Downloads registrados</p>
          <p className="mt-1 font-serif text-4xl font-bold text-ink">
            {state === "loading" ? "…" : downloads.length}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BarChart title="Leads por origem" data={sources} />
        <BarChart title="Leads nos últimos 7 dias" data={week} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Recent title="Últimos leads" rows={leads.slice(0, 6)} render={(r) => (
          <>
            <span className="font-medium text-ink">{String(r.email ?? "—")}</span>
            <span className="text-muted">{String(r.source ?? "")}</span>
          </>
        )} />
        <Recent title="Últimos downloads" rows={downloads.slice(0, 6)} render={(r) => (
          <>
            <span className="font-medium text-ink">{String(r.materialTitle ?? "—")}</span>
            <span className="text-muted">{String(r.email ?? "")}</span>
          </>
        )} />
      </div>
    </div>
  );
}

function Recent({
  title,
  rows,
  render,
}: {
  title: string;
  rows: Row[];
  render: (r: Row) => React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="font-serif text-lg font-semibold">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Nada ainda.</p>
      ) : (
        <ul className="mt-3 divide-y divide-line text-sm">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex min-w-0 flex-col">{render(r)}</div>
              <span className="shrink-0 text-xs text-muted-soft">{fmtDate(r.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
