export type Material = {
  id: string;
  title: string;
  slug: string;
  type: "ebook" | "cartao" | "guia";
  description: string;
  /** Servido a partir de /public/biblioteca/ (ou troque por uma URL do Firebase Storage). */
  fileUrl: string;
};

/**
 * Catálogo de materiais (estático por enquanto).
 * Quando o admin de materiais estiver pronto, isso passa a vir do Firestore.
 */
export const materials: Material[] = [
  {
    id: "ebook-ia-sem-medo",
    title: "IA Sem Medo — Guia Prático",
    slug: "ia-sem-medo",
    type: "ebook",
    description:
      "Método P.E.D.E.R., plano de 7 dias e mais de 130 prompts prontos para o trabalho e a vida.",
    fileUrl: "/biblioteca/ebook-ia-sem-medo.html",
  },
  {
    id: "cartao-peder",
    title: "Cartão P.E.D.E.R.",
    slug: "cartao-peder",
    type: "cartao",
    description: "A receita do bom pedido de IA em uma página — para imprimir e deixar à mão.",
    fileUrl: "/biblioteca/cartao-peder.html",
  },
  {
    id: "ebook-vibecoding-ceos",
    title: "Vibecoding para CEOs — Guia de Boas Práticas",
    slug: "vibecoding-para-ceos",
    type: "ebook",
    description:
      "Para donos de empresa: ferramentas, Firebase, GitHub, Vercel, segurança, custos, glossário, roadmap de 30 dias e +22 prompts completos. Do plano ao deploy.",
    fileUrl: "/biblioteca/ebook-vibecoding-ceos.html",
  },
];
