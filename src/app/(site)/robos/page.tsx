import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { RobotCard } from "@/components/robot-card";
import { robots } from "@/lib/robots";

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

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {robots.map((r, i) => (
            <Reveal key={r.id} delay={0.06 * i}>
              <RobotCard robot={r} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="glass mt-10 p-6 text-sm text-paper/60">
            <b className="text-paper">Como usar:</b> clique em “Copiar prompt”, abra a sua IA
            preferida (ChatGPT, Gemini, Claude…) e cole. A IA assume o papel do robô na hora —
            sem instalar nada, sem baixar nada.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
