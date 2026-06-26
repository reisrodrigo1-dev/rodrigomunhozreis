"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getAllPosts, importSeedPosts } from "@/lib/posts-admin";
import { getViews, getLastViews } from "@/lib/views";
import { fmtDate, type Row } from "@/lib/admin-data";
import type { Post } from "@/lib/posts";
import { BlogAnalytics } from "@/components/admin/blog-analytics";
import { GA4Overview } from "@/components/admin/ga4-overview";

const PAGE_SIZE = 10;

function fmtRelativo(iso?: string): string {
  if (!iso) return "—";
  const ms = Date.parse(iso);
  if (!ms) return "—";
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `há ${d} d`;
  return new Date(ms).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function AdminPosts() {
  const [rows, setRows] = useState<Post[]>([]);
  const [views, setViews] = useState<Record<string, number>>({});
  const [lastViews, setLastViews] = useState<Record<string, string>>({});
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [importing, setImporting] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllPosts()
      .then((p) => {
        setRows(p);
        setState("ok");
      })
      .catch(() => setState("error"));
    getViews().then(setViews).catch(() => {});
    getLastViews().then(setLastViews).catch(() => {});
  }, []);

  const totalViews = Object.values(views).reduce((a, b) => a + b, 0);
  const sorted = useMemo(
    () => [...rows].sort((a, b) => (views[b.slug] ?? 0) - (views[a.slug] ?? 0)),
    [rows, views]
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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

      <p className="mt-4 text-sm text-muted">
        Total de visualizações: <b className="text-ink">{totalViews}</b>
        {totalViews > 0 && " · lista ordenada pelos mais lidos"}
      </p>

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
              <th className="px-4 py-3 font-semibold">Views</th>
              <th className="px-4 py-3 font-semibold">Última visita</th>
              <th className="px-4 py-3 font-semibold">Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {state === "loading" ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={5}>Carregando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-4 text-muted" colSpan={5}>Nenhum post ainda. Crie o primeiro!</td></tr>
            ) : (
              pageRows.map((p) => (
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
                  <td className="px-4 py-3 font-semibold text-ink">{views[p.slug] ?? 0}</td>
                  <td className="px-4 py-3 text-muted" title={lastViews[p.slug] ? new Date(lastViews[p.slug]).toLocaleString("pt-BR") : ""}>
                    {fmtRelativo(lastViews[p.slug])}
                  </td>
                  <td className="px-4 py-3 text-muted">{fmtDate((p as Row).updatedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {sorted.length > PAGE_SIZE && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-muted">
            Mostrando <b className="text-ink">{(currentPage - 1) * PAGE_SIZE + 1}</b>–
            <b className="text-ink">{Math.min(currentPage * PAGE_SIZE, sorted.length)}</b> de{" "}
            <b className="text-ink">{sorted.length}</b>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-line px-3 py-1.5 text-xs disabled:opacity-40"
            >
              ← Anterior
            </button>
            <span className="text-xs text-muted">
              Página <b className="text-ink">{currentPage}</b> de <b className="text-ink">{totalPages}</b>
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-line px-3 py-1.5 text-xs disabled:opacity-40"
            >
              Próximo →
            </button>
          </div>
        </div>
      )}

      {/* Dashboard de métricas próprias (Firestore) */}
      <BlogAnalytics />

      {/* Métricas oficiais do GA4 */}
      <GA4Overview />
    </div>
  );
}
