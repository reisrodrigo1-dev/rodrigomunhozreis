import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPostBySlug, type Post } from "@/lib/posts";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string): Promise<Post | null> {
  try {
    return await getPostBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) return { title: "Artigo" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverUrl ? [post.coverUrl] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) notFound();

  const html = await marked.parse(post.content || "");

  return (
    <article className="py-20 md:py-28">
      <div className="container-c max-w-3xl">
        <p className="kicker-d">{post.tags?.[0] ?? "Artigo"}</p>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-paper md:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && <p className="mt-4 text-xl text-paper/55">{post.excerpt}</p>}
        <div className="prose-dark mt-10" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-12 border-t border-white/10 pt-6">
          <a href="/blog" className="text-sm font-semibold text-amber-light hover:underline">
            ← Voltar ao blog
          </a>
        </div>
      </div>
    </article>
  );
}
