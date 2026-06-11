import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { DownloadGate } from "@/components/download-gate";
import { LatestPosts } from "@/components/latest-posts";
import { getMaterialsMerged } from "@/lib/materials-db";
import { materials as seedMaterials } from "@/lib/materials";
import { site } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "IA Sem Medo — guia gratuito (método P.R.O.M.P.T.E.R. + 130 prompts)",
  description:
    "Baixe grátis o guia IA Sem Medo: o método P.R.O.M.P.T.E.R., um plano de 7 dias e mais de 130 prompts prontos. Use IA com a velocidade da máquina e o rigor de um engenheiro.",
  alternates: { canonical: "/ia-sem-medo" },
};

const SLUG = "ia-sem-medo";

const dentro = [
  {
    t: "O método P.R.O.M.P.T.E.R.",
    d: "A receita do prompt profissional, passo a passo. Pare de pedir torto e receber torto.",
  },
  {
    t: "Plano de 7 dias",
    d: "Um roteiro pra sair do zero e já usar IA no trabalho na primeira semana — sem se perder.",
  },
  {
    t: "+130 prompts prontos",
    d: "Pra trabalho e pra vida: escrever, decidir, organizar, vender, aprender. É só copiar e adaptar.",
  },
  {
    t: "Sem hype, sem mágica",
    d: "Nada de promessa milagrosa. Método de quem constrói com IA todo dia — e a decisão continua sua.",
  },
];

const faq = [
  {
    q: "É grátis de verdade?",
    a: "É. Você deixa o e-mail e baixa na hora. Sem cartão, sem pegadinha — em troca, de vez em quando te mando conteúdo bom (e você cancela quando quiser).",
  },
  {
    q: "Preciso saber programar?",
    a: "Não. O guia é pra quem quer usar IA com método — do trabalho ao dia a dia. Os prompts são pra copiar e adaptar.",
  },
  {
    q: "Pra quem é isso?",
    a: "Pra quem usa IA na superfície e sente que dá pra muito mais: profissionais, empreendedores e curiosos que querem método em vez de sorte.",
  },
  {
    q: "Quanto tempo leva?",
    a: "Você baixa em segundos. O plano é de 7 dias, mas os 130+ prompts você já começa a usar hoje.",
  },
];

export default async function IaSemMedoPage() {
  const all = await getMaterialsMerged().catch(() => [] as Awaited<ReturnType<typeof getMaterialsMerged>>);
  const material =
    all.find((m) => m.slug === SLUG) ?? seedMaterials.find((m) => m.slug === SLUG)!;

  return (
    <>
      {/* HERO + captura acima da dobra */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container-c">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Oferta */}
            <Reveal>
              <p className="kicker-d">Guia gratuito</p>
              <h1 className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                <span className="text-grad">Use IA com método — </span>
                <span className="accent">não na sorte.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-paper/60">
                A maioria usa IA na superfície e acha que é só isso. Quem tem método larga na
                frente. O <strong className="text-paper">IA Sem Medo</strong> te dá a receita —
                de graça.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Método P.R.O.M.P.T.E.R. — o prompt profissional, passo a passo",
                  "Plano de 7 dias pra começar a usar já na primeira semana",
                  "+130 prompts prontos pro trabalho e pra vida",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-paper/75">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber/20 text-amber-light">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-paper/45">
                Por <strong className="text-paper/70">{site.name}</strong> — {site.role}, que roda
                empresas reais 100% com IA.
              </p>
            </Reveal>

            {/* Formulário */}
            <Reveal delay={0.1}>
              <div id="baixar" className="glass scroll-mt-24 p-7 md:p-8">
                <h2 className="text-2xl font-semibold text-paper">Receba agora, de graça</h2>
                <p className="mt-1.5 text-sm text-paper/55">
                  Coloque seu e-mail e o acesso é liberado na hora.
                </p>
                <div className="mt-5">
                  <DownloadGate material={material} variant="dark" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* O QUE TEM DENTRO */}
      <section className="border-t border-white/5 py-16 md:py-20">
        <div className="container-c">
          <Reveal>
            <p className="kicker-d">O que você recebe</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
              <span className="text-grad">Tudo que eu uso — </span>
              <span className="accent">numa página só.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {dentro.map((c, i) => (
              <Reveal key={c.t} delay={0.06 * i}>
                <div className="glass h-full p-7">
                  <h3 className="text-lg font-semibold text-amber-light">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/60">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section className="border-t border-white/5 py-16 md:py-20">
        <div className="container-c">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="kicker-d">Quem está te ensinando</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                <span className="text-grad">Prova antes </span>
                <span className="accent">do discurso.</span>
              </h2>
              <p className="mt-5 text-paper/60">
                Eu não vendo mágica nem medo. Sou {site.role} e sócio de produtos reais, em
                produção, com clientes pagantes — construídos com IA. O que está no guia é o que eu
                faço todo dia.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-3 sm:grid-cols-2">
                {site.companies.map((c) => (
                  <div key={c.name} className="glass p-5">
                    <p className="font-semibold text-paper">{c.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-paper/50">{c.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 py-16 md:py-20">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="kicker-d">Antes de baixar</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
              <span className="text-grad">Perguntas </span>
              <span className="accent">rápidas.</span>
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={0.05 * i}>
                <details className="glass group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-paper">
                    {f.q}
                    <span className="text-amber-light transition-transform group-open:rotate-45">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DO BLOG — nutre e prova autoridade */}
      <LatestPosts />

      {/* CTA FINAL */}
      <section className="border-t border-white/5 py-16 md:py-24">
        <div className="container-c">
          <Reveal>
            <div className="glass relative overflow-hidden p-10 text-center md:p-14">
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                <span className="text-grad">Comece a usar IA </span>
                <span className="accent">com método hoje.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-paper/60">
                Leva segundos pra baixar e o resto da vida pra usar. Sem custo, sem risco.
              </p>
              <a href="#baixar" className="btn btn-glow mt-8 inline-flex">
                Quero o guia gratuito
              </a>
              <p className="mt-4 text-xs text-paper/40">
                Sem spam. Você cancela quando quiser.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
