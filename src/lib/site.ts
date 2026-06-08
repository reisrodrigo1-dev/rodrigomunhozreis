export const site = {
  name: "Rodrigo Munhoz Reis",
  shortName: "Rodrigo Munhoz Reis",
  role: "Diretor de Tecnologia (CTO)",
  domain: "rodrigomunhozreis.com",
  tagline: "Vibecoding com Engenharia",
  description:
    "Aprenda a construir e usar IA do jeito certo: rápido, mas com rigor de engenheiro. Vibecoding com engenharia — sem cair no vibecoding às cegas.",
  heroSubtitle:
    "Sou Diretor de TI e sócio de produtos reais, 100% construídos em vibecoding. Ensino a usar IA com a velocidade da máquina e a segurança de quem entende de engenharia.",
  keywords: [
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
    email: "mailto:contato@rodrigomunhozreis.com",
    whatsapp: "5511974696172",
    whatsappUrl:
      "https://wa.me/5511974696172?text=" +
      encodeURIComponent(
        "Olá Rodrigo! Vim pelo seu site e quero falar sobre IA e vibecoding."
      ),
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
    { label: "Método", href: "/#metodo" },
    { label: "Robôs", href: "/robos" },
    { label: "Materiais", href: "/#materiais" },
    { label: "Blog", href: "/blog" },
    { label: "Trabalhe comigo", href: "/#trabalhe" },
  ],
};

export type Site = typeof site;
