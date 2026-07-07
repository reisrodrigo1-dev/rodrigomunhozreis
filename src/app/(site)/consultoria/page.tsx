import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consultor de Inteligência Artificial para empresas",
  description:
    "Consultoria em IA para empresas que querem escalar com método. Auditoria, mentoria pra time de dev e desenho de solução ponta a ponta. Vibecoding com engenharia, sem hype.",
  alternates: { canonical: "/consultoria" },
  keywords: [
    "consultor de IA",
    "consultor de inteligência artificial",
    "consultoria em IA para empresas",
    "auditoria de IA",
    "mentoria em IA",
    "consultor vibecoding",
    "Rodrigo Munhoz Reis",
  ],
  openGraph: {
    title: "Consultor de Inteligência Artificial | Rodrigo Munhoz Reis",
    description:
      "Consultoria em IA para empresas que querem escalar com método. Auditoria, mentoria e desenho de solução.",
    url: `https://${site.domain}/consultoria`,
    type: "website",
  },
};

const servicos = [
  {
    kicker: "Serviço 01",
    titulo: "Auditoria de IA",
    subtitulo: "Descubra o que já dá dor e o que vai dar",
    descricao:
      "Análise técnica e de método do que sua empresa já usa de IA. Aponta os riscos escondidos (chave vazada, dado sensível em prompt, agente com permissão demais, dívida técnica de vibecoding), o que dá pra economizar e onde a IA pode virar receita nova. Entrega: relatório executivo com prioridades e plano de 90 dias.",
    quando: "Empresa que já usa IA e quer saber onde tá o risco antes que exploda.",
    prazo: "2 semanas",
  },
  {
    kicker: "Serviço 02",
    titulo: "Mentoria pra time de dev",
    subtitulo: "Vibecoding com engenharia direto no seu time",
    descricao:
      "Encontros semanais com o time de tecnologia. Revisão de código gerado por IA, direção arquitetural, aplicação do Protocolo de 5 Camadas e do método P.R.O.M.P.T.E.R. na prática. Time entrega mais rápido, com menos bug e sem cair no vibecoding às cegas.",
    quando: "Time que já usa Cursor, Claude Code ou Copilot mas ainda quebra em produção.",
    prazo: "Recorrente (mínimo 3 meses)",
  },
  {
    kicker: "Serviço 03",
    titulo: "Consultoria de projeto",
    subtitulo: "Desenho e implantação ponta a ponta",
    descricao:
      "Desenho de solução específica: assistente de IA interno, agente de atendimento, automação de processo com IA, migração de dado ou refatoração de sistema herdado. Vai do plano ao produto no ar, com sua equipe (não terceirizo o código).",
    quando: "Empresa com projeto claro que precisa de arquiteto sênior no jogo.",
    prazo: "Sob medida (4-16 semanas típico)",
  },
];

const casos = [
  {
    empresa: "MeuCurso",
    papel: "Diretor de TI · Presidente do Comitê de Inovação",
    resultado:
      "E-commerce jurídico (OAB e concursos) refatorado com IA como copiloto. Time acelerou entrega mantendo rigor.",
  },
  {
    empresa: "BipeTech",
    papel: "Sócio",
    resultado:
      "Estúdio de inovação que criou TreinadorOAB e ConectaEduca. Produto ao ar em fração do tempo tradicional, com vibecoding com engenharia como método.",
  },
  {
    empresa: "DireitoHub",
    papel: "Sócio",
    resultado:
      "Legal-tech de IA jurídica pra advogados brasileiros. Do plano ao produto pagante.",
  },
];

