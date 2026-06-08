import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `https://${site.domain}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/materiais`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const { getPublishedPosts } = await import("@/lib/posts");
    const posts = await getPublishedPosts();
    postRoutes = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    postRoutes = [];
  }

  return [...staticRoutes, ...postRoutes];
}
