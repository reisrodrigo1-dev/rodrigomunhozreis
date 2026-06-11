"use client";

import { useState } from "react";
import { createLead } from "@/lib/leads";
import { trackLead } from "@/lib/track";
import { ConsentCheckbox } from "@/components/consent-checkbox";

type Variant = "light" | "dark";

/** Formulário de captura de e-mail — grava o lead no Firestore. */
export function NewsletterForm({
  variant = "light",
  source = "newsletter",
}: {
  variant?: Variant;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const dark = variant === "dark";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;
    setStatus("loading");
    try {
      await createLead(email, source);
      trackLead(source); // conversão p/ Meta Pixel + GA4
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className={dark ? "text-paper" : "text-ink"}>
        ✓ Pronto! Você está na lista.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`email-${source}`} className="sr-only">
          Seu melhor e-mail
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor e-mail"
          className={`min-h-[48px] flex-1 rounded-full border px-5 text-sm outline-none transition-colors ${
            dark
              ? "border-white/20 bg-white/5 text-paper placeholder:text-paper/50 focus:border-amber"
              : "border-line bg-white text-ink placeholder:text-muted focus:border-amber"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`btn ${dark ? "btn-on-dark" : "btn-primary"} disabled:opacity-60`}
        >
          {status === "loading" ? "Enviando…" : "Quero receber"}
        </button>
      </div>
      <ConsentCheckbox checked={consent} onChange={setConsent} dark={dark} id={`cs-${source}`} />
      {status === "error" && (
        <p className="text-sm text-red-500">Algo deu errado. Tente de novo.</p>
      )}
    </form>
  );
}
