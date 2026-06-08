import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="container-c flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-serif text-sm font-bold text-paper">
            R
          </span>
          <span className="font-serif text-base font-semibold tracking-tight">
            Rodrigo M. Reis
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-amber-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="/#materiais" className="btn btn-primary !px-5 !py-2.5">
          Material grátis
        </a>
      </div>
    </header>
  );
}
