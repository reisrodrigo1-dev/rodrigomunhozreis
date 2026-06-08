import type { Robot } from "./robots";
import { seedRobots } from "./robots";

export type RobotInput = {
  name: string;
  tagline: string;
  description: string;
  category: Robot["category"];
  prompt: string;
};

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
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateRobot(id: string, data: RobotInput): Promise<void> {
  const { doc, updateDoc, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await updateDoc(doc(db, "robots", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteRobot(id: string): Promise<void> {
  const { doc, deleteDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await deleteDoc(doc(db, "robots", id));
}

/** Importa os robôs iniciais (seed) para o Firestore. Idempotente (pula por nome). */
export async function importSeedRobots(): Promise<number> {
  const existing = await getAllRobots();
  const names = new Set(existing.map((r) => r.name));
  let created = 0;
  for (const r of seedRobots) {
    if (names.has(r.name)) continue;
    await createRobot({
      name: r.name,
      tagline: r.tagline,
      description: r.description,
      category: r.category,
      prompt: r.prompt,
    });
    created++;
  }
  return created;
}
