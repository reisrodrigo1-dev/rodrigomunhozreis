import seedData from "./seed-robots.json";
import { GIFT_PROMPT } from "./gift-prompt";

export type Robot = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category:
    | "Criar sistemas com IA"
    | "Para o negócio"
    | "Marketing & Vendas"
    | "Produtividade & Carreira";
  /** Prompt completo e detalhado que o visitante copia e cola na própria IA. */
  prompt: string;
  /** Quando usar este robô — linha curta exibida no card. */
  whenToUse?: string;
  /** Exemplo de primeira mensagem (opcional). */
  exampleInput?: string;
  /** Versão do prompt. O importador atualiza quando o seed tem versão maior. */
  promptVersion?: number;
};

/**
 * Robôs iniciais (seed) — reescritos no padrão P.R.O.M.P.T.E.R.
 * Mantidos em JSON (src/lib/seed-robots.json) para preservar fielmente os
 * prompts longos (com aspas, quebras de linha e {chaves}) sem risco de escape.
 */
// Robô-presente "Criador de Prompts" — usa o mesmo texto do presente da home
// (fonte única em gift-prompt.ts). Entra como destaque, no topo da lista.
const giftRobot: Robot = {
  id: "criador-de-prompts",
  name: "Criador de Prompts",
  tagline: "Diga o que quer; ele monta o prompt profissional",
  description:
    "Você descreve o que precisa e ele constrói um prompt completo no método P.R.O.M.P.T.E.R., pronto para colar no ChatGPT, Claude ou Gemini.",
  category: "Criar sistemas com IA",
  prompt: GIFT_PROMPT,
  whenToUse: "Quando você não sabe como escrever um bom prompt — ele escreve por você.",
  promptVersion: 2,
};

export const seedRobots: Robot[] = [giftRobot, ...(seedData as Robot[])];

