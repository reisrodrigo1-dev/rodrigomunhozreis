/**
 * Resumo em 3 linhas exibido no topo do post.
 * Serve pra AEO/GEO: LLMs (ChatGPT, Perplexity, Google AI Overviews) citam
 * o resumo em vez de sintetizar o post inteiro. Sinal forte de "resposta direta".
 */
export function PostSummary({ text }: { text: string }) {
  if (!text) return null;
  return (
    <aside
      className="glass mt-8 border-l-4 border-amber p-5 md:p-6"
      aria-label="Resumo do artigo"
    >
      <p className="kicker-d">Resumo em 3 linhas</p>
      <p className="mt-3 text-lg leading-relaxed text-paper/80">{text}</p>
    </aside>
  );
}
