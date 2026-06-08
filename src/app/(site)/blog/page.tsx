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
    <section className="py-20 md:py-28">
      <div className="container-c">
        <Reveal>
          <p className="kicker-d">Conteúdo</p>
          <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
            <span className="text-grad">Blog</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-paper/55">
            Vibecoding com engenharia, IA sem medo e bastidores reais.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-12 text-paper/50">Em breve, os primeiros artigos.</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={0.06 * i}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="glass glass-hover group block h-full overflow-hidden"
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
                  <div className="p-7">
                    {p.tags?.[0] && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-amber-light">
                        {p.tags[0]}
                      </span>
                    )}
                    <h2 className="mt-2 text-2xl font-semibold text-paper">{p.title}</h2>
                    <p className="mt-2 text-paper/55">{p.excerpt}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-amber-light">
                      Ler artigo →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
