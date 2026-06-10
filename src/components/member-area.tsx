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
import { createStudent, getStudent } from "@/lib/students";
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

/** Ícone SVG de cada categoria (stroke, sem emoji). */
const catIcons: Record<Robot["category"], React.ReactNode> = {
  "Criar sistemas com IA": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "Para o negócio": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  "Marketing & Vendas": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  "Produtividade & Carreira": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};
const perfis = ["Dono de empresa", "Empreendedor", "Profissional / colaborador", "Estudante", "Outro"];

/** Trilhas sugeridas — sequências de robôs na ordem certa. */
const trilhas: { title: string; desc: string; steps: string[] }[] = [
  {
    title: "Construa um sistema do zero",
    desc: "Do plano ao deploy. Clique em um passo para abrir o prompt.",
    steps: [
      "Arquiteto de Produto",
      "Engenheiro Full-Stack",
      "Especialista em Firebase",
      "Revisor de Código & Segurança",
      "Especialista em Deploy",
      "Engenheiro de Depuração",
    ],
  },
  {
    title: "Lance seu negócio",
    desc: "Da ideia validada à primeira venda. Clique em um passo para abrir o prompt.",
    steps: [
      "Investidor Cético",
      "Analista de Preço & Margem",
      "Estrategista de Marketing",
      "Copywriter de Vendas",
      "Criador de Conteúdo",
    ],
  },
];

