import type { FaqItem } from "@/lib/posts";

/**
 * Renderiza FAQ acessível no fim do post + JSON-LD FAQPage.
 * FAQPage é sinal forte pra Google AI Overviews e Perplexity citarem.
 * Fonte: schema.org/FAQPage.
 */
export function PostFaq({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="kicker-d">Perguntas frequentes</p>
      <h2 className="mt-3 text-2xl font-medium tracking-tight text-paper md:text-3xl">
        Perguntas rápidas
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {items.map((it, i) => (
          <details
            key={i}
            className="glass group p-5 md:p-6"
          >
            <summary className="cursor-pointer list-none text-lg font-medium text-paper marker:hidden">
              <span className="mr-2 inline-block transition-transform group-open:rotate-45 text-amber-light">
                +
              </span>
              {it.q}
            </summary>
            <p className="mt-3 pl-6 text-paper/70 leading-relaxed">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
