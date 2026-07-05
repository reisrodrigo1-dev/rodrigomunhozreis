import type { Metadata } from "next";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter: receba os posts no e-mail",
  description:
    "Todo post novo do blog no seu e-mail. Sem enrolação, sem hype. Tutoriais, análise de notícia e método de vibecoding com engenharia.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: `Newsletter: ${site.name}`,
    description:
      "Todo post novo no seu e-mail. Sem enrolação, sem hype. Vibecoding com engenharia.",
    url: `https://${site.domain}/newsletter`,
    type: "website",
  },
};

export default function NewsletterPage() {
  return (
    <article className="py-24 md:py-32">
      <div className="container-c max-w-2xl">
        <p className="kicker-d">Newsletter</p>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-paper md:text-5xl">
          Todo post novo no seu e-mail.
        </h1>
        <p className="mt-5 text-xl text-paper/60">
          Sem enrolação, sem hype. Você recebe quando sai post novo. Cancela quando quiser, é só responder pedindo.
        </p>
        <NewsletterSignup source="newsletter-page" />
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-paper/45">
          <p>
            Prefere RSS? <a className="text-amber-light hover:underline" href="/rss.xml">Assina o feed em /rss.xml</a>.
          </p>
        </div>
      </div>
    </article>
  );
}
