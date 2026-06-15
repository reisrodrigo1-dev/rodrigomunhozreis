/**
 * Registra cada download de skill na coleção `skill_downloads` para métricas no admin.
 * Firebase importado dinamicamente (fora do bundle inicial), no padrão de downloads.ts.
 *
 * NUNCA deve quebrar o download: qualquer falha aqui é engolida (try/catch). O rastreio
 * é secundário; entregar o arquivo ao aluno é o que importa.
 */
export async function recordSkillDownload(skillId: string, email?: string): Promise<void> {
  try {
    const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
    const { db } = await import("./firebase");
    await addDoc(collection(db, "skill_downloads"), {
      skillId,
      email: email?.trim().toLowerCase() || null,
      createdAt: serverTimestamp(),
    });
  } catch {
    // Rastreio é best-effort — nunca atrapalha o download.
  }
}
