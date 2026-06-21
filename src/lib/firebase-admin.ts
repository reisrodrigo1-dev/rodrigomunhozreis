import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Firebase Admin (SERVIDOR APENAS — nunca importar no cliente).
 * Credencial via env `FIREBASE_SERVICE_ACCOUNT` (JSON do service account, em string).
 * O Admin SDK escreve ignorando as regras do Firestore — por isso só pode ser usado
 * em rotas de servidor já protegidas (ex.: o webhook do Resend, validado por assinatura).
 *
 * Retorna null se a credencial não estiver configurada — quem chama deve degradar
 * com elegância (não quebrar o fluxo).
 */
let cached: Firestore | null = null;

export function adminDb(): Firestore | null {
  if (cached) return cached;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;

  let creds: { project_id?: string; client_email?: string; private_key?: string };
  try {
    creds = JSON.parse(raw);
  } catch {
    console.error("[firebase-admin] FIREBASE_SERVICE_ACCOUNT não é um JSON válido.");
    return null;
  }
  if (!creds.project_id || !creds.client_email || !creds.private_key) {
    console.error("[firebase-admin] service account incompleto.");
    return null;
  }

  const app: App = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: creds.project_id,
          clientEmail: creds.client_email,
          // Em alguns ambientes a chave vem com \n escapado — normaliza.
          privateKey: creds.private_key.replace(/\\n/g, "\n"),
        }),
      });

  cached = getFirestore(app);
  return cached;
}
