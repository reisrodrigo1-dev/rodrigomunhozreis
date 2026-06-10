/** Layout da área logada (Central de Robôs): shell de app, sem header/footer de marketing. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#070608] text-paper">{children}</div>;
}
