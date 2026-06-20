import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { RobotCard } from "@/components/robot-card";
import { seedRobots, type Robot } from "@/lib/robots";
import { skills, type Skill } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Seu acesso foi liberado!",
  description:
    "E-book IA Sem Medo + 10 robôs de IA + 20 skills do Engenho — tudo liberado, sem custo.",
  robots: { index: false, follow: false },
};

// 10 robôs liberados (foco em quem decide e produz).
const ROBO_IDS = [
  "copiloto-do-ceo",
  "consultor-de-ia",
  "estrategista-de-marketing",
  "copywriter-de-vendas",
  "criador-de-conteudo",
  "coach-de-produtividade",
  "professor-particular",
  "negociador",
  "analista-preco-margem",
  "mentor-de-carreira",
];

// 20 skills do Engenho liberadas (prompting, conteúdo, marketing, negócio).
const SKILL_IDS = [
  "forja", "lapidador", "garimpo", "sintese", "bagagem",
  "tomo", "pena", "praca", "legenda", "baralho",
  "claquete", "palco", "correio", "alavanca", "decolagem",
  "espelho", "espiao", "acordo", "balcao", "curriculo",
];

export default function ObrigadoPage() {
  const robos = ROBO_IDS
    .map((id) => seedRobots.find((r) => r.id === id))
    .filter((r): r is Robot => Boolean(r));
  const sks = SKILL_IDS
    .map((id) => skills.find((s) => s.id === id))
    .filter((s): s is Skill => Boolean(s));

  return (
    <section className="py-16 md:py-24">
      <div className="container-c max-w-5xl">
        {/* ===== SUCESSO ===== */}
        <Reveal>
          <div className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-amber/30 bg-amber/10">
              <svg className="h-8 w-8 text-amber-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-grad">Seu acesso </span>
              <span className="accent">foi liberado.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-paper/60">
              <strong className="text-paper">Salve esta página</strong> — é o seu acesso. Tudo abaixo
              é seu, de graça: o e-book, <strong className="text-paper">10 robôs de IA</strong> e{" "}
              <strong className="text-paper">20 skills do Engenho</strong>.
            </p>
          </div>
        </Reveal>

        {/* ===== E-BOOK + CARTÃO ===== */}
        <div className="mt-14">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
              1 · Seu e-book
            </h2>
          </Reveal>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Reveal>
              <div className="glass flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold text-paper">IA Sem Medo — Guia Prático</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">
                  Método P.R.O.M.P.T.E.R., plano de 7 dias e +130 prompts prontos pro trabalho e a vida.
                </p>
                <a
                  href="/biblioteca/ebook-ia-sem-medo.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glow mt-4 self-start !px-6 !py-2.5 !text-sm"
                >
                  Abrir o e-book ↗
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="glass flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold text-paper">Cartão P.R.O.M.P.T.E.R.</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">
                  O método em uma página — a receita do prompt profissional, pra imprimir e deixar à mão.
                </p>
                <a
                  href="/biblioteca/cartao-peder.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark-ghost mt-4 self-start !px-6 !py-2.5 !text-sm"
                >
                  Abrir o cartão ↗
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ===== 10 ROBÔS ===== */}
        <div className="mt-16">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
              2 · 10 robôs de IA liberados
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-paper/55">
              Cada robô é um prompt profissional pronto. Clique em{" "}
              <strong className="text-paper/80">Copiar prompt</strong> e cole no ChatGPT, Claude ou Gemini.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {robos.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 0.06}>
                <RobotCard robot={r} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===== 20 SKILLS ===== */}
        <div className="mt-16">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
              3 · 20 skills do Engenho liberadas
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-paper/55">
              Skills do Claude Code — baixe o <code>.zip</code> e instale em <code>~/.claude/skills</code>.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sks.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.05}>
                <div className="glass flex h-full flex-col p-5">
                  <h3 className="font-serif text-lg font-semibold text-paper">{s.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-amber-light">{s.tagline}</p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-paper/55">{s.description}</p>
                  <a
                    href={`/biblioteca/skills/${s.id}.zip`}
                    download
                    className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full border border-amber/30 px-4 py-1.5 text-xs font-semibold text-amber-light transition-colors hover:bg-amber/10"
                  >
                    Baixar .zip ↓
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===== UPSELL ===== */}
        <Reveal>
          <div className="glass mt-16 p-8 text-center md:p-12">
            <h2 className="mx-auto max-w-2xl text-2xl font-medium tracking-tight md:text-3xl">
              <span className="text-grad">Isto é só uma amostra. </span>
              <span className="accent">Tem muito mais.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-paper/60">
              A Central de Robôs tem <strong className="text-paper">26 robôs</strong> e a suíte Engenho
              tem <strong className="text-paper">50 skills</strong>. Crie sua conta grátis e libere tudo.
            </p>
            <Link href="/cliente" className="btn btn-glow mt-6 inline-flex !px-7 !py-3">
              Criar conta grátis e liberar tudo
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-xs text-paper/35">
            Sem spam, nunca. Seus dados estão protegidos —{" "}
            <Link href="/privacidade" className="text-amber-light hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
