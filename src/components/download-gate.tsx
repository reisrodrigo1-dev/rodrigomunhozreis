"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLead } from "@/lib/leads";
import { recordDownload } from "@/lib/downloads";
import { maskName, maskPhone } from "@/lib/format";
import { ConsentCheckbox } from "@/components/consent-checkbox";
import type { Material } from "@/lib/materials";

/**
 * Portão de download: captura nome + e-mail + WhatsApp (com máscaras), grava o
 * lead e o registro de download no Firestore e então libera o arquivo.
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
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const inputCls = `min-h-[44px] w-full rounded-xl border px-4 text-sm outline-none transition-colors ${
    dark
      ? "border-white/15 bg-white/5 text-paper placeholder:text-paper/40 focus:border-amber"
      : "border-line bg-paper text-ink placeholder:text-muted focus:border-amber"
  }`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = whatsapp.replace(/\D/g, "");
    if (!name.trim() || !email || digits.length < 10 || !consent) return;
    setStatus("loading");
    try {
      const lead = await createLead(email, `material:${material.slug}`, name, whatsapp);
      await recordDownload(material, email, lead.id);
      setStatus("done");
      window.open(material.fileUrl, "_blank", "noopener,noreferrer");
      // Continua a jornada na página de obrigado (o material já abriu em nova aba).
      setTimeout(() => router.push("/obrigado"), 600);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className={`text-sm font-medium ${dark ? "text-amber-light" : "text-amber-deep"}`}>
        ✓ Tudo certo, {name.split(" ")[0]}! Seu download já começou.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <label htmlFor={`nm-${material.slug}`} className="sr-only">
        Nome completo
      </label>
      <input
        id={`nm-${material.slug}`}
        type="text"
        required
        autoComplete="name"
        value={name}
        onChange={(e) => setName(maskName(e.target.value))}
        placeholder="Nome completo"
        className={inputCls}
      />
      <label htmlFor={`em-${material.slug}`} className="sr-only">
        E-mail
      </label>
      <input
        id={`em-${material.slug}`}
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        placeholder="Seu melhor e-mail"
        className={inputCls}
      />
      <label htmlFor={`wa-${material.slug}`} className="sr-only">
        WhatsApp
      </label>
      <input
        id={`wa-${material.slug}`}
        type="tel"
        required
        inputMode="numeric"
        autoComplete="tel"
        value={whatsapp}
        onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
        placeholder="WhatsApp — (11) 91234-5678"
        maxLength={16}
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
      {status === "error" && (
        <p className="text-sm text-red-400">Algo deu errado. Tente de novo.</p>
      )}
    </form>
  );
}
