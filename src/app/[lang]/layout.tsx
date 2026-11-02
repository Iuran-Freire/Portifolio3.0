import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, locales } from "@/i18n/config";
import "lenis/dist/lenis.css";
import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Aplica o tema salvo antes da primeira pintura, evitando o "piscar".
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: { languages: { "pt-BR": "/pt", en: "/en" } },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      className={`${archivo.variable} ${plexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
