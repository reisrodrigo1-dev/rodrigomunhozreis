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

const badges = ["Grátis", "+130 prompts", "Plano de 7 dias", "Método P.E.D.E.R."];

export default function Home() {
  const ebook = materials.find((m) => m.id === "ebook-ia-sem-medo") ?? materials[0];
  const proof = site.companies.map((c) => c.name).join(" · ");

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative">
        <div className="container-c py-24 text-center md:py-32">
          <Reveal>
            <span className="badge">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              {site.tagline}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-grad">Construa com IA</span>
              <br />
              <span className="accent text-[1.08em]">sem virar um risco.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-paper/55">
              {site.description}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#materiais" className="btn btn-glow !px-7 !py-3.5">
                Baixar o guia grátis
              </a>
              <a href="#trabalhe" className="btn btn-dark-ghost !px-7 !py-3.5">
                Trabalhe comigo
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-14 text-sm text-paper/40">
              Quem fala com você roda, em produção:{" "}
              <span className="text-paper/70">{proof}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PROVA ===== */}
      <section id="prova" className="border-t border-white/5 py-20 md:py-28">
        <div className="container-c">
          <Reveal>
            <p className="kicker-d">A prova vem antes do método</p>
            <h2 className="mt-5 max-w-[18ch] text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-grad">Não é teoria. É </span>
              <span className="accent">produção.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-paper/55">
              Empresas reais, com clientes reais, dados sensíveis e LGPD — todas construídas em
              vibecoding feito com rigor. É essa experiência que eu ensino.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {site.companies.map((c, i) => (
              <Reveal key={c.name} delay={0.08 * i}>
                <div className="glass glass-hover h-full p-7">
                  <p className="text-xl font-semibold text-paper">{c.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/50">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MÉTODO ===== */}
      <section id="metodo" className="border-t border-white/5 py-20 md:py-28">
        <div className="container-c">
          <Reveal>
            <p className="kicker-d">O método</p>
            <h2 className="mt-5 max-w-[20ch] text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-grad">Vibecoding com </span>
              <span className="accent">Engenharia.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-paper/55">
              O inimigo não é a IA — é o{" "}
              <span className="font-medium text-paper">{site.enemy}</span>: aceitar tudo o que ela
              gera sem entender. A virada é um protocolo simples, antes de aceitar qualquer linha.
            </p>
          </Reveal>

          <p className="mb-5 mt-12 text-sm font-semibold uppercase tracking-widest text-paper/40">
            O Protocolo de Revisão em 5 Camadas
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {camadas.map((c, i) => (
              <Reveal key={c.n} delay={0.06 * i}>
                <div className="glass glass-hover h-full p-6">
                  <span className="font-accent text-4xl text-amber-light">{c.n}</span>
                  <p className="mt-3 font-semibold text-paper">{c.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper/50">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="glass mt-8 p-7" style={{ background: "rgba(224,164,92,0.06)" }}>
              <p className="text-lg text-paper/75">
                Para conversar com a IA, ensino a receita{" "}
                <span className="accent text-xl">P.E.D.E.R.</span> — Papel, Exemplo, Desejo, Estilo
                e Refinar. Pedido vago gera resposta ruim; pedido com método gera resposta sob medida.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== LEAD MAGNET ===== */}
      <section id="materiais" className="border-t border-white/5 py-20 md:py-28">
        <div className="container-c">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <Reveal>
              <p className="kicker-d">100% grátis</p>
              <h2 className="mt-5 max-w-[15ch] text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                <span className="text-grad">Baixe o e-book com </span>
                <span className="accent">+130 prompts</span>
                <span className="text-grad"> de IA.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-paper/55">
                O guia “IA Sem Medo”: o método P.E.D.E.R., um plano de 7 dias e 100 prompts para
                usar no trabalho hoje. Direto ao ponto.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-sm text-paper/65"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass p-7">
                <p className="text-xl font-semibold text-paper">Receba agora, de graça</p>
                <p className="mt-1.5 text-sm text-paper/55">
                  Coloque seu e-mail e o acesso é liberado na hora.
                </p>
                <div className="mt-5">
                  <DownloadGate material={ebook} variant="dark" />
                </div>
                <p className="mt-4 text-xs text-paper/40">Sem spam. Você cancela quando quiser.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="mt-10">
              <a href="/materiais" className="text-sm font-semibold text-amber-light hover:underline">
                Ver todos os materiais gratuitos →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== TRABALHE COMIGO ===== */}
      <section id="trabalhe" className="border-t border-white/5 py-20 md:py-28">
        <div className="container-c">
          <Reveal>
            <p className="kicker-d">Para empresas e eventos</p>
            <h2 className="mt-5 text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-grad">Trabalhe </span>
              <span className="accent">comigo.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="glass glass-hover h-full p-8">
                <p className="text-2xl font-semibold text-paper">Palestras</p>
                <p className="mt-3 text-paper/60">
                  Da IA para leigos ao vibecoding seguro para times técnicos. Eventos abertos e
                  in-company.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div
                className="glass glass-hover h-full p-8"
                style={{ borderColor: "rgba(224,164,92,0.35)", background: "rgba(224,164,92,0.08)" }}
              >
                <p className="text-2xl font-semibold text-paper">Consultoria</p>
                <p className="mt-3 text-paper/60">
                  Adoção de IA e vibecoding seguro na sua empresa, com a visão de quem roda operações
                  reais em produção.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={site.links.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-glow">
                Falar no WhatsApp
              </a>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-dark-ghost">
                Agendar pelo LinkedIn
              </a>
              <a href={site.links.email} className="btn btn-dark-ghost">
                Enviar um e-mail
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden border-t border-white/5 py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "rgba(224,164,92,0.10)", filter: "blur(100px)" }}
        />
        <div className="container-c relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-[20ch] text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-grad">Aprenda a usar IA com </span>
              <span className="accent">método</span>
              <span className="text-grad"> — toda semana.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex justify-center">
              <NewsletterForm variant="dark" source="newsletter-cta" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
