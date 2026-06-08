import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Robôs de IA — prompts prontos para usar",
  description:
    "Robôs de IA são prompts profissionais, prontos para colar no ChatGPT, Claude ou Gemini. Crie sua conta grátis na Área do Cliente e use em segundos.",
  alternates: { canonical: "/robos" },
};

const passos = [
  {
    n: "1",
    t: "Crie sua conta grátis",
    d: "Entre na Área do Cliente e cadastre-se em 30 segundos. É grátis e libera todos os robôs.",
  },
  {
    n: "2",
    t: "Escolha o robô",
    d: "Cada robô é um especialista pronto: Arquiteto de Produto, Consultor de IA do Negócio, Copiloto do CEO e muito mais.",
  },
  {
    n: "3",
    t: "Copie o prompt",
    d: "Um clique copia o prompt completo. Sem configuração, sem instalar nada.",
  },
  {
    n: "4",
    t: "Abra na sua IA",
    d: "Cole no ChatGPT, Claude ou Gemini — ou use os botões que já abrem a IA com o prompt pronto.",
  },
];

const categorias = [
  {
    t: "Criar sistemas com IA",
    d: "Robôs que viram seu time técnico: arquitetura, código, banco de dados, design, testes, segurança e deploy — com o rigor do método Vibecoding com Engenharia.",
  },
  {
    t: "Para o negócio",
    d: "Robôs para quem decide: onde a IA gera dinheiro, copiloto do CEO, LGPD, custos e estimativas — visão de dono, sem hype.",
  },
];

export default function RobosPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-c">
        {/* ===== HERO ===== */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="kicker-d">Robôs de IA</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl">
              <span className="text-grad">Especialistas de IA, </span>
              <span className="accent">prontos para usar.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-paper/55">
              Cada robô é um prompt profissional, testado e pronto. Você copia e cola
              na sua própria IA — ChatGPT, Claude ou Gemini. Sem instalar nada, sem
              mensalidade de ferramenta. O cérebro é a sua IA; o robô é a instrução
              certa para ela trabalhar como um especialista.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/cliente" className="btn btn-glow !px-7 !py-3.5">
                Acessar os robôs grátis
              </Link>
              <Link href="/#metodo" className="btn btn-dark-ghost !px-7 !py-3.5">
                Conhecer o método
              </Link>
            </div>
            <p className="mt-4 text-sm text-paper/40">
              Grátis · funciona em qualquer IA · sem instalar nada
            </p>
          </Reveal>
        </div>

        {/* ===== COMO FUNCIONA ===== */}
        <div className="mt-24">
          <Reveal>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-amber-light">
              Como funciona
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
        </div>

        {/* ===== CATEGORIAS ===== */}
        <div className="mt-24">
          <Reveal>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-amber-light">
              Dois times de robôs
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {categorias.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08}>
                <div className="glass glass-hover h-full p-8">
                  <h3 className="font-serif text-2xl font-semibold text-paper">{c.t}</h3>
                  <p className="mt-3 leading-relaxed text-paper/55">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===== CTA FINAL ===== */}
        <Reveal>
          <div className="glass mt-24 p-10 text-center md:p-14">
            <h2 className="mx-auto max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">
              <span className="text-grad">Pronto para colocar a IA </span>
              <span className="accent">para trabalhar?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/55">
              Crie sua conta grátis e libere todos os robôs agora. Leva menos de um
              minuto.
            </p>
            <div className="mt-8">
              <Link href="/cliente" className="btn btn-glow !px-8 !py-4">
                Criar conta e acessar os robôs
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
