"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim();

const nav = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/downloads", label: "Downloads" },
  { href: "/admin/biblioteca", label: "Palestras & E-books" },
];

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-page px-6 text-center">
      <div>{children}</div>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const value = email.trim();
    const canProvision = ADMIN_EMAIL && value === ADMIN_EMAIL;
    try {
      await signInWithEmailAndPassword(auth, value, password);
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      if (code === "auth/operation-not-allowed") {
        setError("Ative o provedor E-mail/Senha no Firebase Authentication.");
        setLoading(false);
        return;
      }
      if (canProvision) {
        // Primeira vez: cria a conta de admin com esta senha.
        try {
          await createUserWithEmailAndPassword(auth, value, password);
          return;
        } catch (e2) {
          const c2 = (e2 as { code?: string })?.code ?? "";
          setError(
            c2 === "auth/email-already-in-use"
              ? "Senha incorreta."
              : c2 === "auth/weak-password"
              ? "Senha muito fraca (mínimo 6 caracteres)."
              : "Não foi possível entrar."
          );
          setLoading(false);
          return;
        }
      }
      setError("E-mail ou senha incorretos.");
      setLoading(false);
    }
  }

  return (
    <Screen>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 text-left"
      >
        <p className="kicker">Painel</p>
        <h1 className="mt-3 font-serif text-2xl font-semibold">Entrar</h1>
        <div className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="E-mail"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-[44px] rounded-lg border border-line px-4 text-sm outline-none focus:border-amber"
          />
          <input
            type="password"
            required
            placeholder="Senha"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-h-[44px] rounded-lg border border-line px-4 text-sm outline-none focus:border-amber"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </div>
      </form>
    </Screen>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => onAuthStateChanged(auth, (u) => {
    setUser(u);
    setLoading(false);
  }), []);

  if (loading) return <Screen>Carregando…</Screen>;
  if (!user) return <Login />;
  if (ADMIN_EMAIL && user.email !== ADMIN_EMAIL) {
    return (
      <Screen>
        <p className="text-ink-soft">
          A conta <b>{user.email}</b> não tem acesso ao painel.
        </p>
        <button onClick={() => signOut(auth)} className="btn btn-ghost mt-5">
          Sair
        </button>
      </Screen>
    );
  }

  return (
    <div className="min-h-screen bg-page md:flex">
      <aside className="border-b border-line bg-white p-5 md:w-60 md:border-b-0 md:border-r">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-serif text-sm font-bold text-paper">
            R
          </span>
          <span className="font-serif text-base font-semibold">Painel</span>
        </Link>
        <nav className="mt-6 flex gap-1 overflow-x-auto md:flex-col">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-amber-soft font-semibold text-amber-deep"
                    : "text-ink-soft hover:bg-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 hidden border-t border-line pt-4 md:block">
          <p className="truncate text-xs text-muted">{user.email}</p>
          <button
            onClick={() => signOut(auth)}
            className="mt-2 text-sm text-ink-soft hover:text-amber-deep"
          >
            Sair
          </button>
          <Link
            href="/"
            className="mt-1 block text-sm text-ink-soft hover:text-amber-deep"
          >
            Ver site →
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
