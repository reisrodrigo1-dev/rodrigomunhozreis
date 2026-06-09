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
    id: "ebook-construa-do-zero",
    title: "Construa do Zero — passo a passo interativo",
    kind: "ebook",
    description: "Guia do zero ao sistema pronto: cada ferramenta e prompt, com checkboxes de progresso e ramo Git/Local.",
    url: "/biblioteca/ebook-construa-do-zero.html",
  },
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
    description: "Método P.R.O.M.P.T.E.R., plano de 7 dias e +130 prompts. Pronto para imprimir/PDF.",
    url: "/biblioteca/ebook-ia-sem-medo.html",
  },
  {
    id: "cartao-peder",
    title: "Cartão P.R.O.M.P.T.E.R.",
    kind: "cartao",
    description: "O método P.R.O.M.P.T.E.R. em uma página (imã de geladeira / lead magnet).",
    url: "/biblioteca/cartao-peder.html",
  },
  {
    id: "ebook-vibecoding-ceos",
    title: "Vibecoding para CEOs — Guia de Boas Práticas",
    kind: "ebook",
    description:
      "Guia para donos de empresa: ferramentas, Firebase, GitHub, Vercel, segurança e +22 prompts completos.",
    url: "/biblioteca/ebook-vibecoding-ceos.html",
  },
];
