"use client";

import { useEffect, useState } from "react";
import { getAllStudents, type Student } from "@/lib/students";
import { fmtDate, downloadCSV, deleteDocById, updateDocFields, type Row } from "@/lib/admin-data";

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

  async function del(uid: string) {
    if (!confirm("Excluir este cliente? Isso remove o cadastro (a conta de login continua no Firebase Auth).")) return;
    try {
      await deleteDocById("students", uid);
      setRows((rs) => rs.filter((r) => r.uid !== uid));
    } catch {
      alert("Erro ao excluir.");
    }
  }

  async function changePlan(uid: string, plan: "free" | "pro") {
    setRows((rs) => rs.map((r) => (r.uid === uid ? { ...r, plan } : r)));
    try {
      await updateDocFields("students", uid, { plan });
    } catch {
      alert("Erro ao atualizar o plano.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold">Clientes</h1>
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
          Não consegui ler os clientes. Verifique o Firestore e as regras.
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
              <th className="px-4 py-3 font-semibold">Plano</th>
              <th className="px-4 py-3 font-semibold">Cadastro</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {state === "loading" ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={7}>Carregando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={7}>Nenhum cliente ainda.</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.uid} className="border-b border-line/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{r.nome || "—"}</td>
                  <td className="px-4 py-3 text-muted">{r.email}</td>
                  <td className="px-4 py-3 text-muted">{r.whatsapp || "—"}</td>
                  <td className="px-4 py-3 text-muted">{r.perfil || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.plan ?? "free"}
                      onChange={(e) => changePlan(r.uid, e.target.value as "free" | "pro")}
                      className={`rounded-lg border border-line px-2 py-1 text-xs ${
                        (r.plan ?? "free") === "pro" ? "font-semibold text-amber-deep" : "text-muted"
                      }`}
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-muted">{fmtDate(r.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => del(r.uid)} className="text-xs text-red-500 hover:underline">
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
