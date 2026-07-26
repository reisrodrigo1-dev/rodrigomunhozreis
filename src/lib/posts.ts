export type FaqItem = { q: string; a: string };

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  coverUrl?: string;
  status: "draft" | "published";
  tags?: string[];
  /** Versão do conteúdo. O importador atualiza quando o seed tem versão maior. */
  contentVersion?: number;
  publishedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
  /** Resumo em 3 linhas exibido no topo (AEO/GEO — resposta direta pra IA citar). */
  summary?: string;
  /** FAQ opcional exibida no fim + JSON-LD FAQPage (bom pra AI Overviews). */
  faq?: FaqItem[];
};

/** Gera um slug a partir do título (sem acentos, kebab-case). */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toMillis(v: unknown): number {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") return Date.parse(v) || 0;
  const t = v as { toMillis?: () => number; toDate?: () => Date };
  if (typeof t.toMillis === "function") return t.toMillis();
  if (typeof t.toDate === "function") return t.toDate().getTime();
  return 0;
}

function sortByDate(a: Post, b: Post): number {
  return toMillis(b.publishedAt ?? b.createdAt) - toMillis(a.publishedAt ?? a.createdAt);
}

/** Converte qualquer formato de data (Timestamp Firestore / string / number) para ISO 8601, ou undefined. */
export function toIsoDate(v: unknown): string | undefined {
  const ms = toMillis(v);
  return ms ? new Date(ms).toISOString() : undefined;
}

/**
 * Um post está "no ar" quando:
 * - status é "published", E
 * - a data de publicação já chegou (publishedAt <= agora).
 *
 * Isso habilita AGENDAMENTO: um post com publishedAt no futuro fica invisível
 * até a data chegar. Sem data, considera no ar (compat com posts antigos).
 */
export function isLive(p: Post, now: number = Date.now()): boolean {
  if (p.status !== "published") return false;
  const ms = toMillis(p.publishedAt ?? p.createdAt);
  if (!ms) return true;
  return ms <= now;
}

/** Lê os posts publicados do Firestore (posts criados/editados via /admin). */
async function fetchFirestorePublished(): Promise<Post[]> {
  try {
    const { collection, getDocs, query, where } = await import("firebase/firestore");
    const { db } = await import("./firebase");
    const snap = await getDocs(query(collection(db, "posts"), where("status", "==", "published")));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Post[];
  } catch {
    return [];
  }
}

/**
 * Todos os posts publicados de AMBAS as fontes, deduplicados por slug:
 * - seed (posts escritos no código, sobem no deploy sem precisar importar)
 * - Firestore (posts criados/editados no /admin)
 * Quando o mesmo slug existe nos dois, a versão do Firestore vence
 * (uma edição feita no /admin sobrescreve o seed).
 */
async function getMergedPublished(): Promise<Post[]> {
  const { seedPosts } = await import("./seed-posts");
  const bySlug = new Map<string, Post>();
  for (const p of seedPosts) if (p.status === "published") bySlug.set(p.slug, p);
  const fs = await fetchFirestorePublished();
  for (const p of fs) bySlug.set(p.slug, p);
  return [...bySlug.values()];
}

/** Posts que já estão no ar (respeitando a data de agendamento), mais recentes primeiro. */
export async function getPublishedPosts(): Promise<Post[]> {
  const all = await getMergedPublished();
  return all.filter((p) => isLive(p)).sort(sortByDate);
}

/** Um post pelo slug — só retorna se já passou da data de publicação, senão null (404). */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getMergedPublished();
  const p = all.find((x) => x.slug === slug);
  if (!p || !isLive(p)) return null;
  return p;
}
