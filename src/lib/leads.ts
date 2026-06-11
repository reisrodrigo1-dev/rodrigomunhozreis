import { CONSENT_VERSION } from "./consent";
import { getAttribution } from "./attribution";

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
  const ref = doc(db, "leads", id);

  const base = {
    email: cleanEmail,
    name: name?.trim() ?? null,
    whatsapp: whatsapp?.trim() ?? null,
    source,
    consentVersion: CONSENT_VERSION,
    consentAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  };
  // Origem (UTM + referrer) para atribuição de campanha no admin.
  const attr = getAttribution();
  const full = {
    ...base,
    utmSource: attr.utmSource ?? null,
    utmMedium: attr.utmMedium ?? null,
    utmCampaign: attr.utmCampaign ?? null,
    referrer: attr.referrer ?? null,
  };

  try {
    await setDoc(ref, full);
  } catch (err) {
    const code = (err as { code?: string })?.code ?? "";
    if (code !== "permission-denied") throw err;
    // permission-denied = lead já existe (dedupe) OU as firestore.rules ainda
    // não permitem os campos de origem. Tenta sem a origem — assim o lead
    // NUNCA se perde, mesmo antes de você publicar as novas regras.
    try {
      await setDoc(ref, base);
    } catch {
      // dedupe real (doc existe, update é só admin) — tratado como sucesso.
    }
  }
  return { id };
}
