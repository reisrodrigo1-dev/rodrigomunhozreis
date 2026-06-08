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
  const minutes = Math.max(1, Math.round((post.content || "").trim().split(/\s+/).length / 200));
  const dateStr = (() => {
    const v = post.publishedAt as { toDate?: () => Date } | string | undefined;
    try {
      const d =
        typeof v === "string" ? new Date(v) : v && typeof v === "object" && v.toDate ? v.toDate() : null;
      return d
        ? d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
        : "";
    } catch {
      return "";
    }
  })();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverUrl,
    author: { "@type": "Person", name: "Rodrigo Munhoz Reis" },
    datePublished: typeof post.publishedAt === "string" ? post.publishedAt : undefined,
  };

  return (
    <article className="py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-c max-w-3xl">
        <p className="kicker-d">{post.tags?.[0] ?? "Artigo"}</p>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-paper md:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && <p className="mt-4 text-xl text-paper/55">{post.excerpt}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-paper/45">
          <span className="text-paper/70">Rodrigo Munhoz Reis</span>
          {dateStr && <span>· {dateStr}</span>}
          <span>· {minutes} min de leitura</span>
        </div>
        {post.coverUrl && (
          <div className="mt-8 aspect-[16/8] overflow-hidden rounded-2xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverUrl} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}
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
