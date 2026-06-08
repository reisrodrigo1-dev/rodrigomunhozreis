import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { RobotCard } from "@/components/robot-card";
import { robots, type Robot } from "@/lib/robots";

export const metadata: Metadata = {
  title: "Robôs de IA — prompts prontos para a sua IA",
  description:
    "Robôs especialistas que pensam com o método Vibecoding com Engenharia. Copie o prompt e leve direto para a sua IA — ChatGPT, Gemini ou Claude. Grátis, sem instalar nada.",
};

const categories: Robot["category"][] = ["Criar sistemas com IA", "Para o negócio"];

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

        {categories.map((cat) => {
          const list = robots.filter((r) => r.category === cat);
          if (list.length === 0) return null;
          return (
            <div key={cat} className="mt-14">
              <Reveal>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-light">
                  {cat}
                </h2>
              </Reveal>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {list.map((r, i) => (
                  <Reveal key={r.id} delay={0.05 * i}>
                    <RobotCard robot={r} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}

        <Reveal delay={0.1}>
          <div className="glass mt-12 p-6 text-sm text-paper/60">
            <b className="text-paper">Como usar:</b> clique em “Copiar prompt”, abra a sua IA
            preferida (ChatGPT, Gemini, Claude…) e cole. A IA assume o papel do robô na hora — sem
            instalar nada, sem baixar nada.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
