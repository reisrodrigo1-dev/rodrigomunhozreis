import { describe, expect, it } from "vitest";
import { getPrerenderableSlugs, isLive, type Post } from "./posts";
import { seedPosts } from "./seed-posts";

/**
 * Regressão do 404 grudado (05/08/2026).
 *
 * O build pré-renderizava também os posts agendados. Como `getPostBySlug` devolve
 * null antes da hora, a página assada virava "não encontrado", e o ISR não desfaz
 * um notFound cacheado. Resultado: o post estreava em 404 e ficava assim até o
 * deploy seguinte. Estes testes garantem que nenhum post agendado volte a entrar
 * na lista de pré-renderização.
 */

const base: Omit<Post, "slug" | "publishedAt"> = {
  id: "x",
  title: "t",
  excerpt: "e",
  content: "c",
  status: "published",
};

function post(slug: string, publishedAt?: string, status: Post["status"] = "published"): Post {
  return { ...base, id: slug, slug, status, publishedAt };
}

const AGORA = Date.parse("2026-08-06T09:00:00-03:00");

describe("isLive", () => {
  it("libera post publicado com data no passado", () => {
    expect(isLive(post("a", "2026-08-06T08:00:00-03:00"), AGORA)).toBe(true);
  });

  it("segura post publicado com data no futuro", () => {
    expect(isLive(post("b", "2026-08-06T12:00:00-03:00"), AGORA)).toBe(false);
  });

  it("segura rascunho mesmo com data vencida", () => {
    expect(isLive(post("c", "2026-01-01T00:00:00-03:00", "draft"), AGORA)).toBe(false);
  });

  it("libera post sem data (compat com posts antigos)", () => {
    expect(isLive(post("d", undefined), AGORA)).toBe(true);
  });
});

describe("getPrerenderableSlugs", () => {
  /**
   * A invariante que não pode cair: TODO post publicado tem página assada no
   * build. Post que depende de geração sob demanda estreia em 500 na Vercel.
   * Se alguém voltar a filtrar por data aqui, estes testes quebram.
   */
  it("inclui o agendado, não só o que já está no ar", () => {
    const slugs = getPrerenderableSlugs([
      post("no-ar", "2026-08-06T08:00:00-03:00"),
      post("agendado-hoje", "2026-08-06T12:00:00-03:00"),
      post("agendado-semana-que-vem", "2026-08-13T08:00:00-03:00"),
    ]);
    expect(slugs).toEqual(["no-ar", "agendado-hoje", "agendado-semana-que-vem"]);
  });

  it("não deixa nenhum post publicado de fora", () => {
    const posts = [
      post("a", "2026-08-01T08:00:00-03:00"),
      post("b", "2026-08-20T08:00:00-03:00"),
      post("c", undefined),
    ];
    expect(getPrerenderableSlugs(posts)).toHaveLength(posts.length);
  });

  it("devolve lista vazia sem quebrar quando não há post", () => {
    expect(getPrerenderableSlugs([])).toEqual([]);
  });
});

describe("slugs do seed", () => {
  /**
   * Um post tinha "ç" no slug. A página era gerada, mas a URL que o navegador
   * manda não batia com o texto do arquivo, e o post respondia como inexistente.
   * Ia estourar na estreia dele. Slug é só a-z, 0-9 e hífen.
   */
  it("são todos ASCII em kebab-case", () => {
    const fora = seedPosts.filter((p) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug));
    expect(fora.map((p) => p.slug)).toEqual([]);
  });

  it("não têm slug repetido", () => {
    const vistos = new Set<string>();
    const repetidos: string[] = [];
    for (const p of seedPosts) {
      if (vistos.has(p.slug)) repetidos.push(p.slug);
      vistos.add(p.slug);
    }
    expect(repetidos).toEqual([]);
  });
});
