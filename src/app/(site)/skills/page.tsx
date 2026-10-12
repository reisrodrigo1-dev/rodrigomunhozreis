import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { skills, skillCategories } from "@/lib/skills";

const total = skills.length;
const ownCount = skills.filter((s) => !s.base).length;
const starterSkills = skills.filter((s) => s.starter);

// Quem clica em "baixar" cria a conta (ou entra) e volta direto para /cliente/skills.
const DOWNLOAD_HREF = "/cliente?destino=skills";

export const metadata: Metadata = {
  title: `Skills do Engenho: ${total} skills de IA para o Claude Code`,
  description: `As ${total} skills que o Rodrigo Munhoz Reis usa no dia a dia com o Claude Code: segurança, código, prompts, conteúdo, marketing e negócio. Download grátis.`,
  alternates: { canonical: "/skills" },
};

const passos = [
  {
    n: "1",
    t: "Crie sua conta grátis",
    d: "Leva 30 segundos. A mesma conta libera os robôs e as skills.",
  },
  {
    n: "2",
    t: "Baixe o .zip",
    d: `A suíte completa com as ${total} skills, ou só as que você quiser, uma a uma.`,
  },
  {
    n: "3",
    t: "Copie as pastas",
    d: "Descompacte e copie as pastas das skills para a pasta de skills do Claude Code.",
  },
  {
    n: "4",
    t: "Reinicie o Claude Code",
    d: "Pronto. A skill entra sozinha quando o pedido combina com ela, ou você chama pelo nome.",
  },
];

const faq = [
  {
    q: "Preciso pagar alguma coisa?",
    a: `Não. As ${total} skills são gratuitas. Você só precisa criar a conta grátis na Área do Cliente para baixar.`,
  },
  {
    q: "O que é uma skill, na prática?",
    a: "Uma pasta com instruções, referências e modelos que o Claude Code carrega quando o seu pedido combina com o que ela faz. Em vez de você repetir o mesmo contexto toda vez, a skill já chega sabendo o método.",
  },
  {
    q: "Qual a diferença entre skill e robô?",
    a: "O robô é um prompt pronto para colar em qualquer IA (ChatGPT, Claude ou Gemini). A skill é instalada no Claude Code e entra sozinha, com material de apoio junto. Se você não usa o Claude Code, comece pelos robôs.",
  },
  {
    q: "Preciso instalar todas?",
    a: "Não. Dá para baixar uma por uma. Se está começando, instale Forja, Cofre e Tomo, use por alguns dias e volte pelo resto.",
  },
  {
    q: "O que significa “base” em algumas skills?",
    a: `${total - ownCount} skills estendem uma skill pública que já existe, adicionando o método e a identidade da casa. Para usar essas, instale também a skill base indicada no card.`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SkillsPublicPage() {
  return (
    <section className="py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-c">
        {/* ===== HERO ===== */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="kicker-d">Skills do Engenho</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl">
              <span className="text-grad">As {total} skills que eu uso </span>
              <span className="accent">no dia a dia com IA.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-paper/55">
              Skill é um pacote de instruções que o Claude Code carrega sozinho quando o seu
              pedido combina com ela. Montei estas {total} para o meu próprio trabalho:
              segurança, código, prompts, conteúdo, marketing e negócio. Cada uma traz o
              método junto, para a IA não começar do zero. Agora estão aqui, de graça.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href={DOWNLOAD_HREF} className="btn btn-glow !px-7 !py-3.5">
                Baixar as {total} skills grátis
              </Link>
              <a href="#catalogo" className="btn btn-dark-ghost !px-7 !py-3.5">
                Ver o catálogo
              </a>
            </div>
            <p className="mt-4 text-sm text-paper/40">
              Grátis · {ownCount} próprias + {total - ownCount} que estendem skills existentes · para o Claude Code
            </p>
          </Reveal>
        </div>

        {/* ===== COMO BAIXAR ===== */}
        <div className="mt-24">
          <Reveal>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-amber-light">
              Como baixar e instalar
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {passos.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="glass flex h-full flex-col p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-amber/30 bg-amber/10 font-serif text-lg font-bold text-amber-light">
                    {p.n}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-paper">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/55">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-1.5 text-center font-mono text-xs">
              <p className="text-paper/40">Pasta de skills do Claude Code:</p>
              <p className="rounded bg-white/8 px-2 py-1 text-amber-light">Windows: C:\Users\SEU_USUARIO\.claude\skills\</p>
              <p className="rounded bg-white/8 px-2 py-1 text-amber-light">Mac/Linux: ~/.claude/skills/</p>
            </div>
          </Reveal>
        </div>

        {/* ===== COMECE POR AQUI ===== */}
        <div className="mt-24">
          <Reveal>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-amber-light">
              Comece por estas {starterSkills.length}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-paper/55">
              Não tente instalar tudo de uma vez. Uma base de prompt, uma de segurança e uma de
              conteúdo já mudam o seu dia.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {starterSkills.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <div className="glass h-full p-7 ring-1 ring-amber/25">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-2xl font-semibold text-paper">{s.name}</h3>
                    <code className="font-mono text-[11px] text-paper/35">{s.id}</code>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-amber-light">{s.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/55">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===== CATÁLOGO ===== */}
        <div id="catalogo" className="mt-24 scroll-mt-24">
          <Reveal>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-amber-light">
              O catálogo completo
            </h2>
          </Reveal>
          {skillCategories.map((cat) => {
            const list = skills.filter((s) => s.category === cat);
            if (list.length === 0) return null;
            return (
              <section key={cat} className="mt-12">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-2xl font-semibold text-paper">{cat}</h3>
                  <span className="font-mono text-xs text-paper/30">{list.length}</span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((s) => (
                    <div key={s.id} className="glass flex h-full flex-col p-5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-serif text-lg font-semibold text-paper">{s.name}</h4>
                        <code className="font-mono text-[11px] text-paper/35">{s.id}</code>
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-amber-light">{s.tagline}</p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">{s.description}</p>
                      {s.base && (
                        <span className="mt-3 self-start rounded bg-white/8 px-1.5 py-0.5 text-[11px] font-medium text-paper/55">
                          base: {s.base}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* ===== FAQ ===== */}
        <div className="mx-auto mt-24 max-w-3xl">
          <Reveal>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-amber-light">
              Perguntas frequentes
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="glass group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-paper [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-xl leading-none text-amber-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ===== CTA FINAL ===== */}
        <Reveal>
          <div className="glass mt-24 p-10 text-center md:p-14">
            <h2 className="mx-auto max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">
              <span className="text-grad">Pare de explicar o método </span>
              <span className="accent">toda vez.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/55">
              Crie sua conta grátis e baixe as {total} skills agora. Não usa o Claude Code?{" "}
              <Link href="/robos" className="text-amber-light underline-offset-4 hover:underline">
                Os robôs funcionam em qualquer IA.
              </Link>
            </p>
            <div className="mt-8">
              <Link href={DOWNLOAD_HREF} className="btn btn-glow !px-8 !py-4">
                Criar conta e baixar as skills
              </Link>
            </div>
            <p className="mt-4 text-xs text-paper/35">{site.domain}/skills</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
