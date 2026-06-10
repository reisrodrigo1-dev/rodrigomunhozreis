import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPostBySlug, getPublishedPosts, slugify, toIsoDate, type Post } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { PostCta } from "@/components/post-cta";
import { ViewTracker } from "@/components/view-tracker";
import { ReadingProgress } from "@/components/reading-progress";
import { RelatedPosts } from "@/components/related-posts";
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

  // Renderiza o markdown e, de quebra, monta o sumário (TOC) a partir dos H2.
  const rawHtml = await marked.parse(post.content || "");
  const toc: { id: string; text: string }[] = [];
  const withIds = rawHtml.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, (_m, inner) => {
    const text = String(inner).replace(/<[^>]+>/g, "").trim();
    const id = slugify(text);
    if (text) toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  const html = renderMarkdown(withIds);
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

  // Breadcrumbs estruturados (Início > Blog > Artigo) — guia de SEO do Google.
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `https://${site.domain}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `https://${site.domain}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  // Posts relacionados: mesma categoria primeiro, completa com os demais.
  let related: Post[] = [];
  try {
    const all = await getPublishedPosts();
    const tag = post.tags?.[0];
    const sameTag = all.filter((p) => p.slug !== post.slug && (!tag || (p.tags ?? []).includes(tag)));
    const others = all.filter((p) => p.slug !== post.slug && !sameTag.includes(p));
    related = [...sameTag, ...others].slice(0, 3);
  } catch {}

  return (
    <article className="py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ViewTracker slug={post.slug} />
      <ReadingProgress />
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
        {toc.length >= 3 && (
          <nav aria-label="Conteúdo do artigo" className="glass mt-10 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">
              Neste artigo
            </p>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-paper/60 transition-colors hover:text-amber-light">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="prose-dark mt-10" dangerouslySetInnerHTML={{ __html: html }} />
        <PostCta />
        <RelatedPosts posts={related} />
        <div className="mt-12 border-t border-white/10 pt-6">
          <Link href="/blog" className="text-sm font-semibold text-amber-light hover:underline">
            ← Voltar ao blog
          </Link>
        </div>
      </div>
    </article>
  );
}
