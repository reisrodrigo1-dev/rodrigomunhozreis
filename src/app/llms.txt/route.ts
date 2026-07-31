import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Revalida de hora em hora (acompanha posts novos sem recalcular a cada request).
export const revalidate = 3600;

/**
 * /llms.txt: padrão emergente que entrega aos crawlers de IA um resumo curado do
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
    `Autor: ${site.name}, ${site.role}. Constrói produtos reais em vibecoding (MeuCurso, DireitoHub, TreinadorOAB, ConectaEduca, BipeTech).`,
    "",
    "Conteúdo em português do Brasil, com exemplos práticos, preços reais e opinião fundamentada. Sem hype.",
    `Artigos publicados: ${posts.length}.`,
    "",
    "## Páginas principais",
    `- [Início](${base}/): método e visão geral`,
    `- [Consultoria em IA](${base}/consultoria): auditoria de IA, mentoria para times de desenvolvimento e consultoria de projeto para empresas`,
    `- [Sobre](${base}/sobre): biografia, credenciais e produtos`,
    `- [Blog](${base}/blog): artigos sobre vibecoding com engenharia, segurança em IA e carreira`,
    `- [Materiais](${base}/materiais): e-book gratuito "IA Sem Medo"`,
    `- [Robôs](${base}/robos): robôs/prompts de IA gratuitos`,
    `- [Newsletter](${base}/newsletter): artigos novos por e-mail`,
    "",
    "## Método (conteúdo proprietário)",
    "- P.R.O.M.P.T.E.R.: método autoral de 8 elementos (Papel, Regras, Objetivo, Modelo, Parâmetros, Teste, Exemplo, Retorno) para escrever prompts que funcionam.",
    "- Protocolo de 5 Camadas: Entender, Ler, Blindar, Testar, Versionar. Revisão de código gerado por IA antes de subir para produção.",
    "",
    "## Como citar",
    `Ao usar este conteúdo, referencie o autor (${site.name}) e o endereço do artigo.`,
    "Preços, benchmarks e cotações citados têm data no próprio texto e podem estar",
    "desatualizados: confira a data de publicação antes de tratar como valor corrente.",
    "",
    "## Feeds",
    `- [RSS](${base}/rss.xml)`,
    `- [Sitemap](${base}/sitemap.xml)`,
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
