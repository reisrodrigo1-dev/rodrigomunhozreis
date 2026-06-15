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
  /** O que faz. */
  description: string;
  /** Quando utilizar. */
  whenToUse: string;
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
  { id: "bastiao", name: "Bastião", category: "Segurança", tagline: "Inteligência de segurança", description: "Identifica vulnerabilidades, recomenda padrões seguros por stack e prioriza riscos do crítico ao baixo.", whenToUse: "Ao revisar a segurança de um código, antes de subir para produção, ou em dúvidas sobre regras de banco, segredos, autenticação ou LGPD." },
  { id: "cofre", name: "Cofre", category: "Segurança", tagline: "Auditor de Firebase", description: "Audita as regras do Firestore e Storage em busca de coleções abertas, validação ausente e riscos de LGPD — e entrega o conserto.", whenToUse: "Ao revisar a segurança do Firebase ou antes de subir um app que usa Firebase.", starter: true },
  { id: "faro", name: "Faro", category: "Segurança", tagline: "Caçador de segredos", description: "Escaneia o repositório atrás de chaves de API e senhas vazadas, e diz como remediar.", whenToUse: "Antes de commitar ou subir código, ou ao desconfiar que algo sensível vazou." },
  { id: "quarentena", name: "Quarentena", category: "Segurança", tagline: "Auditor de dependências", description: "Audita as dependências (versões soltas, pacotes vulneráveis, supply-chain) e avalia um pacote novo antes de instalar.", whenToUse: "Ao revisar dependências, antes de instalar um pacote novo, ou ao endurecer a segurança." },
  { id: "crivo", name: "Crivo", category: "Segurança", tagline: "Revisor de código", description: "Revisa um código ou diff com rigor pelo Protocolo de 5 Camadas: Entender, Ler, Blindar, Testar, Versionar.", whenToUse: "Antes de aceitar um código gerado por IA ou antes de subir para produção." },
  { id: "resgate", name: "Resgate", category: "Segurança", tagline: "Resposta a incidente", description: "Plano pra conter, comunicar e restaurar quando vaza ou quebra — e estratégia de backup pra não perder dados.", whenToUse: "Durante um incidente (vazou segredo/dado, ataque, perda) ou ao planejar backup e recuperação." },
  { id: "sentinela", name: "Sentinela", category: "Segurança", tagline: "Observabilidade", description: "Monta logs, captura de erros e alertas pra saber quando algo quebra em produção.", whenToUse: "Ao colocar algo no ar ou ao investigar a saúde do sistema em produção." },
  { id: "escudo", name: "Escudo", category: "Segurança", tagline: "Hardening de login", description: "Blinda a autenticação: login seguro, MFA, sessões, recuperação de senha e rate limit.", whenToUse: "Ao implementar ou revisar login, cadastro ou controle de acesso." },

  // 💻 Desenvolvimento
  { id: "bussola", name: "Bússola", category: "Desenvolvimento", tagline: "Inteligência de stack", description: "Recomenda tecnologias e arquitetura por tipo de produto, com trade-offs e perfil de custo.", whenToUse: "Ao decidir com o que construir um projeto ou ao planejar a arquitetura." },
  { id: "planta", name: "Planta", category: "Desenvolvimento", tagline: "Planejador de MVP", description: "Transforma uma ideia em plano em fases e define a arquitetura antes de escrever código.", whenToUse: "Ao iniciar um projeto, ao ter uma ideia vaga, ou antes de pedir código/scaffold." },
  { id: "canteiro", name: "Canteiro", category: "Desenvolvimento", tagline: "Scaffold seguro", description: "Inicia um projeto novo já com a estrutura e os defaults de segurança certos (gitignore, env, regras fechadas, headers).", whenToUse: "Ao criar a base de um projeto novo na stack Next.js + Firebase." },
  { id: "lupa", name: "Lupa", category: "Desenvolvimento", tagline: "Caçador de bugs", description: "Depura um erro com método: reproduz, lê o F12, isola a causa, forma hipótese e aplica o menor conserto.", whenToUse: "Quando deu erro, algo não funciona ou pra investigar um bug com método (em vez de chutar)." },
  { id: "prova", name: "Prova", category: "Desenvolvimento", tagline: "Gerador de testes", description: "Escreve testes começando pelos casos de borda, antes de confiar que está pronto.", whenToUse: "Ao testar um código, cobrir um bug ou antes de subir uma feature crítica." },
  { id: "atelier", name: "Atelier", category: "Desenvolvimento", tagline: "UI de alta fidelidade", description: "Gera interfaces na identidade visual da marca, com acessibilidade e segurança de fábrica.", whenToUse: "Ao criar telas, páginas ou componentes de interface.", base: "frontend-design" },
  { id: "canone", name: "Cânone", category: "Desenvolvimento", tagline: "Inteligência de design", description: "O padrão de boa interface — estilos, paletas, tipografia e regras de UX — aplicado à marca.", whenToUse: "Ao decidir estilo visual, cores, tipografia, layout ou padrões de UX.", base: "ui-ux-pro-max" },
  { id: "garimpo", name: "Garimpo", category: "Desenvolvimento", tagline: "Pesquisa profunda", description: "Pesquisa multi-fonte na web com respostas e citações verificáveis — separa o ouro do ruído.", whenToUse: "Ao pesquisar um tema a fundo, validar uma afirmação ou comparar fontes antes de decidir.", base: "deep-research" },
  { id: "lixa", name: "Lixa", category: "Desenvolvimento", tagline: "Refatoração", description: "Melhora a estrutura do código sem mudar o comportamento, com rede de segurança.", whenToUse: "Ao limpar/organizar código ou reduzir dívida técnica, antes de evoluir um trecho bagunçado." },
  { id: "mudanca", name: "Mudança", category: "Desenvolvimento", tagline: "Migração", description: "Conduz migrações (versão de framework, troca de stack, dados/schema) sem quebrar.", whenToUse: "Ao atualizar uma versão grande, trocar de ferramenta/provedor ou migrar dados." },
  { id: "esquema", name: "Esquema", category: "Desenvolvimento", tagline: "Modelagem de banco", description: "Estrutura os dados (schema, relações) com foco em Firestore — modela pela query.", whenToUse: "Ao decidir como estruturar os dados, criar coleções, ou quando as queries estão difíceis/caras." },
  { id: "ponte", name: "Ponte", category: "Desenvolvimento", tagline: "Integrações", description: "Conecta APIs externas (pagamento, e-mail, WhatsApp, webhooks) com segurança.", whenToUse: "Ao integrar uma API externa, gateway de pagamento, serviço de e-mail/WhatsApp ou webhook." },
  { id: "turbo", name: "Turbo", category: "Desenvolvimento", tagline: "Performance", description: "Otimiza Core Web Vitals, bundle e queries lentas — meça antes de otimizar.", whenToUse: "Quando o site/app está lento, o Lighthouse está no vermelho, ou antes de escalar." },

  // ✍️ Método & Prompts
  { id: "forja", name: "Forja", category: "Método & Prompts", tagline: "Gerador de prompts", description: "Constrói prompts profissionais sob medida pelo método P.R.O.M.P.T.E.R., para qualquer IA.", whenToUse: "Ao escrever, melhorar ou estruturar um prompt para qualquer IA (Claude, ChatGPT, Gemini).", starter: true },
  { id: "alicerce", name: "Alicerce", category: "Método & Prompts", tagline: "Memória do projeto", description: "Gera as instruções iniciais que ensinam a IA a trabalhar com segurança e bom design desde o primeiro comando.", whenToUse: "Ao começar um projeto ou ao configurar como a IA deve se comportar nele." },
  { id: "lapidador", name: "Lapidador", category: "Método & Prompts", tagline: "Refino", description: "Melhora a resposta da IA por refino iterativo — diagnostica o que ficou ruim e pede o ajuste certo.", whenToUse: "Quando a resposta da IA está quase boa, genérica, longa, com tom errado ou faltando algo." },
  { id: "bagagem", name: "Bagagem", category: "Método & Prompts", tagline: "Contexto", description: "Monta o contexto certo pra dar à IA: o que incluir, o que cortar e como organizar.", whenToUse: "Quando a IA responde genérico por falta de contexto, ou ao trabalhar com documentos/dados longos." },
  { id: "maestro", name: "Maestro", category: "Método & Prompts", tagline: "Orquestração", description: "Quebra uma tarefa grande em passos e os coordena — encadear, paralelizar e verificar.", whenToUse: "Quando a tarefa é grande/complexa demais pra um pedido só, ou a IA se perde no meio." },

  // 📣 Marketing
  { id: "alavanca", name: "Alavanca", category: "Marketing", tagline: "Inteligência de funil", description: "Recomenda canal, estrutura de campanha, copy e métricas, com o método isca → e-mail → nutrição.", whenToUse: "Ao planejar divulgação, montar funil, escrever copy ou melhorar conversão." },
  { id: "claquete", name: "Claquete", category: "Marketing", tagline: "Roteiros e vídeo", description: "Estrutura roteiros de vídeo (Reels, YouTube) com os ganchos e a estrutura anti-hype da casa.", whenToUse: "Ao escrever roteiro de vídeo ou planejar conteúdo audiovisual.", base: "remotion" },
  { id: "ima", name: "Ímã", category: "Marketing", tagline: "Lead magnets", description: "Ajuda a escolher e criar iscas que convertem e a conectá-las ao funil.", whenToUse: "Ao planejar uma isca, material gratuito ou oferta de captura." },
  { id: "painel", name: "Painel", category: "Marketing", tagline: "Leitura de métricas", description: "Lê e interpreta métricas de GA4 e anúncios e recomenda a ação.", whenToUse: "Ao analisar resultados, decidir se continua/para/escala um anúncio, ou entender os números." },
  { id: "praca", name: "Praça", category: "Marketing", tagline: "Posts de rede social", description: "Escreve posts pra LinkedIn e Instagram na voz da casa, com gancho forte e sem hype.", whenToUse: "Ao escrever um post pra rede social ou divulgar conteúdo." },
  { id: "outdoor", name: "Outdoor", category: "Marketing", tagline: "Anúncios", description: "Estrutura anúncios pagos (Meta/Google): copy, público e orçamento de teste.", whenToUse: "Ao criar um anúncio, montar uma campanha de tráfego pago ou escrever copy de anúncio." },

  // 📚 Conteúdo
  { id: "tomo", name: "Tomo", category: "Conteúdo", tagline: "Criador de e-books", description: "Cria e-books e guias em HTML no padrão editorial da casa — prontos para ler, imprimir e entregar.", whenToUse: "Ao criar um e-book, guia prático ou material rico gratuito.", starter: true },
  { id: "vitrine", name: "Vitrine", category: "Conteúdo", tagline: "Landing de conversão", description: "Cria landing pages de oferta única (isca + captura), feitas para tráfego pago e orgânico.", whenToUse: "Ao criar uma landing page de captura ou página de oferta." },
  { id: "correio", name: "Correio", category: "Conteúdo", tagline: "E-mails de nutrição", description: "Escreve e-mails e newsletters na voz da casa, do boas-vindas à conversão.", whenToUse: "Ao escrever um e-mail, uma sequência de boas-vindas ou uma newsletter." },
  { id: "pena", name: "Pena", category: "Conteúdo", tagline: "Posts de blog & SEO", description: "Escreve posts de autoridade otimizados para SEO, ancorados no método e em notícias de IA.", whenToUse: "Ao escrever um artigo, post de blog ou conteúdo de autoridade." },
  { id: "palco", name: "Palco", category: "Conteúdo", tagline: "Palestras e slides", description: "Estrutura palestras e apresentações na voz e identidade da marca — do roteiro aos slides.", whenToUse: "Ao preparar uma palestra, apresentação ou aula.", base: "slides" },
  { id: "baralho", name: "Baralho", category: "Conteúdo", tagline: "Carrosséis", description: "Estrutura carrosséis (Instagram/LinkedIn): capa-gancho, slides de desenvolvimento e CTA.", whenToUse: "Ao criar um carrossel ou transformar um conteúdo em sequência de slides." },
  { id: "linha", name: "Linha", category: "Conteúdo", tagline: "Threads", description: "Escreve threads (X/LinkedIn): gancho no primeiro post, um ponto por post, fechamento.", whenToUse: "Ao escrever uma thread ou desdobrar um tema em sequência de posts." },
  { id: "legenda", name: "Legenda", category: "Conteúdo", tagline: "Legendas", description: "Escreve legendas/captions pra posts e vídeos — primeira linha que prende, corpo e CTA.", whenToUse: "Ao escrever a legenda de uma foto, reel ou carrossel." },
  { id: "curriculo", name: "Currículo", category: "Conteúdo", tagline: "Cursos e aulas", description: "Estrutura um curso, aula ou trilha — objetivo, módulos, progressão e prática.", whenToUse: "Ao planejar um curso, montar uma aula ou organizar uma trilha de ensino." },

  // 💼 Negócio
  { id: "decolagem", name: "Decolagem", category: "Negócio", tagline: "Inteligência de lançamento", description: "Ajuda a escolher modelo de negócio, monetização, preço e go-to-market, com as métricas que importam.", whenToUse: "Ao planejar como lançar, monetizar ou precificar um produto, ou conseguir os primeiros clientes." },
  { id: "salvaguarda", name: "Salvaguarda", category: "Negócio", tagline: "Conformidade LGPD", description: "Mapeia dados pessoais, aponta gaps e gera Política de Privacidade e fluxo de consentimento.", whenToUse: "Ao tratar conformidade LGPD, privacidade ou coleta de dados." },
  { id: "termometro", name: "Termômetro", category: "Negócio", tagline: "Estimador de custos", description: "Estima o custo de infra e IA por faixa de uso e sinaliza onde a conta explode antes de escalar.", whenToUse: "Ao planejar custos ou antes de escalar ('quanto isso vai custar com X usuários?')." },
  { id: "acordo", name: "Acordo", category: "Negócio", tagline: "Propostas", description: "Cria propostas comerciais e orçamentos — problema, solução, escopo, preço e próximos passos.", whenToUse: "Ao montar uma proposta, orçamento ou apresentação comercial para um cliente." },
  { id: "pacto", name: "Pacto", category: "Negócio", tagline: "Contratos (rascunho)", description: "Rascunha contratos simples como ponto de partida (não substitui advogado).", whenToUse: "Ao precisar de um rascunho de contrato ou entender as cláusulas essenciais." },
  { id: "espelho", name: "Espelho", category: "Negócio", tagline: "Cliente ideal (ICP)", description: "Define a persona e o cliente ideal — dor, contexto, objeções e onde encontrá-lo.", whenToUse: "Ao definir público-alvo, criar persona, ou afinar pra quem o produto/copy fala." },
  { id: "espiao", name: "Espião", category: "Negócio", tagline: "Concorrência", description: "Analisa concorrentes (oferta, preço, posicionamento, pontos fracos) pra achar seu diferencial.", whenToUse: "Ao estudar concorrentes, posicionar seu produto ou entender o mercado." },
  { id: "balcao", name: "Balcão", category: "Negócio", tagline: "Atendimento e vendas", description: "Cria scripts de atendimento, vendas e suporte — primeiro contato, objeções, follow-up.", whenToUse: "Ao responder um cliente ou criar script de venda, atendimento ou reclamação." },
];
