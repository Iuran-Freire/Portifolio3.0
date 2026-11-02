import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { Header } from "@/components/site/header";
import { SideMap } from "@/components/site/side-map";
import { Motion } from "@/components/site/motion";
import { Intro } from "@/components/site/intro";
import {
  ContactSection,
  Footer,
  HomeSection,
  JourneySection,
  ProjectsSection,
} from "@/components/site/sections";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const props = { locale: lang, d };

  return (
    <>
      <a
        href="#home"
        className="sr-only z-50 rounded-md bg-signal px-4 py-2 text-signal-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {d.skipToContent}
      </a>
      <Intro />
      <Motion />
      <Header {...props} />
      <SideMap d={d} />
      <main className="relative mx-auto max-w-6xl px-6 md:px-10">
        <HomeSection {...props} />
        <ProjectsSection {...props} />
        <JourneySection {...props} />
        <ContactSection {...props} />
      </main>
      <Footer {...props} />
    </>
  );
}
