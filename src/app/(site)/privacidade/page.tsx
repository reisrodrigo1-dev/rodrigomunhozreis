import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CONSENT_VERSION } from "@/lib/consent";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como Rodrigo Munhoz Reis coleta, usa e protege seus dados pessoais — em conformidade com a LGPD.",
  alternates: { canonical: "/privacidade" },
};

const blocks: { h: string; p: React.ReactNode }[] = [
  {
    h: "1. Quem é o controlador",
    p: (
      <>
        Os dados coletados neste site são tratados por <strong>{site.name}</strong> ({site.domain}),
        responsável por decidir como e por que seus dados pessoais são utilizados.
      </>
    ),
  },
  {
    h: "2. Quais dados coletamos",
    p: (
      <>
        Coletamos apenas o que você nos fornece nos formulários: <strong>nome</strong>,{" "}
        <strong>e-mail</strong>, <strong>WhatsApp</strong> e, ao criar conta, seu{" "}
        <strong>perfil</strong> (dono de empresa, profissional etc.). Ao baixar um material, também
        registramos qual material foi baixado e informações técnicas básicas (navegador) para
        segurança e métricas.
      </>
    ),
  },
  {
    h: "3. Para que usamos",
    p: (
      <>
        Para entregar o material ou acesso solicitado, manter você informado sobre conteúdos de IA e
        vibecoding, e melhorar o site. Não vendemos seus dados a terceiros.
      </>
    ),
  },
  {
    h: "4. Base legal",
    p: (
      <>
        Tratamos seus dados com base no <strong>seu consentimento</strong> (art. 7º, I da LGPD), dado
        ao marcar a caixa de aceite, e no <strong>legítimo interesse</strong> para comunicação e
        segurança. Você pode retirar o consentimento a qualquer momento.
      </>
    ),
  },
  {
    h: "5. Por quanto tempo guardamos",
    p: (
      <>
        Mantemos seus dados enquanto você quiser receber nossos conteúdos ou tiver conta ativa.
        Quando você pedir a exclusão, removemos seus dados da nossa base.
      </>
    ),
  },
  {
    h: "6. Seus direitos",
    p: (
      <>
        Você pode solicitar a qualquer momento: acesso, correção, portabilidade e{" "}
        <strong>exclusão</strong> dos seus dados, além de revogar o consentimento. Para exercer,
        fale conosco pelo{" "}
        <a href={site.links.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-amber-light hover:underline">
          WhatsApp
        </a>
        .
      </>
    ),
  },
  {
    h: "7. Segurança",
    p: (
      <>
        Os dados ficam armazenados em infraestrutura do Google (Firebase) com regras de acesso
        restritivas. O acesso administrativo é protegido por autenticação. Tratamos segurança como
        parte central do nosso trabalho — não como um detalhe.
      </>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-c max-w-3xl">
        <p className="kicker-d">Transparência</p>
        <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-5xl">
          <span className="text-grad">Política de </span>
          <span className="accent">Privacidade.</span>
        </h1>
        <p className="mt-4 text-paper/60">
          Versão {CONSENT_VERSION}. Em conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </p>

        <div className="mt-12 flex flex-col gap-8">
          {blocks.map((b) => (
            <div key={b.h}>
              <h2 className="text-xl font-semibold text-paper">{b.h}</h2>
              <p className="mt-2 leading-relaxed text-paper/65">{b.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <Link href="/" className="text-sm font-semibold text-amber-light hover:underline">
            ← Voltar para a home
          </Link>
        </div>
      </div>
    </section>
  );
}
