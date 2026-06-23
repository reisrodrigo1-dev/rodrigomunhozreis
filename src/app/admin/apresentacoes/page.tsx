"use client";

type Apresentacao = {
  titulo: string;
  desc: string;
  file: string;
  tag: string;
};

const apresentacoes: Apresentacao[] = [
  {
    titulo: "Plataformas BipeTech — Guia para o Marketing",
    desc: "TreinadorOAB, ConectaEduca e DireitoHub: o que são, diferenciais, concorrentes, personas, números reais (dos bancos), cobrança e taglines prontas.",
    file: "plataformas-bipetech",
    tag: "Interno · MKT",
  },
];

export default function AdminApresentacoes() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Apresentações</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Materiais internos. Acessíveis pelo painel — não listados publicamente no site.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {apresentacoes.map((a) => (
          <div key={a.file} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
            <span className="self-start rounded-full bg-amber-soft px-2 py-0.5 text-[11px] font-semibold text-amber-deep">
              {a.tag}
            </span>
            <h3 className="mt-3 font-serif text-lg font-semibold text-ink">{a.titulo}</h3>
            <p className="mt-1.5 flex-1 text-sm text-muted">{a.desc}</p>
            <a
              href={`/apresentacoes/${a.file}.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-4 self-start !px-4 !py-2 text-sm"
            >
              Abrir apresentação ↗
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-amber/30 bg-amber-soft/50 p-4">
        <p className="text-xs leading-relaxed text-ink/70">
          ⚠️ <b>Dados internos</b> (nomes de clientes, números, preços). O link não é indexado pelo
          Google, mas é acessível por quem tiver a URL — <b>não divulgue o link fora do time</b>.
          Os arquivos ficam em <code>public/apresentacoes/</code>.
        </p>
      </div>
    </div>
  );
}
