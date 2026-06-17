import { site } from "@/lib/site";

/**
 * Caixa de bio do autor no fim de cada artigo (E-E-A-T legível por humano e máquina).
 * Os dados vêm de site.ts; a entidade Person correspondente é emitida em JSON-LD
 * no layout (com @id) e referenciada como `author` no BlogPosting.
 */
export function AuthorBio() {
  return (
    <aside className="glass mt-14 flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-5">
      <div
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber-light/30 bg-amber-light/10 font-serif text-xl font-semibold text-amber-light"
      >
        RM
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">
          Sobre o autor
        </p>
        <p className="mt-2 text-lg font-medium text-paper">{site.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-paper/60">
          {site.role} e sócio de produtos 100% construídos em vibecoding — MeuCurso, DireitoHub e
          TreinadorOAB. Escreve sobre construir e usar IA com a velocidade da máquina e o rigor de
          engenheiro: <span className="text-paper/80">vibecoding com engenharia</span>.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            className="font-semibold text-amber-light hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noopener noreferrer me"
            className="font-semibold text-amber-light hover:underline"
          >
            Instagram
          </a>
          <a href="/sobre" className="font-semibold text-amber-light hover:underline">
            Sobre →
          </a>
        </div>
      </div>
    </aside>
  );
}
