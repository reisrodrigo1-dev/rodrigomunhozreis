"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllRobots, importSeedRobots } from "@/lib/robots-db";
import type { Robot } from "@/lib/robots";

export default function AdminRobos() {
  const [rows, setRows] = useState<Robot[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    getAllRobots()
      .then((r) => {
        setRows(r);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  async function handleImport() {
    setImporting(true);
    try {
      const n = await importSeedRobots();
      setRows(await getAllRobots());
      alert(n > 0 ? `${n} robô(s) importado(s) para o banco.` : "Nada novo para importar.");
    } catch {
      alert("Erro ao importar. Verifique o Firestore e as regras.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold">Robôs</h1>
        <div className="flex gap-2">
          <button onClick={handleImport} disabled={importing} className="btn btn-ghost !px-4 !py-2 disabled:opacity-50">
            {importing ? "Importando…" : "Importar robôs iniciais"}
          </button>
          <Link href="/admin/robos/new" className="btn btn-primary !px-5 !py-2.5">
            Novo robô
          </Link>
        </div>
      </div>

      {state === "error" && (
        <p className="mt-6 text-sm text-amber-deep">
          Não consegui ler os robôs. Verifique o Firestore e as regras.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {state === "loading" ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={2}>Carregando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={2}>Nenhum robô ainda. Clique em “Importar robôs iniciais”.</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-line/60 last:border-0 hover:bg-paper">
                  <td className="px-4 py-3 font-medium text-ink">
                    <Link href={`/admin/robos/${r.id}`} className="hover:text-amber-deep">
                      {r.name || "(sem nome)"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{r.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
