import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

/** Layout das páginas públicas: tema escuro premium (glow âmbar + grid). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070608] text-paper">
      {/* Fundo: aurora (manchas que derivam) + grade + vinheta */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Manchas âmbar com movimento lento (intensas) */}
        <div className="aurora-a absolute -left-[10%] -top-[12%] h-[50rem] w-[50rem] rounded-full bg-amber/30 blur-[100px]" />
        <div className="aurora-b absolute -right-[8%] top-[0%] h-[42rem] w-[42rem] rounded-full bg-amber-deep/28 blur-[110px]" />
        <div className="aurora-c absolute left-[26%] top-[14%] h-[36rem] w-[36rem] rounded-full bg-amber/20 blur-[110px]" />
        {/* Grade técnica */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        {/* Vinheta inferior para profundidade e leitura */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,transparent_40%,#070608_92%)]" />
      </div>

      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
