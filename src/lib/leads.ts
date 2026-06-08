/**
 * Cria um lead (e-mail capturado) na coleção `leads`.
 * O Firebase é importado dinamicamente para NÃO entrar no bundle inicial da página
 * (carrega só quando o usuário envia o formulário). `source` indica a origem.
 */
export async function createLead(email: string, source: string, name?: string) {
  const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  return addDoc(collection(db, "leads"), {
    email: email.trim().toLowerCase(),
    source,
    name: name?.trim() ?? null,
    createdAt: serverTimestamp(),
  });
}
