import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getPublishedPosts, type Post } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Vibecoding com engenharia, IA sem medo e bastidores reais de quem roda empresas com IA.",
};

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-c">
        <Reveal>
          <p className="kicker">Conteúdo</p>
          <h1 className="mt-4 text-4xl md:text-6xl">Blog</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Vibecoding com engenharia, IA sem medo e bastidores reais.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-12 text-muted">Em breve, os primeiros artigos.</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={0.06 * i}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block h-full rounded-2xl border border-line bg-white p-7 transition-colors hover:border-amber"
                >
                  {p.tags?.[0] && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-amber-deep">
                      {p.tags[0]}
                    </span>
                  )}
                  <h2 className="mt-2 font-serif text-2xl font-semibold">{p.title}</h2>
                  <p className="mt-2 text-muted">{p.excerpt}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-amber-deep">
                    Ler artigo →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
