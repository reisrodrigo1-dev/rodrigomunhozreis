import { CONSENT_VERSION } from "./consent";

/**
 * Cria um lead (e-mail capturado) na coleção `leads`.
 * O Firebase é importado dinamicamente para NÃO entrar no bundle inicial da página.
 * `source` indica a origem (ex.: "newsletter", "material:ia-sem-medo").
 *
 * DEDUPE: o ID do documento é determinístico (origem + e-mail). Como as regras
 * só permitem CREATE público (update é só admin), um segundo envio do mesmo
 * e-mail na mesma origem é negado pelo servidor — e tratado aqui como sucesso.
 * Resultado: base de leads sem duplicatas, garantido pelas regras.
 */
export async function createLead(
  email: string,
  source: string,
  name?: string,
  whatsapp?: string
): Promise<{ id: string }> {
  const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const cleanEmail = email.trim().toLowerCase();
  const id = `${source}__${cleanEmail}`.replace(/[^a-zA-Z0-9@._:-]/g, "_").slice(0, 900);
  try {
    await setDoc(doc(db, "leads", id), {
      email: cleanEmail,
      name: name?.trim() ?? null,
      whatsapp: whatsapp?.trim() ?? null,
      source,
      consentVersion: CONSENT_VERSION,
      consentAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    // permission-denied = lead já existe (update público é bloqueado). Sucesso.
    const code = (err as { code?: string })?.code ?? "";
    if (code !== "permission-denied") throw err;
  }
  return { id };
}
