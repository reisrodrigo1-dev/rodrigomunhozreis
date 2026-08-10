import { unstable_cache } from "next/cache";

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

/**
 * Teto de espera pela leitura do Firestore, em ms.
 * As páginas do blog renderizam a cada acesso, dentro de uma função serverless
 * com tempo limitado. Uma leitura pendurada derruba a requisição inteira.
 */
const FIRESTORE_TIMEOUT_MS = 2500;

/**
 * Lê os posts publicados do Firestore (posts criados/editados via /admin).
 *
 * NUNCA pode pendurar. O SDK web do Firebase rodando no servidor às vezes não
 * responde nem devolve erro, e aí quem estoura é a função inteira: a requisição
 * morre em 500 em vez de cair no seed.
 *
 * Um try/catch não resolve isso: ele pega exceção, não travamento. Por isso o
 * timeout explícito. Se estourar, devolve lista vazia e o blog segue no seed,
 * que já é a fonte de verdade do conteúdo.
 */
async function readFirestorePublished(): Promise<Post[]> {
  const timeout = new Promise<Post[]>((resolve) =>
    setTimeout(() => resolve([]), FIRESTORE_TIMEOUT_MS),
  );
  const read = (async (): Promise<Post[]> => {
    try {
      const { collection, getDocs, query, where } = await import("firebase/firestore");
      const { db } = await import("./firebase");
      const snap = await getDocs(query(collection(db, "posts"), where("status", "==", "published")));
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Post[];
    } catch {
      return [];
    }
  })();
  return Promise.race([read, timeout]);
}

/**
 * Mesma leitura, cacheada por 60s.
 *
 * As páginas do blog renderizam a cada acesso, pra conferir a hora de estreia na
 * hora. Isso não pode virar uma ida ao Firestore por visita. O cache separa as
 * duas coisas: a decisão de horário continua a cada acesso (ela é só comparação
 * de data, custo zero), e a ida ao banco acontece no máximo 1x por minuto.
 * Post criado pelo /admin aparece em até 60s.
 */
const fetchFirestorePublished = unstable_cache(readFirestorePublished, ["posts-firestore"], {
  revalidate: 60,
  tags: ["posts"],
});

/**
 * Todos os posts publicados de AMBAS as fontes, deduplicados por slug:
 * - seed (posts escritos no código, sobem no deploy sem precisar importar)
 * - Firestore (posts criados/editados no /admin)
 * Quando o mesmo slug existe nos dois, a versão do Firestore vence
 * (uma edição feita no /admin sobrescreve o seed).
 */
async function getMergedPublished(): Promise<Post[]> {
  const bySlug = new Map<string, Post>();
  // O seed é a base garantida: se o Firestore falhar, o blog continua no ar.
  try {
    const { seedPosts } = await import("./seed-posts");
    for (const p of seedPosts) if (p.status === "published") bySlug.set(p.slug, p);
  } catch {}
  try {
    const fs = await fetchFirestorePublished();
    for (const p of fs) bySlug.set(p.slug, p);
  } catch {}
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
