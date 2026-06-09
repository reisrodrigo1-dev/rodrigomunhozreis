"use client";

import { useEffect } from "react";
import { recordView } from "@/lib/views";

/** Registra uma visualização do post (1x por sessão do navegador). */
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;
    const key = `pv:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage indisponível — segue e conta a visita mesmo assim.
    }
    recordView(slug).catch(() => {});
  }, [slug]);

  return null;
}
