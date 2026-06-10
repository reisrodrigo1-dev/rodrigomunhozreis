import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre — quem é Rodrigo Munhoz Reis",
  description:
    "Diretor de Tecnologia, sócio de produtos reais construídos com IA e criador do método Vibecoding com Engenharia. Conheça a história e o porquê do método.",
  alternates: { canonical: "/sobre" },
};

const fatos = [
  { v: "CTO", l: "Diretor de Tecnologia em operação real" },
  { v: "5+", l: "produtos em produção, construídos com IA" },
  { v: "2", l: "métodos próprios: P.R.O.M.P.T.E.R. e 5 Camadas" },
  { v: "100%", l: "do que ensino, eu rodo todos os dias" },
];

export default function SobrePage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-c max-w-4xl">
        {/* Hero */}
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-12">
          <Reveal>
            <div className="relative mx-auto h-44 w-44 md:h-52 md:w-52">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber to-amber-deep opacity-20 blur-2xl" aria-hidden="true" />
              {/* Troque por uma foto: salve em /public/rodrigo.jpg e me avise que eu ativo. */}
              <div className="relative grid h-full w-full place-items-center rounded-3xl border border-amber/30 bg-gradient-to-br from-amber/20 to-amber-deep/10 font-serif text-7xl font-black text-amber-light">
                R
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="kicker-d">Quem fala com você</p>
            <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              <span className="text-grad">Prazer, </span>
              <span className="accent">Rodrigo.</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-paper/60">
              Sou Diretor de Tecnologia e sócio de produtos digitais que rodam em produção, com
              clientes pagantes e dados sensíveis — todos construídos com IA. Não ensino teoria:
              ensino o que aplico todo dia.
            </p>
          </Reveal>
        </div>

        {/* Números */}
        <Reveal delay={0.12}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fatos.map((f) => (
              <div key={f.l} className="glass p-5 text-center">
                <p className="font-serif text-3xl font-bold text-grad">{f.v}</p>
                <p className="mt-1 text-xs leading-snug text-paper/50">{f.l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* História */}
        <div className="prose-dark mt-16 max-w-none">
          <Reveal>
            <h2 className="font-sans text-2xl font-semibold text-paper">A história (com a parte feia)</h2>
            <div className="mt-4 flex flex-col gap-4 text-paper/65">
              <p>
                Quando eu estava aprendendo vibecoding, <b className="text-paper/85">subi as variáveis de
                ambiente de um sistema em produção</b>. Senhas e chaves de acesso, expostas. Eu — Diretor
                de TI — escorreguei no erro mais clássico de quem constrói com IA.
              </p>
              <p>
                Aquilo me ensinou a lição que virou a base de tudo o que ensino: a IA te dá uma
                velocidade que <em>atropela o cuidado</em>, se você não sabe onde pisar. O problema nunca
                foi a ferramenta. É o <b className="text-paper/85">vibecoding às cegas</b> — aceitar tudo o
                que a máquina cospe sem entender.
              </p>
              <p>
                Hoje eu rodo empresas inteiras em vibecoding, com método: o{" "}
                <Link href="/blog/como-usar-ia-no-trabalho-peder" className="text-amber-light hover:underline">
                  P.R.O.M.P.T.E.R.
                </Link>{" "}
                para conversar com a IA e o{" "}
                <Link href="/blog/protocolo-de-5-camadas" className="text-amber-light hover:underline">
                  Protocolo de 5 Camadas
                </Link>{" "}
                para revisar o que ela escreve. A velocidade da máquina, com a segurança de quem
                entende de engenharia.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Onde isso roda */}
        <Reveal>
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-paper">Não é teoria. São produtos no ar</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {site.projects.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover block p-5"
                >
                  <p className="font-semibold text-paper">{p.name}</p>
                  <p className="mt-0.5 text-xs font-semibold text-amber-light">{p.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/55">{p.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Por que eu ensino */}
        <Reveal>
          <div className="glass mt-16 p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-paper">Por que eu ensino</h2>
            <p className="mt-4 leading-relaxed text-paper/65">
              Porque vejo gente boa com medo de IA por preconceito — e gente sem preparo colocando
              empresas em risco por excesso de confiança. Os dois extremos perdem. Eu quero o meio
              com método: ninguém precisa virar programador, mas todo mundo que constrói com IA
              precisa saber onde pisa.
            </p>
            <blockquote className="mt-5 border-l-2 border-amber pl-4 font-serif text-lg italic text-paper/80">
              Vibecoding não é atalho para quem não sabe o que está fazendo. É alavanca para quem
              tem método.
            </blockquote>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-14 text-center">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              <span className="text-grad">Quer construir </span>
              <span className="accent">com método?</span>
            </h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/cliente" className="btn btn-glow !px-7 !py-3.5">
                Acessar os robôs grátis
              </Link>
              <Link href="/#trabalhe" className="btn btn-dark-ghost !px-7 !py-3.5">
                Trabalhe comigo
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
