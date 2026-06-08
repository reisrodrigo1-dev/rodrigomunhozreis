export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" aria-label="Carregando" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-amber" />
    </div>
  );
}
