export type Metric = { value: string; label: string };
export type Testimonial = { quote: string; name: string; role: string };
export type SiteSettings = { metrics: Metric[]; testimonials: Testimonial[] };

export const defaultSettings: SiteSettings = { metrics: [], testimonials: [] };

/** Lê a config editável da home (settings/home). Fallback: vazio. */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { doc, getDoc } = await import("firebase/firestore");
    const { db } = await import("./firebase");
    const s = await getDoc(doc(db, "settings", "home"));
    if (!s.exists()) return defaultSettings;
    const d = s.data() as Partial<SiteSettings>;
    return { metrics: d.metrics ?? [], testimonials: d.testimonials ?? [] };
  } catch {
    return defaultSettings;
  }
}

/** Salva a config da home (admin). */
export async function saveSiteSettings(data: SiteSettings): Promise<void> {
  const { doc, setDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await setDoc(doc(db, "settings", "home"), data, { merge: true });
}
