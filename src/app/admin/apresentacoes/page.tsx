"use client";

type Item = { titulo: string; desc: string; file: string };
type Secao = { grupo: string; subtitulo: string; itens: Item[] };

const secoes: Secao[] = [
  {
    grupo: "Apresentação geral",
    subtitulo: "Deck completo das 3 plataformas — para reuniões com o time.",
    itens: [
      {
        titulo: "Plataformas BipeTech — Guia para o Marketing",
        desc: "25 slides: o que são, diferenciais, concorrentes, personas, números reais, cobrança e taglines.",
        file: "plataformas-bipetech",
      },
    ],
  },
  {
    grupo: "Media Kits",
    subtitulo: "One-pager de vendas/parceria por produto (imprensa, anúncios, parceiros).",
    itens: [
      { titulo: "TreinadorOAB", desc: "Sobre, público, diferenciais, números reais e planos.", file: "media-kit-treinadoroab" },
      { titulo: "ConectaEduca", desc: "Sobre, público, diferenciais, clientes de referência e modelo 90/10.", file: "media-kit-conectaeduca" },
      { titulo: "DireitoHub", desc: "Sobre, público, diferenciais, números e planos.", file: "media-kit-direitohub" },
    ],
  },
  {
    grupo: "Brand Kits",
    subtitulo: "Identidade visual por produto: cores (HEX), fontes, logo e botões. Para o design.",
    itens: [
      { titulo: "TreinadorOAB", desc: "Paleta, Space Grotesk + Plus Jakarta, logo e gradientes.", file: "brand-kit-treinadoroab" },
      { titulo: "ConectaEduca", desc: "Paleta azul + laranja, Plus Jakarta + Inter, logo.", file: "brand-kit-conectaeduca" },
      { titulo: "DireitoHub", desc: "Paleta azul/neon, IBM Plex Sans, logo e gradientes.", file: "brand-kit-direitohub" },
    ],
  },
];

export default function AdminApresentacoes() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Apresentações</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Materiais internos das plataformas BipeTech. Acessíveis pelo painel — não listados publicamente no site.
      </p>

      {secoes.map((s) => (
        <div key={s.grupo} className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-deep">{s.grupo}</h2>
          <p className="mt-0.5 text-sm text-muted">{s.subtitulo}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.itens.map((a) => (
              <div key={a.file} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                <h3 className="font-serif text-lg font-semibold text-ink">{a.titulo}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted">{a.desc}</p>
                <a
                  href={`/apresentacoes/${a.file}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-4 self-start !px-4 !py-2 text-sm"
                >
                  Abrir ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-10 rounded-xl border border-amber/30 bg-amber-soft/50 p-4">
        <p className="text-xs leading-relaxed text-ink/70">
          ⚠️ <b>Dados internos</b> (clientes, números, preços). Os links não são indexados pelo Google
          (robots + noindex), mas são acessíveis por quem tiver a URL — <b>não divulgue fora do time</b>.
          Os arquivos ficam em <code>public/apresentacoes/</code>.
        </p>
      </div>
    </div>
  );
}
