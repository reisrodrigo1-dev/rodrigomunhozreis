"use client";

import { useEffect, useState } from "react";
import { fetchCollection, fmtDate, type Row } from "@/lib/admin-data";

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
