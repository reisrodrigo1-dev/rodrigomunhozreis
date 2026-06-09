import type { Robot } from "./robots";
import { seedRobots } from "./robots";

export type RobotInput = {
  name: string;
  tagline: string;
  description: string;
  category: Robot["category"];
  prompt: string;
  whenToUse?: string;
  exampleInput?: string;
  promptVersion?: number;
};

/** Remove chaves com valor undefined (o Firestore Web SDK rejeita undefined). */
function clean<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

/** Todos os robôs — direto do Firestore (banco). */
export async function getRobots(): Promise<Robot[]> {
  const { collection, getDocs } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(collection(db, "robots"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Robot[];
}

export const getAllRobots = getRobots;

export async function getRobot(id: string): Promise<Robot | null> {
  const { doc, getDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const s = await getDoc(doc(db, "robots", id));
  return s.exists() ? ({ id: s.id, ...(s.data() as object) } as Robot) : null;
}

export async function createRobot(data: RobotInput): Promise<string> {
  const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const ref = await addDoc(collection(db, "robots"), {
    ...clean({ ...data }),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateRobot(id: string, data: RobotInput): Promise<void> {
  const { doc, updateDoc, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await updateDoc(doc(db, "robots", id), { ...clean({ ...data }), updatedAt: serverTimestamp() });
}

export async function deleteRobot(id: string): Promise<void> {
  const { doc, deleteDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await deleteDoc(doc(db, "robots", id));
}

/**
 * Importa/atualiza os robôs iniciais (seed) no Firestore.
 * - Cria os que não existem (por nome).
 * - Atualiza os existentes SÓ quando o seed tem promptVersion MAIOR que o do banco
 *   (assim novas versões propagam, mas edições manuais na mesma versão são preservadas).
 */
export async function importSeedRobots(): Promise<{ created: number; updated: number }> {
  const { doc, updateDoc, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const existing = await getAllRobots();
  const byName = new Map(existing.map((r) => [r.name, r]));
  let created = 0;
  let updated = 0;
  for (const r of seedRobots) {
    const input: RobotInput = {
      name: r.name,
      tagline: r.tagline,
      description: r.description,
      category: r.category,
      prompt: r.prompt,
      whenToUse: r.whenToUse,
      promptVersion: r.promptVersion,
    };
    const cur = byName.get(r.name);
    if (!cur) {
      await createRobot(input);
      created++;
    } else if ((cur.promptVersion ?? 1) < (r.promptVersion ?? 1)) {
      await updateDoc(doc(db, "robots", cur.id), {
        ...clean({ ...input }),
        updatedAt: serverTimestamp(),
      });
      updated++;
    }
  }
  return { created, updated };
}
