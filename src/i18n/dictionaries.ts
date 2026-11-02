import type { Locale } from "./config";

// Textos da interface (navegação, botões, rótulos).
// O conteúdo dos projetos fica em src/content.
const pt = {
  meta: {
    title: "Iuran Freire · Dados e desenvolvimento",
    description:
      "Portfólio de Iuran Freire: sistemas, APIs e dashboards de Power BI. Busco estágio ou vaga júnior em dados ou desenvolvimento.",
  },
  skipToContent: "Pular para o conteúdo",
  nav: {
    label: "Etapas do pipeline",
    source: "Fonte",
    ingestion: "Ingestão",
    processing: "Processamento",
    analysis: "Análise",
    deploy: "Deploy",
  },
  language: { label: "Idioma", switchTo: "English" },
  theme: { toggle: "Alternar entre tema claro e escuro" },
  actions: {
    seeProjects: "Ver projetos",
    downloadResume: "Baixar currículo",
    talk: "Vamos conversar",
    viewCode: "Ver código",
    openDashboard: "Abrir dashboard",
  },
  resume: {
    file: "/curriculo-iuran-freire-pt.pdf",
  },
  estimated: "estimado",
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  meta: {
    title: "Iuran Freire · Data and development",
    description:
      "Iuran Freire's portfolio: systems, APIs and Power BI dashboards. Looking for an internship or junior role in data or development.",
  },
  skipToContent: "Skip to content",
  nav: {
    label: "Pipeline stages",
    source: "Source",
    ingestion: "Ingestion",
    processing: "Processing",
    analysis: "Analysis",
    deploy: "Deploy",
  },
  language: { label: "Language", switchTo: "Português" },
  theme: { toggle: "Switch between light and dark theme" },
  actions: {
    seeProjects: "See projects",
    downloadResume: "Download résumé",
    talk: "Let's talk",
    viewCode: "View code",
    openDashboard: "Open dashboard",
  },
  resume: {
    file: "/resume-iuran-freire-en.pdf",
  },
  estimated: "estimated",
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
