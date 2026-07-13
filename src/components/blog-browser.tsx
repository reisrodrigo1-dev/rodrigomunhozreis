"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { getViews } from "@/lib/views";
import { toIsoDate, type Post } from "@/lib/posts";

function readingTime(content: string): number {
  const words = (content || "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function fmtDate(v: unknown): string {
  const iso = toIsoDate(v);
  return iso
    ? new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    : "";
}

function Meta({ p }: { p: Post }) {
  const date = fmtDate(p.publishedAt ?? p.createdAt);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      {p.tags?.[0] && (
        <span className="font-semibold uppercase tracking-wide text-amber-light">{p.tags[0]}</span>
      )}
      {date && <span className="text-paper/40">{date}</span>}
      <span className="text-paper/30">· {readingTime(p.content)} min</span>
    </div>
  );
}

function PostCard({ p }: { p: Post }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="glass glass-hover group flex h-full flex-col overflow-hidden"
    >
      {p.coverUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.coverUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <Meta p={p} />
        <h3 className="mt-2 text-lg font-semibold text-paper">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">{p.excerpt}</p>
      </div>
    </Link>
  );
}

// Quantos cartões (fora o destaque) mostrar por vez.
const PAGE_SIZE = 9;

export function BlogBrowser({ posts }: { posts: Post[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const [views, setViews] = useState<Record<string, number>>({});
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    getViews().then(setViews).catch(() => {});
  }, []);

  // Ao mudar busca ou categoria, volta a mostrar só a primeira página.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [q, cat]);

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(posts.flatMap((p) => p.tags ?? [])))],
    [posts]
  );

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        const okCat = cat === "Todos" || (p.tags ?? []).includes(cat);
        const text = `${p.title} ${p.excerpt} ${(p.tags ?? []).join(" ")}`.toLowerCase();
        const okQ = !q || text.includes(q.toLowerCase());
        return okCat && okQ;
      }),
    [posts, q, cat]
  );

  // "Mais lidos" — só quando há visualizações e nenhum filtro ativo.
  const mostRead = useMemo(() => {
    if (q || cat !== "Todos") return [];
    return [...posts]
      .filter((p) => (views[p.slug] ?? 0) > 0)
      .sort((a, b) => (views[b.slug] ?? 0) - (views[a.slug] ?? 0))
      .slice(0, 4);
  }, [posts, views, q, cat]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const shown = rest.slice(0, visible);
  const hasMore = rest.length > visible;

  return (
    <>
      {/* Busca + categorias */}
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <label htmlFor="blog-search" className="sr-only">
            Buscar artigos
          </label>
          <input
            id="blog-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar artigos…"
            className="min-h-[44px] w-full rounded-full border border-white/12 bg-white/5 pl-11 pr-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={c === cat}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                c === cat
                  ? "border-amber bg-amber font-semibold text-ink"
                  : "border-white/12 text-paper/60 hover:border-amber/50 hover:text-paper"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Mais lidos */}
      {mostRead.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">Mais lidos</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mostRead.map((p, i) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="glass glass-hover flex items-start gap-3 p-4"
              >
                <span className="font-serif text-2xl font-bold leading-none text-amber/50">{i + 1}</span>
                <span>
                  <span className="line-clamp-2 text-sm font-semibold text-paper">{p.title}</span>
                  <span className="mt-1 block text-xs text-paper/40">{views[p.slug]} leituras</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-16 text-paper/50">Nenhum artigo encontrado para sua busca.</p>
      ) : (
        <>
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="glass glass-hover group mt-12 grid overflow-hidden md:grid-cols-2"
              >
                {featured.coverUrl && (
                  <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.coverUrl}
                      alt=""
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="badge">Em destaque</span>
                    <Meta p={featured} />
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight text-paper md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-paper/60">{featured.excerpt}</p>
                  <span className="mt-5 inline-block text-sm font-semibold text-amber-light">
                    Ler artigo →
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, i) => (
                <Reveal key={p.id} delay={0.05 * (i % PAGE_SIZE)}>
                  <PostCard p={p} />
                </Reveal>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="btn btn-dark-ghost !px-7 !py-3"
              >
                Carregar mais artigos
              </button>
              <p className="text-sm text-paper/40">
                Mostrando <b className="text-paper/70">{Math.min(visible, rest.length) + (featured ? 1 : 0)}</b> de{" "}
                <b className="text-paper/70">{filtered.length}</b> artigos
              </p>
            </div>
          )}
        </>
      )}

      {/* Newsletter */}
      <div className="glass mt-16 p-8 text-center md:p-10">
        <h2 className="text-2xl font-medium tracking-tight text-paper md:text-3xl">
          Receba os próximos artigos
        </h2>
        <p className="mx-auto mt-3 max-w-md text-paper/55">
          Método, IA e bastidores reais de quem constrói com IA — direto no seu e-mail, sem spam.
        </p>
        <div className="mt-6 flex justify-center">
          <NewsletterForm variant="dark" source="blog" />
        </div>
      </div>
    </>
  );
}
