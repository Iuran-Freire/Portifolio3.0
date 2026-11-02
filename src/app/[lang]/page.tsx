import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { Header } from "@/components/site/header";
import {
  AnalysisSection,
  DeploySection,
  FaqSection,
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
        className="sr-only z-50 rounded-md bg-cobalt px-4 py-2 text-cobalt-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {d.skipToContent}
      </a>
      <Header {...props} />
      <main className="relative mx-auto max-w-6xl px-6 md:pl-24">
        {/* Trilho do pipeline: a tarefa 5 anima o pacote de dados sobre ele */}
        <div aria-hidden data-pipeline-rail className="absolute top-0 bottom-0 left-[3.625rem] hidden w-px bg-cobalt/45 md:block" />
        <SourceSection {...props} />
        <IngestionSection {...props} />
        <ProcessingSection {...props} />
        <AnalysisSection {...props} />
        <FaqSection {...props} />
        <DeploySection {...props} />
      </main>
      <Footer {...props} />
    </>
  );
}
