import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Tudo certo!",
  description: "Seu material está liberado. Veja os próximos passos.",
  robots: { index: false, follow: false },
};

const next = [
  {
    href: "/cliente",
    title: "Acesse a Central de Robôs",
    desc: "16+ especialistas de IA prontos: Arquiteto, Engenheiro, Revisor de Segurança… Grátis, é só criar a conta.",
    cta: "Acessar grátis",
  },
  {
    href: "/blog/configurar-vscode-copilot-primeiro-sistema",
    title: "Comece a construir hoje",
    desc: "O passo a passo do zero absoluto: configure as ferramentas e crie seu primeiro sistema com IA.",
    cta: "Ler o guia",
  },
  {
    href: "/blog",
    title: "Aprenda com método",
    desc: "Artigos sobre vibecoding com engenharia, segurança e IA no trabalho — direto de quem roda isso em produção.",
    cta: "Ver o blog",
  },
];

export default function ObrigadoPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-c max-w-4xl">
        <Reveal>
          <div className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-amber/30 bg-amber/10">
              <svg className="h-8 w-8 text-amber-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-grad">Tudo certo. </span>
              <span className="accent">É seu.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-paper/60">
              Seu material abriu em uma nova aba (se não abriu, confira o bloqueador de pop-up).
              Enquanto isso, aqui está o melhor caminho para continuar:
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {next.map((n, i) => (
            <Reveal key={n.href} delay={i * 0.08}>
              <Link href={n.href} className="glass glass-hover flex h-full flex-col p-6">
                <span className="font-serif text-2xl font-bold text-amber/50">{i + 1}</span>
                <h2 className="mt-3 text-lg font-semibold text-paper">{n.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">{n.desc}</p>
                <span className="mt-4 text-sm font-semibold text-amber-light">{n.cta} →</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
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
