export type Row = Record<string, unknown> & { id: string };

/** Busca uma coleção ordenada por data (Firebase carregado sob demanda). */
export async function fetchCollection(name: string, max = 500): Promise<Row[]> {
  const { collection, getDocs, query, orderBy, limit } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(
    query(collection(db, name), orderBy("createdAt", "desc"), limit(max))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Formata um Timestamp do Firestore para data legível em pt-BR. */
export function fmtDate(ts: unknown): string {
  try {
    const v = ts as { toDate?: () => Date } | string | number | null;
    const d =
      v && typeof v === "object" && "toDate" in v && v.toDate
        ? v.toDate()
        : v
        ? new Date(v as string | number)
        : null;
    return d ? d.toLocaleString("pt-BR") : "—";
  } catch {
    return "—";
  }
}

/** Gera e baixa um CSV a partir de linhas + colunas. */
export function downloadCSV(filename: string, rows: Row[], columns: string[]) {
  const cell = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = columns.join(",");
  const body = rows
    .map((r) => columns.map((c) => cell(c === "createdAt" ? fmtDate(r[c]) : r[c])).join(","))
    .join("\n");
  const blob = new Blob([`﻿${header}\n${body}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Exclui um documento de uma coleção (admin). */
export async function deleteDocById(collectionName: string, id: string): Promise<void> {
  const { doc, deleteDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await deleteDoc(doc(db, collectionName, id));
}

/** Atualiza campos de um documento (admin). */
export async function updateDocFields(
  collectionName: string,
  id: string,
  data: Record<string, unknown>
): Promise<void> {
  const { doc, updateDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await updateDoc(doc(db, collectionName, id), data);
}
