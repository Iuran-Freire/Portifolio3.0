import type { Localized } from "@/i18n/config";

export const profile = {
  name: "Iuran Freire",
  fullName: "Iuran Humberto de Menezes Freire",
  location: "Manaus, AM",
  role: {
    pt: "Estágio ou vaga júnior em dados (Power BI) e desenvolvimento",
    en: "Internship or junior role in data (Power BI) and development",
  } satisfies Localized,
  photo: "/iuran-freire.webp",
};

export const contacts = {
  email: "iuranhumberto99@gmail.com",
  emailSubject: {
    pt: "Conversa sobre oportunidade",
    en: "Talking about an opportunity",
  } satisfies Localized,
  linkedin: "https://www.linkedin.com/in/iuran-freire-a23092204",
  github: "https://github.com/Iuran-Freire",
  whatsapp: "https://wa.me/5592985923140",
  siteSource: "https://github.com/Iuran-Freire/Portifolio3.0",
};

// Trajetória: a vivência industrial aparece como experiência, não como objetivo.
export const timeline: { period: Localized; text: Localized }[] = [
  {
    period: { pt: "Formação técnica", en: "Technical degree" },
    text: {
      pt: "Técnico em Automação Industrial (FUCAPI).",
      en: "Industrial Automation technician (FUCAPI).",
    },
  },
  {
    period: { pt: "2022–2023", en: "2022–2023" },
    text: {
      pt: "Assistente de instrumentação na Brasil Norte Bebidas.",
      en: "Instrumentation assistant at Brasil Norte Bebidas.",
    },
  },
  {
    period: { pt: "2024–2026", en: "2024–2026" },
    text: {
      pt: "Estágio na Inventus Power: construí dashboards de Power BI e um sistema web de inspeções.",
      en: "Internship at Inventus Power: built Power BI dashboards and a web inspection system.",
    },
  },
  {
    period: { pt: "Hoje", en: "Now" },
    text: {
      pt: "Inspetor de qualidade na Inventus Power e estudante de Análise e Desenvolvimento de Sistemas (FAMETRO), em busca da primeira vaga em tecnologia.",
      en: "Quality inspector at Inventus Power and Systems Analysis and Development student (FAMETRO), looking for a first role in tech.",
    },
  },
];
