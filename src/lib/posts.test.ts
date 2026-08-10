import { describe, expect, it } from "vitest";
import { isLive, type Post } from "./posts";
import { seedPosts } from "./seed-posts";

/**
 * A regra de estreia é o coração do agendamento: as páginas do blog renderizam a
 * cada acesso e perguntam a `isLive` se o post já pode aparecer. Se ela errar, ou
 * o post estreia adiantado ou não estreia nunca.
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
