"use client";

import { useState } from "react";
import type { Robot } from "@/lib/robots";
import type { RobotInput } from "@/lib/robots-db";

const field =
  "w-full rounded-lg border border-line bg-white px-4 text-sm outline-none focus:border-amber";

export function RobotEditor({
  initial,
  onSave,
  onDelete,
  saving,
}: {
  initial?: Robot;
  onSave: (data: RobotInput) => void;
  onDelete?: () => void;
  saving?: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState<Robot["category"]>(
    initial?.category ?? "Criar sistemas com IA"
  );
  const [prompt, setPrompt] = useState(initial?.prompt ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ name, tagline, description, category, prompt });
  }

  return (
    <form onSubmit={submit} className="max-w-3xl">
      <div className="grid gap-4">
        <label className="block">
          <span className="text-sm font-medium">Nome</span>
          <input className={`${field} mt-1 min-h-[44px]`} value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Frase (tagline)</span>
            <input className={`${field} mt-1 min-h-[44px]`} value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Categoria</span>
            <select
              className={`${field} mt-1 min-h-[44px]`}
              value={category}
              onChange={(e) => setCategory(e.target.value as Robot["category"])}
            >
              <option value="Criar sistemas com IA">Criar sistemas com IA</option>
              <option value="Para o negócio">Para o negócio</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium">Descrição (no card)</span>
          <textarea className={`${field} mt-1 min-h-[70px] py-2`} value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Prompt (o que é copiado)</span>
          <textarea className={`${field} mt-1 min-h-[320px] py-3 font-mono`} value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
        </label>
        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-60">
            {saving ? "Salvando…" : "Salvar"}
          </button>
          {onDelete && (
            <button type="button" onClick={onDelete} className="ml-auto text-sm text-red-500 hover:underline">
              Excluir
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
