import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { DownloadGate } from "@/components/download-gate";
import { getMaterialsMerged } from "@/lib/materials-db";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Materiais gratuitos",
  description:
    "Baixe gratuitamente o e-book IA Sem Medo e o cartão P.E.D.E.R. — comece a usar IA com método.",
  alternates: { canonical: "/materiais" },
};

export default async function MateriaisPage() {
  const materials = await getMaterialsMerged();
  return (
    <section className="py-20 md:py-28">
      <div className="container-c">
        <Reveal>
          <p className="kicker-d">Comece de graça</p>
          <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
            <span className="text-grad">Materiais </span>
            <span className="accent">gratuitos.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-paper/55">
            Deixe seu e-mail e baixe na hora. Tudo que ensino para usar IA sem medo — e sem cair em
            roubada.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {materials.map((m, i) => (
            <Reveal key={m.id} delay={0.08 * i}>
              <div className="glass flex h-full flex-col p-7">
                <span className="self-start rounded-full border border-amber/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-light">
                  {m.type}
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-paper">{m.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/55">{m.description}</p>
                <div className="mt-6">
                  <DownloadGate material={m} variant="dark" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs text-paper/40">
          Sem spam. Seus dados ficam seguros e você cancela quando quiser.
        </p>
      </div>
    </section>
  );
}
