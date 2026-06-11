const KEY = "rmr-attrib";

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
};

function clean(v: string | null, max = 120): string | undefined {
  if (!v) return undefined;
  return v.trim().slice(0, max) || undefined;
}

/**
 * Lê a origem do lead: UTM da URL atual (prioridade) + first-touch salvo no
 * localStorage + domínio de referência. Persiste o primeiro toque com UTM,
 * pra não perder a origem se a pessoa navegar antes de converter.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  let saved: Attribution = {};
  try {
    saved = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    saved = {};
  }

  const p = new URLSearchParams(window.location.search);
  const url: Attribution = {
    utmSource: clean(p.get("utm_source")),
    utmMedium: clean(p.get("utm_medium")),
    utmCampaign: clean(p.get("utm_campaign")),
  };

  let referrer: string | undefined;
  try {
    referrer = document.referrer ? new URL(document.referrer).hostname : undefined;
  } catch {
    referrer = undefined;
  }

  const merged: Attribution = {
    utmSource: url.utmSource ?? saved.utmSource,
    utmMedium: url.utmMedium ?? saved.utmMedium,
    utmCampaign: url.utmCampaign ?? saved.utmCampaign,
    referrer: saved.referrer ?? clean(referrer ?? null),
  };

  // First-touch: se a URL trouxe UTM, guarda pra próximos passos.
  try {
    if (url.utmSource || url.utmMedium || url.utmCampaign) {
      localStorage.setItem(KEY, JSON.stringify(merged));
    }
  } catch {
    /* localStorage indisponível — ignora */
  }

  return merged;
}
