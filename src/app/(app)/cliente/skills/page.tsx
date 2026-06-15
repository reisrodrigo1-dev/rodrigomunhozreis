import type { Metadata } from "next";
import Link from "next/link";
import { skills, skillCategories } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "As Skills do Engenho — capacidades de IA prontas para o Claude Code.",
  robots: { index: false, follow: false },
};

const ownCount = skills.filter((s) => !s.base).length;

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

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
        <a href="/skills/engenho-skills.zip" download className="btn btn-glow inline-flex shrink-0 items-center gap-2">
          <DownloadIcon />
          Baixar suíte (.zip)
        </a>
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
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">{s.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    {s.base ? (
                      <span className="rounded bg-white/8 px-1.5 py-0.5 text-[11px] font-medium text-paper/55">base: {s.base}</span>
                    ) : (
                      <span />
                    )}
                    <a
                      href={`/skills/${s.id}.zip`}
                      download
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-amber/50 hover:text-paper"
                    >
                      <DownloadIcon />
                      Baixar
                    </a>
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
