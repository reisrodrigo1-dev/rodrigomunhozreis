import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { DownloadGate } from "@/components/download-gate";
import { materials } from "@/lib/materials";

export const metadata: Metadata = {
  title: "Materiais gratuitos",
  description:
    "Baixe gratuitamente o e-book IA Sem Medo e o cartão P.E.D.E.R. — comece a usar IA com método.",
};

export default function MateriaisPage() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-c">
        <Reveal>
          <p className="kicker">Comece de graça</p>
          <h1 className="mt-4 text-4xl md:text-6xl">Materiais gratuitos</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Deixe seu e-mail e baixe na hora. Tudo que ensino para usar IA sem medo — e sem
            cair em roubada.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {materials.map((m, i) => (
            <Reveal key={m.id} delay={0.08 * i}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                <span className="self-start rounded-full border border-amber/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-deep">
                  {m.type}
                </span>
                <h2 className="mt-4 font-serif text-2xl font-semibold">{m.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {m.description}
                </p>
                <div className="mt-6">
                  <DownloadGate material={m} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-soft">
          Sem spam. Seus dados ficam seguros e você cancela quando quiser.
        </p>
      </div>
    </section>
  );
}
