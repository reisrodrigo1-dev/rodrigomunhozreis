import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { DownloadGate } from "@/components/download-gate";
import { WorkWithMeForm } from "@/components/work-with-me-form";
import { CalEmbed } from "@/components/cal-embed";
import { ProofSection } from "@/components/proof-section";
import { materials } from "@/lib/materials";
import { LatestPosts } from "@/components/latest-posts";
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
  const ebookCeos = materials.find((m) => m.id === "ebook-vibecoding-ceos");
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
              {site.heroSubtitle}
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

      {/* ===== PROJETOS (autoridade) ===== */}
      <section id="prova" className="border-t border-white/5 py-20 md:py-28">
        <div className="container-c">
          <Reveal>
            <p className="kicker-d">A prova vem antes do método</p>
            <h2 className="mt-5 max-w-[20ch] text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-grad">Não é teoria. São produtos </span>
              <span className="accent">no ar.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-paper/55">
              Sou Diretor de TI e sócio de plataformas reais de legal-tech e edtech — todas
              construídas em vibecoding feito com rigor. Clique e veja você mesmo.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.projects.map((p, i) => (
              <Reveal key={p.name} delay={0.05 * i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover group flex h-full flex-col p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-paper">{p.name}</span>
                    <span className="text-amber-light opacity-0 transition group-hover:opacity-100">
                      ↗
                    </span>
                  </div>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-amber-light">
                    {p.role}
                  </span>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/55">{p.desc}</p>
                  <span className="mt-4 text-sm font-medium text-paper/70">
                    {p.url.replace("https://", "")}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Marquee dos projetos (animação) */}
          <div className="marquee-mask mt-14 overflow-hidden">
            <div className="marquee-track gap-10 text-2xl font-medium text-paper/25 md:text-3xl">
              {[...site.projects, ...site.projects].map((p, i) => (
                <span key={i} className="whitespace-nowrap">
                  {p.name} <span className="text-amber/50">·</span>
                </span>
              ))}
            </div>
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

      {/* ===== ROBÔS DE IA ===== */}
      <section id="robos" className="border-t border-white/5 py-20 md:py-28">
        <div className="container-c">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <p className="kicker-d">Grátis · sem instalar nada</p>
              <h2 className="mt-5 max-w-[18ch] text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                <span className="text-grad">Robôs de IA que pensam com o </span>
                <span className="accent">meu método.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-paper/55">
                Especialistas prontos para criar sistemas e tomar decisões. Copie o prompt e leve
                direto para a sua IA — ChatGPT, Gemini ou Claude. Em 1 clique, ela vira o especialista.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/cliente" className="btn btn-glow !px-7 !py-3.5">
                  Acessar os robôs
                </a>
                <a href="/robos" className="btn btn-dark-ghost !px-7 !py-3.5">
                  Como funciona
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Arquiteto de Produto",
                  "Engenheiro Full-Stack",
                  "Especialista em Firebase",
                  "Revisor de Segurança",
                  "Consultor de IA",
                  "Copiloto do CEO",
                ].map((n) => (
                  <div key={n} className="glass px-4 py-3 text-sm font-medium text-paper/80">
                    {n}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
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
                O guia “IA Sem Medo”: o método P.E.D.E.R., um plano de 7 dias e mais de 130 prompts
                prontos — 100 deles para usar no trabalho hoje.
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

      {/* ===== PROVA SOCIAL (editável no admin) ===== */}
      <ProofSection />

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
            <div className="mt-8 grid items-start gap-5 md:grid-cols-[1.1fr_.9fr]">
              <WorkWithMeForm />
              <div className="flex flex-col gap-3 md:pt-2">
                <p className="text-paper/60">
                  Prefere ir direto? Fale comigo pelos canais abaixo — respondo pessoalmente.
                </p>
                <a href={site.links.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark-ghost w-fit">
                  Falar no WhatsApp
                </a>
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-dark-ghost w-fit">
                  Conectar no LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
          <CalEmbed />
        </div>
      </section>

      {/* ===== E-BOOK PARA CEOs ===== */}
      {ebookCeos && (
        <section id="ceos" className="border-t border-white/5 py-20 md:py-28">
          <div className="container-c">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
              <Reveal>
                <p className="kicker-d">Para donos de empresa</p>
                <h2 className="mt-5 max-w-[16ch] text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                  <span className="text-grad">É CEO? Construa com IA </span>
                  <span className="accent">sem virar um risco.</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg text-paper/55">
                  O guia “Vibecoding para CEOs”: ferramentas, Firebase, GitHub, Vercel, segurança,
                  custos, glossário, roadmap de 30 dias e 22 prompts prontos. Do plano ao deploy.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {["Grátis", "+22 prompts", "Glossário", "Roadmap de 30 dias"].map((b) => (
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
                  <p className="text-xl font-semibold text-paper">Baixe agora, de graça</p>
                  <p className="mt-1.5 text-sm text-paper/55">
                    Coloque seus dados e o acesso é liberado na hora.
                  </p>
                  <div className="mt-5">
                    <DownloadGate material={ebookCeos} variant="dark" />
                  </div>
                  <p className="mt-4 text-xs text-paper/40">Sem spam. Você cancela quando quiser.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ===== DO BLOG (do banco) ===== */}
      <LatestPosts />

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
