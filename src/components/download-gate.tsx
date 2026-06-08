"use client";

import { useState } from "react";
import { createLead } from "@/lib/leads";
import { recordDownload } from "@/lib/downloads";
import type { Material } from "@/lib/materials";

/**
 * Portão de download: captura o e-mail, grava o lead + o registro de download
 * no Firestore e então libera o arquivo.
 */
export function DownloadGate({
  material,
  variant = "light",
}: {
  material: Material;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const lead = await createLead(email, `material:${material.slug}`);
      await recordDownload(material, email, lead.id);
      setStatus("done");
      window.open(material.fileUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className={`text-sm font-medium ${dark ? "text-amber-light" : "text-amber-deep"}`}>
        ✓ Seu download começou. Verifique também sua caixa de entrada.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor={`dl-${material.slug}`} className="sr-only">
        Seu e-mail para baixar {material.title}
      </label>
      <input
        id={`dl-${material.slug}`}
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail"
        className={`min-h-[44px] flex-1 rounded-full border px-4 text-sm outline-none transition-colors ${
          dark
            ? "border-white/15 bg-white/5 text-paper placeholder:text-paper/40 focus:border-amber"
            : "border-line bg-paper text-ink placeholder:text-muted focus:border-amber"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`btn ${dark ? "btn-glow" : "btn-primary"} !px-5 !py-2.5 disabled:opacity-60`}
      >
        {status === "loading" ? "Enviando…" : "Baixar grátis"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400">Algo deu errado. Tente de novo.</p>
      )}
    </form>
  );
}
