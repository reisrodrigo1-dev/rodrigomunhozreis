export const site = {
  name: "Rodrigo Munhoz Reis",
  shortName: "Rodrigo Munhoz Reis",
  role: "Diretor de Tecnologia (CTO)",
  domain: "rodrigomunhozreis.com",
  tagline: "Vibecoding com Engenharia",
  description:
    "Rodo 3 empresas reais 100% em vibecoding — e ensino a construir com IA do jeito certo: rápido, mas com rigor de engenheiro. Sem cair em vibecoding às cegas.",
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
    { name: "MeuCurso", desc: "E-commerce jurídico (OAB e concursos)." },
    { name: "ConectaEduca", desc: "Marketplace educacional." },
    { name: "TreinadorJur", desc: "Treino e correção de provas com IA." },
  ],
  nav: [
    { label: "Método", href: "#metodo" },
    { label: "Prova", href: "#prova" },
    { label: "Materiais", href: "#materiais" },
    { label: "Trabalhe comigo", href: "#trabalhe" },
  ],
};

export type Site = typeof site;
