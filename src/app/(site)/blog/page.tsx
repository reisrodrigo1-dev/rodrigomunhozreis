import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { BlogBrowser } from "@/components/blog-browser";
import { getPublishedPosts, type Post } from "@/lib/posts";

// Renderiza a cada acesso: o índice precisa mostrar o post no minuto em que ele
// estreia, e página assada carrega a lista congelada do build. A leitura do
// Firestore é cacheada em `posts.ts`, então isso não vira round-trip por request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — IA, Vibecoding e Tecnologia",
  description:
    "Artigos sobre vibecoding com engenharia, segurança em IA e como usar inteligência artificial no trabalho — com dados e exemplos reais.",
  alternates: { canonical: "/blog" },
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
            <span className="text-grad">O </span>
            <span className="accent">blog.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-paper/55">
            Vibecoding com engenharia, IA sem medo e bastidores reais de quem roda empresas com IA.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-12 text-paper/50">Em breve, os primeiros artigos.</p>
        ) : (
          <BlogBrowser posts={posts} />
        )}
      </div>
    </section>
  );
}
