/**
 * Catálogo das Skills "Engenho" — as Claude Skills próprias do Rodrigo.
 * Exibidas na área do aluno e no admin. (Os arquivos das skills moram em
 * ~/.claude/skills e no repositório engenho-skills; aqui é só a vitrine.)
 */
export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  tagline: string;
  description: string;
  /** Para wrappers: a skill-base que ela estende. */
  base?: string;
};

export type SkillCategory =
  | "Segurança"
  | "Desenvolvimento"
  | "Método & Prompts"
  | "Marketing"
  | "Conteúdo"
  | "Negócio";

export const skillCategories: SkillCategory[] = [
  "Segurança",
  "Desenvolvimento",
  "Método & Prompts",
  "Marketing",
  "Conteúdo",
  "Negócio",
];

export const skills: Skill[] = [
  // 🔒 Segurança
  { id: "bastiao", name: "Bastião", category: "Segurança", tagline: "Inteligência de segurança", description: "Identifica vulnerabilidades, recomenda padrões seguros por stack e prioriza riscos do crítico ao baixo." },
  { id: "cofre", name: "Cofre", category: "Segurança", tagline: "Auditor de Firebase", description: "Audita as regras do Firestore e Storage em busca de coleções abertas, validação ausente e riscos de LGPD — e entrega o conserto." },
  { id: "faro", name: "Faro", category: "Segurança", tagline: "Caçador de segredos", description: "Escaneia o repositório atrás de chaves de API e senhas vazadas, e diz como remediar." },
  { id: "quarentena", name: "Quarentena", category: "Segurança", tagline: "Auditor de dependências", description: "Audita as dependências (versões soltas, pacotes vulneráveis, supply-chain) e avalia um pacote novo antes de instalar." },
  { id: "crivo", name: "Crivo", category: "Segurança", tagline: "Revisor de código", description: "Revisa um código ou diff com rigor pelo Protocolo de 5 Camadas: Entender, Ler, Blindar, Testar, Versionar." },

  // 💻 Desenvolvimento
  { id: "bussola", name: "Bússola", category: "Desenvolvimento", tagline: "Inteligência de stack", description: "Recomenda tecnologias e arquitetura por tipo de produto, com trade-offs e perfil de custo." },
  { id: "planta", name: "Planta", category: "Desenvolvimento", tagline: "Planejador de MVP", description: "Transforma uma ideia em plano em fases e define a arquitetura antes de escrever código." },
  { id: "canteiro", name: "Canteiro", category: "Desenvolvimento", tagline: "Scaffold seguro", description: "Inicia um projeto novo já com a estrutura e os defaults de segurança certos (gitignore, env, regras fechadas, headers)." },
  { id: "lupa", name: "Lupa", category: "Desenvolvimento", tagline: "Caçador de bugs", description: "Depura um erro com método: reproduz, lê o F12, isola a causa, forma hipótese e aplica o menor conserto." },
  { id: "prova", name: "Prova", category: "Desenvolvimento", tagline: "Gerador de testes", description: "Escreve testes começando pelos casos de borda, antes de confiar que está pronto." },
  { id: "atelier", name: "Atelier", category: "Desenvolvimento", tagline: "UI de alta fidelidade", description: "Gera interfaces na identidade visual da marca, com acessibilidade e segurança de fábrica.", base: "frontend-design" },
  { id: "canone", name: "Cânone", category: "Desenvolvimento", tagline: "Inteligência de design", description: "O padrão de boa interface — estilos, paletas, tipografia e regras de UX — aplicado à marca.", base: "ui-ux-pro-max" },
  { id: "garimpo", name: "Garimpo", category: "Desenvolvimento", tagline: "Pesquisa profunda", description: "Pesquisa multi-fonte na web com respostas e citações verificáveis — separa o ouro do ruído.", base: "deep-research" },

  // ✍️ Método & Prompts
  { id: "forja", name: "Forja", category: "Método & Prompts", tagline: "Gerador de prompts", description: "Constrói prompts profissionais sob medida pelo método P.R.O.M.P.T.E.R., para qualquer IA." },
  { id: "alicerce", name: "Alicerce", category: "Método & Prompts", tagline: "Memória do projeto", description: "Gera as instruções iniciais que ensinam a IA a trabalhar com segurança e bom design desde o primeiro comando." },

  // 📣 Marketing
  { id: "alavanca", name: "Alavanca", category: "Marketing", tagline: "Inteligência de funil", description: "Recomenda canal, estrutura de campanha, copy e métricas, com o método isca → e-mail → nutrição." },
  { id: "claquete", name: "Claquete", category: "Marketing", tagline: "Roteiros e vídeo", description: "Estrutura roteiros de vídeo (Reels, YouTube) com os ganchos e a estrutura anti-hype da casa.", base: "remotion" },

  // 📚 Conteúdo
  { id: "tomo", name: "Tomo", category: "Conteúdo", tagline: "Criador de e-books", description: "Cria e-books e guias em HTML no padrão editorial da casa — prontos para ler, imprimir e entregar." },
  { id: "vitrine", name: "Vitrine", category: "Conteúdo", tagline: "Landing de conversão", description: "Cria landing pages de oferta única (isca + captura), feitas para tráfego pago e orgânico." },
  { id: "correio", name: "Correio", category: "Conteúdo", tagline: "E-mails de nutrição", description: "Escreve e-mails e newsletters na voz da casa, do boas-vindas à conversão." },
  { id: "pena", name: "Pena", category: "Conteúdo", tagline: "Posts de blog & SEO", description: "Escreve posts de autoridade otimizados para SEO, ancorados no método e em notícias de IA." },
  { id: "palco", name: "Palco", category: "Conteúdo", tagline: "Palestras e slides", description: "Estrutura palestras e apresentações na voz e identidade da marca — do roteiro aos slides.", base: "slides" },

  // 💼 Negócio
  { id: "decolagem", name: "Decolagem", category: "Negócio", tagline: "Inteligência de lançamento", description: "Ajuda a escolher modelo de negócio, monetização, preço e go-to-market, com as métricas que importam." },
  { id: "salvaguarda", name: "Salvaguarda", category: "Negócio", tagline: "Conformidade LGPD", description: "Mapeia dados pessoais, aponta gaps e gera Política de Privacidade e fluxo de consentimento." },
  { id: "termometro", name: "Termômetro", category: "Negócio", tagline: "Estimador de custos", description: "Estima o custo de infra e IA por faixa de uso e sinaliza onde a conta explode antes de escalar." },
];
