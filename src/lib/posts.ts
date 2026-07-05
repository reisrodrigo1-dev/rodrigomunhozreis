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

/** Posts publicados — direto do Firestore (banco de dados). */
export async function getPublishedPosts(): Promise<Post[]> {
  const { collection, getDocs, query, where } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(query(collection(db, "posts"), where("status", "==", "published")));
  return (snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Post[]).sort(sortByDate);
}

/** Um post publicado pelo slug — direto do Firestore, ou null. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { collection, getDocs, query, where, limit } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(
    query(
      collection(db, "posts"),
      where("slug", "==", slug),
      where("status", "==", "published"),
      limit(1)
    )
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as object) } as Post;
}
