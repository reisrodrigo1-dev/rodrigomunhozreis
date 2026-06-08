import Link from "next/link";
import { site } from "@/lib/site";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#070608]/70 backdrop-blur-md">
      <div className="container-c flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={site.name}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber to-amber-deep font-semibold text-ink shadow-lg shadow-amber/20 transition group-hover:shadow-amber/40">
            R
          </span>
          <span className="text-base font-semibold tracking-tight text-paper">Rodrigo M. Reis</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-paper/60 transition-colors hover:text-amber-light"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <MobileNav />

        <div className="hidden items-center gap-3 md:flex md:gap-5">
          <Link
            href={site.clienteArea.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-paper/75 transition-colors hover:text-amber-light md:border-l md:border-white/10 md:pl-5"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {site.clienteArea.label}
          </Link>
          <a href="/#materiais" className="btn btn-glow !px-5 !py-2.5">
            Material grátis
          </a>
        </div>
      </div>
    </header>
  );
}
