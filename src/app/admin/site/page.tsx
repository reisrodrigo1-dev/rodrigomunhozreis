"use client";

import { useEffect, useState } from "react";
import {
  getSiteSettings,
  saveSiteSettings,
  type Metric,
  type Testimonial,
} from "@/lib/site-settings";

const field =
  "min-h-[40px] w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-amber";

export default function AdminSite() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteSettings()
      .then((s) => {
        setMetrics(s.metrics);
        setTestimonials(s.testimonials);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      await saveSiteSettings({
        metrics: metrics.filter((m) => m.value.trim() || m.label.trim()),
        testimonials: testimonials.filter((t) => t.quote.trim() || t.name.trim()),
      });
      setSaved(true);
    } catch {
      alert("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold">Conteúdo da home</h1>
        <button onClick={save} disabled={saving || state !== "ok"} className="btn btn-primary !px-5 !py-2 disabled:opacity-50">
          {saving ? "Salvando…" : "Salvar"}
        </button>
      </div>
      <p className="mt-2 text-sm text-muted">
        Números e depoimentos da seção de prova social. Deixe vazio para esconder a seção.
      </p>
      {saved && <p className="mt-3 text-sm text-green-600">✓ Salvo. Atualize a home para ver.</p>}
      {state === "error" && <p className="mt-3 text-sm text-amber-deep">Não consegui ler as configurações.</p>}

      {/* MÉTRICAS */}
      <section className="mt-8">
        <h2 className="font-serif text-xl font-semibold">Números</h2>
        <div className="mt-4 flex flex-col gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={`${field} w-32`}
                placeholder="+5 mil"
                value={m.value}
                onChange={(e) => setMetrics((a) => a.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))}
              />
              <input
                className={field}
                placeholder="downloads dos e-books"
                value={m.label}
                onChange={(e) => setMetrics((a) => a.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
              />
              <button onClick={() => setMetrics((a) => a.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:underline">
                Remover
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => setMetrics((a) => [...a, { value: "", label: "" }])} className="btn btn-ghost mt-3 !px-4 !py-2 text-sm">
          + Adicionar número
        </button>
      </section>

      {/* DEPOIMENTOS */}
      <section className="mt-10">
        <h2 className="font-serif text-xl font-semibold">Depoimentos</h2>
        <div className="mt-4 flex flex-col gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl border border-line p-4">
              <textarea
                className={`${field} min-h-[72px] py-2`}
                placeholder="O que a pessoa disse…"
                value={t.quote}
                onChange={(e) => setTestimonials((a) => a.map((x, j) => (j === i ? { ...x, quote: e.target.value } : x)))}
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  className={field}
                  placeholder="Nome"
                  value={t.name}
                  onChange={(e) => setTestimonials((a) => a.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                />
                <input
                  className={field}
                  placeholder="Cargo / empresa"
                  value={t.role}
                  onChange={(e) => setTestimonials((a) => a.map((x, j) => (j === i ? { ...x, role: e.target.value } : x)))}
                />
                <button onClick={() => setTestimonials((a) => a.filter((_, j) => j !== i))} className="shrink-0 text-xs text-red-500 hover:underline">
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setTestimonials((a) => [...a, { quote: "", name: "", role: "" }])} className="btn btn-ghost mt-3 !px-4 !py-2 text-sm">
          + Adicionar depoimento
        </button>
      </section>
    </div>
  );
}
