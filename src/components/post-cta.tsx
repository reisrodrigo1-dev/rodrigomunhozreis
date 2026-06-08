import Link from "next/link";

/** Bloco de conversão no fim do artigo — leva o leitor de SEO para o funil. */
export function PostCta() {
  return (
    <aside className="glass mt-12 p-7 md:p-9">
      <p className="kicker-d">Próximo passo</p>
      <h2 className="mt-3 text-2xl font-medium tracking-tight text-paper md:text-3xl">
        Quer aplicar isso com método?
      </h2>
      <p className="mt-3 max-w-xl text-paper/60">
        Baixe os guias gratuitos de vibecoding com engenharia e libere os robôs de IA na Área do
        Cliente — prompts prontos para usar no ChatGPT, Claude ou Gemini.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/#materiais" className="btn btn-glow">
          Baixar guias grátis
        </Link>
        <Link href="/robos" className="btn btn-dark-ghost">
          Conhecer os robôs
        </Link>
      </div>
    </aside>
  );
}
