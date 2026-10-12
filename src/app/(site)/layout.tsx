import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

/** Layout das páginas públicas: tema teal (gradiente + brilho azul + grade). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#081A23] text-paper">
      {/* Fundo: gradiente teal + aurora (manchas que derivam) + grade + vinheta */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Gradiente base, o mesmo das artes do LinkedIn */}
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#081A23_0%,#0B2B3A_55%,#0E3C50_100%)]" />
        {/* Manchas azuis com movimento lento */}
        <div className="aurora-a absolute -right-[12%] -top-[18%] h-[50rem] w-[50rem] rounded-full bg-amber-light/20 blur-[110px]" />
        <div className="aurora-b absolute -left-[10%] top-[4%] h-[42rem] w-[42rem] rounded-full bg-amber-deep/25 blur-[110px]" />
        <div className="aurora-c absolute left-[30%] top-[12%] h-[34rem] w-[34rem] rounded-full bg-amber/10 blur-[110px]" />
        {/* Grade técnica */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        {/* Vinheta leve para leitura, sem apagar o gradiente */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-5%,transparent_45%,#081A2399_100%)]" />
      </div>

      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
