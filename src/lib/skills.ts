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
  /** Marca as skills mais recomendadas para quem está começando. */
  starter?: boolean;
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
  { id: "cofre", name: "Cofre", category: "Segurança", tagline: "Auditor de Firebase", description: "Audita as regras do Firestore e Storage em busca de coleções abertas, validação ausente e riscos de LGPD — e entrega o conserto.", starter: true },
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
  { id: "forja", name: "Forja", category: "Método & Prompts", tagline: "Gerador de prompts", description: "Constrói prompts profissionais sob medida pelo método P.R.O.M.P.T.E.R., para qualquer IA.", starter: true },
  { id: "alicerce", name: "Alicerce", category: "Método & Prompts", tagline: "Memória do projeto", description: "Gera as instruções iniciais que ensinam a IA a trabalhar com segurança e bom design desde o primeiro comando." },

  // 📣 Marketing
  { id: "alavanca", name: "Alavanca", category: "Marketing", tagline: "Inteligência de funil", description: "Recomenda canal, estrutura de campanha, copy e métricas, com o método isca → e-mail → nutrição." },
  { id: "claquete", name: "Claquete", category: "Marketing", tagline: "Roteiros e vídeo", description: "Estrutura roteiros de vídeo (Reels, YouTube) com os ganchos e a estrutura anti-hype da casa.", base: "remotion" },

  // 📚 Conteúdo
  { id: "tomo", name: "Tomo", category: "Conteúdo", tagline: "Criador de e-books", description: "Cria e-books e guias em HTML no padrão editorial da casa — prontos para ler, imprimir e entregar.", starter: true },
  { id: "vitrine", name: "Vitrine", category: "Conteúdo", tagline: "Landing de conversão", description: "Cria landing pages de oferta única (isca + captura), feitas para tráfego pago e orgânico." },
  { id: "correio", name: "Correio", category: "Conteúdo", tagline: "E-mails de nutrição", description: "Escreve e-mails e newsletters na voz da casa, do boas-vindas à conversão." },
  { id: "pena", name: "Pena", category: "Conteúdo", tagline: "Posts de blog & SEO", description: "Escreve posts de autoridade otimizados para SEO, ancorados no método e em notícias de IA." },
  { id: "palco", name: "Palco", category: "Conteúdo", tagline: "Palestras e slides", description: "Estrutura palestras e apresentações na voz e identidade da marca — do roteiro aos slides.", base: "slides" },

  // 💼 Negócio
  { id: "decolagem", name: "Decolagem", category: "Negócio", tagline: "Inteligência de lançamento", description: "Ajuda a escolher modelo de negócio, monetização, preço e go-to-market, com as métricas que importam." },
  { id: "salvaguarda", name: "Salvaguarda", category: "Negócio", tagline: "Conformidade LGPD", description: "Mapeia dados pessoais, aponta gaps e gera Política de Privacidade e fluxo de consentimento." },
  { id: "termometro", name: "Termômetro", category: "Negócio", tagline: "Estimador de custos", description: "Estima o custo de infra e IA por faixa de uso e sinaliza onde a conta explode antes de escalar." },

  // 🔹 Onda 2 — núcleo
  { id: "sentinela", name: "Sentinela", category: "Segurança", tagline: "Observabilidade", description: "Monta logs, captura de erros e alertas pra saber quando algo quebra em produção." },
  { id: "escudo", name: "Escudo", category: "Segurança", tagline: "Hardening de login", description: "Blinda a autenticação: login seguro, MFA, sessões, recuperação de senha e rate limit." },
  { id: "ponte", name: "Ponte", category: "Desenvolvimento", tagline: "Integrações", description: "Conecta APIs externas (pagamento, e-mail, WhatsApp, webhooks) com segurança." },
  { id: "turbo", name: "Turbo", category: "Desenvolvimento", tagline: "Performance", description: "Otimiza Core Web Vitals, bundle e queries lentas — meça antes de otimizar." },
  { id: "lapidador", name: "Lapidador", category: "Método & Prompts", tagline: "Refino", description: "Melhora a resposta da IA por refino iterativo — diagnostica o que ficou ruim e pede o ajuste certo." },
  { id: "ima", name: "Ímã", category: "Marketing", tagline: "Lead magnets", description: "Ajuda a escolher e criar iscas que convertem e a conectá-las ao funil." },
  { id: "painel", name: "Painel", category: "Marketing", tagline: "Leitura de métricas", description: "Lê e interpreta métricas de GA4 e anúncios e recomenda a ação." },
  { id: "sintese", name: "Síntese", category: "Conteúdo", tagline: "Resumo", description: "Resume conteúdo longo (transcrição, reunião, artigo) preservando o essencial, sem inventar." },

  // 🔹 Onda 3-6 — rumo aos 50
  { id: "resgate", name: "Resgate", category: "Segurança", tagline: "Resposta a incidente", description: "Plano pra conter, comunicar e restaurar quando vaza ou quebra — e estratégia de backup pra não perder dados." },
  { id: "lixa", name: "Lixa", category: "Desenvolvimento", tagline: "Refatoração", description: "Melhora a estrutura do código sem mudar o comportamento, com rede de segurança." },
  { id: "mudanca", name: "Mudança", category: "Desenvolvimento", tagline: "Migração", description: "Conduz migrações (versão de framework, troca de stack, dados/schema) sem quebrar." },
  { id: "esquema", name: "Esquema", category: "Desenvolvimento", tagline: "Modelagem de banco", description: "Estrutura os dados (schema, relações) com foco em Firestore — modela pela query." },
  { id: "bagagem", name: "Bagagem", category: "Método & Prompts", tagline: "Contexto", description: "Monta o contexto certo pra dar à IA: o que incluir, o que cortar e como organizar." },
  { id: "maestro", name: "Maestro", category: "Método & Prompts", tagline: "Orquestração", description: "Quebra uma tarefa grande em passos e os coordena — encadear, paralelizar e verificar." },
  { id: "praca", name: "Praça", category: "Marketing", tagline: "Posts de rede social", description: "Escreve posts pra LinkedIn e Instagram na voz da casa, com gancho forte e sem hype." },
  { id: "outdoor", name: "Outdoor", category: "Marketing", tagline: "Anúncios", description: "Estrutura anúncios pagos (Meta/Google): copy, público e orçamento de teste." },
  { id: "baralho", name: "Baralho", category: "Conteúdo", tagline: "Carrosséis", description: "Estrutura carrosséis (Instagram/LinkedIn): capa-gancho, slides de desenvolvimento e CTA." },
  { id: "linha", name: "Linha", category: "Conteúdo", tagline: "Threads", description: "Escreve threads (X/LinkedIn): gancho no primeiro post, um ponto por post, fechamento." },
  { id: "legenda", name: "Legenda", category: "Conteúdo", tagline: "Legendas", description: "Escreve legendas/captions pra posts e vídeos — primeira linha que prende, corpo e CTA." },
  { id: "curriculo", name: "Currículo", category: "Conteúdo", tagline: "Cursos e aulas", description: "Estrutura um curso, aula ou trilha — objetivo, módulos, progressão e prática." },
  { id: "acordo", name: "Acordo", category: "Negócio", tagline: "Propostas", description: "Cria propostas comerciais e orçamentos — problema, solução, escopo, preço e próximos passos." },
  { id: "pacto", name: "Pacto", category: "Negócio", tagline: "Contratos (rascunho)", description: "Rascunha contratos simples como ponto de partida (não substitui advogado)." },
  { id: "espelho", name: "Espelho", category: "Negócio", tagline: "Cliente ideal (ICP)", description: "Define a persona e o cliente ideal — dor, contexto, objeções e onde encontrá-lo." },
  { id: "espiao", name: "Espião", category: "Negócio", tagline: "Concorrência", description: "Analisa concorrentes (oferta, preço, posicionamento, pontos fracos) pra achar seu diferencial." },
  { id: "balcao", name: "Balcão", category: "Negócio", tagline: "Atendimento e vendas", description: "Cria scripts de atendimento, vendas e suporte — primeiro contato, objeções, follow-up." },
];
