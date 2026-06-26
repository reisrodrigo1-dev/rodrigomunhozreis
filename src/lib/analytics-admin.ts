import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export type PageVisit = {
  slug: string;
  country: string | null;
  city: string | null;
  device: "mobile" | "tablet" | "desktop" | "bot";
  referrer: string | null;
  leadEmail: string | null;
  createdAt: { toMillis?: () => number; toDate?: () => Date };
};

export type Bucket = { key: string; value: number };

export type AnalyticsSnapshot = {
  totalVisits: number;
  uniqueLeadEmails: number;
  visitsByDay: Bucket[];
  topCountries: Bucket[];
  topDevices: Bucket[];
  topReferrers: Bucket[];
  topPosts: Bucket[];
  visitsBySlug: Record<string, number>;
};

function ts(v: PageVisit["createdAt"]): number {
  if (!v) return 0;
  if (typeof v.toMillis === "function") return v.toMillis();
  if (typeof v.toDate === "function") return v.toDate().getTime();
  return 0;
}

function topN(map: Record<string, number>, n: number): Bucket[] {
  return Object.entries(map)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}

/**
 * Lê visits dos últimos 30 dias e devolve agregações prontas pro dashboard.
 * Tudo no cliente — usa as regras (read só admin), seguro.
 */
export async function getAnalyticsSnapshot(): Promise<AnalyticsSnapshot> {
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const q = query(collection(db, "page_visits"), where("createdAt", ">=", cutoff), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  const visits: PageVisit[] = snap.docs.map((d) => d.data() as PageVisit);

  // Buckets por dia (YYYY-MM-DD), país, device, referrer, slug
  const byDay: Record<string, number> = {};
  const byCountry: Record<string, number> = {};
  const byDevice: Record<string, number> = {};
  const byReferrer: Record<string, number> = {};
  const bySlug: Record<string, number> = {};
  const uniqueEmails = new Set<string>();

  for (const v of visits) {
    const ms = ts(v.createdAt);
    if (!ms) continue;
    const day = new Date(ms).toISOString().slice(0, 10);
    byDay[day] = (byDay[day] ?? 0) + 1;
    if (v.country) byCountry[v.country] = (byCountry[v.country] ?? 0) + 1;
    if (v.device) byDevice[v.device] = (byDevice[v.device] ?? 0) + 1;
    if (v.referrer) byReferrer[v.referrer] = (byReferrer[v.referrer] ?? 0) + 1;
    if (v.slug) bySlug[v.slug] = (bySlug[v.slug] ?? 0) + 1;
    if (v.leadEmail) uniqueEmails.add(v.leadEmail);
  }

  // Série dos últimos 30 dias completos (preenche dias zerados)
  const visitsByDay: Bucket[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    visitsByDay.push({ key: d, value: byDay[d] ?? 0 });
  }

  return {
    totalVisits: visits.length,
    uniqueLeadEmails: uniqueEmails.size,
    visitsByDay,
    topCountries: topN(byCountry, 5),
    topDevices: topN(byDevice, 4),
    topReferrers: topN(byReferrer, 5),
    topPosts: topN(bySlug, 5),
    visitsBySlug: bySlug,
  };
}
