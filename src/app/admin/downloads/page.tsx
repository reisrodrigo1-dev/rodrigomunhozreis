"use client";

import { useEffect, useState } from "react";
import { fetchCollection, fmtDate, downloadCSV, deleteDocById, type Row } from "@/lib/admin-data";

export default function AdminDownloads() {
  const [rows, setRows] = useState<Row[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    fetchCollection("downloads")
      .then((r) => {
        setRows(r);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  async function del(id: string) {
    if (!confirm("Excluir este registro?")) return;
    try {
      await deleteDocById("downloads", id);
      setRows((rs) => rs.filter((r) => r.id !== id));
    } catch {
      alert("Erro ao excluir.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold">Downloads</h1>
        <button
          onClick={() => downloadCSV("downloads.csv", rows, ["materialTitle", "email", "createdAt"])}
          disabled={rows.length === 0}
          className="btn btn-ghost !px-4 !py-2 disabled:opacity-50"
        >
          Exportar CSV
        </button>
      </div>

      {state === "error" && (
        <p className="mt-6 text-sm text-amber-deep">
          Não consegui ler os downloads. Verifique o Firestore e as regras.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Material</th>
              <th className="px-4 py-3 font-semibold">E-mail</th>
              <th className="px-4 py-3 font-semibold">Data</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {state === "loading" ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={4}>Carregando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={4}>Nenhum download ainda.</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-line/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{String(r.materialTitle ?? "—")}</td>
                  <td className="px-4 py-3 text-muted">{String(r.email ?? "—")}</td>
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
