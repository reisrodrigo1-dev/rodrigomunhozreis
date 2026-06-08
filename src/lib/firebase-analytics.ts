import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { app } from "./firebase";

/** Inicializa o Analytics só no browser e quando suportado (evita erro no SSR). */
export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  try {
    if (await isSupported()) return getAnalytics(app);
  } catch {
    /* ignora ambientes sem suporte */
  }
  return null;
}
