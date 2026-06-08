import { seedPosts } from "./seed-posts";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  coverUrl?: string;
  status: "draft" | "published";
  tags?: string[];
  publishedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
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

const publishedSeed = seedPosts.filter((p) => p.status === "published");

/** Posts publicados (Firestore + seed do código), mais recentes primeiro. */
export async function getPublishedPosts(): Promise<Post[]> {
  let fire: Post[] = [];
  try {
    const { collection, getDocs, query, where } = await import("firebase/firestore");
    const { db } = await import("./firebase");
    const snap = await getDocs(query(collection(db, "posts"), where("status", "==", "published")));
    fire = snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Post[];
  } catch {
    fire = [];
  }
  const slugs = new Set(fire.map((p) => p.slug));
  return [...fire, ...publishedSeed.filter((p) => !slugs.has(p.slug))].sort(sortByDate);
}

/** Os N posts mais recentes (síncrono, só do seed) — para a home estática. */
export function getFeaturedPosts(n = 3): Post[] {
  return [...publishedSeed].sort(sortByDate).slice(0, n);
}

/** Um post publicado pelo slug (Firestore ou seed), ou null. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
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
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...(d.data() as object) } as Post;
    }
  } catch {
    /* segue para o seed */
  }
  return publishedSeed.find((p) => p.slug === slug) ?? null;
}
