import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { DownloadGate } from "@/components/download-gate";
import { materials } from "@/lib/materials";
import { site } from "@/lib/site";

const camadas = [
  { n: "1", t: "Entender", d: "Saber exatamente o que foi pedido — e por quê." },
  { n: "2", t: "Ler", d: "Revisar o que a IA escreveu. Nunca aceitar às cegas." },
  { n: "3", t: "Blindar", d: "Segurança, dados sensíveis e LGPD em primeiro lugar." },
  { n: "4", t: "Testar", d: "Provar que funciona antes de confiar." },
  { n: "5", t: "Versionar", d: "Commits pequenos e rollback fácil antes da produção." },
];

export default function Home() {
  const ebook = materials.find((m) => m.id === "ebook-ia-sem-medo") ?? materials[0];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(80% 70% at 75% 0%, rgba(224,164,92,.18), transparent 60%)",
          }}
        />
        <div className="container-c relative py-24 md:py-32">
          <Reveal>
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-light">
              <span className="inline-block h-px w-7 bg-amber-light" />
              {site.role}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-[16ch] font-serif text-4xl font-black leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              Vibecoding sem virar uma bomba-relógio de segurança.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/75">
              {site.description}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#materiais" className="btn btn-on-dark">
                Baixar o guia grátis
              </a>
              <a
                href="#trabalhe"
                className="btn border border-white/20 text-paper hover:border-amber-light hover:text-amber-light"
              >
                Trabalhe comigo
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-12 text-sm text-paper/55">
              Quem fala com você roda, em produção:{" "}
              <span className="text-paper/80">
                {site.companies.map((c) => c.name).join(" · ")}
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PROVA ===== */}
      <section id="prova" className="border-b border-line bg-paper py-20 md:py-28">
        <div className="container-c">
          <Reveal>
            <p className="kicker">A prova vem antes do método</p>
            <h2 className="mt-4 max-w-[18ch] text-3xl md:text-5xl">
              Não é teoria. É produção.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Três empresas reais, com clientes reais, dados sensíveis e LGPD — todas
              construídas em vibecoding feito com rigor. É essa experiência que eu ensino.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {site.companies.map((c, i) => (
              <Reveal key={c.name} delay={0.08 * i}>
                <div className="h-full rounded-2xl border border-line bg-white p-7">
                  <p className="font-serif text-xl font-semibold">{c.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MÉTODO ===== */}
      <section id="metodo" className="bg-page py-20 md:py-28">
        <div className="container-c">
          <Reveal>
            <p className="kicker">O método</p>
            <h2 className="mt-4 max-w-[20ch] text-3xl md:text-5xl">
              Vibecoding com Engenharia
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              O inimigo não é a IA — é o{" "}
              <span className="font-medium text-ink">{site.enemy}</span>: aceitar tudo o que
              ela gera sem entender. A virada é um protocolo simples, aplicado antes de
              aceitar qualquer linha de código.
            </p>
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <p className="mb-5 font-serif text-lg font-semibold text-ink">
                O Protocolo de Revisão em 5 Camadas
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {camadas.map((c, i) => (
                <Reveal key={c.n} delay={0.06 * i}>
                  <div className="h-full rounded-2xl border border-line bg-white p-6">
                    <span className="font-serif text-3xl font-black text-amber">
                      {c.n}
                    </span>
                    <p className="mt-3 font-semibold">{c.t}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="mt-10 rounded-2xl border border-amber/30 bg-gradient-to-b from-amber-soft to-white p-7">
              <p className="text-lg text-ink-soft">
                Para conversar com a IA, ensino a receita{" "}
                <span className="font-semibold text-ink">P.E.D.E.R.</span> — Papel, Exemplo,
                Desejo, Estilo e Refinar. Pedido vago gera resposta ruim; pedido com método
                gera resposta sob medida.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== LEAD MAGNET — E-BOOK GRÁTIS ===== */}
      <section id="materiais" className="bg-ink py-20 text-paper md:py-28">
        <div className="container-c">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <Reveal>
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-light">
                <span className="inline-block h-px w-7 bg-amber-light" />
                100% grátis
              </p>
              <h2 className="mt-5 max-w-[15ch] font-serif text-3xl font-bold leading-tight md:text-5xl">
                Baixe o e-book com <span className="text-amber-light">+130 prompts</span> de IA prontos.
              </h2>
              <p className="mt-5 max-w-xl text-lg text-paper/70">
                O guia “IA Sem Medo”: o método P.E.D.E.R., um plano de 7 dias e 100 prompts
                para usar no trabalho hoje. Direto ao ponto, sem enrolação.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["Grátis", "+130 prompts", "Plano de 7 dias", "Método P.E.D.E.R."].map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm text-paper/70"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-white p-7 text-ink shadow-2xl">
                <p className="font-serif text-xl font-semibold">Receba agora, de graça</p>
                <p className="mt-1.5 text-sm text-muted">
                  Coloque seu e-mail e o acesso é liberado na hora.
                </p>
                <div className="mt-5">
                  <DownloadGate material={ebook} />
                </div>
                <p className="mt-4 text-xs text-muted-soft">
                  Sem spam. Você cancela quando quiser.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="mt-10">
              <a
                href="/materiais"
                className="text-sm font-semibold text-amber-light hover:underline"
              >
                Ver todos os materiais gratuitos →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== TRABALHE COMIGO ===== */}
      <section id="trabalhe" className="bg-ink py-20 text-paper md:py-28">
        <div className="container-c">
          <Reveal>
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-light">
              <span className="inline-block h-px w-7 bg-amber-light" />
              Para empresas e eventos
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl">Trabalhe comigo</h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-8">
                <p className="font-serif text-2xl font-semibold">Palestras</p>
                <p className="mt-3 text-paper/70">
                  Da IA para leigos ao vibecoding seguro para times técnicos. Eventos
                  abertos e in-company.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-amber/40 bg-amber/10 p-8">
                <p className="font-serif text-2xl font-semibold">Consultoria</p>
                <p className="mt-3 text-paper/70">
                  Adoção de IA e vibecoding seguro na sua empresa, com a visão de quem roda 3
                  operações reais em produção.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={site.links.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-on-dark"
              >
                Falar no WhatsApp
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/20 text-paper hover:border-amber-light hover:text-amber-light"
              >
                Agendar pelo LinkedIn
              </a>
              <a
                href={site.links.email}
                className="btn border border-white/20 text-paper hover:border-amber-light hover:text-amber-light"
              >
                Enviar um e-mail
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== NEWSLETTER FINAL ===== */}
      <section className="bg-gradient-to-b from-amber-soft to-paper py-20 md:py-24">
        <div className="container-c flex flex-col items-start gap-6">
          <Reveal>
            <h2 className="max-w-[20ch] text-3xl md:text-4xl">
              Aprenda a usar IA com método — toda semana.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <NewsletterForm variant="light" source="newsletter-rodape" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
