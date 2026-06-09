import seedData from "./seed-robots.json";

export type Robot = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: "Criar sistemas com IA" | "Para o negócio";
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
export const seedRobots: Robot[] = seedData as Robot[];
