"use client";

import { useEffect, useState } from "react";
import { fetchCollection, fmtDate, downloadCSV, deleteDocById, updateDocFields, type Row } from "@/lib/admin-data";

const STATUSES = ["novo", "contatado", "cliente"] as const;
const statusColor: Record<string, string> = {
  novo: "text-muted",
  contatado: "text-amber-deep font-semibold",
  cliente: "text-green-700 font-semibold",
};

export default function AdminLeads() {
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

  async function del(id: string) {
    if (!confirm("Excluir este lead? Esta ação não pode ser desfeita.")) return;
    try {
      await deleteDocById("leads", id);
      setRows((rs) => rs.filter((r) => r.id !== id));
    } catch {
      alert("Erro ao excluir.");
    }
  }

  async function setStatus(id: string, status: string) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await updateDocFields("leads", id, { status });
    } catch {
      alert("Erro ao atualizar o status.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold">Leads</h1>
        <button
          onClick={() => downloadCSV("leads.csv", rows, ["name", "email", "whatsapp", "source", "status", "createdAt"])}
          disabled={rows.length === 0}
          className="btn btn-ghost !px-4 !py-2 disabled:opacity-50"
        >
          Exportar CSV
        </button>
      </div>

      {state === "error" && (
        <p className="mt-6 text-sm text-amber-deep">
          Não consegui ler os leads. Verifique o Firestore e as regras.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">E-mail</th>
              <th className="px-4 py-3 font-semibold">WhatsApp</th>
              <th className="px-4 py-3 font-semibold">Origem</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Data</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {state === "loading" ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={7}>Carregando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={7}>Nenhum lead ainda.</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-line/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{String(r.name ?? "—")}</td>
                  <td className="px-4 py-3 text-muted">{String(r.email ?? "—")}</td>
                  <td className="px-4 py-3 text-muted">{String(r.whatsapp ?? "—")}</td>
                  <td className="px-4 py-3 text-muted">{String(r.source ?? "—")}</td>
                  <td className="px-4 py-3">
                    <select
                      value={String(r.status ?? "novo")}
                      onChange={(e) => setStatus(r.id, e.target.value)}
                      className={`rounded-lg border border-line px-2 py-1 text-xs ${statusColor[String(r.status ?? "novo")] ?? "text-muted"}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-muted">{fmtDate(r.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => del(r.id)} className="text-xs text-red-500 hover:underline">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
