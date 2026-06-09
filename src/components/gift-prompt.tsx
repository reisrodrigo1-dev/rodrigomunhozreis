"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { GIFT_PROMPT } from "@/lib/gift-prompt";

const partes = [
  ["P", "Papel"],
  ["R", "Realidade"],
  ["O", "Objetivo"],
  ["M", "Marcha"],
  ["P", "Proteção"],
  ["T", "Texto de saída"],
  ["E", "Exemplos"],
  ["R", "Refino"],
];

export function GiftPrompt() {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(GIFT_PROMPT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <section id="presente" className="border-t border-white/5 py-20 md:py-28">
      <div className="container-c">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Texto */}
          <Reveal>
            <span className="badge">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              Presente para você
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              <span className="text-grad">O Criador de </span>
              <span className="accent">Prompts.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/60">
              Um robô que <b className="text-paper/80">constrói o prompt por você</b>. Você diz o que
              quer; ele monta um prompt profissional no meu método <b className="text-paper/80">P.R.O.M.P.T.E.R.</b>,
              pronto para colar no ChatGPT, Claude ou Gemini. É <b className="text-paper/80">de graça</b> —
              meu presente para quem quer usar IA de verdade.
            </p>

            <div className="mt-7 grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-4 xl:grid-cols-8">
              {partes.map(([l, nome], i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
                  <div className="font-serif text-lg font-bold text-amber-light">{l}</div>
                  <div className="mt-0.5 text-[10px] leading-tight text-paper/45">{nome}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-paper/70">Quer receber os próximos presentes e materiais?</p>
              <div className="mt-3">
                <NewsletterForm variant="dark" source="presente-criador-de-prompts" />
              </div>
            </div>
          </Reveal>

          {/* Bloco do prompt */}
          <Reveal delay={0.1}>
            <div className="glass overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-paper/45">
                  Prompt · copie e cole na sua IA
                </span>
                <button
                  onClick={copy}
                  className="btn btn-glow !px-4 !py-2 !text-xs"
                >
                  {copied ? "Copiado ✓" : "Copiar prompt"}
                </button>
              </div>
              <pre className="max-h-[420px] overflow-auto px-5 py-4 text-xs leading-relaxed text-paper/70 [font-family:var(--font-mono,ui-monospace),monospace]">
                <code className="whitespace-pre-wrap break-words">{GIFT_PROMPT}</code>
              </pre>
            </div>
            <p className="mt-3 text-xs text-paper/35">
              Funciona em qualquer IA. Não precisa cadastro — é só copiar. A decisão é sempre sua.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
