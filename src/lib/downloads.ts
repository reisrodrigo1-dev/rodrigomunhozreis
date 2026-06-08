import type { Material } from "./materials";
import { CONSENT_VERSION } from "./consent";

/**
 * Registra CADA download na coleção `downloads` — "tudo que baixam fica armazenado".
 * Firebase importado dinamicamente (fora do bundle inicial).
 */
export async function recordDownload(material: Material, email: string, leadId?: string) {
  const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  return addDoc(collection(db, "downloads"), {
    materialId: material.id,
    materialTitle: material.title,
    email: email.trim().toLowerCase(),
    leadId: leadId ?? null,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    consentVersion: CONSENT_VERSION,
    consentAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}
