import type { Localized } from "@/i18n/config";

// Textos das seções, escritos com a skill copywriting.
// Regra: só afirmações que os fatos sustentam; estimativas aparecem como estimativa.

export const sourceCopy = {
  title: {
    pt: "Do app que captura o dado",
    en: "From the app that captures data",
  } satisfies Localized,
  titleAccent: {
    pt: "ao painel que decide.",
    en: "to the dashboard that decides.",
  } satisfies Localized,
  lead: {
    pt: "Sou o Iuran, desenvolvedor em formação em Manaus. Construí um app de OCR que reduziu a validação de peças de cerca de 10 minutos para menos de 1, sistemas web com APIs em Node e Cloudflare Workers e dashboards de Power BI de produção e estoque.",
    en: "I'm Iuran, a developer in training based in Manaus. I built an OCR app that cut part validation from about 10 minutes to under 1, web systems with APIs on Node and Cloudflare Workers, and Power BI dashboards for production and inventory.",
  } satisfies Localized,
  seeking: {
    pt: "Procuro estágio ou vaga júnior em dados (Power BI) ou desenvolvimento.",
    en: "I'm looking for an internship or junior role in data (Power BI) or development.",
  } satisfies Localized,
};

export const projectsCopy = {
  title: {
    pt: "Oito projetos, um problema real em cada",
    en: "Eight projects, each built for a real problem",
  } satisfies Localized,
  intro: {
    pt: "Todos nasceram de necessidades da fábrica onde trabalho. Um deles está em uso na linha de produção; os outros são protótipos completos, com o código aberto para você ler.",
    en: "All of them came from real needs at the factory where I work. One is in use on the production line; the others are complete prototypes, with open source code you can read.",
  } satisfies Localized,
};

// Rótulos do cartão de projeto.
export const cardLabels = {
  status: {
    "in-use": { pt: "Em uso na linha de produção", en: "In use on the production line" },
    prototype: { pt: "Protótipo", en: "Prototype" },
    dashboard: { pt: "Dashboard público", en: "Public dashboard" },
    "this-site": { pt: "Este site", en: "This site" },
  } satisfies Record<string, Localized>,
  problem: { pt: "O problema", en: "The problem" } satisfies Localized,
  challenges: { pt: "A maior dificuldade", en: "The hardest part" } satisfies Localized,
  built: { pt: "O que construí", en: "What I built" } satisfies Localized,
  results: { pt: "Resultado", en: "Outcome" } satisfies Localized,
  learned: { pt: "O que aprendi", en: "What I learned" } satisfies Localized,
  flow: { pt: "Como o dado passa pelo sistema", en: "How data moves through it" } satisfies Localized,
};

export const journeyCopy = {
  title: {
    pt: "De técnico em automação a desenvolvedor",
    en: "From automation technician to developer",
  } satisfies Localized,
  intro: {
    pt: "Aprendi a programar resolvendo problemas da linha de produção, com a IA como apoio para entender cada linguagem e cada camada do sistema.",
    en: "I learned to code by solving production line problems, using AI as a partner to understand each language and each layer of a system.",
  } satisfies Localized,
  toolsTitle: {
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
