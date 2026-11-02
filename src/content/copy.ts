import type { Localized } from "@/i18n/config";

// Textos das seções, escritos com a skill copywriting.
// Regra: só afirmações que os fatos sustentam; estimativas aparecem como estimativa.

export const sourceCopy = {
  title: {
    pt: "Do app que captura o dado ao painel em que alguém decide.",
    en: "From the app that captures the data to the dashboard where someone decides.",
  } satisfies Localized,
  lead: {
    pt: "Sou o Iuran, desenvolvedor em formação em Manaus. Construí um app de OCR que reduziu a validação de peças de cerca de 10 minutos para 1, APIs em Node e Cloudflare Workers e dashboards de Power BI de produção e estoque.",
    en: "I'm Iuran, a developer in training based in Manaus. I built an OCR app that cut part validation from about 10 minutes to 1, APIs on Node and Cloudflare Workers, and Power BI dashboards for production and inventory.",
  } satisfies Localized,
  seeking: {
    pt: "Procuro estágio ou vaga júnior em dados (Power BI) ou desenvolvimento.",
    en: "I'm looking for an internship or junior role in data (Power BI) or development.",
  } satisfies Localized,
  journeyTitle: {
    pt: "Como cheguei aqui",
    en: "How I got here",
  } satisfies Localized,
};

export const ingestionCopy = {
  title: {
    pt: "Apps que capturam o dado onde ele nasce",
    en: "Apps that capture data where it starts",
  } satisfies Localized,
  intro: {
    pt: "Na fábrica, o dado nasce numa câmera de celular, num código de barras ou numa prancheta. Estes apps fazem a coleta funcionar até sem internet.",
    en: "On a factory floor, data starts in a phone camera, a barcode or a clipboard. These apps keep collection working even without internet.",
  } satisfies Localized,
};

export const processingCopy = {
  title: {
    pt: "Regras e APIs que garantem que o dado está certo",
    en: "Rules and APIs that make sure the data is right",
  } satisfies Localized,
  intro: {
    pt: "Antes de virar gráfico, o dado precisa ser validado, relacionado ao código certo e guardado com histórico de quem alterou o quê.",
    en: "Before it becomes a chart, data has to be validated, matched to the right code and stored with a history of who changed what.",
  } satisfies Localized,
};

export const analysisCopy = {
  title: {
    pt: "Painéis em que alguém toma decisão",
    en: "Dashboards where someone makes a decision",
  } satisfies Localized,
  intro: {
    pt: "No estágio, construí dashboards de Power BI para acompanhar produção, defeitos, yield e estoque. Os dois abaixo estão abertos para você navegar.",
    en: "During my internship I built Power BI dashboards to track production, defects, yield and inventory. The two below are public, so you can explore them.",
  } satisfies Localized,
  numbersTitle: {
    pt: "O que mudou com os sistemas",
    en: "What changed with these systems",
  } satisfies Localized,
  systemsBuilt: {
    pt: "sistemas construídos, do app de câmera à API",
    en: "systems built, from camera app to API",
  } satisfies Localized,
  publicDashboards: {
    pt: "dashboards públicos de Power BI",
    en: "public Power BI dashboards",
  } satisfies Localized,
  skillsTitle: {
    pt: "Ferramentas que uso",
    en: "Tools I use",
  } satisfies Localized,
};

export const deployCopy = {
  label: {
    pt: "Pronto para produção",
    en: "Ready for production",
  } satisfies Localized,
  title: {
    pt: "Vamos conversar sobre a sua vaga",
    en: "Let's talk about your opening",
  } satisfies Localized,
  body: {
    pt: "Me escreva por e-mail ou pelo LinkedIn. O currículo está em português e em inglês.",
    en: "Email me or reach out on LinkedIn. My résumé is available in English and Portuguese.",
  } satisfies Localized,
  talk: {
    pt: "Marcar uma conversa",
    en: "Schedule a chat",
  } satisfies Localized,
  others: {
    pt: "Ou me encontre em",
    en: "Or find me on",
  } satisfies Localized,
};

export const footerCopy = {
  source: {
    pt: "Código deste site",
    en: "This site's source code",
  } satisfies Localized,
};
