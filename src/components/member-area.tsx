"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createStudent, getStudent } from "@/lib/students";
import { skills } from "@/lib/skills";
import { getRobots } from "@/lib/robots-db";
import { RobotCard } from "@/components/robot-card";
import { RobotViewer } from "@/components/robot-viewer";
import { ConsentCheckbox } from "@/components/consent-checkbox";
import { maskPhone } from "@/lib/format";
import type { Robot } from "@/lib/robots";

const categories: Robot["category"][] = [
  "Criar sistemas com IA",
  "Para o negócio",
  "Marketing & Vendas",
  "Produtividade & Carreira",
];
const perfis = ["Dono de empresa", "Empreendedor", "Profissional / colaborador", "Estudante", "Outro"];

const catIcons: Record<Robot["category"], React.ReactNode> = {
  "Criar sistemas com IA": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  "Para o negócio": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
  ),
  "Marketing & Vendas": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
  ),
  "Produtividade & Carreira": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
};

const iconTodos = (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
);
const iconStar = (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

const trilhas: { title: string; desc: string; steps: string[] }[] = [
  {
    title: "Construa um sistema do zero",
    desc: "Do plano ao deploy. Clique em um passo para abrir o prompt.",
    steps: ["Arquiteto de Produto", "Engenheiro Full-Stack", "Especialista em Firebase", "Revisor de Código & Segurança", "Especialista em Deploy", "Engenheiro de Depuração"],
  },
  {
    title: "Lance seu negócio",
    desc: "Da ideia validada à primeira venda. Clique em um passo para abrir o prompt.",
    steps: ["Investidor Cético", "Analista de Preço & Margem", "Estrategista de Marketing", "Copywriter de Vendas", "Criador de Conteúdo"],
  },
];

const FAVS_KEY = "robot-favs";
const WELCOME_KEY = "robots-welcome-dismissed";

const field =
  "min-h-[44px] w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber";

function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
/** Primeiro nome real (capitalizado) ou null se a conta não tem nome cadastrado. */
function realFirstName(user: User): string | null {
  const raw = user.displayName?.trim();
  return raw ? cap(raw.split(" ")[0]) : null;
}
/** Rótulo curto pra sidebar: nome real, senão o trecho antes do @ do e-mail. */
function shortLabel(user: User): string {
  return realFirstName(user) ?? (user.email ?? "").split("@")[0] ?? "Cliente";
}

/* ───────────────────────── Login ───────────────────────── */
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
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-amber to-amber-deep font-semibold text-ink">R</span>
            <span className="text-base font-semibold tracking-tight text-paper">Rodrigo M. Reis</span>
          </Link>
          <h1 className="mt-7 text-3xl font-medium tracking-tight md:text-4xl">
            <span className="text-grad">Central de </span>
            <span className="accent">Robôs.</span>
          </h1>
          <p className="mt-3 text-paper/55">Crie sua conta grátis para acessar os robôs de IA.</p>
        </div>
        <div className="glass mt-7 p-7">
          <div className="mb-5 flex gap-2 rounded-full border border-white/10 p-1 text-sm">
            <button onClick={() => setMode("signup")} aria-pressed={mode === "signup"} className={`flex-1 rounded-full py-2 transition-colors ${mode === "signup" ? "bg-amber font-semibold text-ink" : "text-paper/60"}`}>Criar conta</button>
            <button onClick={() => setMode("login")} aria-pressed={mode === "login"} className={`flex-1 rounded-full py-2 transition-colors ${mode === "login" ? "bg-amber font-semibold text-ink" : "text-paper/60"}`}>Entrar</button>
          </div>
          <form onSubmit={submit} className="flex flex-col gap-2.5">
            {mode === "signup" && (
              <input type="text" required autoComplete="name" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className={field} />
            )}
            <input type="email" required autoComplete="email" placeholder="Seu melhor e-mail" value={email} onChange={(e) => setEmail(e.target.value.trim())} className={field} />
            {mode === "signup" && (
              <>
                <input type="tel" required inputMode="numeric" autoComplete="tel" placeholder="WhatsApp — (11) 91234-5678" value={whatsapp} onChange={(e) => setWhatsapp(maskPhone(e.target.value))} maxLength={16} className={field} />
                <select value={perfil} onChange={(e) => setPerfil(e.target.value)} className={field}>
                  {perfis.map((p) => (
                    <option key={p} value={p} style={{ color: "#15130f", backgroundColor: "#fff" }}>{p}</option>
                  ))}
                </select>
              </>
            )}
            <input type="password" required autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className={field} />
            {mode === "signup" && (
              <div className="mt-1"><ConsentCheckbox checked={consent} onChange={setConsent} dark id="cs-signup" /></div>
            )}
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="btn btn-glow mt-1 w-full disabled:opacity-60">
              {loading ? "Aguarde…" : mode === "signup" ? "Criar conta e acessar" : "Entrar"}
            </button>
          </form>
        </div>
        <p className="mt-5 text-center text-sm">
          <Link href="/" className="text-paper/45 transition-colors hover:text-amber-light">← Voltar para o site</Link>
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── Dashboard (app shell) ───────────────────────── */
type NavKey = "Todos" | "Favoritos" | Robot["category"];

function Dashboard({ user }: { user: User }) {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [plan, setPlan] = useState<"free" | "pro">("free");
  const [favs, setFavs] = useState<string[]>([]);
  const [welcome, setWelcome] = useState(false);
  const [viewing, setViewing] = useState<Robot | null>(null);
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<NavKey>("Todos");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    getRobots().then(setRobots).catch(() => {}).finally(() => setLoaded(true));
    getStudent(user.uid).then((s) => s?.plan === "pro" && setPlan("pro")).catch(() => {});
    try {
      setFavs(JSON.parse(localStorage.getItem(FAVS_KEY) ?? "[]"));
      setWelcome(localStorage.getItem(WELCOME_KEY) !== "1");
    } catch {}
  }, [user.uid]);

  function toggleFav(r: Robot) {
    setFavs((f) => {
      const next = f.includes(r.id) ? f.filter((id) => id !== r.id) : [...f, r.id];
      try { localStorage.setItem(FAVS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }
  function dismissWelcome() {
    setWelcome(false);
    try { localStorage.setItem(WELCOME_KEY, "1"); } catch {}
  }
  function go(key: NavKey) {
    setActiveCat(key);
    setDrawer(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const firstReal = realFirstName(user);
  const label = shortLabel(user);
  const term = q.trim().toLowerCase();
  const visible = robots.filter((r) => {
    const okCat = activeCat === "Todos" || (activeCat === "Favoritos" ? favs.includes(r.id) : r.category === activeCat);
    const okTerm = !term || `${r.name} ${r.tagline} ${r.description}`.toLowerCase().includes(term);
    return okCat && okTerm;
  });
  const byFav = (a: Robot, b: Robot) => Number(favs.includes(b.id)) - Number(favs.includes(a.id));

  const navItems: { key: NavKey; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "Todos", label: "Todos os robôs", icon: iconTodos, count: robots.length },
    ...(favs.length ? [{ key: "Favoritos" as NavKey, label: "Favoritos", icon: iconStar, count: favs.length }] : []),
    ...categories.map((c) => ({ key: c as NavKey, label: c, icon: catIcons[c], count: robots.filter((r) => r.category === c).length })),
  ];

  const trilhasResolvidas = trilhas
    .map((t) => ({ ...t, robots: t.steps.map((n) => robots.find((r) => r.name === n)).filter(Boolean) as Robot[] }))
    .filter((t) => t.robots.length >= 4);

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-2.5 px-5 py-5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber to-amber-deep text-sm font-semibold text-ink">R</span>
        <span className="font-serif text-base font-semibold text-paper">Central de Robôs</span>
      </Link>

      {/* Usuário */}
      <div className="mx-3 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber/20 font-serif text-base font-bold text-amber-light">
          {label.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-paper">{label}</span>
          <span className={`text-[11px] font-semibold uppercase tracking-wide ${plan === "pro" ? "text-amber-light" : "text-paper/40"}`}>Plano {plan === "pro" ? "Pro" : "Free"}</span>
        </span>
      </div>

      {/* Navegação */}
      <nav className="mt-5 flex-1 space-y-1 overflow-y-auto px-3">
        <Link
          href="/cliente/skills"
          className="mb-3 flex w-full items-center gap-3 rounded-lg border border-amber/25 bg-amber/10 px-3 py-2 text-sm font-semibold text-amber-light transition-colors hover:bg-amber/20"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
          <span className="flex-1 text-left">Skills</span>
          <span className="rounded-full bg-amber/20 px-1.5 text-[10px] font-bold">{skills.length}</span>
        </Link>
        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-paper/30">Robôs</p>
        {navItems.map((item) => {
          const active = activeCat === item.key;
          return (
            <button
              key={item.key}
              onClick={() => go(item.key)}
              aria-current={active ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active ? "bg-amber/15 font-semibold text-amber-light" : "text-paper/60 hover:bg-white/5 hover:text-paper"
              }`}
            >
              <span className={active ? "text-amber-light" : "text-paper/40"}>{item.icon}</span>
              <span className="flex-1 truncate text-left">{item.label}</span>
              <span className="font-mono text-[11px] text-paper/30">{item.count}</span>
            </button>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="space-y-1 border-t border-white/8 p-3">
        <Link href="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-paper/55 transition-colors hover:bg-white/5 hover:text-paper">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
          Voltar ao site
        </Link>
        <button onClick={() => signOut(auth)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-paper/55 transition-colors hover:bg-red-500/10 hover:text-red-300">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/8 bg-[#0a090b] lg:block">
        {SidebarContent}
      </aside>

      {/* Drawer mobile */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawer(false)} aria-hidden="true" />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-white/8 bg-[#0a090b]">{SidebarContent}</aside>
        </div>
      )}

      {/* Conteúdo */}
      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/8 bg-[#070608]/85 px-4 py-3 backdrop-blur md:px-7">
          <button onClick={() => setDrawer(true)} aria-label="Abrir menu" className="grid h-9 w-9 place-items-center rounded-lg text-paper/70 hover:bg-white/5 lg:hidden">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
          </button>
          <div className="relative w-full max-w-md">
            <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <label htmlFor="robot-search" className="sr-only">Buscar robô</label>
            <input id="robot-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar robô…" className="min-h-[40px] w-full rounded-full border border-white/12 bg-white/5 pl-10 pr-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber" />
          </div>
          <span className="ml-auto hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-paper/55 sm:block">
            {loaded ? `${robots.length} robôs` : "…"}
          </span>
        </header>

        {/* Main */}
        <main className="max-w-6xl px-4 py-7 md:px-8">
          {/* Saudação */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="kicker-d">Central de Robôs</p>
              <h1 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
                {firstReal ? (
                  <>
                    <span className="text-grad">Olá, </span>
                    <span className="accent">{firstReal}.</span>
                  </>
                ) : (
                  <>
                    <span className="text-grad">Bem-vindo </span>
                    <span className="accent">de volta.</span>
                  </>
                )}
              </h1>
            </div>
            {activeCat !== "Todos" && (
              <span className="rounded-full border border-amber/25 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber-light">
                {activeCat} · {visible.length}
              </span>
            )}
          </div>

          {/* Boas-vindas */}
          {welcome && loaded && robots.length > 0 && activeCat === "Todos" && !term && (
            <div className="glass relative mt-6 border-amber/25 p-5" style={{ background: "rgba(224,164,92,0.06)" }}>
              <button onClick={dismissWelcome} aria-label="Dispensar" className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-md text-paper/50 hover:bg-white/10 hover:text-paper">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
              </button>
              <p className="font-serif text-base font-semibold text-paper">Bem-vindo à sua Central 👋</p>
              <p className="mt-1 max-w-2xl text-sm text-paper/60">
                Cada robô é um especialista pronto: clique em <b className="text-paper/80">Ver prompt</b> para conhecer como ele pensa, copie e cole na sua IA. Não sabe por onde começar? Use o <b className="text-paper/80">Criador de Prompts</b> ou siga uma trilha abaixo.
              </p>
            </div>
          )}

          {/* Conteúdo */}
          {!loaded ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass h-44 animate-pulse p-6">
                  <div className="h-5 w-2/3 rounded bg-white/10" />
                  <div className="mt-3 h-3 w-1/2 rounded bg-white/10" />
                  <div className="mt-5 h-3 w-full rounded bg-white/5" />
                </div>
              ))}
            </div>
          ) : robots.length === 0 ? (
            <p className="mt-12 text-paper/50">Em breve, os robôs. (Admin → Robôs → Importar/atualizar.)</p>
          ) : (
            <>
              {/* Trilhas */}
              {activeCat === "Todos" && !term &&
                trilhasResolvidas.map((t) => (
                  <div key={t.title} className="glass mt-7 overflow-hidden">
                    <div className="border-b border-white/10 px-5 py-3.5">
                      <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-light">Trilha · {t.title}</h2>
                      <p className="mt-1 text-xs text-paper/45">{t.desc}</p>
                    </div>
                    <div className="flex gap-2 overflow-x-auto px-5 py-4">
                      {t.robots.map((r, i) => (
                        <button key={r.id} onClick={() => setViewing(r)} className="group flex shrink-0 items-center gap-2">
                          <span className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1.5 pl-1.5 pr-3.5 text-xs text-paper/70 transition-colors group-hover:border-amber/50 group-hover:text-paper">
                            <span className="grid h-6 w-6 place-items-center rounded-full bg-amber/15 font-serif text-[11px] font-bold text-amber-light">{i + 1}</span>
                            {r.name}
                          </span>
                          {i < t.robots.length - 1 && (
                            <svg className="h-3.5 w-3.5 shrink-0 text-paper/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

              {visible.length === 0 ? (
                activeCat === "Favoritos" ? (
                  <div className="glass mt-8 flex flex-col items-center px-6 py-12 text-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-amber/25 bg-amber/10 text-amber-light" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    </span>
                    <p className="mt-4 font-serif text-lg font-semibold text-paper">Nenhum favorito ainda</p>
                    <p className="mt-1.5 max-w-sm text-sm text-paper/55">Clique na estrela ⭐ de qualquer robô para guardá-lo aqui e acessar rápido depois.</p>
                  </div>
                ) : (
                  <p className="mt-12 text-paper/50">Nenhum robô encontrado para esse filtro.</p>
                )
              ) : activeCat === "Favoritos" ? (
                <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((r) => (
                    <RobotCard key={r.id} robot={r} onView={setViewing} fav={favs.includes(r.id)} onToggleFav={toggleFav} />
                  ))}
                </div>
              ) : (
                categories.map((catName) => {
                  const list = visible.filter((r) => r.category === catName).sort(byFav);
                  if (list.length === 0) return null;
                  return (
                    <div key={catName} className="mt-10">
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg border border-amber/25 bg-amber/10 text-amber-light" aria-hidden="true">{catIcons[catName]}</span>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">{catName}</h2>
                        <span className="font-mono text-xs text-paper/35">{list.length}</span>
                      </div>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {list.map((r) => (
                          <RobotCard key={r.id} robot={r} onView={setViewing} fav={favs.includes(r.id)} onToggleFav={toggleFav} />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}
        </main>
      </div>

      {viewing && <RobotViewer robot={viewing} onClose={() => setViewing(null)} />}
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
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-amber" />
      </div>
    );
  }
  if (!user) return <AuthForm />;
  return <Dashboard user={user} />;
}
