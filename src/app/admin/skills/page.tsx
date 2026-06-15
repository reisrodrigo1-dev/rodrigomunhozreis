"use client";

import { useEffect, useState } from "react";
import { skills, skillCategories } from "@/lib/skills";
import { fetchCollection } from "@/lib/admin-data";

export default function AdminSkills() {
  const own = skills.filter((s) => !s.base).length;
  const wrappers = skills.length - own;

  // Contagem de downloads por skillId (coleção skill_downloads).
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await fetchCollection("skill_downloads", 5000);
        if (!alive) return;
        const map: Record<string, number> = {};
        for (const r of rows) {
          const sid = typeof r.skillId === "string" ? r.skillId : "?";
          map[sid] = (map[sid] ?? 0) + 1;
        }
        setCounts(map);
        setTotal(rows.length);
      } catch {
        if (alive) setTotal(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Downloads da suíte completa são gravados sob o id "__suite__".
  const suiteCount = counts["__suite__"] ?? 0;

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

      {/* Resumo de downloads */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Downloads totais</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-ink">
            {loading ? "…" : total ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Downloads da suíte</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-ink">
            {loading ? "…" : suiteCount}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Skills no catálogo</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-ink">{skills.length}</p>
        </div>
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
                    <th className="px-4 py-3 text-right font-semibold">Downloads</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => (
                    <tr key={s.id} className="border-b border-line/60 last:border-0">
                      <td className="px-4 py-3">
                        <span className="font-serif font-semibold text-ink">{s.name}</span>
                        {s.starter && (
                          <span className="ml-2 rounded-full border border-amber-deep/30 bg-amber-deep/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-deep">
                            comece por aqui
                          </span>
                        )}
                        <span className="block text-xs text-amber-deep">{s.tagline}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted">{s.id}</td>
                      <td className="px-4 py-3 text-muted">{s.description}</td>
                      <td className="px-4 py-3 text-xs text-muted">{s.base ?? "—"}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-ink">
                        {loading ? "…" : counts[s.id] ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <p className="mt-8 text-xs text-muted">
        Os arquivos das skills moram em <code>~/.claude/skills</code> e no repositório <code>engenho-skills</code>. Esta tela é a vitrine do catálogo, com a contagem de downloads por skill (coleção <code>skill_downloads</code>).
      </p>
    </div>
  );
}
