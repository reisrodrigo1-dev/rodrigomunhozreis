"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#081A23",
          color: "#F1F6F8",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600 }}>Algo deu errado.</h1>
          <p style={{ marginTop: "0.75rem", opacity: 0.6 }}>
            Tivemos um problema inesperado. Tente recarregar a página.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              background: "#38BDF8",
              color: "#081A23",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  );
}
