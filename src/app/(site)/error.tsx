"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Não engole o erro: registra para diagnóstico (e futuro Sentry).
    console.error("[site error]", error);
  }, [error]);

  return (
    <section className="grid min-h-[60vh] place-items-center py-20">
      <div className="container-c max-w-md text-center">
        <p className="kicker-d">Ops</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
          <span className="text-grad">Algo deu </span>
          <span className="accent">errado.</span>
        </h1>
        <p className="mt-4 text-paper/60">
          Tivemos um problema ao carregar esta página. Tente de novo — se persistir, volte mais tarde.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => reset()} className="btn btn-glow !px-6 !py-3">
            Tentar de novo
          </button>
          <a href="/" className="btn btn-dark-ghost !px-6 !py-3">
            Ir para a home
          </a>
        </div>
      </div>
    </section>
  );
}
