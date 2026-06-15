"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLead } from "@/lib/leads";
import { recordDownload } from "@/lib/downloads";
import { trackLead } from "@/lib/track";
import { maskName } from "@/lib/format";
import { ConsentCheckbox } from "@/components/consent-checkbox";
import type { Material } from "@/lib/materials";

/**
 * Portão de download: captura nome + e-mail (baixa fricção, sem telefone), grava
 * o lead e o registro de download no Firestore e então libera o arquivo.
 * Validação SEMPRE dá feedback — nunca falha em silêncio.
 */
export function DownloadGate({
  material,
  variant = "light",
}: {
  material: Material;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const inputCls = `min-h-[44px] w-full rounded-xl border px-4 text-sm outline-none transition-colors ${
    dark
      ? "border-white/15 bg-white/5 text-paper placeholder:text-paper/40 focus:border-amber"
      : "border-line bg-paper text-ink placeholder:text-muted focus:border-amber"
  }`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg("");

    // Validação COM feedback (nunca retorna em silêncio).
    if (!name.trim()) return setErrMsg("Digite seu nome.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setErrMsg("Digite um e-mail válido.");
    if (!consent) return setErrMsg("Marque a caixinha de consentimento para liberar o download.");

    setStatus("loading");

    // 1) Captura do lead — é o que importa. Só isto, se falhar de verdade, vira erro.
    let leadId: string | undefined;
    try {
      const lead = await createLead(email, `material:${material.slug}`, name);
      leadId = lead.id;
      trackLead(`material:${material.slug}`); // conversão p/ Meta Pixel + GA4
    } catch (err) {
      console.error("[download-gate] createLead falhou:", err);
      setStatus("error");
      return;
    }

    // 2) Registro de download é só analytics — NUNCA bloqueia a entrega do material.
    try {
      await recordDownload(material, email, leadId);
    } catch (err) {
      console.error("[download-gate] recordDownload falhou (ignorado):", err);
    }

    // 3) Entrega o material e segue a jornada na página de obrigado.
    setStatus("done");
    window.open(material.fileUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => router.push("/obrigado"), 600);
  }

  if (status === "done") {
    return (
      <p className={`text-sm font-medium ${dark ? "text-amber-light" : "text-amber-deep"}`}>
        ✓ Tudo certo, {name.split(" ")[0]}! Seu download já começou.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5" noValidate>
      <label htmlFor={`nm-${material.slug}`} className="sr-only">
        Nome
      </label>
      <input
        id={`nm-${material.slug}`}
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(maskName(e.target.value))}
        placeholder="Seu nome"
        className={inputCls}
      />
      <label htmlFor={`em-${material.slug}`} className="sr-only">
        E-mail
      </label>
      <input
        id={`em-${material.slug}`}
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        placeholder="Seu melhor e-mail"
        className={inputCls}
      />
      <ConsentCheckbox checked={consent} onChange={setConsent} dark={dark} id={`cs-${material.slug}`} />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`btn ${dark ? "btn-glow" : "btn-primary"} mt-1 w-full disabled:opacity-60`}
      >
        {status === "loading" ? "Enviando…" : "Quero o e-book grátis"}
      </button>
      {errMsg && <p className="text-sm text-red-400">{errMsg}</p>}
      {status === "error" && (
        <p className="text-sm text-red-400">Algo deu errado ao enviar. Tente de novo.</p>
      )}
    </form>
  );
}
