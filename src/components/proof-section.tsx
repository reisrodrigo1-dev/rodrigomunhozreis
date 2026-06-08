"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { getSiteSettings, type SiteSettings } from "@/lib/site-settings";

/**
 * Prova social editável pelo admin (/admin/site). Números e depoimentos vêm do
 * Firestore (settings/home). Enquanto não houver nada cadastrado, a seção não
 * aparece — assim nunca exibe número inventado.
 */
export function ProofSection() {
  const [s, setS] = useState<SiteSettings>({ metrics: [], testimonials: [] });

  useEffect(() => {
    getSiteSettings().then(setS).catch(() => {});
  }, []);

  const hasMetrics = s.metrics.length > 0;
  const hasTesti = s.testimonials.length > 0;
  if (!hasMetrics && !hasTesti) return null;

  return (
    <section className="border-t border-white/5 py-20 md:py-28">
      <div className="container-c">
        <Reveal>
          <p className="kicker-d">Resultados</p>
          <h2 className="mt-5 text-4xl font-medium tracking-tight md:text-5xl">
            <span className="text-grad">Não é teoria. </span>
            <span className="accent">São números.</span>
          </h2>
        </Reveal>

        {hasMetrics && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.metrics.map((m, i) => (
              <Reveal key={`${m.label}-${i}`} delay={i * 0.06}>
                <div className="glass h-full p-7 text-center">
                  <p className="text-4xl font-semibold text-grad md:text-5xl">{m.value}</p>
                  <p className="mt-2 text-sm text-paper/60">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {hasTesti && (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {s.testimonials.map((t, i) => (
              <Reveal key={`${t.name}-${i}`} delay={i * 0.06}>
                <figure className="glass flex h-full flex-col p-7">
                  <blockquote className="flex-1 leading-relaxed text-paper/75">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold text-paper">{t.name}</span>
                    {t.role && <span className="block text-paper/50">{t.role}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
