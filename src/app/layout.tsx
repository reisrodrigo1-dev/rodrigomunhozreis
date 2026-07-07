import type { Metadata } from "next";
import { Fraunces, Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { site } from "@/lib/site";
import { MetaPixel } from "@/components/meta-pixel";

// ID de medição do GA4 (público: visível no HTML). Pode ser trocado via env.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-CPH3JR9WZ7";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s: ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  // Sinaliza pros leitores RSS que o feed existe (autodiscovery).
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { title: `${site.name}: Blog`, url: "/rss.xml" },
      ],
    },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `https://${site.domain}/#person`,
  name: site.name,
  jobTitle: [
    "Consultor de Inteligência Artificial",
    "Diretor de Tecnologia (CTO)",
    "Autor",
  ],
  url: `https://${site.domain}`,
  description: site.description,
  sameAs: [site.links.linkedin, site.links.instagram],
  knowsAbout: [
    "Consultoria em Inteligência Artificial",
    "Auditoria de IA",
    "Mentoria em desenvolvimento com IA",
    "Vibecoding com Engenharia",
    "Inteligência Artificial",
    "Vibecoding",
    "Engenharia de Software",
    "Segurança em IA",
    "LGPD e IA",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Consultor de Inteligência Artificial",
    occupationLocation: { "@type": "Country", name: "Brasil" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${instrument.variable}`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <Analytics />
        <MetaPixel />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
