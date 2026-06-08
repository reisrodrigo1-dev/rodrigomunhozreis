"use client";

import { useEffect, useState } from "react";
import { getAllStudents, type Student } from "@/lib/students";
import { fmtDate, downloadCSV, type Row } from "@/lib/admin-data";

export default function AdminAlunos() {
  const [rows, setRows] = useState<Student[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    getAllStudents()
      .then((r) => {
        setRows(r);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold">Alunos</h1>
        <button
          onClick={() =>
            downloadCSV(
              "alunos.csv",
              rows as unknown as Row[],
              ["nome", "email", "whatsapp", "perfil", "createdAt"]
            )
          }
          disabled={rows.length === 0}
          className="btn btn-ghost !px-4 !py-2 disabled:opacity-50"
        >
          Exportar CSV
        </button>
      </div>

      {state === "error" && (
        <p className="mt-6 text-sm text-amber-deep">
          Não consegui ler os alunos. Verifique o Firestore e as regras.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">E-mail</th>
              <th className="px-4 py-3 font-semibold">WhatsApp</th>
              <th className="px-4 py-3 font-semibold">Perfil</th>
              <th className="px-4 py-3 font-semibold">Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {state === "loading" ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={5}>Carregando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={5}>Nenhum aluno ainda.</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.uid} className="border-b border-line/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{r.nome || "—"}</td>
                  <td className="px-4 py-3 text-muted">{r.email}</td>
                  <td className="px-4 py-3 text-muted">{r.whatsapp || "—"}</td>
                  <td className="px-4 py-3 text-muted">{r.perfil || "—"}</td>
                  <td className="px-4 py-3 text-muted">{fmtDate(r.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
