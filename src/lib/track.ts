type AdFn = (...args: unknown[]) => void;

/**
 * Dispara o evento de conversão de "lead" nas plataformas de anúncio instaladas.
 * Seguro: se o Pixel/GA não estiverem carregados (IDs não configurados), não faz nada.
 * Chame quando um e-mail for capturado (download do e-book, newsletter).
 */
export function trackLead(source?: string): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: AdFn; gtag?: AdFn };

  try {
    w.fbq?.("track", "Lead", source ? { content_name: source } : undefined);
  } catch {
    /* pixel ausente — ignora */
  }
  try {
    w.gtag?.("event", "generate_lead", source ? { source } : {});
  } catch {
    /* GA ausente — ignora */
  }
}
