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

const I = {
  grid: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  post: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 8V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3" /><line x1="9" y1="9" x2="10" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>,
  bot: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>,
  material: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  library: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  home: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  users: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></svg>,
  leads: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>,
  download: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  chart: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  zap: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  cap: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" /></svg>,
  deck: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
};

const nav = [
  { href: "/admin", label: "Visão geral", group: "Painel", icon: I.grid },
  { href: "/admin/marketing", label: "Marketing", group: "Painel", icon: I.chart },
  { href: "/admin/posts", label: "Blog", group: "Conteúdo", icon: I.post },
  { href: "/admin/robos", label: "Robôs", group: "Conteúdo", icon: I.bot },
  { href: "/admin/skills", label: "Skills", group: "Conteúdo", icon: I.zap },
  { href: "/admin/cursos", label: "Cursos", group: "Conteúdo", icon: I.cap },
  { href: "/admin/apresentacoes", label: "Apresentações", group: "Conteúdo", icon: I.deck },
  { href: "/admin/materiais", label: "Materiais", group: "Conteúdo", icon: I.material },
  { href: "/admin/biblioteca", label: "Palestras & E-books", group: "Conteúdo", icon: I.library },
  { href: "/admin/site", label: "Conteúdo da home", group: "Conteúdo", icon: I.home },
  { href: "/admin/alunos", label: "Clientes", group: "Pessoas", icon: I.users },
  { href: "/admin/leads", label: "Leads", group: "Pessoas", icon: I.leads },
  { href: "/admin/downloads", label: "Downloads", group: "Pessoas", icon: I.download },
];
const groups = ["Painel", "Conteúdo", "Pessoas"];

function DarkScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#070608] px-6 text-center text-paper">
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

  const field = "min-h-[44px] w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber";

  return (
    <DarkScreen>
      <form onSubmit={handleSubmit} className="glass w-full max-w-sm p-8 text-left">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber to-amber-deep text-sm font-semibold text-ink">R</span>
          <span className="font-serif text-base font-semibold">Painel</span>
        </div>
        <h1 className="mt-5 text-2xl font-medium tracking-tight">
          <span className="text-grad">Entrar no </span><span className="accent">admin.</span>
        </h1>
        <div className="mt-6 flex flex-col gap-3">
          <input type="email" required placeholder="E-mail" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          <input type="password" required placeholder="Senha" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-glow w-full disabled:opacity-60">
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </div>
      </form>
    </DarkScreen>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();

  useEffect(() => onAuthStateChanged(auth, (u) => {
    setUser(u);
    setLoading(false);
  }), []);

  if (loading) return <DarkScreen><div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-amber" /></DarkScreen>;
  if (!user) return <Login />;
  // Fail-closed: só o e-mail de admin entra.
  if (!ADMIN_EMAIL || user.email !== ADMIN_EMAIL) {
    return (
      <DarkScreen>
        <p className="text-paper/70">A conta <b className="text-paper">{user.email}</b> não tem acesso ao painel.</p>
        <button onClick={() => signOut(auth)} className="btn btn-dark-ghost mt-5">Sair</button>
      </DarkScreen>
    );
  }

  const email = user.email ?? "";
  const initial = email.charAt(0).toUpperCase();

  const Sidebar = (
    <div className="flex h-full flex-col">
      <Link href="/admin" className="flex items-center gap-2.5 px-5 py-5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber to-amber-deep text-sm font-semibold text-ink">R</span>
        <span className="font-serif text-base font-semibold text-paper">Painel</span>
      </Link>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 pb-3">
        {groups.map((g) => (
          <div key={g}>
            <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-paper/30">{g}</p>
            <div className="space-y-0.5">
              {nav.filter((n) => n.group === g).map((item) => {
                const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawer(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active ? "bg-amber/15 font-semibold text-amber-light" : "text-paper/60 hover:bg-white/5 hover:text-paper"
                    }`}
                  >
                    <span className={active ? "text-amber-light" : "text-paper/40"}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/8 p-3">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber/20 font-serif text-sm font-bold text-amber-light">{initial}</span>
          <span className="min-w-0">
            <span className="block truncate text-xs text-paper/70">{email}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-light">Administrador</span>
          </span>
        </div>
        <Link href="/" className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-paper/55 transition-colors hover:bg-white/5 hover:text-paper">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
          Ver site
        </Link>
        <button onClick={() => signOut(auth)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-paper/55 transition-colors hover:bg-red-500/10 hover:text-red-300">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-page md:flex">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 bg-[#0a090b] md:block">{Sidebar}</aside>

      {/* Top bar mobile */}
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-[#0a090b] px-4 py-3 text-paper md:hidden">
        <button onClick={() => setDrawer(true)} aria-label="Abrir menu" className="grid h-9 w-9 place-items-center rounded-lg text-paper/70 hover:bg-white/5">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
        </button>
        <span className="font-serif text-base font-semibold">Painel</span>
      </header>

      {/* Drawer mobile */}
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawer(false)} aria-hidden="true" />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[#0a090b]">{Sidebar}</aside>
        </div>
      )}

      <main className="min-w-0 flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
