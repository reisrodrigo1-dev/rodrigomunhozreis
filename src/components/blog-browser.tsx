"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import type { Post } from "@/lib/posts";

function readingTime(content: string): number {
  const words = (content || "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
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
            className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          {p.tags?.[0] && (
            <span className="font-semibold uppercase tracking-wide text-amber-light">
              {p.tags[0]}
            </span>
          )}
          <span className="text-paper/40">{readingTime(p.content)} min de leitura</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-paper">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">{p.excerpt}</p>
      </div>
    </Link>
  );
}

export function BlogBrowser({ posts }: { posts: Post[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");

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

  const featured = filtered[0];
  const rest = filtered.slice(1);

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
                      className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="badge">Em destaque</span>
                    {featured.tags?.[0] && (
                      <span className="font-semibold uppercase tracking-wide text-amber-light">
                        {featured.tags[0]}
                      </span>
                    )}
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
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={0.05 * i}>
                  <PostCard p={p} />
                </Reveal>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
