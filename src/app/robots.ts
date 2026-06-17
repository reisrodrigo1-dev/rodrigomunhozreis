import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Crawlers de IA explicitamente liberados (alguns só indexam/citam se forem
// nomeados; deixar explícito sinaliza "pode ler"). Continuam barrados de /admin.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
      { userAgent: aiBots, allow: "/", disallow: "/admin" },
    ],
    sitemap: `https://${site.domain}/sitemap.xml`,
    host: `https://${site.domain}`,
  };
}
