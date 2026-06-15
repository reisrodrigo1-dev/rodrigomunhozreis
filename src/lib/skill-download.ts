/**
 * Cliente do download gated de skills. Pega o ID token do usuário logado,
 * chama /api/skill com Authorization: Bearer e dispara o download do .zip.
 *
 * `target` = id da skill (ex.: "forja") OU "suite" para a suíte completa.
 * Só funciona logado (a página /cliente/skills já é da área logada).
 */
async function getIdToken(): Promise<string | null> {
  const { auth } = await import("./firebase");
  const { onAuthStateChanged } = await import("firebase/auth");
  const user =
    auth.currentUser ??
    (await new Promise<import("firebase/auth").User | null>((resolve) => {
      const off = onAuthStateChanged(auth, (u) => {
        off();
        resolve(u);
      });
    }));
  return user ? user.getIdToken() : null;
}

export async function downloadSkill(target: string): Promise<void> {
  const token = await getIdToken();
  if (!token) {
    throw new Error("Você precisa estar logado para baixar.");
  }

  const isSuite = target === "suite";
  const query = isSuite ? "suite=1" : `id=${encodeURIComponent(target)}`;
  const filename = isSuite ? "engenho-skills.zip" : `${target}.zip`;

  const res = await fetch(`/api/skill?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(
      res.status === 401
        ? "Sessão expirada. Atualize a página e tente de novo."
        : "Não foi possível baixar o arquivo. Tente novamente."
    );
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
