"use client";

import { useState } from "react";
import type { Robot } from "@/lib/robots";

/**
 * Card do robô na Central. O prompt completo é visto no RobotViewer (modal
 * estilo terminal); aqui ficam o resumo, o favorito e as ações rápidas.
 */
export function RobotCard({
  robot,
  onView,
  fav = false,
  onToggleFav,
}: {
  robot: Robot;
  onView?: (r: Robot) => void;
  fav?: boolean;
  onToggleFav?: (r: Robot) => void;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(robot.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <div className="glass glass-hover group relative flex h-full flex-col p-6">
      {onToggleFav && (
        <button
          onClick={() => onToggleFav(robot)}
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={fav}
          className={`absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full transition-colors ${
            fav ? "text-amber" : "text-paper/30 hover:bg-white/5 hover:text-paper/70"
          }`}
        >
          <svg className="h-4.5 w-4.5" width="18" height="18" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      )}

      <h3 className="pr-8 text-lg font-semibold text-paper">{robot.name}</h3>
      <p className="mt-1 text-sm font-semibold text-amber-light">{robot.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-paper/55">{robot.description}</p>
      {robot.whenToUse ? (
        <p className="mt-3 flex-1 text-xs text-paper/45">
          <span className="font-semibold text-paper/60">Quando usar:</span> {robot.whenToUse}
        </p>
      ) : (
        <div className="flex-1" />
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {onView ? (
          <button onClick={() => onView(robot)} className="btn btn-glow !px-5 !py-2.5 !text-sm">
            Ver prompt
          </button>
        ) : (
          <button onClick={handleCopy} className="btn btn-glow !px-5 !py-2.5 !text-sm">
            {copied ? "Copiado ✓" : "Copiar prompt"}
          </button>
        )}
        {onView && (
          <button
            onClick={handleCopy}
            className="rounded-full border border-white/12 px-4 py-2 text-xs text-paper/70 transition-colors hover:border-amber/50 hover:text-paper"
          >
            {copied ? "Copiado ✓" : "Copiar"}
          </button>
        )}
      </div>
    </div>
  );
}
