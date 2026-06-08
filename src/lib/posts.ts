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
  const t = v as { toMillis?: () => number } | null;
  return t && typeof t === "object" && t.toMillis ? t.toMillis() : 0;
}

/** Posts publicados, mais recentes primeiro (leitura pública). */
export async function getPublishedPosts(): Promise<Post[]> {
  const { collection, getDocs, query, where } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(query(collection(db, "posts"), where("status", "==", "published")));
  const posts = snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Post[];
  return posts.sort(
    (a, b) => toMillis(b.publishedAt ?? b.createdAt) - toMillis(a.publishedAt ?? a.createdAt)
  );
}

/** Um post publicado pelo slug, ou null. */
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
