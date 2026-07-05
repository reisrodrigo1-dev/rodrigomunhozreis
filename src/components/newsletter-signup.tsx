"use client";

import { useState } from "react";

type State = "idle" | "loading" | "ok" | "invalid" | "error";

/**
 * Formulário de inscrição na newsletter do blog.
 * source = de onde veio (slug do post ou 'newsletter-page').
 * Zero fricção: só e-mail. Salva no Firestore + manda welcome via Resend.
 */
export function NewsletterSignup({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const r = await fetch("/api/blog-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) {
        setState("ok");
        setEmail("");
      } else if (data.error === "invalid-email") {
        setState("invalid");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <aside className="glass mt-12 p-7 md:p-9 text-center">
        <p className="kicker-d">Confirmado</p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-paper md:text-3xl">
          Você está no blog.
        </h3>
        <p className="mt-3 text-paper/60">
          Chegou uma confirmação no seu e-mail. Se não aparecer, olha o spam. Todo post novo cai aí.
        </p>
      </aside>
    );
  }

  return (
    <aside className="glass mt-12 p-7 md:p-9">
      <p className="kicker-d">Não perca o próximo</p>
      <h3 className="mt-3 text-2xl font-medium tracking-tight text-paper md:text-3xl">
        Receba os próximos posts no e-mail
      </h3>
      <p className="mt-3 max-w-xl text-paper/60">
        Sem enrolação, sem hype. Tutoriais, análise de notícia e método de vibecoding com engenharia.
        Cancela quando quiser, é só responder pedindo.
      </p>
      <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder="seu@email.com"
          className="w-full flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-paper placeholder:text-paper/40 focus:border-amber-light focus:outline-none focus:ring-1 focus:ring-amber-light"
          aria-label="Seu e-mail"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn btn-glow disabled:opacity-60"
        >
          {state === "loading" ? "Inscrevendo…" : "Inscrever"}
        </button>
      </form>
      {state === "invalid" && (
        <p className="mt-3 text-sm text-amber-light">Esse e-mail parece inválido. Tenta de novo?</p>
      )}
      {state === "error" && (
        <p className="mt-3 text-sm text-amber-light">Deu erro por aqui. Tenta de novo em alguns segundos.</p>
      )}
    </aside>
  );
}
