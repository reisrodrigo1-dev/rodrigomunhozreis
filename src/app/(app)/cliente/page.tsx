import type { Metadata } from "next";
import { MemberArea } from "@/components/member-area";

export const metadata: Metadata = {
  title: "Área do Cliente",
  description: "Sua Central de Robôs de IA — visualize, copie e use em qualquer IA.",
  robots: { index: false, follow: false },
};

export default function ClientePage() {
  return <MemberArea />;
}
