"use client";

import { useEffect, useState } from "react";

/** Barra fina no topo que mostra o progresso de leitura do artigo. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-amber to-amber-deep transition-[width] duration-150"
      style={{ width: `${pct}%` }}
      aria-hidden="true"
    />
  );
}
