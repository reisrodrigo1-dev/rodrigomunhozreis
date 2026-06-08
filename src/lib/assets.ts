export type Asset = {
  id: string;
  title: string;
  kind: "palestra" | "ebook" | "cartao";
  description: string;
  /** Arquivo servido a partir de /public/biblioteca/ */
  url: string;
};

/**
 * Biblioteca de materiais construídos (palestras, e-books, cartões).
 * Servidos em /public/biblioteca/ e acessíveis pelo admin em /admin/biblioteca.
 */
export const assets: Asset[] = [
  {
    id: "palestra-ia-sem-medo",
    title: "IA Sem Medo — Deck da Palestra",
    kind: "palestra",
    description: "Apresentação para leigos (30 slides). Navegável por teclado, exporta PDF.",
    url: "/biblioteca/palestra-ia-sem-medo.html",
  },
  {
    id: "ebook-ia-sem-medo",
    title: "IA Sem Medo — Guia Prático (E-book)",
    kind: "ebook",
    description: "Método P.E.D.E.R., plano de 7 dias e +130 prompts. Pronto para imprimir/PDF.",
    url: "/biblioteca/ebook-ia-sem-medo.html",
  },
  {
    id: "cartao-peder",
    title: "Cartão P.E.D.E.R.",
    kind: "cartao",
    description: "A receita do bom pedido de IA em uma página (imã de geladeira / lead magnet).",
    url: "/biblioteca/cartao-peder.html",
  },
  {
    id: "ebook-vibecoding-ceos",
    title: "Vibecoding para CEOs — Guia de Boas Práticas",
    kind: "ebook",
    description:
      "Guia para donos de empresa: ferramentas, Firebase, GitHub, Vercel, segurança e +15 prompts completos.",
    url: "/biblioteca/ebook-vibecoding-ceos.html",
  },
];
