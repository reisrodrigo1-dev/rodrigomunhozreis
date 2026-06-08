"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createStudent } from "@/lib/students";
import { getRobots } from "@/lib/robots-db";
import { RobotCard } from "@/components/robot-card";
import { ConsentCheckbox } from "@/components/consent-checkbox";
import { maskPhone } from "@/lib/format";
import type { Robot } from "@/lib/robots";

const categories: Robot["category"][] = ["Criar sistemas com IA", "Para o negócio"];
const perfis = ["Dono de empresa", "Empreendedor", "Profissional / colaborador", "Estudante", "Outro"];

const field =
  "min-h-[44px] w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber";

function AuthForm() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [perfil, setPerfil] = useState(perfis[0]);
  const [senha, setSenha] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), senha);
      } else {
        if (whatsapp.replace(/\D/g, "").length < 10) {
          setError("Informe um WhatsApp válido com DDD.");
          setLoading(false);
          return;
        }
        if (!consent) {
          setError("Você precisa aceitar a Política de Privacidade.");
          setLoading(false);
          return;
        }
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), senha);
        await updateProfile(cred.user, { displayName: nome.trim() });
        await createStudent(cred.user.uid, {
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          whatsapp,
          perfil,
        });
      }
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      setError(
        code === "auth/email-already-in-use"
          ? "Este e-mail já tem conta. Entre em vez de criar."
          : code === "auth/invalid-credential" || code === "auth/wrong-password"
          ? "E-mail ou senha incorretos."
          : code === "auth/weak-password"
          ? "Senha muito fraca (mínimo 6 caracteres)."
          : code === "auth/operation-not-allowed"
          ? "Ative o provedor E-mail/Senha no Firebase Authentication."
          : "Não foi possível concluir. Tente de novo."
      );
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-4 max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-medium tracking-tight md:text-5xl">
          <span className="text-grad">Área do </span>
          <span className="accent">Cliente.</span>
        </h1>
        <p className="mt-4 text-paper/55">
          Crie sua conta grátis para acessar os robôs — e os próximos materiais.
        </p>
      </div>
      <div className="glass mt-8 p-7">
        <div className="mb-5 flex gap-2 rounded-full border border-white/10 p-1 text-sm">
        <button
          onClick={() => setMode("signup")}
          aria-pressed={mode === "signup"}
          className={`flex-1 rounded-full py-2 transition-colors ${mode === "signup" ? "bg-amber font-semibold text-ink" : "text-paper/60"}`}
        >
          Criar conta
        </button>
        <button
          onClick={() => setMode("login")}
          aria-pressed={mode === "login"}
          className={`flex-1 rounded-full py-2 transition-colors ${mode === "login" ? "bg-amber font-semibold text-ink" : "text-paper/60"}`}
        >
          Entrar
        </button>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-2.5">
        {mode === "signup" && (
          <>
            <input type="text" required autoComplete="name" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className={field} />
          </>
        )}
        <input type="email" required autoComplete="email" placeholder="Seu melhor e-mail" value={email} onChange={(e) => setEmail(e.target.value.trim())} className={field} />
        {mode === "signup" && (
          <>
            <input type="tel" required inputMode="numeric" autoComplete="tel" placeholder="WhatsApp — (11) 91234-5678" value={whatsapp} onChange={(e) => setWhatsapp(maskPhone(e.target.value))} maxLength={16} className={field} />
            <select value={perfil} onChange={(e) => setPerfil(e.target.value)} className={field}>
              {perfis.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </>
        )}
        <input type="password" required autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className={field} />
        {mode === "signup" && (
          <div className="mt-1">
            <ConsentCheckbox checked={consent} onChange={setConsent} dark id="cs-signup" />
          </div>
        )}
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-glow mt-1 w-full disabled:opacity-60">
          {loading ? "Aguarde…" : mode === "signup" ? "Criar conta e acessar" : "Entrar"}
        </button>
      </form>
      <p className="mt-4 text-xs text-paper/40">
        Ao criar a conta, você acessa os robôs e os próximos materiais. Sem spam.
      </p>
      </div>
    </div>
  );
}

function Dashboard({ user }: { user: User }) {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getRobots()
      .then(setRobots)
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<"Todos" | Robot["category"]>("Todos");

  const first = (user.displayName || user.email || "").split(" ")[0];
  const term = q.trim().toLowerCase();
  const visible = robots.filter((r) => {
    const okCat = activeCat === "Todos" || r.category === activeCat;
    const okTerm =
      !term || `${r.name} ${r.tagline} ${r.description}`.toLowerCase().includes(term);
    return okCat && okTerm;
  });
  const chips: ("Todos" | Robot["category"])[] = ["Todos", ...categories];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="kicker-d">Área do Cliente</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
            <span className="text-grad">Olá, </span>
            <span className="accent">{first || "cliente"}.</span>
          </h2>
        </div>
        <button onClick={() => signOut(auth)} className="btn btn-dark-ghost !px-5 !py-2.5">
          Sair
        </button>
      </div>

      <p className="mt-5 max-w-2xl text-paper/55">
        Seus robôs de IA, liberados. Copie o prompt ou abra direto na sua IA (ChatGPT, Claude, Gemini).
      </p>

      {!loaded ? (
        <div className="mt-12 grid gap-5 md:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass h-48 animate-pulse p-7">
              <div className="h-5 w-2/3 rounded bg-white/10" />
              <div className="mt-3 h-3 w-1/2 rounded bg-white/10" />
              <div className="mt-5 h-3 w-full rounded bg-white/5" />
              <div className="mt-2 h-3 w-4/5 rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : robots.length === 0 ? (
        <p className="mt-12 text-paper/50">Em breve, os robôs.</p>
      ) : (
        <>
          {/* Filtros */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  aria-pressed={activeCat === c}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    activeCat === c
                      ? "border-amber bg-amber font-semibold text-ink"
                      : "border-white/12 text-paper/65 hover:border-amber/50 hover:text-paper"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative md:w-72">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar robô…"
                aria-label="Buscar robô"
                className="min-h-[44px] w-full rounded-full border border-white/15 bg-white/5 pl-11 pr-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber"
              />
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 text-paper/50">Nenhum robô encontrado para esse filtro.</p>
          ) : (
            categories.map((catName) => {
              const list = visible.filter((r) => r.category === catName);
              if (list.length === 0) return null;
              return (
                <div key={catName} className="mt-12">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
                    {catName}
                  </h3>
                  <div className="mt-6 grid gap-5 md:grid-cols-3">
                    {list.map((r) => (
                      <RobotCard key={r.id} robot={r} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </>
      )}

      <div className="glass mt-14 p-6 text-paper/60">
        <p className="font-serif text-lg font-semibold text-paper">Em breve por aqui</p>
        <p className="mt-1 text-sm">
          Cursos, e-books e materiais exclusivos — tudo na sua Área do Cliente. Fica de olho.
        </p>
      </div>
    </div>
  );
}

export function MemberArea() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (u) => {
    setUser(u);
    setLoading(false);
  }), []);

  if (loading) {
    return <p className="mt-12 text-paper/50">Carregando…</p>;
  }
  if (!user) return <AuthForm />;
  return <Dashboard user={user} />;
}
