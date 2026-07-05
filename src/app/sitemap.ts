import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { toIsoDate } from "@/lib/posts";

// Revalida de hora em hora (em vez de recalcular a cada request).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `https://${site.domain}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/robos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/materiais`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ia-sem-medo`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/newsletter`, changeFrequency: "monthly", priority: 0.6 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const { getPublishedPosts } = await import("@/lib/posts");
    const posts = await getPublishedPosts();
    postRoutes = posts.map((p) => {
      const iso = toIsoDate(p.updatedAt ?? p.publishedAt ?? p.createdAt);
      return {
        url: `${base}/blog/${p.slug}`,
        ...(iso ? { lastModified: new Date(iso) } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });
  } catch {
    postRoutes = [];
  }

  return [...staticRoutes, ...postRoutes];
}
