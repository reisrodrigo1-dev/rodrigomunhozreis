"use client";

import { useState } from "react";
import type { Robot } from "@/lib/robots";

export function RobotCard({ robot }: { robot: Robot }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(robot.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(robot.prompt)}`;

  return (
    <div className="glass glass-hover flex h-full flex-col p-7">
      <h3 className="text-xl font-semibold text-paper">{robot.name}</h3>
      <p className="mt-1 text-sm font-semibold text-amber-light">{robot.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/55">{robot.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={copy} className="btn btn-glow !px-5 !py-2.5">
          {copied ? "Copiado ✓" : "Copiar prompt"}
        </button>
        <a
          href={chatgptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark-ghost !px-5 !py-2.5"
        >
          Abrir no ChatGPT →
        </a>
      </div>
      <p className="mt-3 text-xs text-paper/40">
        Cole em qualquer IA: ChatGPT, Gemini, Claude, Copilot…
      </p>
    </div>
  );
}
