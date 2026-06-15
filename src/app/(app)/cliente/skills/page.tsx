import type { Metadata } from "next";
import Link from "next/link";
import { skills, skillCategories } from "@/lib/skills";
import { SkillDownloadButton, SuiteDownloadButton } from "@/components/skill-download-buttons";

export const metadata: Metadata = {
  title: "Skills",
  description: "As Skills do Engenho — capacidades de IA prontas para o Claude Code.",
  robots: { index: false, follow: false },
};

const ownCount = skills.filter((s) => !s.base).length;

// Por que começar por estas três — texto curto, sem hype, para o onboarding.
const starterReasons: Record<string, string> = {
  forja: "Tudo no vibecoding começa com um bom pedido. A Forja monta o prompt certo pelo método P.R.O.M.P.T.E.R. — é a base de todas as outras.",
  cofre: "Antes de subir qualquer coisa, blinde o Firebase. A Cofre audita suas regras e entrega o conserto — segurança em vez de vibecoding às cegas.",
  tomo: "Transforme o que você sabe em material pronto pra entregar. A Tomo cria e-books e guias no padrão editorial da casa — sua primeira isca.",
};

const starterSkills = skills.filter((s) => s.starter);

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/cliente" className="inline-flex items-center gap-2 text-sm text-paper/55 transition-colors hover:text-paper">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
          Central de Robôs
        </Link>
        <span className="rounded-full border border-amber/25 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber-light">
          {skills.length} skills
        </span>
      </div>

      {/* Header */}
      <div className="mt-6">
        <p className="kicker-d">Engenho</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
          <span className="text-grad">Skills — </span>
          <span className="accent">capacidades prontas.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-paper/55">
          Diferente dos robôs (prompts pra copiar em qualquer IA), as <strong className="text-paper">Skills</strong> são
          capacidades que o <strong className="text-paper">Claude Code</strong> carrega e usa sozinho — com segurança e
          método embutidos. É o nível avançado do vibecoding com engenharia.
        </p>
      </div>

      {/* Suíte completa — destaque */}
      <div className="glass mt-7 grid items-center gap-5 p-6 md:grid-cols-[1fr_auto] md:p-8">
        <div>
          <h2 className="font-serif text-xl font-semibold text-paper">Baixe a suíte completa</h2>
          <p className="mt-1.5 text-sm text-paper/55">
            As {skills.length} skills num único arquivo ({ownCount} próprias + {skills.length - ownCount} que estendem
            skills existentes). Descompacte, copie pra sua pasta de skills e pronto.
          </p>
        </div>
        <SuiteDownloadButton />
      </div>

      {/* Como instalar */}
      <div className="glass mt-5 p-6">
        <h2 className="font-serif text-lg font-semibold text-paper">Como instalar (1 minuto)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-paper/65">
          <li><strong className="text-paper">Baixe</strong> a suíte completa (acima) ou uma skill avulsa (no catálogo).</li>
          <li><strong className="text-paper">Descompacte</strong> o arquivo.</li>
          <li>
            <strong className="text-paper">Copie a(s) pasta(s)</strong> para a pasta de skills do Claude Code:
            <div className="mt-1.5 space-y-1 font-mono text-xs">
              <div className="rounded bg-white/8 px-2 py-1 text-amber-light">Windows: C:\Users\SEU_USUARIO\.claude\skills\</div>
              <div className="rounded bg-white/8 px-2 py-1 text-amber-light">Mac/Linux: ~/.claude/skills/</div>
            </div>
          </li>
          <li><strong className="text-paper">Reinicie o Claude Code.</strong> As skills carregam na inicialização.</li>
          <li>Pronto — a skill <strong className="text-paper">dispara sozinha</strong> quando o pedido casa com o que ela faz, ou você chama pelo nome.</li>
        </ol>
        <p className="mt-3 text-xs text-paper/40">
          Precisa do <strong className="text-paper/60">Claude Code</strong> instalado. Skills marcadas com <span className="text-amber-light">base</span> estendem uma skill existente — instale também a base indicada.
        </p>
      </div>

      {/* Comece por aqui — onboarding */}
      <section className="mt-10">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">Comece por aqui</h2>
          <span className="font-mono text-xs text-paper/30">{starterSkills.length}</span>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-paper/55">
          São muitas skills — não tente instalar tudo de uma vez. Estas <strong className="text-paper">três</strong> são
          as mais recomendadas pra quem está começando: uma base de prompt, uma de segurança e uma de conteúdo. Baixe,
          use por uns dias e volte pelo resto.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {starterSkills.map((s) => (
            <div key={s.id} className="glass relative flex h-full flex-col p-5 ring-1 ring-amber/25">
              <span className="absolute -top-2.5 left-5 rounded-full border border-amber/30 bg-amber/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-light">
                Recomendada
              </span>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-paper">{s.name}</h3>
                <code className="font-mono text-[11px] text-paper/35">{s.id}</code>
              </div>
              <p className="mt-0.5 text-sm font-semibold text-amber-light">{s.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper/55">{starterReasons[s.id] ?? s.description}</p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-paper/45">
                <span className="font-semibold text-paper/65">Quando usar:</span> {s.whenToUse}
              </p>
              <div className="mt-4 flex items-center justify-end">
                <SkillDownloadButton skillId={s.id} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catálogo por categoria */}
      {skillCategories.map((cat) => {
        const list = skills.filter((s) => s.category === cat);
        if (list.length === 0) return null;
        return (
          <section key={cat} className="mt-10">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">{cat}</h2>
              <span className="font-mono text-xs text-paper/30">{list.length}</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <div key={s.id} className="glass flex h-full flex-col p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-paper">{s.name}</h3>
                    <code className="font-mono text-[11px] text-paper/35">{s.id}</code>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-amber-light">{s.tagline}</p>
                  <div className="mt-2 flex-1 space-y-1.5 text-sm leading-relaxed">
                    <p className="text-paper/60"><span className="font-semibold text-paper/80">O que faz:</span> {s.description}</p>
                    <p className="text-paper/45"><span className="font-semibold text-paper/65">Quando usar:</span> {s.whenToUse}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    {s.base ? (
                      <span className="rounded bg-white/8 px-1.5 py-0.5 text-[11px] font-medium text-paper/55">base: {s.base}</span>
                    ) : (
                      <span />
                    )}
                    <SkillDownloadButton skillId={s.id} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <div className="glass mt-12 p-6 text-center">
        <p className="text-sm text-paper/55">
          As Skills do Engenho evoluem junto com o método. Baixou uma vez? Volte aqui de tempos em tempos para pegar as atualizações.
        </p>
      </div>
    </div>
  );
}
