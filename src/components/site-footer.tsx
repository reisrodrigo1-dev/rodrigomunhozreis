import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#040304]">
      <div className="container-c flex flex-col gap-8 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-amber to-amber-deep text-xs font-semibold text-ink">
              R
            </span>
            <p className="text-lg font-semibold text-paper">{site.name}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-paper/50">
            {site.tagline}. Construir com IA, rápido — mas com rigor de engenheiro.
          </p>
        </div>

        <nav aria-label="Navegação" className="flex flex-col gap-3 text-sm">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-paper/55 hover:text-amber-light">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-amber-light">
            LinkedIn
          </a>
          <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-amber-light">
            Instagram
          </a>
          <a href={site.links.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-amber-light">
            WhatsApp
          </a>
          <a href={site.links.email} className="text-paper/55 hover:text-amber-light">
            Contato
          </a>
        </div>
      </div>
      <div className="container-c border-t border-white/10 py-6 text-xs text-paper/35">
        © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
