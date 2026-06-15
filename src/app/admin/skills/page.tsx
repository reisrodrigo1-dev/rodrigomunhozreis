"use client";

import { skills, skillCategories } from "@/lib/skills";

export default function AdminSkills() {
  const own = skills.filter((s) => !s.base).length;
  const wrappers = skills.length - own;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Skills</h1>
          <p className="mt-1 text-sm text-muted">
            A suíte Engenho — {skills.length} Claude Skills ({own} próprias · {wrappers} wrappers). Catálogo exibido na área do aluno.
          </p>
        </div>
        <a
          href="/cliente/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost !px-4 !py-2 text-sm"
        >
          Ver na área do aluno ↗
        </a>
      </div>

      {skillCategories.map((cat) => {
        const list = skills.filter((s) => s.category === cat);
        if (list.length === 0) return null;
        return (
          <div key={cat} className="mt-8">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-deep">{cat}</h2>
              <span className="text-xs text-muted">{list.length}</span>
            </div>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                    <th className="px-4 py-3 font-semibold">Skill</th>
                    <th className="px-4 py-3 font-semibold">id</th>
                    <th className="px-4 py-3 font-semibold">O que faz</th>
                    <th className="px-4 py-3 font-semibold">Base</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => (
                    <tr key={s.id} className="border-b border-line/60 last:border-0">
                      <td className="px-4 py-3">
                        <span className="font-serif font-semibold text-ink">{s.name}</span>
                        <span className="block text-xs text-amber-deep">{s.tagline}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted">{s.id}</td>
                      <td className="px-4 py-3 text-muted">{s.description}</td>
                      <td className="px-4 py-3 text-xs text-muted">{s.base ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <p className="mt-8 text-xs text-muted">
        Os arquivos das skills moram em <code>~/.claude/skills</code> e no repositório <code>engenho-skills</code>. Esta tela é a vitrine do catálogo (somente leitura).
      </p>
    </div>
  );
}
