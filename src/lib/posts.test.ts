import { describe, expect, it } from "vitest";
import { getPrerenderableSlugs, isLive, type Post } from "./posts";

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
  it("nunca inclui post agendado (o bug do 404 grudado)", () => {
    const slugs = getPrerenderableSlugs(
      [
        post("no-ar", "2026-08-06T08:00:00-03:00"),
        post("agendado-hoje", "2026-08-06T12:00:00-03:00"),
        post("agendado-semana-que-vem", "2026-08-13T08:00:00-03:00"),
      ],
      AGORA,
    );
    expect(slugs).toEqual(["no-ar"]);
  });

  it("não inclui rascunho", () => {
    const slugs = getPrerenderableSlugs([post("rascunho", "2026-01-01T00:00:00-03:00", "draft")], AGORA);
    expect(slugs).toEqual([]);
  });

  it("devolve lista vazia sem quebrar quando não há post", () => {
    expect(getPrerenderableSlugs([], AGORA)).toEqual([]);
  });
});
