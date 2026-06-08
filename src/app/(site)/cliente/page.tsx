import type { Metadata } from "next";
import { MemberArea } from "@/components/member-area";

export const metadata: Metadata = {
  title: "Área do Cliente",
  description: "Crie sua conta grátis e acesse os robôs de IA — e os próximos materiais.",
  robots: { index: false, follow: false },
};

export default function ClientePage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-c">
        <MemberArea />
      </div>
    </section>
  );
}
