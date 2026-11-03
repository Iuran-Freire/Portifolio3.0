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
  phoneDisplay: "(92) 98592-3140",
  siteSource: "https://github.com/Iuran-Freire/Portifolio3.0",
};

// Trajetória: a vivência industrial aparece como experiência, não como objetivo.
// A história do "sem computador" ao desenvolvimento foi contada pelo Iuran.
// "id" nomeia a ilustração da etapa: public/journey/<id>.webp (gerada com IA;
// os originais ficam em assets-source/journey/).
export const timeline: { id: string; step: Localized; period: Localized; title: Localized; text: Localized }[] = [
  {
    id: "inicio",
    step: { pt: "O começo", en: "The start" },
    period: { pt: "O começo", en: "The start" },
    title: { pt: "Curiosidade pelo celular", en: "Curiosity on a phone" },
    text: {
      pt: "Sem computador em casa, eu acompanhava tecnologia por vídeos e explorava tudo o que dava para fazer pelo celular.",
      en: "With no computer at home, I followed technology through videos and explored everything I could do on a phone.",
    },
  },
  {
    id: "tecnico",
    step: { pt: "Técnico", en: "Technical" },
    period: { pt: "Formação técnica", en: "Technical degree" },
    title: { pt: "Técnico em Automação Industrial", en: "Industrial Automation technician" },
    text: {
      pt: "Formação técnica na FUCAPI, minha base em automação e instrumentação industrial.",
      en: "Technical training at FUCAPI, my foundation in industrial automation and instrumentation.",
    },
  },
  {
    id: "instrumentacao",
    step: { pt: "Instrumentação", en: "Instrumentation" },
    period: { pt: "2022–2023", en: "2022–2023" },
    title: { pt: "Assistente de instrumentação", en: "Instrumentation assistant" },
    text: {
      pt: "Na Brasil Norte Bebidas, apoiei rotinas de instrumentação e a organização de equipamentos no chão de fábrica.",
      en: "At Brasil Norte Bebidas, I supported instrumentation routines and equipment organization on the factory floor.",
    },
  },
  {
    id: "faculdade",
    step: { pt: "Faculdade", en: "University" },
    period: { pt: "Graduação", en: "University" },
    title: { pt: "Da Engenharia para ADS", en: "From Engineering to Systems Development" },
    text: {
      pt: "Comecei Engenharia da Computação na FAMETRO e cursei até o 4º período. Depois, segui para Análise e Desenvolvimento de Sistemas, mais focada no software que eu queria construir.",
      en: "I started Computer Engineering at FAMETRO and studied up to the 4th semester. Then I moved on to Systems Analysis and Development, which is more focused on the software I wanted to build.",
    },
  },
  {
    id: "estagio",
    step: { pt: "Estágio", en: "Internship" },
    period: { pt: "2024", en: "2024" },
    title: { pt: "O computador como ferramenta de trabalho", en: "The computer as a work tool" },
    text: {
      pt: "O estágio na Inventus Power foi meu primeiro trabalho com computador e meu maior aprendizado na área. Direcionei o estágio para planilhas, dashboards de Power BI e o fluxo de dados da qualidade.",
      en: "My Inventus Power internship was my first job working on a computer and where I learned the most. I steered the internship toward spreadsheets, Power BI dashboards and the quality team's data flow.",
    },
  },
  {
    id: "software",
    step: { pt: "Software", en: "Software" },
    period: { pt: "2024–2026", en: "2024–2026" },
    title: { pt: "Dos dados ao software", en: "From data to software" },
    text: {
      pt: "Analisando dados, comecei a construir os sistemas que os geram: primeiro o sistema da qualidade, meu projeto mais difícil, e depois o Valida Laser, hoje em uso na linha.",
      en: "While analyzing data, I started building the systems that produce it: first the quality system, my hardest project, and then Valida Laser, now in use on the line.",
    },
  },
  {
    id: "hoje",
    step: { pt: "Hoje", en: "Now" },
    period: { pt: "Hoje", en: "Now" },
    title: { pt: "Em busca de novos desafios", en: "Looking for new challenges" },
    text: {
      pt: "Sou inspetor de qualidade na Inventus Power e estudo Análise e Desenvolvimento de Sistemas na FAMETRO, à noite. Quero continuar evoluindo em tecnologia, aprofundar o que sei de dados e desenvolvimento e encarar problemas que me façam crescer.",
      en: "I'm a quality inspector at Inventus Power and study Systems Analysis and Development at FAMETRO in the evenings. I want to keep growing in technology, deepen what I know about data and development, and take on problems that push me further.",
    },
  },
];
