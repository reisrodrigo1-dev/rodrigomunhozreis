"use client";

import { useState } from "react";
import type { Robot } from "@/lib/robots";

/** Destinos para abrir o prompt. ChatGPT e Claude web aceitam o prompt na URL (?q=);
 *  Gemini não tem prefill confiável, então abrimos e o usuário cola (já copiamos antes). */
const TARGETS: { key: string; label: string; url: (p: string) => string }[] = [
  { key: "chatgpt", label: "ChatGPT", url: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { key: "claude", label: "Claude", url: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}` },
  { key: "gemini", label: "Gemini", url: () => `https://gemini.google.com/app` },
];

export function RobotCard({ robot }: { robot: Robot }) {
  const [copied, setCopied] = useState(false);

  function copyPrompt() {
    if (!navigator.clipboard) return Promise.resolve();
    return navigator.clipboard.writeText(robot.prompt);
  }

  function handleCopy() {
    copyPrompt().then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function openIn(url: string) {
    // Sempre copia antes de abrir — garante o prompt na área de transferência.
    copyPrompt().finally(() => window.open(url, "_blank", "noopener,noreferrer"));
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
        <span className="text-paper/45">Abrir em:</span>
        {TARGETS.map((t) => (
          <button
            key={t.key}
            onClick={() => openIn(t.url(robot.prompt))}
            className="rounded-full border border-white/12 px-3 py-1 text-paper/70 transition-colors hover:border-amber/50 hover:text-paper"
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-paper/35">
        O prompt é copiado ao abrir — é só colar (Ctrl/Cmd + V). Funciona também no Claude Desktop.
      </p>
    </div>
  );
}
