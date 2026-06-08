import { CONSENT_VERSION } from "./consent";

/**
 * Cria um lead (e-mail capturado) na coleção `leads`.
 * O Firebase é importado dinamicamente para NÃO entrar no bundle inicial da página.
 * `source` indica a origem (ex.: "newsletter", "material:ia-sem-medo").
 */
export async function createLead(
  email: string,
  source: string,
  name?: string,
  whatsapp?: string
) {
  const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  return addDoc(collection(db, "leads"), {
    email: email.trim().toLowerCase(),
    name: name?.trim() ?? null,
    whatsapp: whatsapp?.trim() ?? null,
    source,
    consentVersion: CONSENT_VERSION,
    consentAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}
