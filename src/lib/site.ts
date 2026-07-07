export const site = {
  name: "Rodrigo Munhoz Reis",
  shortName: "Rodrigo Munhoz Reis",
  role: "Consultor de IA e Diretor de Tecnologia (CTO)",
  domain: "rodrigomunhozreis.com.br",
  tagline: "Vibecoding com Engenharia",
  description:
    "Consultor de Inteligência Artificial para empresas que querem escalar com método. Vibecoding com engenharia: a velocidade da IA com o rigor de engenheiro. Sem hype, sem cair no vibecoding às cegas.",
  heroSubtitle:
    "Sou Diretor de TI e sócio de produtos reais, 100% construídos em vibecoding. Ensino a usar IA com a velocidade da máquina e a segurança de quem entende de engenharia.",
  keywords: [
    "consultor de IA",
    "consultor de inteligência artificial",
    "consultoria em IA para empresas",
    "auditoria de IA",
    "mentoria em IA",
    "vibecoding",
    "vibecoding com engenharia",
    "vibecoding seguro",
    "como usar IA no trabalho",
    "inteligência artificial",
    "segurança em IA",
    "IA para empresas",
    "Rodrigo Munhoz Reis",
  ],
  enemy: "vibecoding às cegas",
  links: {
    linkedin: "https://www.linkedin.com/in/rodrigoreisoda/",
    instagram: "https://instagram.com/rodrigomunhozreis",
    email: "mailto:contato@rodrigomunhozreis.com.br",
    // WHATSAPP OCULTO temporariamente (anúncio pago rodando: não quero o número
    // pessoal circulando). Para REATIVAR: restaure as 2 linhas comentadas abaixo,
    // apague as 2 vazias e descomente os usos marcados "WHATSAPP OCULTO".
    // whatsapp: "5511974696172",
    // whatsappUrl:
    //   "https://wa.me/5511974696172?text=" +
    //   encodeURIComponent(
    //     "Olá Rodrigo! Vim pelo seu site e quero falar sobre IA e vibecoding."
    //   ),
    whatsapp: "",
    whatsappUrl: "",
  },
  companies: [
    { name: "MeuCurso", desc: "Diretor de TI · e-commerce jurídico (OAB e concursos)." },
    { name: "BipeTech", desc: "Sócio · edtech por trás do TreinadorOAB e do ConectaEduca." },
    { name: "DireitoHub", desc: "Sócio · legal-tech." },
  ],
  projects: [
    {
      name: "MeuCurso",
      role: "Presidente do Comitê de Inovação",
      desc: "Plataforma de cursos preparatórios para OAB, concursos e pós-graduação jurídica.",
      url: "https://meucurso.com.br",
    },
    {
      name: "DireitoHub",
      role: "Sócio",
      desc: "IA jurídica para advogados brasileiros.",
      url: "https://direitohub.com.br",
    },
    {
      name: "TreinadorOAB",
      role: "Sócio",
      desc: "Preparação para o Exame da OAB com correção por IA.",
      url: "https://treinadoroab.com.br",
    },
    {
      name: "ConectaEduca",
      role: "Sócio",
      desc: "Marketplace educacional.",
      url: "https://conectaeduca.com.br",
    },
    {
      name: "BipeTech",
      role: "Sócio",
      desc: "Estúdio de inovação em tecnologia e Inteligência Artificial.",
      url: "https://bipetech.com.br",
    },
  ],
  nav: [
    { label: "Consultoria", href: "/consultoria" },
    { label: "Método", href: "/#metodo" },
    { label: "Robôs", href: "/robos" },
    { label: "Materiais", href: "/#materiais" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre", href: "/sobre" },
  ],
  // Acesso à área logada: separado do menu principal.
  clienteArea: { label: "Área do Cliente", href: "/cliente" },
};

export type Site = typeof site;
