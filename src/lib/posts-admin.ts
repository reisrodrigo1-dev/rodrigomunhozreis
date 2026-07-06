import type { FaqItem, Post } from "./posts";
import { seedPosts } from "./seed-posts";

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl?: string;
  status: "draft" | "published";
  tags?: string[];
  contentVersion?: number;
  /** Resumo em 3 linhas exibido no topo (AEO/GEO). */
  summary?: string;
  /** FAQ opcional pra schema FAQPage. */
  faq?: FaqItem[];
};

/** Remove chaves com valor undefined (o Firestore Web SDK rejeita undefined). */
function clean<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

/** Todos os posts (admin) — do Firestore. */
export async function getAllPosts(): Promise<Post[]> {
  const { collection, getDocs } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(collection(db, "posts"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Post[];
}

export async function getPost(id: string): Promise<Post | null> {
  const { doc, getDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const s = await getDoc(doc(db, "posts", id));
  return s.exists() ? ({ id: s.id, ...(s.data() as object) } as Post) : null;
}

export async function createPost(data: PostInput): Promise<string> {
  const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const ref = await addDoc(collection(db, "posts"), clean({
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: data.status === "published" ? serverTimestamp() : null,
  }));
  return ref.id;
}

export async function updatePost(id: string, data: PostInput): Promise<void> {
  const { doc, updateDoc, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await updateDoc(doc(db, "posts", id), clean({
    ...data,
    updatedAt: serverTimestamp(),
    ...(data.status === "published" ? { publishedAt: serverTimestamp() } : {}),
  }));
}

export async function deletePost(id: string): Promise<void> {
  const { doc, deleteDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await deleteDoc(doc(db, "posts", id));
}

/**
 * Importa/atualiza os posts iniciais (seed) no Firestore.
 * - Cria os que não existem (por slug).
 * - Atualiza um existente SÓ quando o seed tem contentVersion MAIOR que o do banco
 *   (assim correções propagam, mas posts sem versão nova não são tocados).
 */
export async function importSeedPosts(): Promise<{ created: number; updated: number }> {
  const { doc, updateDoc, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const existing = await getAllPosts();
  const bySlug = new Map(existing.map((p) => [p.slug, p]));
  let created = 0;
  let updated = 0;
  for (const p of seedPosts) {
    const cur = bySlug.get(p.slug);
    if (!cur) {
      await createPost({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        coverUrl: p.coverUrl,
        status: p.status,
        tags: p.tags,
        contentVersion: p.contentVersion,
        summary: p.summary,
        faq: p.faq,
      });
      created++;
    } else if ((p.contentVersion ?? 1) > ((cur.contentVersion as number) ?? 1)) {
      await updateDoc(
        doc(db, "posts", cur.id),
        clean({
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          coverUrl: p.coverUrl,
          tags: p.tags,
          contentVersion: p.contentVersion,
          summary: p.summary,
          faq: p.faq,
          updatedAt: serverTimestamp(),
        })
      );
      updated++;
    } else if (!cur.summary && p.summary) {
      // Backfill: seed já tem summary mas Firestore não (bug antigo). Não conta como updated.
      await updateDoc(
        doc(db, "posts", cur.id),
        clean({ summary: p.summary, faq: p.faq, updatedAt: serverTimestamp() })
      );
    }
  }
  return { created, updated };
}
