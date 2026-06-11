"use client";

import { useState } from "react";
import { createLead } from "@/lib/leads";
import { maskPhone, maskName, isValidPhone } from "@/lib/format";
import { ConsentCheckbox } from "@/components/consent-checkbox";
// WHATSAPP OCULTO temporariamente (anúncio pago): import { site } from "@/lib/site";

const tipos = ["Palestra", "Consultoria", "Mentoria", "Outro"];

const field =
  "min-h-[44px] w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-amber";

/**
 * Captura o lead de maior ticket (palestra/consultoria) NO site antes de
 * mandar para o WhatsApp pré-preenchido — assim nada se perde se a pessoa
 * não concluir a conversa externa.
 */
export function WorkWithMeForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [tipo, setTipo] = useState(tipos[0]);
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !email || !isValidPhone(whatsapp) || !consent) return;
    setStatus("loading");
    try {
      await createLead(email, `trabalhe-comigo:${tipo}`, nome, whatsapp);
      setStatus("done");
      // WHATSAPP OCULTO temporariamente (anúncio pago) — redirecionamento desativado.
      // const msg =
      //   `Olá Rodrigo! Sou ${nome.trim()}` +
      //   (empresa.trim() ? ` (${empresa.trim()})` : "") +
      //   `. Tenho interesse em: ${tipo}. Vim pelo seu site.`;
      // window.open(`https://wa.me/${site.links.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="glass p-7 text-center">
        <p className="text-lg font-semibold text-paper">✓ Recebido, {nome.split(" ")[0]}!</p>
        <p className="mt-2 text-sm text-paper/60">
          Anotei seu contato e retorno pessoalmente em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass flex flex-col gap-2.5 p-7">
      <p className="text-lg font-semibold text-paper">Conte rápido o que precisa</p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <input type="text" required autoComplete="name" placeholder="Seu nome" value={nome} onChange={(e) => setNome(maskName(e.target.value))} className={field} />
        <input type="text" autoComplete="organization" placeholder="Empresa (opcional)" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className={field} />
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <input type="email" required autoComplete="email" placeholder="Seu melhor e-mail" value={email} onChange={(e) => setEmail(e.target.value.trim())} className={field} />
        <input type="tel" required inputMode="numeric" autoComplete="tel" placeholder="WhatsApp — (11) 91234-5678" value={whatsapp} onChange={(e) => setWhatsapp(maskPhone(e.target.value))} maxLength={16} className={field} />
      </div>
      <label htmlFor="tipo-servico" className="sr-only">
        Tipo de serviço
      </label>
      <select id="tipo-servico" value={tipo} onChange={(e) => setTipo(e.target.value)} className={field}>
        {tipos.map((t) => (
          <option key={t} value={t} style={{ color: "#15130f", backgroundColor: "#fff" }}>
            {t}
          </option>
        ))}
      </select>
      <ConsentCheckbox checked={consent} onChange={setConsent} dark id="cs-trabalhe" />
      <button type="submit" disabled={status === "loading"} className="btn btn-glow mt-1 w-full disabled:opacity-60">
        {status === "loading" ? "Enviando…" : "Quero conversar"}
      </button>
      {status === "error" && <p className="text-sm text-red-400">Algo deu errado. Tente de novo.</p>}
    </form>
  );
}
