/**
 * Contador simples de visualizações de post, no Firestore (coleção `pageviews`,
 * 1 doc por slug). Conta uma vez por sessão do navegador (sessionStorage),
 * então um F5 na mesma aba não infla. Para visitantes únicos precisos, use o
 * Vercel Analytics — este contador serve para ver, no admin, qual post bomba.
 */
export async function recordView(slug: string): Promise<void> {
  if (!slug) return;
  const { doc, setDoc, increment, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await setDoc(
    doc(db, "pageviews", slug),
    { slug, count: increment(1), updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Mapa slug -> total de visualizações (admin). */
export async function getViews(): Promise<Record<string, number>> {
  const { collection, getDocs } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(collection(db, "pageviews"));
  const map: Record<string, number> = {};
  snap.docs.forEach((d) => {
    const data = d.data() as { count?: number };
    map[d.id] = data.count ?? 0;
  });
  return map;
}
