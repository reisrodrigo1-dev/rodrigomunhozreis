"use client";

type Curso = {
  grupo: "Adultos" | "Crianças";
  titulo: string;
  desc: string;
  publico: string;
  file: string;
  apostilas?: boolean;
  ebook?: boolean;
};

const cursos: Curso[] = [
  {
    grupo: "Adultos",
    titulo: "IA do Zero ao Avançado",
    desc: "Usar todas as principais IAs com método — do primeiro 'olá' ao assistente pessoal.",
    publico: "Iniciante → Avançado",
    file: "curso-ia-adultos",
    apostilas: true,
    ebook: true,
  },
  {
    grupo: "Adultos",
    titulo: "Vibecoding do Zero ao Avançado",
    desc: "Construir software com IA e rigor de engenheiro — do plano ao produto no ar.",
    publico: "Iniciante → Avançado",
    file: "curso-vibecoding-adultos",
    apostilas: true,
    ebook: true,
  },
  {
    grupo: "Crianças",
    titulo: "IA do Zero ao Avançado — Crianças",
    desc: "Descobrir, criar e aprender com a IA — divertido, seguro e com supervisão de adulto.",
    publico: "9 a 13 anos",
    file: "curso-ia-criancas",
    apostilas: true,
    ebook: true,
  },
  {
    grupo: "Crianças",
    titulo: "Vibecoding do Zero ao Avançado — Crianças",
    desc: "Criar sites e programas com a ajuda da IA — sendo o chefe da máquina, com capricho.",
    publico: "10 a 14 anos",
    file: "curso-vibecoding-criancas",
    apostilas: true,
    ebook: true,
  },
];

const grupos: Curso["grupo"][] = ["Adultos", "Crianças"];

export default function AdminCursos() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Cursos</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Ementas completas dos cursos presenciais (80h · 40 aulas de 2h cada) + apostila do aluno, apostila do professor
        e e-book acompanhante editorial. Cada aula traz objetivo, o que ensinar, exemplos, prompts prontos, links e as Skills do Engenho relacionadas.
      </p>

      <div className="mt-6 rounded-2xl border border-green-700/30 bg-green-50 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">EAD 30h · Piloto</p>
          <p className="mt-1 text-sm font-medium text-ink">
            IA do Zero ao Avançado — Crianças 11-13 (30h · misto)
          </p>
          <p className="mt-0.5 text-xs text-muted">
            30 aulas de 1h (2 vídeos de 25 min + exercício) em 15 semanas, com encontro ao vivo semanal.
            Pacote completo: ementa, apostila do aluno, apostila do professor e e-book acompanhante.
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href="/cursos/curso-ia-criancas-30h.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !px-3 !py-1.5 text-xs"
          >
            Ementa ↗
          </a>
          <a
            href="/cursos/curso-ia-criancas-30h-aluno.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost !px-3 !py-1.5 text-xs"
          >
            Apostila do aluno ↗
          </a>
          <a
            href="/cursos/curso-ia-criancas-30h-professor.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost !px-3 !py-1.5 text-xs"
          >
            Apostila do professor ↗
          </a>
          <a
            href="/cursos/curso-ia-criancas-30h-ebook.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !px-3 !py-1.5 text-xs"
          >
            E-book ↗
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-deep/30 bg-amber-soft/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-deep">Base pedagógica</p>
            <p className="mt-1 text-sm font-medium text-ink">
              Alinhamento MEC + BNCC Computação
            </p>
            <p className="mt-0.5 text-xs text-muted">
              Documento oficial que sustenta os cursos (aplicável aos 4). Mostre pra escola, instituição ou família.
            </p>
          </div>
          <a
            href="/cursos/curso-alinhamento-mec-bncc.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !px-4 !py-2 text-sm"
          >
            Abrir documento ↗
          </a>
        </div>
      </div>

      {grupos.map((g) => (
        <div key={g} className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-deep">Para {g.toLowerCase()}</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {cursos
              .filter((c) => c.grupo === g)
              .map((c) => (
                <div key={c.file} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                  <h3 className="font-serif text-lg font-semibold text-ink">{c.titulo}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted">{c.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-amber-deep">
                    <span className="rounded-full bg-amber-soft px-2 py-0.5">80 horas</span>
                    <span className="rounded-full bg-amber-soft px-2 py-0.5">40 aulas · 2h</span>
                    <span className="rounded-full bg-amber-soft px-2 py-0.5">{c.publico}</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href={`/cursos/${c.file}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary !px-4 !py-2 text-sm"
                    >
                      Ementa ↗
                    </a>
                    {c.apostilas ? (
                      <div className="flex gap-2">
                        <a
                          href={`/cursos/${c.file}-aluno.html`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost flex-1 !px-2 !py-2 text-xs"
                        >
                          Apostila do aluno ↗
                        </a>
                        <a
                          href={`/cursos/${c.file}-professor.html`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost flex-1 !px-2 !py-2 text-xs"
                        >
                          Apostila do professor ↗
                        </a>
                      </div>
                    ) : (
                      <span className="text-[11px] text-muted">Apostilas em preparação…</span>
                    )}
                    {c.ebook ? (
                      <a
                        href={`/cursos/${c.file}-ebook.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary !px-4 !py-2 text-sm"
                      >
                        E-book acompanhante ↗
                      </a>
                    ) : (
                      <span className="text-[11px] text-muted">E-book em preparação…</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <p className="mt-8 text-xs text-muted">
        As ementas abrem em HTML pronto para ler e imprimir (A4). Os arquivos ficam em <code>public/cursos/</code>.
      </p>
    </div>
  );
}