const FAVS_KEY = "robot-favs";
const WELCOME_KEY = "robots-welcome-dismissed";

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
                <option key={p} value={p} style={{ color: "#15130f", backgroundColor: "#fff" }}>
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
  const [plan, setPlan] = useState<"free" | "pro">("free");
  const [favs, setFavs] = useState<string[]>([]);
  const [welcome, setWelcome] = useState(false);
  const [viewing, setViewing] = useState<Robot | null>(null);

  useEffect(() => {
    getRobots()
      .then(setRobots)
      .catch(() => {})
      .finally(() => setLoaded(true));
    getStudent(user.uid)
      .then((s) => s?.plan === "pro" && setPlan("pro"))
      .catch(() => {});
    try {
      setFavs(JSON.parse(localStorage.getItem(FAVS_KEY) ?? "[]"));
      setWelcome(localStorage.getItem(WELCOME_KEY) !== "1");
    } catch {}
  }, [user.uid]);

  function toggleFav(r: Robot) {
    setFavs((f) => {
      const next = f.includes(r.id) ? f.filter((id) => id !== r.id) : [...f, r.id];
      try {
        localStorage.setItem(FAVS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  function dismissWelcome() {
    setWelcome(false);
    try {
      localStorage.setItem(WELCOME_KEY, "1");
    } catch {}
  }

  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<"Todos" | "Favoritos" | Robot["category"]>("Todos");

  const first = (user.displayName || user.email || "").split(" ")[0];
  const term = q.trim().toLowerCase();
  const visible = robots.filter((r) => {
    const okCat =
      activeCat === "Todos" ||
      (activeCat === "Favoritos" ? favs.includes(r.id) : r.category === activeCat);
    const okTerm =
      !term || `${r.name} ${r.tagline} ${r.description}`.toLowerCase().includes(term);
    return okCat && okTerm;
  });
  const chips: ("Todos" | "Favoritos" | Robot["category"])[] = [
    "Todos",
    ...(favs.length > 0 ? (["Favoritos"] as const) : []),
    ...categories,
  ];

  // Favoritos primeiro dentro de cada categoria.
  const byFav = (a: Robot, b: Robot) =>
    Number(favs.includes(b.id)) - Number(favs.includes(a.id));

  // Trilhas com os robôs resolvidos pelo nome (só exibe se a maioria existir).
  const trilhasResolvidas = trilhas
    .map((t) => ({
      ...t,
      robots: t.steps.map((name) => robots.find((r) => r.name === name)).filter(Boolean) as Robot[],
    }))
    .filter((t) => t.robots.length >= 4);

  return (
    <div>
      {/* Header de dashboard */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker-d">Central de Robôs</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
            <span className="text-grad">Olá, </span>
            <span className="accent">{first || "cliente"}.</span>
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-paper/60">
              {loaded ? `${robots.length} robôs disponíveis` : "carregando…"}
            </span>
            <span
              className={`rounded-full border px-3 py-1 font-semibold uppercase tracking-wide ${
                plan === "pro"
                  ? "border-amber/40 bg-amber/15 text-amber-light"
                  : "border-white/10 bg-white/5 text-paper/50"
              }`}
            >
              Plano {plan === "pro" ? "Pro" : "Free"}
            </span>
            {favs.length > 0 && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-paper/50">
                ⭐ {favs.length} favorito{favs.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
        <button onClick={() => signOut(auth)} className="btn btn-dark-ghost !px-5 !py-2.5">
          Sair
        </button>
      </div>

      {/* Boas-vindas (1º acesso) */}
      {welcome && loaded && robots.length > 0 && (
        <div className="glass relative mt-8 border-amber/25 p-6" style={{ background: "rgba(224,164,92,0.06)" }}>
          <button
            onClick={dismissWelcome}
            aria-label="Dispensar boas-vindas"
            className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-md text-paper/50 hover:bg-white/10 hover:text-paper"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <p className="font-serif text-lg font-semibold text-paper">Bem-vindo à sua Central de Robôs 👋</p>
          <p className="mt-1 max-w-2xl text-sm text-paper/60">
            Cada robô é um especialista pronto: clique em <b className="text-paper/80">Ver prompt</b> para
            conhecer como ele pensa, copie e cole na sua IA. Não sabe por onde começar? Use o{" "}
            <b className="text-paper/80">Criador de Prompts</b> — ou siga a trilha abaixo para construir
            um sistema do zero.
          </p>
        </div>
      )}

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

          {/* Trilhas guiadas */}
          {activeCat === "Todos" && !term &&
            trilhasResolvidas.map((t) => (
              <div key={t.title} className="glass mt-10 overflow-hidden">
                <div className="border-b border-white/10 px-6 py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
                    Trilha · {t.title}
                  </h3>
                  <p className="mt-1 text-xs text-paper/45">{t.desc}</p>
                </div>
                <div className="flex gap-2 overflow-x-auto px-6 py-4">
                  {t.robots.map((r, i) => (
                    <button
                      key={r.id}
                      onClick={() => setViewing(r)}
                      className="group flex shrink-0 items-center gap-2"
                    >
                      <span className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1.5 pl-1.5 pr-3.5 text-xs text-paper/70 transition-colors group-hover:border-amber/50 group-hover:text-paper">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-amber/15 font-serif text-[11px] font-bold text-amber-light">
                          {i + 1}
                        </span>
                        {r.name}
                      </span>
                      {i < t.robots.length - 1 && (
                        <svg className="h-3.5 w-3.5 shrink-0 text-paper/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

          {visible.length === 0 ? (
            <p className="mt-12 text-paper/50">Nenhum robô encontrado para esse filtro.</p>
          ) : activeCat === "Favoritos" ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {visible.map((r) => (
                <RobotCard key={r.id} robot={r} onView={setViewing} fav={favs.includes(r.id)} onToggleFav={toggleFav} />
              ))}
            </div>
          ) : (
            categories.map((catName) => {
              const list = visible.filter((r) => r.category === catName).sort(byFav);
              if (list.length === 0) return null;
              return (
                <div key={catName} className="mt-12">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-amber/25 bg-amber/10 text-amber-light" aria-hidden="true">
                      {catIcons[catName]}
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
                      {catName}
                    </h3>
                    <span className="font-mono text-xs text-paper/35">{list.length}</span>
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
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

      {viewing && <RobotViewer robot={viewing} onClose={() => setViewing(null)} />}

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
