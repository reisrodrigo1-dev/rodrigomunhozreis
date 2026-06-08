import type { Post } from "./posts";

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl?: string;
  status: "draft" | "published";
  tags?: string[];
};

/** Todos os posts (admin). */
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
  const ref = await addDoc(collection(db, "posts"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: data.status === "published" ? serverTimestamp() : null,
  });
  return ref.id;
}

export async function updatePost(id: string, data: PostInput): Promise<void> {
  const { doc, updateDoc, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await updateDoc(doc(db, "posts", id), {
    ...data,
    updatedAt: serverTimestamp(),
    ...(data.status === "published" ? { publishedAt: serverTimestamp() } : {}),
  });
}

export async function deletePost(id: string): Promise<void> {
  const { doc, deleteDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await deleteDoc(doc(db, "posts", id));
}
