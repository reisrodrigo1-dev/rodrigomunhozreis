"use client";

import { useState } from "react";
import type { Robot } from "@/lib/robots";

/**
 * Destinos para abrir o prompt. Prompts profissionais são longos e estouram o
 * limite de tamanho de URL (~2000 chars), truncando justo nos guardrails. Por
 * isso o padrão é COPIAR + abrir a aba LIMPA (o usuário cola com Ctrl/Cmd+V).
 * O prefill via ?q= só é usado como atalho quando o prompt é curto o bastante.
 */
const URL_PREFILL_LIMIT = 1500;

const TARGETS: { key: string; label: string; clean: string; q?: (p: string) => string }[] = [
  { key: "chatgpt", label: "ChatGPT", clean: "https://chatgpt.com/", q: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { key: "claude", label: "Claude", clean: "https://claude.ai/new", q: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}` },
  { key: "gemini", label: "Gemini", clean: "https://gemini.google.com/app" },
];

export function RobotCard({ robot }: { robot: Robot }) {
  const [copied, setCopied] = useState(false);

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
    // Sempre copia (garante o prompt inteiro na área de transferência) e abre.
    // Só usa prefill por URL quando o prompt cabe — senão chegaria truncado.
    const url = t.q && robot.prompt.length < URL_PREFILL_LIMIT ? t.q(robot.prompt) : t.clean;
    copyPrompt().finally(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      flash();
    });
  }

  return (
    <div className="glass glass-hover flex h-full flex-col p-7">
      <h3 className="text-xl font-semibold text-paper">{robot.name}</h3>
      <p className="mt-1 text-sm font-semibold text-amber-light">{robot.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/55">{robot.description}</p>

      <button onClick={handleCopy} className="btn btn-glow mt-6 w-fit !px-5 !py-2.5">
        {copied ? "Copiado ✓" : "Copiar prompt"}
      </button>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-paper/45">Copiar e abrir:</span>
        {TARGETS.map((t) => (
          <button
            key={t.key}
            onClick={() => openIn(t)}
            className="rounded-full border border-white/12 px-3 py-1 text-paper/70 transition-colors hover:border-amber/50 hover:text-paper"
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-paper/35">
        O prompt é copiado automaticamente — abra a IA e cole com Ctrl/Cmd + V. Funciona também no Claude Desktop.
      </p>
    </div>
  );
}
