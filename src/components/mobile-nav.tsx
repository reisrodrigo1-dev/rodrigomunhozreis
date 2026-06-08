"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Trava o scroll do body e fecha com Esc quando o menu está aberto.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid h-10 w-10 place-items-center rounded-lg text-paper/80 transition-colors hover:bg-white/5 hover:text-paper"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-0 z-[60] bg-[#070608]/95 backdrop-blur-md"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-c flex h-16 items-center justify-between">
              <span className="text-base font-semibold tracking-tight text-paper">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="grid h-10 w-10 place-items-center rounded-lg text-paper/80 transition-colors hover:bg-white/5 hover:text-paper"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <motion.nav
              aria-label="Principal (mobile)"
              className="container-c mt-6 flex flex-col gap-1"
              initial={reduce ? false : "hidden"}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {site.nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/5 py-4 text-2xl font-medium text-paper/85 transition-colors hover:text-amber-light"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href={site.clienteArea.href}
                  onClick={() => setOpen(false)}
                  className="btn btn-dark-ghost w-full !py-3.5"
                >
                  {site.clienteArea.label}
                </Link>
                <Link
                  href="/#materiais"
                  onClick={() => setOpen(false)}
                  className="btn btn-glow w-full !py-3.5"
                >
                  Material grátis
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
