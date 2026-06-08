import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

/** Layout das páginas públicas: tema escuro premium (glow âmbar + grid). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070608] text-paper">
      {/* Fundo: glow + grade */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-x-0 top-0 h-[560px]"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(224,164,92,0.16), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_55%,transparent_100%)]" />
      </div>

      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
