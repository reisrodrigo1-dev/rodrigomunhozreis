"use client";

type Curso = {
  grupo: "Adultos" | "Crianças";
  titulo: string;
  desc: string;
  publico: string;
  file: string;
};

const cursos: Curso[] = [
  {
    grupo: "Adultos",
    titulo: "IA do Zero ao Avançado",
    desc: "Usar todas as principais IAs com método — do primeiro 'olá' ao assistente pessoal.",
    publico: "Iniciante → Avançado",
    file: "curso-ia-adultos",
  },
  {
    grupo: "Adultos",
    titulo: "Vibecoding do Zero ao Avançado",
    desc: "Construir software com IA e rigor de engenheiro — do plano ao produto no ar.",
    publico: "Iniciante → Avançado",
    file: "curso-vibecoding-adultos",
  },
  {
    grupo: "Crianças",
    titulo: "IA do Zero ao Avançado — Crianças",
    desc: "Descobrir, criar e aprender com a IA — divertido, seguro e com supervisão de adulto.",
    publico: "9 a 13 anos",
    file: "curso-ia-criancas",
  },
  {
    grupo: "Crianças",
    titulo: "Vibecoding do Zero ao Avançado — Crianças",
    desc: "Criar sites e programas com a ajuda da IA — sendo o chefe da máquina, com capricho.",
    publico: "10 a 14 anos",
    file: "curso-vibecoding-criancas",
  },
];

const grupos: Curso["grupo"][] = ["Adultos", "Crianças"];

export default function AdminCursos() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Cursos</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Ementas completas dos cursos presenciais (80h · 40 aulas de 2h cada). Cada aula traz objetivo, o que ensinar,
        exemplos, prompts prontos, links e as Skills do Engenho relacionadas.
      </p>

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
                  <a
                    href={`/cursos/${c.file}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-4 !px-4 !py-2 text-sm"
                  >
                    Abrir ementa ↗
                  </a>
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