const faq = [
  {
    q: "Qual é o preço da consultoria?",
    a: "O preço depende do escopo (auditoria, mentoria ou projeto) e do tamanho da empresa. Chama no LinkedIn com o contexto e a gente conversa antes de qualquer proposta. Cotação é sob medida, nunca pacote fechado.",
  },
  {
    q: "Você atende empresa pequena ou só grande?",
    a: "Atendo os dois. Startup enxuta contrata a Consultoria de Projeto pra desenhar solução específica. Média e grande contrata Auditoria pra mapear risco e Mentoria pro time. Não trabalho com micro-empresa sem CNPJ.",
  },
  {
    q: "Vai substituir meu time de dev?",
    a: "Não. Trabalho COM seu time, não NO LUGAR dele. Sua equipe implementa. Eu direciono, revisojunto, ensino método. Consultoria vira treinamento com resultado.",
  },
  {
    q: "Faz consultoria só remota ou vai presencial?",
    a: "Remoto por default. Presencial em São Paulo pontualmente (kickoff, review trimestral) quando o cliente pede e o projeto justifica. Fora de SP, tudo remoto.",
  },
  {
    q: "Quanto tempo até ver resultado?",
    a: "Auditoria: 2 semanas pra ter relatório executivo com prioridades. Mentoria: primeira melhoria de processo em 2 semanas. Projeto: primeira entrega em 4 semanas. Resultado composto: 3 meses.",
  },
  {
    q: "Assina NDA?",
    a: "Sim, sempre. Antes de qualquer conversa técnica sobre a empresa, NDA mútuo assinado.",
  },
];

const linkedinUrl = site.links.linkedin;

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name}: Consultoria em IA`,
  description:
    "Consultoria em Inteligência Artificial para empresas: auditoria, mentoria de time de desenvolvimento e desenho de solução ponta a ponta.",
  provider: {
    "@type": "Person",
    "@id": `https://${site.domain}/#person`,
    name: site.name,
    jobTitle: "Consultor de Inteligência Artificial",
    sameAs: [site.links.linkedin, site.links.instagram],
  },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: [
    "Consultoria em Inteligência Artificial",
    "Auditoria de IA",
    "Mentoria em desenvolvimento com IA",
    "Vibecoding com Engenharia",
  ],
  url: `https://${site.domain}/consultoria`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de Consultoria em IA",
    itemListElement: servicos.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: s.titulo,
        description: s.descricao,
      },
    })),
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

