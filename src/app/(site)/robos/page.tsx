import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { RobotsGate } from "@/components/robots-gate";

export const metadata: Metadata = {
  title: "Robôs de IA — prompts prontos para a sua IA",
  description:
    "Robôs especialistas que pensam com o método Vibecoding com Engenharia. Copie o prompt e leve direto para a sua IA — ChatGPT, Gemini ou Claude. Grátis.",
};

export default function RobosPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-c">
        <Reveal>
          <p className="kicker-d">100% grátis · Sem instalar nada</p>
          <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
            <span className="text-grad">Robôs de IA </span>
            <span className="accent">prontos.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-paper/55">
            Especialistas que pensam com o meu método. Copie o prompt e leve direto para a sua IA —
            ChatGPT, Gemini ou Claude. Em 1 clique, ela vira o especialista.
          </p>
        </Reveal>

        <RobotsGate />
      </div>
    </section>
  );
}
