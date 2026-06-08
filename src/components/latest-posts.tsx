"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { getPublishedPosts, type Post } from "@/lib/posts";

/** Seção "Do blog" da home — lê os posts publicados direto do Firestore. */
export function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPublishedPosts()
      .then((p) => setPosts(p.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Não renderiza a seção se não houver posts publicados (nada mockado).
  if (loaded && posts.length === 0) return null;

  return (
    <section id="blog" className="border-t border-white/5 py-20 md:py-28">
      <div className="container-c">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker-d">Conteúdo</p>
              <h2 className="mt-5 text-4xl font-medium tracking-tight md:text-5xl">
                <span className="text-grad">Do </span>
                <span className="accent">blog.</span>
              </h2>
            </div>
            <a
              href="/blog"
              className="hidden text-sm font-semibold text-amber-light hover:underline sm:inline"
            >
              Ver todos →
            </a>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={0.06 * i}>
              <a
                href={`/blog/${p.slug}`}
                className="glass glass-hover group block h-full overflow-hidden"
              >
                {p.coverUrl && (
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.coverUrl}
                      alt=""
                      className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>
                )}
                <div className="p-6">
                  {p.tags?.[0] && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-amber-light">
                      {p.tags[0]}
                    </span>
                  )}
                  <h3 className="mt-2 text-lg font-semibold text-paper">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/55">{p.excerpt}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