export default function ConsultoriaPage() {
  return (
    <section className="py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container-c">
        {/* ===== HERO ===== */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="kicker-d">Consultor de Inteligência Artificial</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl">
              <span className="text-grad">Escale com IA </span>
              <span className="accent">sem virar risco.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-paper/55">
              Consultoria pra empresas que já usam ou querem usar IA no core. Método
              testado: <b className="text-paper/80">vibecoding com engenharia</b>. Sem
              hype, sem terceirizar código, sem esconder o risco embaixo do tapete.
              Auditoria, mentoria pro seu time ou desenho de projeto ponta a ponta.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glow !px-7 !py-3.5"
              >
                Chamar no LinkedIn
              </a>
              <Link href="#servicos" className="btn btn-dark-ghost !px-7 !py-3.5">
                Ver serviços
              </Link>
            </div>
            <p className="mt-4 text-sm text-paper/40">
              CTO e sócio de 5 empresas · aplicando IA em produto real há 5 anos
            </p>
          </Reveal>
        </div>

        {/* ===== SERVIÇOS ===== */}
        <div id="servicos" className="mt-24 md:mt-32">
          <Reveal>
            <p className="kicker-d text-center">Como posso ajudar</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Três formatos, um método
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {servicos.map((s, i) => (
              <Reveal key={s.titulo} delay={0.08 * i}>
                <article className="glass flex h-full flex-col p-7 md:p-8">
                  <p className="kicker-d">{s.kicker}</p>
                  <h3 className="mt-3 font-serif text-2xl font-medium leading-tight text-paper">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-amber-light">
                    {s.subtitulo}
                  </p>
                  <p className="mt-4 text-paper/60">{s.descricao}</p>
                  <div className="mt-6 border-t border-white/10 pt-5 text-sm">
                    <p className="text-paper/50">
                      <span className="text-paper/70">Quando faz sentido:</span>{" "}
                      {s.quando}
                    </p>
                    <p className="mt-2 text-paper/50">
                      <span className="text-paper/70">Prazo:</span> {s.prazo}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glow !px-7 !py-3.5"
            >
              Falar sobre o meu caso
            </a>
            <p className="mt-3 text-sm text-paper/40">
              Chama no LinkedIn com o contexto. Respondo pessoalmente.
            </p>
          </div>
        </div>

        {/* ===== CASOS ===== */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <p className="kicker-d text-center">Onde eu já apliquei</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Empresas em que sou CTO ou sócio
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-center text-paper/55">
              Não é depoimento de terceiro. É o que eu construí ou construo agora. Se
              quiser conversar com algum desses times, marco por LinkedIn.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {casos.map((c, i) => (
              <Reveal key={c.empresa} delay={0.08 * i}>
                <article className="glass h-full p-7">
                  <p className="kicker-d">{c.empresa}</p>
                  <h3 className="mt-3 font-serif text-lg font-medium text-paper">
                    {c.papel}
                  </h3>
                  <p className="mt-4 text-paper/60">{c.resultado}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===== MÉTODO ===== */}
        <div className="mt-24 md:mt-32">
          <div className="glass mx-auto max-w-4xl p-8 md:p-12">
            <p className="kicker-d">Meu método em 1 linha</p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-paper md:text-4xl">
              A velocidade da IA com o rigor de engenheiro. Sem hype, sem terceirizar
              o pensamento.
            </h2>
            <p className="mt-6 text-paper/60">
              Todo trabalho passa pelo <b className="text-paper/80">Protocolo de 5
              Camadas</b> (Entender, Ler, Blindar, Testar, Versionar) e usa o método{" "}
              <b className="text-paper/80">P.R.O.M.P.T.E.R.</b> pra estruturar como o
              seu time conversa com a IA. Isso não é apostila. É o padrão que eu aplico
              em produção há 5 anos e que ensino no meu blog e nas minhas palestras.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog/protocolo-de-5-camadas"
                className="btn btn-dark-ghost !px-5 !py-2.5 text-sm"
              >
                Ler sobre o Protocolo de 5 Camadas
              </Link>
              <Link
                href="/blog/prompter"
                className="btn btn-dark-ghost !px-5 !py-2.5 text-sm"
              >
                Ler sobre o P.R.O.M.P.T.E.R.
              </Link>
            </div>
          </div>
        </div>

        {/* ===== FAQ ===== */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <p className="kicker-d text-center">Perguntas frequentes</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              O que o cliente sempre pergunta antes
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
            {faq.map((it, i) => (
              <details key={i} className="glass group p-6 md:p-7">
                <summary className="cursor-pointer list-none text-lg font-medium text-paper marker:hidden">
                  <span className="mr-2 inline-block text-amber-light transition-transform group-open:rotate-45">
                    +
                  </span>
                  {it.q}
                </summary>
                <p className="mt-4 pl-6 leading-relaxed text-paper/70">{it.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ===== CTA FINAL ===== */}
        <div className="mt-24 md:mt-32">
          <div className="glass mx-auto max-w-3xl p-10 text-center md:p-14">
            <p className="kicker-d">Próximo passo</p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-paper md:text-4xl">
              Chama no LinkedIn com o seu contexto.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/60">
              Sem formulário longo, sem robô de agendamento. Você me manda uma mensagem
              contando o que sua empresa faz e o que precisa. Eu respondo pessoalmente
              se faz sentido conversar.
            </p>
            <div className="mt-8">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glow !px-8 !py-4"
              >
                Abrir conversa no LinkedIn →
              </a>
            </div>
            <p className="mt-5 text-sm text-paper/40">
              Ou pelo e-mail <a className="text-amber-light hover:underline" href={site.links.email}>contato@rodrigomunhozreis.com.br</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
