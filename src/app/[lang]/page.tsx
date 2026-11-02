import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { Header } from "@/components/site/header";
import { SideMap } from "@/components/site/side-map";
import { Motion } from "@/components/site/motion";
import {
  AnalysisSection,
  DeploySection,
  Footer,
  IngestionSection,
  ProcessingSection,
  SourceSection,
} from "@/components/site/sections";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const props = { locale: lang, d };

  return (
    <>
      <a
        href="#source"
        className="sr-only z-50 rounded-md bg-signal px-4 py-2 text-signal-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {d.skipToContent}
      </a>
      <Motion />
      <Header {...props} />
      <SideMap d={d} />
      <main className="relative mx-auto max-w-6xl px-6 md:px-10">
        <SourceSection {...props} />
        <IngestionSection {...props} />
        <ProcessingSection {...props} />
        <AnalysisSection {...props} />
        <DeploySection {...props} />
      </main>
      <Footer {...props} />
    </>
  );
}
