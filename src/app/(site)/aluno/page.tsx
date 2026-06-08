import { redirect } from "next/navigation";

// Rota antiga — agora chamamos de "Área do Cliente".
export default function AlunoRedirect() {
  redirect("/cliente");
}
