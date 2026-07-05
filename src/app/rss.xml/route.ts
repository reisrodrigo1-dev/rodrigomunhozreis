import { site } from "@/lib/site";
import { getPublishedPosts, toIsoDate } from "@/lib/posts";

// ISR: revalida de hora em hora (RSS não precisa ser real-time).
export const revalidate = 3600;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = `https://${site.domain}`;
  const posts = await getPublishedPosts().catch(() => []);

  const items = posts
    .slice(0, 30)
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      const iso = toIsoDate(p.publishedAt ?? p.createdAt);
      const pubDate = iso ? new Date(iso).toUTCString() : new Date().toUTCString();
      const category = p.tags?.[0] ? `<category>${esc(p.tags[0])}</category>` : "";
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${esc(p.excerpt || "")}</description>
      <author>noreply@${site.domain} (${esc(site.name)})</author>
      ${category}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}: ${esc(site.tagline)}</title>
    <link>${base}/blog</link>
    <description>${esc(site.description)}</description>
    <language>pt-BR</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
