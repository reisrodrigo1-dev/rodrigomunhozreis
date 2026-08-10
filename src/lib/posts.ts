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
 * Página estática não sente isso (não chama nada em runtime), mas página gerada
 * sob demanda chama, dentro de uma função serverless com tempo limitado.
 */
const FIRESTORE_TIMEOUT_MS = 2500;

/**
 * Lê os posts publicados do Firestore (posts criados/editados via /admin).
 *
 * NUNCA pode pendurar. O SDK web do Firebase rodando no servidor às vezes não
 * responde nem devolve erro, e aí quem estoura é a função inteira: a requisição
 * morre em 500 em vez de cair no seed. Foi assim que os posts agendados voltaram
 * a dar 500 depois que passaram a ser gerados sob demanda (10/08/2026).
 *
 * Um try/catch não resolve isso: ele pega exceção, não travamento. Por isso o
 * timeout explícito. Se estourar, devolve lista vazia e o blog segue no seed,
 * que já é a fonte de verdade do conteúdo.
 */
async function fetchFirestorePublished(): Promise<Post[]> {
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

/**
 * Um post pelo slug IGNORANDO a data de estreia. Devolve também o agendado.
 *
 * A rota do post usa esta, e não a `getPostBySlug`, de propósito. A data decide
 * ONDE o post aparece (índice, RSS, sitemap, relacionados), não SE a página
 * existe. Ver o comentário de `getPrerenderableSlugs`.
 */
export async function findPostBySlug(slug: string): Promise<Post | null> {
  const all = await getMergedPublished();
  return all.find((x) => x.slug === slug) ?? null;
}

/**
 * Slugs que o build pré-renderiza: TODOS os posts publicados, agendados inclusive.
 *
 * Já tentamos os dois extremos e os dois quebraram:
 *
 * 1. Pré-renderizar tudo E barrar o agendado por data na própria página. O build
 *    assava a página de "não encontrado" no lugar do post, e o que o build assa
 *    fica congelado no deploy inteiro. O post estreava em 404 (05/08/2026).
 * 2. Deixar o agendado fora, pra ser gerado sob demanda. Em produção a geração
 *    sob demanda falha em 500, de forma consistente e rápida (8 posts seguidos,
 *    10/08/2026). Não reproduz no `next start`, porque a Vercel empacota a função
 *    de outro jeito. Já tinha acontecido antes, no commit 55f35e1.
 *
 * A saída é não depender de nenhum dos dois: toda página existe desde o build, e
 * quem controla a estreia são as listagens, que já filtram por `isLive`. Enquanto
 * não chega a hora, o post não é anunciado em lugar nenhum e sai com `noindex`.
 * O custo assumido: quem souber a URL exata consegue ler antes. O conteúdo já
 * está no repositório, então a troca compensa contra estrear quebrado.
 */
export function getPrerenderableSlugs(posts: Post[]): string[] {
  return posts.map((p) => p.slug);
}
