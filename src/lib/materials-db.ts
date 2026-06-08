import type { Material } from "./materials";
import { materials as seedMaterials } from "./materials";

export type MaterialInput = Omit<Material, "id">;

/** Materiais cadastrados no Firestore (admin). */
export async function getMaterialsDb(): Promise<Material[]> {
  const { collection, getDocs } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(collection(db, "materials"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Material[];
}

/** Materiais para o site público: DB + seed estático, sem duplicar por slug. */
export async function getMaterialsMerged(): Promise<Material[]> {
  let dbItems: Material[] = [];
  try {
    dbItems = await getMaterialsDb();
  } catch {
    dbItems = [];
  }
  const slugs = new Set(dbItems.map((m) => m.slug));
  return [...dbItems, ...seedMaterials.filter((m) => !slugs.has(m.slug))];
}

export async function createMaterial(data: MaterialInput): Promise<string> {
  const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const ref = await addDoc(collection(db, "materials"), { ...data, createdAt: serverTimestamp() });
  return ref.id;
}

export async function deleteMaterial(id: string): Promise<void> {
  const { doc, deleteDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await deleteDoc(doc(db, "materials", id));
}

/** Sobe um arquivo para o Storage (pasta materials/) e devolve a URL pública. */
export async function uploadMaterialFile(file: File): Promise<string> {
  const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
  const { storage } = await import("./firebase");
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `materials/${Date.now()}_${safe}`;
  const r = ref(storage, path);
  await uploadBytes(r, file);
  return getDownloadURL(r);
}
