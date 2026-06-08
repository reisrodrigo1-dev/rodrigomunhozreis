"use client";

// Defina NEXT_PUBLIC_CALCOM_LINK (ex.: "rodrigomunhozreis/diagnostico") na Vercel
// para ativar o agendamento. Sem a variável, a seção simplesmente não aparece.
const CAL = process.env.NEXT_PUBLIC_CALCOM_LINK;

export function CalEmbed() {
  if (!CAL) return null;
  const src = `https://cal.com/${CAL}?embed=true&theme=dark`;
  return (
    <div className="mt-10">
      <p className="kicker-d">Agenda aberta</p>
      <h3 className="mt-3 text-2xl font-medium tracking-tight text-paper md:text-3xl">
        Agende um diagnóstico de 30 min
      </h3>
      <div className="glass mt-5 overflow-hidden">
        <iframe
          src={src}
          title="Agendar diagnóstico"
          loading="lazy"
          className="h-[640px] w-full"
        />
      </div>
    </div>
  );
}
