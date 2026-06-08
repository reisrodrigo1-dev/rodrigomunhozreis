"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { RobotCard } from "@/components/robot-card";
import { createLead } from "@/lib/leads";
import { getRobots } from "@/lib/robots-db";
import type { Robot } from "@/lib/robots";

const KEY = "robos_unlocked";
const categories: Robot["category"][] = ["Criar sistemas com IA", "Para o negócio"];

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function RobotsGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function load() {
    try {
      setRobots(await getRobots());
    } catch {
      /* ignora */
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(KEY)) {
      setUnlocked(true);
      load();
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = whatsapp.replace(/\D/g, "");
    if (!name.trim() || !email || digits.length < 10) return;
    setStatus("loading");
    try {
      await createLead(email, "robos", name, whatsapp);
      localStorage.setItem(KEY, "1");
      setUnlocked(true);
      await load();
    } catch {
      setStatus("error");
    }
  }

  // ----- Travado: formulário de captura -----
  if (!unlocked) {
    const field =
      "min-h-[44px] w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber";
    return (
      <Reveal>
        <div className="glass mx-auto mt-12 max-w-md p-7">
          <p className="text-xl font-semibold text-paper">Acesse os robôs de graça</p>
          <p className="mt-1.5 text-sm text-paper/55">
            Deixe seus dados e libere todos os robôs na hora.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2.5">
            <input
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              className={field}
            />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="Seu melhor e-mail"
              className={field}
            />
            <input
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
              placeholder="WhatsApp — (11) 91234-5678"
              maxLength={16}
              className={field}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-glow mt-1 w-full disabled:opacity-60"
            >
              {status === "loading" ? "Liberando…" : "Liberar os robôs"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-400">Algo deu errado. Tente de novo.</p>
            )}
          </form>
          <p className="mt-4 text-xs text-paper/40">Sem spam. Você cancela quando quiser.</p>
        </div>
      </Reveal>
    );
  }

  // ----- Liberado: robôs do banco -----
  if (loaded && robots.length === 0) {
    return <p className="mt-12 text-paper/50">Em breve, os robôs.</p>;
  }

  return (
    <>
      {categories.map((cat) => {
        const list = robots.filter((r) => r.category === cat);
        if (list.length === 0) return null;
        return (
          <div key={cat} className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
              {cat}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {list.map((r) => (
                <RobotCard key={r.id} robot={r} />
              ))}
            </div>
          </div>
        );
      })}
      <div className="glass mt-12 p-6 text-sm text-paper/60">
        <b className="text-paper">Como usar:</b> clique em “Copiar prompt”, abra a sua IA preferida
        (ChatGPT, Gemini, Claude…) e cole. A IA assume o papel do robô na hora.
      </div>
    </>
  );
}
