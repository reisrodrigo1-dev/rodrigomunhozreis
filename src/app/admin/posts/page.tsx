"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts, importSeedPosts } from "@/lib/posts-admin";
import { fmtDate, type Row } from "@/lib/admin-data";
import type { Post } from "@/lib/posts";

export default function AdminPosts() {
  const [rows, setRows] = useState<Post[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    getAllPosts()
      .then((p) => {
        setRows(p);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  async function handleImport() {
    setImporting(true);
    try {
      const { created, updated } = await importSeedPosts();
      const p = await getAllPosts();
      setRows(p);
      alert(
        created + updated > 0
          ? `${created} criado(s) e ${updated} atualizado(s).`
          : "Tudo já está atualizado."
      );
    } catch {
      alert("Erro ao importar. Verifique o Firestore e as regras.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold">Blog</h1>
        <div className="flex gap-2">
          <button
            onClick={handleImport}
            disabled={importing}
            className="btn btn-ghost !px-4 !py-2 disabled:opacity-50"
          >
            {importing ? "Atualizando…" : "Importar / atualizar posts"}
          </button>
          <Link href="/admin/posts/new" className="btn btn-primary !px-5 !py-2.5">
            Novo post
          </Link>
        </div>
      </div>

      {state === "error" && (
        <p className="mt-6 text-sm text-amber-deep">
          Não consegui ler os posts. Verifique o Firestore e as regras.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Título</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {state === "loading" ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={3}>Carregando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={3}>Nenhum post ainda. Crie o primeiro!</td></tr>
            ) : (
              rows.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-0 hover:bg-paper">
                  <td className="px-4 py-3 font-medium text-ink">
                    <Link href={`/admin/posts/${p.id}`} className="hover:text-amber-deep">
                      {p.title || "(sem título)"}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        p.status === "published"
                          ? "bg-amber-soft text-amber-deep"
                          : "bg-line/60 text-muted"
                      }`}
                    >
                      {p.status === "published" ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{fmtDate((p as Row).updatedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
