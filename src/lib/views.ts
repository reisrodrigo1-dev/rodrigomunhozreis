/**
 * Contador simples de visualizações de post, no Firestore (coleção `pageviews`,
 * 1 doc por slug). Conta uma vez por sessão do navegador (sessionStorage),
 * então um F5 na mesma aba não infla. Para visitantes únicos precisos, use o
 * Vercel Analytics — este contador serve para ver, no admin, qual post bomba.
 */
export async function recordView(slug: string): Promise<void> {
  if (!slug) return;
  // 1) contador rápido (já existia)
  const { doc, setDoc, increment, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await setDoc(
    doc(db, "pageviews", slug),
    { slug, count: increment(1), updatedAt: serverTimestamp() },
    { merge: true }
  );
  // 2) telemetria detalhada (país, dispositivo, referrer) — fire-and-forget,
  // nunca bloqueia a leitura nem é fatal se a rota não responder.
  try {
    let leadEmail: string | null = null;
    try {
      const { auth } = await import("./firebase");
      leadEmail = auth.currentUser?.email ?? null;
    } catch { /* sem auth, ok */ }
    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, leadEmail }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* nunca quebra a UX */ }
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

/** Mapa slug -> ISO da última visita (timestamp do servidor). */
export async function getLastViews(): Promise<Record<string, string>> {
  const { collection, getDocs } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(collection(db, "pageviews"));
  const map: Record<string, string> = {};
  snap.docs.forEach((d) => {
    const data = d.data() as { updatedAt?: { toMillis?: () => number; toDate?: () => Date } };
    const t = data.updatedAt;
    if (!t) return;
    const ms = typeof t.toMillis === "function" ? t.toMillis() : t.toDate?.().getTime();
    if (ms) map[d.id] = new Date(ms).toISOString();
  });
  return map;
}
