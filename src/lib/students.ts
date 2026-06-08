import { CONSENT_VERSION } from "./consent";

export type Student = {
  uid: string;
  nome: string;
  email: string;
  whatsapp: string;
  perfil: string;
  /** Entitlement — definido só por admin/Cloud Function, nunca pelo cliente. Ausente = "free". */
  plan?: "free" | "pro";
  createdAt?: unknown;
};

export type StudentInput = Omit<Student, "uid" | "createdAt" | "plan">;

/** Cria o documento do aluno (também serve de lead). Firebase carregado sob demanda. */
export async function createStudent(uid: string, data: StudentInput): Promise<void> {
  const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  await setDoc(doc(db, "students", uid), {
    ...data,
    email: data.email.trim().toLowerCase(),
    consentVersion: CONSENT_VERSION,
    consentAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}

export async function getStudent(uid: string): Promise<Student | null> {
  const { doc, getDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const s = await getDoc(doc(db, "students", uid));
  return s.exists() ? ({ uid: s.id, ...(s.data() as object) } as Student) : null;
}

/** Todos os alunos (admin). */
export async function getAllStudents(): Promise<Student[]> {
  const { collection, getDocs } = await import("firebase/firestore");
  const { db } = await import("./firebase");
  const snap = await getDocs(collection(db, "students"));
  return snap.docs.map((d) => ({ uid: d.id, ...(d.data() as object) })) as Student[];
}
