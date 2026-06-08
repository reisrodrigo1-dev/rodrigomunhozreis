import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPostBySlug, getPublishedPosts, toIsoDate, type Post } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { PostCta } from "@/components/post-cta";
import { site } from "@/lib/site";

// ISR: revalida a cada 5 min.
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

// Pré-renderiza os slugs publicados no build (os novos entram on-demand via ISR).
export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

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
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://${site.domain}/blog/${post.slug}`,
      images: post.coverUrl ? [post.coverUrl] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) notFound();

  const html = renderMarkdown(await marked.parse(post.content || ""));
  const minutes = Math.max(1, Math.round((post.content || "").trim().split(/\s+/).length / 200));
  const isoPublished = toIsoDate(post.publishedAt ?? post.createdAt);
  const isoModified = toIsoDate(post.updatedAt) ?? isoPublished;
  const dateStr = isoPublished
    ? new Date(isoPublished).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";
  const url = `https://${site.domain}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    ...(post.coverUrl ? { image: post.coverUrl } : {}),
    author: { "@type": "Person", name: site.name, url: `https://${site.domain}` },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `https://${site.domain}/icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(isoPublished ? { datePublished: isoPublished } : {}),
    ...(isoModified ? { dateModified: isoModified } : {}),
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
          <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}
        <div className="prose-dark mt-10" dangerouslySetInnerHTML={{ __html: html }} />
        <PostCta />
        <div className="mt-12 border-t border-white/10 pt-6">
          <Link href="/blog" className="text-sm font-semibold text-amber-light hover:underline">
            ← Voltar ao blog
          </Link>
        </div>
      </div>
    </article>
  );
}
