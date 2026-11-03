import type { Localized } from "@/i18n/config";

// Textos das seções, escritos com a skill copywriting.
// Regra: só afirmações que os fatos sustentam; estimativas aparecem como estimativa.

export const sourceCopy = {
  title: {
    pt: "Sistemas e dashboards",
    en: "Systems and dashboards",
  } satisfies Localized,
  titleAccent: {
    pt: "para problemas reais.",
    en: "for real problems.",
  } satisfies Localized,
  lead: {
    pt: "Sou o Iuran, desenvolvedor em formação em Manaus. Cresci sem computador em casa e hoje construo sistemas web e dashboards de Power BI. Um deles já valida peças na linha de produção em menos de 1 minuto.",
    en: "I'm Iuran, a developer in training based in Manaus. I grew up without a computer at home, and today I build web systems and Power BI dashboards. One of them already validates parts on the production line in under a minute.",
  } satisfies Localized,
  available: {
    pt: "Disponível para estágio ou vaga júnior",
    en: "Open to internship or junior roles",
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

// Áreas da vitrine de projetos.
export const areaLabels = {
  dev: { pt: "Desenvolvimento", en: "Development" } satisfies Localized,
  data: { pt: "Dados e Power BI", en: "Data and Power BI" } satisfies Localized,
};

// Rótulos da vitrine e do painel de projeto.
export const galleryLabels = {
  areas: { pt: "Áreas dos projetos", en: "Project areas" } satisfies Localized,
  scrollPrev: { pt: "Ver projetos anteriores", en: "See previous projects" } satisfies Localized,
  scrollNext: { pt: "Ver mais projetos", en: "See more projects" } satisfies Localized,
  open: { pt: "Ver estudo de caso", en: "View case study" } satisfies Localized,
  previous: { pt: "Projeto anterior", en: "Previous project" } satisfies Localized,
  next: { pt: "Próximo projeto", en: "Next project" } satisfies Localized,
  close: { pt: "Fechar", en: "Close" } satisfies Localized,
};

// Rótulos do cartão de projeto.
export const cardLabels = {
  status: {
    "in-use": { pt: "Em uso na linha de produção", en: "In use on the production line" },
    prototype: { pt: "Protótipo", en: "Prototype" },
    dashboard: { pt: "Dashboard público", en: "Public dashboard" },
    "this-site": { pt: "Este site", en: "This site" },
  } satisfies Record<string, Localized>,
  context: { pt: "O contexto", en: "The context" } satisfies Localized,
  problem: { pt: "O problema", en: "The problem" } satisfies Localized,
  challenges: { pt: "A maior dificuldade", en: "The hardest part" } satisfies Localized,
  built: { pt: "O que construí", en: "What I built" } satisfies Localized,
  results: { pt: "Resultado", en: "Outcome" } satisfies Localized,
  learned: { pt: "O que aprendi", en: "What I learned" } satisfies Localized,
  flow: { pt: "Como o dado passa pelo sistema", en: "How data moves through it" } satisfies Localized,
  skills: { pt: "O que este projeto demonstra", en: "What this project shows" } satisfies Localized,
};

export const journeyCopy = {
  title: {
    pt: "Do celular ao primeiro sistema em produção",
    en: "From a phone screen to my first system in production",
  } satisfies Localized,
  intro: {
    pt: "Cresci sem computador em casa. Minha curiosidade por tecnologia vinha de vídeos e do que dava para fazer pelo celular. O primeiro contato de verdade com um computador veio há cerca de dois anos, no estágio. A partir dali, cada demanda do trabalho virou motivo para aprender: primeiro planilhas e dashboards, depois análise de dados e, por fim, desenvolvimento de software. Ao longo do caminho, usei a IA como apoio para entender cada linguagem e cada camada de um sistema.",
    en: "I grew up without a computer at home. My curiosity about technology came from videos and whatever I could do on a phone. My first real contact with a computer came about two years ago, during my internship. From then on, every work demand became a reason to learn: first spreadsheets and dashboards, then data analysis and, finally, software development. Along the way, I used AI as a learning partner to understand each language and each layer of a system.",
  } satisfies Localized,
  toolsTitle: {
    pt: "Ferramentas que uso",
    en: "Tools I use",
  } satisfies Localized,
};

export const journeyLabels = {
  steps: { pt: "Etapas da trajetória", en: "Journey steps" } satisfies Localized,
  previous: { pt: "Etapa anterior", en: "Previous step" } satisfies Localized,
  next: { pt: "Próxima etapa", en: "Next step" } satisfies Localized,
  hint: { pt: "Arraste a imagem ou use as setas", en: "Swipe the image or use the arrows" } satisfies Localized,
  aiCredit: { pt: "Ilustrações geradas com IA", en: "Illustrations generated with AI" } satisfies Localized,
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
    pt: "Escolha o canal que for mais prático para você. O currículo está em português e em inglês.",
    en: "Pick whichever channel works best for you. My résumé is available in English and Portuguese.",
  } satisfies Localized,
  talk: {
    pt: "Marcar uma conversa",
    en: "Schedule a chat",
  } satisfies Localized,
};

// Canais de contato: cada um com o que o recrutador encontra ali.
export const contactCopy = {
  quickTitle: { pt: "Acesso rápido", en: "Quick access" } satisfies Localized,
  channelsTitle: { pt: "Onde me encontrar", en: "Where to find me" } satisfies Localized,
  notes: {
    whatsapp: {
      pt: "Mensagem direta, para um contato mais rápido.",
      en: "Direct message, for a quicker conversation.",
    } satisfies Localized,
    email: {
      pt: "Para propostas, entrevistas e envio de testes técnicos.",
      en: "For offers, interviews and technical assessments.",
    } satisfies Localized,
    linkedin: {
      pt: "Perfil profissional com a minha experiência e formação.",
      en: "Professional profile with my experience and education.",
    } satisfies Localized,
    github: {
      pt: "O código de todos os projetos deste portfólio.",
      en: "The source code of every project in this portfolio.",
    } satisfies Localized,
  },
  actions: {
    whatsapp: { pt: "Abrir conversa", en: "Open chat" } satisfies Localized,
    email: { pt: "Escrever e-mail", en: "Write an email" } satisfies Localized,
    linkedin: { pt: "Ver perfil", en: "View profile" } satisfies Localized,
    github: { pt: "Ver repositórios", en: "View repositories" } satisfies Localized,
  },
  whatsappButton: { pt: "Chamar no WhatsApp", en: "Message on WhatsApp" } satisfies Localized,
  copy: { pt: "Copiar", en: "Copy" } satisfies Localized,
  copied: { pt: "Copiado", en: "Copied" } satisfies Localized,
};

export const footerCopy = {
  source: {
    pt: "Código deste site",
    en: "This site's source code",
  } satisfies Localized,
};
