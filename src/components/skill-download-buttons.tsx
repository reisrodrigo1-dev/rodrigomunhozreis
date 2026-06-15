"use client";

import { useState } from "react";
import { downloadSkill } from "@/lib/skill-download";
import { recordSkillDownload } from "@/lib/skill-track";

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function SpinnerIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
    </svg>
  );
}

/** Pega o e-mail do usuário logado (best-effort) para o rastreio. */
async function currentEmail(): Promise<string | undefined> {
  try {
    const { auth } = await import("@/lib/firebase");
    return auth.currentUser?.email || undefined;
  } catch {
    return undefined;
  }
}

/** Botão "Baixar" (pill) de uma skill individual. */
export function SkillDownloadButton({ skillId }: { skillId: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      // Rastreio best-effort (nunca quebra o download) + download gated.
      void recordSkillDownload(skillId, await currentEmail());
      await downloadSkill(skillId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha no download.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handle}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-amber/50 hover:text-paper disabled:opacity-60"
      >
        {busy ? <SpinnerIcon /> : <DownloadIcon />}
        {busy ? "Baixando…" : "Baixar"}
      </button>
      {error && <span className="text-[11px] text-red-400">{error}</span>}
    </span>
  );
}

/** Botão de destaque (btn-glow) da suíte completa. */
export function SuiteDownloadButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      void recordSkillDownload("__suite__", await currentEmail());
      await downloadSkill("suite");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha no download.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="flex shrink-0 flex-col items-start gap-1.5 md:items-end">
      <button
        type="button"
        onClick={handle}
        disabled={busy}
        className="btn btn-glow inline-flex items-center gap-2 disabled:opacity-70"
      >
        {busy ? <SpinnerIcon /> : <DownloadIcon />}
        {busy ? "Baixando…" : "Baixar suíte (.zip)"}
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </span>
  );
}
