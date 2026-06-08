import { assets } from "@/lib/assets";

const kindLabel: Record<string, string> = {
  palestra: "Palestra",
  ebook: "E-book",
  cartao: "Cartão",
};

export default function AdminBiblioteca() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Palestras &amp; E-books</h1>
      <p className="mt-2 text-sm text-muted">
        Seus materiais construídos. Abra para apresentar, revisar ou exportar em PDF (Ctrl/Cmd + P).
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {assets.map((a) => (
          <div key={a.id} className="flex flex-col rounded-2xl border border-line bg-white p-6">
            <span className="self-start rounded-full border border-amber/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-deep">
              {kindLabel[a.kind] ?? a.kind}
            </span>
            <h2 className="mt-4 font-serif text-xl font-semibold">{a.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.description}</p>
            <div className="mt-5 flex gap-2">
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary !px-5 !py-2.5"
              >
                Abrir
              </a>
              <a
                href={a.url}
                download
                className="btn btn-ghost !px-5 !py-2.5"
              >
                Baixar
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
