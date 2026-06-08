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
import type { Robot } from "@/lib/robots";

const categories: Robot["category"][] = ["Criar sistemas com IA", "Para o negócio"];
const perfis = ["Dono de empresa", "Empreendedor", "Profissional / colaborador", "Estudante", "Outro"];

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const field =
  "min-h-[44px] w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber";

function AuthForm() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [perfil, setPerfil] = useState(perfis[0]);
  const [senha, setSenha] = useState("");
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
          <span className="accent">Aluno.</span>
        </h1>
        <p className="mt-4 text-paper/55">
          Crie sua conta grátis para acessar os robôs — e os próximos materiais.
        </p>
      </div>
      <div className="glass mt-8 p-7">
        <div className="mb-5 flex gap-2 rounded-full border border-white/10 p-1 text-sm">
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full py-2 transition-colors ${mode === "signup" ? "bg-amber text-ink" : "text-paper/60"}`}
        >
          Criar conta
        </button>
        <button
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full py-2 transition-colors ${mode === "login" ? "bg-amber text-ink" : "text-paper/60"}`}
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

  const first = (user.displayName || user.email || "").split(" ")[0];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="kicker-d">Área do Aluno</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
            <span className="text-grad">Olá, </span>
            <span className="accent">{first || "aluno"}.</span>
          </h2>
        </div>
        <button onClick={() => signOut(auth)} className="btn btn-dark-ghost !px-5 !py-2.5">
          Sair
        </button>
      </div>

      <p className="mt-5 max-w-2xl text-paper/55">
        Seus robôs de IA, liberados. Copie o prompt ou abra direto na sua IA (ChatGPT, Claude, Gemini).
      </p>

      {loaded && robots.length === 0 ? (
        <p className="mt-12 text-paper/50">Em breve, os robôs.</p>
      ) : (
        categories.map((cat) => {
          const list = robots.filter((r) => r.category === cat);
          if (list.length === 0) return null;
          return (
            <div key={cat} className="mt-12">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-light">{cat}</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {list.map((r) => (
                  <RobotCard key={r.id} robot={r} />
                ))}
              </div>
            </div>
          );
        })
      )}

      <div className="glass mt-14 p-6 text-paper/60">
        <p className="font-serif text-lg font-semibold text-paper">Em breve por aqui</p>
        <p className="mt-1 text-sm">
          Cursos, e-books e materiais exclusivos — tudo na sua Área do Aluno. Fica de olho.
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
