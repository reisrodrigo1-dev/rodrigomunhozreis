"use client";

import { useEffect, useState } from "react";
import type { Robot } from "@/lib/robots";

const URL_PREFILL_LIMIT = 1500;

const TARGETS: { key: string; label: string; clean: string; q?: (p: string) => string }[] = [
  { key: "chatgpt", label: "ChatGPT", clean: "https://chatgpt.com/", q: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { key: "claude", label: "Claude", clean: "https://claude.ai/new", q: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}` },
  { key: "gemini", label: "Gemini", clean: "https://gemini.google.com/app" },
];

/**
 * Converte o prompt (texto com **negrito** markdown) em HTML seguro:
 * escapa tudo primeiro e só então aplica negrito e quebras de linha.
 */
function renderPrompt(p: string): string {
  const esc = p
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return esc
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-amber-light">$1</strong>')
    .replace(/\n/g, "<br/>");
}

/** Painel estilo terminal com o prompt completo do robô. */
export function RobotViewer({ robot, onClose }: { robot: Robot; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  // Trava o scroll e fecha com Esc.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function copyPrompt() {
    if (!navigator.clipboard) return Promise.resolve();
    return navigator.clipboard.writeText(robot.prompt);
  }

  function flash() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  function handleCopy() {
    copyPrompt().then(flash);
  }

  function openIn(t: (typeof TARGETS)[number]) {
    const url = t.q && robot.prompt.length < URL_PREFILL_LIMIT ? t.q(robot.prompt) : t.clean;
    copyPrompt().finally(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      flash();
    });
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Prompt do robô ${robot.name}`}
    >
      <div
        className="glass flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden !rounded-2xl border border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de terminal */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]/80" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]/80" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]/80" />
          </span>
          <span className="min-w-0 flex-1 truncate text-center font-mono text-xs text-paper/50">
            {robot.name.toLowerCase().replace(/\s+/g, "-")}.prompt
          </span>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-7 w-7 place-items-center rounded-md text-paper/60 transition-colors hover:bg-white/10 hover:text-paper"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Cabeçalho do robô */}
        <div className="border-b border-white/10 px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-paper">{robot.name}</h3>
            <span className="rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-light">
              {robot.category}
            </span>
            {robot.promptVersion && (
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-paper/45">
                v{robot.promptVersion}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-semibold text-amber-light">{robot.tagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-paper/60">{robot.description}</p>
          {robot.whenToUse && (
            <p className="mt-2 text-xs text-paper/45">
              <span className="font-semibold text-paper/60">Quando usar:</span> {robot.whenToUse}
            </p>
          )}
        </div>

        {/* O prompt */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-black/30 px-6 py-5">
          <div
            className="font-mono text-[13px] leading-relaxed text-paper/75"
            dangerouslySetInnerHTML={{ __html: renderPrompt(robot.prompt) }}
          />
        </div>

        {/* Ações */}
        <div className="border-t border-white/10 bg-white/5 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={handleCopy} className="btn btn-glow !px-5 !py-2.5">
                {copied ? "Copiado ✓" : "Copiar prompt"}
              </button>
              <span className="ml-1 text-xs text-paper/40">Copiar e abrir:</span>
              {TARGETS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => openIn(t)}
                  className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-amber/50 hover:text-paper"
                >
                  {t.label}
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] text-paper/35">
              {robot.prompt.length.toLocaleString("pt-BR")} caracteres
            </span>
          </div>
          <p className="mt-2 text-[11px] text-paper/35">
            O prompt é copiado automaticamente — abra a IA e cole com Ctrl/Cmd + V. Funciona também no Claude Desktop e no Claude Code.
          </p>
        </div>
      </div>
    </div>
  );
}
