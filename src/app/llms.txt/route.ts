import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Revalida de hora em hora (acompanha posts novos sem recalcular a cada request).
export const revalidate = 3600;

/**
 * /llms.txt — padrão emergente que entrega aos crawlers de IA um resumo curado do
 * site e os melhores conteúdos, em texto limpo. Barato e de baixo risco.
 */
export async function GET() {
  const base = `https://${site.domain}`;

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}. ${site.description}`,
    "",
    `Autor: ${site.name} — ${site.role}. Sócio de produtos reais construídos em vibecoding (MeuCurso, DireitoHub, TreinadorOAB, ConectaEduca, BipeTech).`,
    "",
    "## Páginas principais",
    `- [Início](${base}/): método e visão geral`,
    `- [Sobre](${base}/sobre): biografia, credenciais e produtos`,
    `- [Blog](${base}/blog): artigos sobre vibecoding com engenharia, segurança em IA e carreira`,
    `- [Materiais](${base}/materiais): e-book gratuito "IA Sem Medo"`,
    `- [Robôs](${base}/robos): robôs/prompts de IA gratuitos`,
    "",
    "## Método (conteúdo proprietário)",
    "- P.R.O.M.P.T.E.R.: método autoral para escrever prompts que funcionam.",
    "- Protocolo de 5 Camadas: Entender, Ler, Blindar, Testar, Versionar — revisão de código gerado por IA antes de subir para produção.",
    "",
    "## Artigos do blog",
    ...posts.map((p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.excerpt}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
