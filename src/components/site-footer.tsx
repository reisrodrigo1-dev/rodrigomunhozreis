import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-page">
      <div className="container-c flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-serif text-lg font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-muted">
            {site.tagline}. Construir com IA, rápido — mas com rigor de engenheiro.
          </p>
        </div>

        <nav aria-label="Rodapé" className="flex flex-col gap-2 text-sm">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-ink-soft hover:text-amber-deep">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft hover:text-amber-deep"
          >
            LinkedIn
          </a>
          <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-amber-deep">
            Instagram
          </a>
          <a href={site.links.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-amber-deep">
            WhatsApp
          </a>
          <a href={site.links.email} className="text-ink-soft hover:text-amber-deep">
            Contato
          </a>
        </div>
      </div>
      <div className="container-c border-t border-line py-6 text-xs text-muted-soft">
        © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
