import type { Localized } from "@/i18n/config";

// Etapas do pipeline onde cada projeto aparece.
export type Stage = "ingestion" | "processing" | "analysis";

export type Metric = {
  value: string;
  label: Localized;
  // Estimativas do Iuran, sem medição formal: o site mostra "estimado".
  estimated: boolean;
};

export type Project = {
  id: string;
  stage: Stage;
  featured: boolean;
  title: Localized;
  summary: Localized;
  problem?: Localized;
  solution?: Localized;
  results?: Localized[];
  flow?: Localized[];
  stack: string[];
  repo?: string;
  links?: { label: Localized; href: string }[];
  metric?: Metric;
};

export const projects: Project[] = [
  {
    id: "valida-laser",
    stage: "ingestion",
    featured: true,
    title: { pt: "Valida Laser", en: "Valida Laser" },
    summary: {
      pt: "App que confere, pela câmera do celular, se a série gravada na peça bate com o código Data Matrix, mesmo sem internet.",
      en: "An app that checks, from a phone camera, whether the serial printed on a part matches its Data Matrix code, even offline.",
    },
    problem: {
      pt: "Cada validação (três peças) era feita a olho: ler o QR Code, ler a série serigrafada, comparar caractere por caractere e lançar. Levava cerca de 10 minutos, e letras parecidas como O/0 e I/1 geravam erro.",
      en: "Each validation (three parts) was done by eye: read the QR code, read the printed serial, compare character by character and log it. It took about 10 minutes, and look-alike characters such as O/0 and I/1 caused errors.",
    },
    solution: {
      pt: "Uma PWA offline-first: uma foto captura o código e a série, o OCR (PaddleOCR em WebAssembly) roda no próprio celular e uma regra por posição compara as duas leituras. O inspetor só confere e confirma.",
      en: "An offline-first PWA: one photo captures the code and the serial, OCR (PaddleOCR in WebAssembly) runs on the phone itself and a position-based rule compares both readings. The inspector just reviews and confirms.",
    },
    results: [
      {
        pt: "Validação automática em ~5 segundos, com até ~1 minuto de revisão humana.",
        en: "Automatic validation in ~5 seconds, with up to ~1 minute of human review.",
      },
      {
        pt: "Cada registro guarda foto, leitura do OCR e correções manuais.",
        en: "Every record keeps the photo, the OCR reading and any manual corrections.",
      },
      {
        pt: "Sem internet, registros e fotos esperam no aparelho e sincronizam depois.",
        en: "Offline, records and photos wait on the device and sync later.",
      },
    ],
    flow: [
      { pt: "Câmera do celular", en: "Phone camera" },
      { pt: "OCR + Data Matrix no navegador", en: "OCR + Data Matrix in the browser" },
      { pt: "Regra de comparação por posição", en: "Position-based comparison rule" },
      { pt: "Fila offline (IndexedDB)", en: "Offline queue (IndexedDB)" },
      { pt: "API em Cloudflare Workers", en: "Cloudflare Workers API" },
      { pt: "D1 (registros) e R2 (fotos)", en: "D1 (records) and R2 (photos)" },
    ],
    stack: ["JavaScript", "PWA", "WebAssembly", "PaddleOCR", "Cloudflare Workers", "D1", "R2"],
    repo: "https://github.com/Iuran-Freire/Projeto-Valida-o-da-Laser",
    metric: {
      value: "~90%",
      label: {
        pt: "menos tempo por validação (de ~10 min para ~1 min)",
        en: "less time per validation (from ~10 min to ~1 min)",
      },
      estimated: true,
    },
  },
  {
    id: "controle-de-solda",
    stage: "ingestion",
    featured: false,
    title: { pt: "Controle de Solda", en: "Soldering Control" },
    summary: {
      pt: "PWA offline para a verificação diária de estações de solda, com carta I-MR, relatórios PDF e QR Code.",
      en: "Offline PWA for daily soldering station checks, with an I-MR chart, PDF reports and QR codes.",
    },
    stack: ["React", "TypeScript", "Cloudflare Workers", "D1", "Drizzle ORM"],
    repo: "https://github.com/Iuran-Freire/controle-de-solda",
  },
  {
    id: "barcodecam",
    stage: "ingestion",
    featured: false,
    title: { pt: "BarcodeCam", en: "BarcodeCam" },
    summary: {
      pt: "Leitura de S/N e MAC pela câmera com Python e OpenCV, validação, SQLite e exportação para Excel.",
      en: "Reads S/N and MAC barcodes from a camera with Python and OpenCV, validates them, stores them in SQLite and exports to Excel.",
    },
    stack: ["Python", "Flask", "OpenCV", "SQLite"],
    repo: "https://github.com/Iuran-Freire/BarcodeCam",
  },
  {
    id: "gestao-qualidade",
    stage: "processing",
    featured: true,
    title: { pt: "Sistema de inspeções", en: "Inspection system" },
    summary: {
      pt: "Sistema web que substituiu planilhas de inspeção: calcula a amostra pela norma, mede CPK em tempo real e gera relatórios em PDF.",
      en: "A web system that replaced inspection spreadsheets: it calculates the sample size by standard, measures CPK live and generates PDF reports.",
    },
    problem: {
      pt: "As inspeções de entrada e saída eram feitas em Excel: o tamanho da amostra era calculado à mão, cada inspeção seguia um formato e rastrear resultados por lote dava trabalho.",
      en: "Incoming and outgoing inspections lived in Excel: sample sizes were calculated by hand, every inspection had its own format and tracing results by lot took effort.",
    },
    solution: {
      pt: "Cada plano define características, limites e regra de amostragem. Ao iniciar uma inspeção, o sistema calcula a amostra (NBR 5426) e congela uma cópia do plano, para que mudanças futuras não alterem registros antigos.",
      en: "Each plan defines characteristics, limits and a sampling rule. When an inspection starts, the system calculates the sample (NBR 5426) and freezes a copy of the plan, so later changes never alter past records.",
    },
    results: [
      {
        pt: "Resultado PASS/FAIL automático; a inspeção não fecha com dado faltando.",
        en: "Automatic PASS/FAIL; an inspection can't be closed with missing data.",
      },
      {
        pt: "CPK calculado durante a medição e relatório PDF com média, desvio padrão, Cp e Cpk.",
        en: "CPK calculated while measuring, plus a PDF report with mean, standard deviation, Cp and Cpk.",
      },
      {
        pt: "Rastreabilidade por lote e por inspetor, com exportação CSV.",
        en: "Traceability by lot and inspector, with CSV export.",
      },
    ],
    flow: [
      { pt: "Plano de inspeção", en: "Inspection plan" },
      { pt: "Amostragem NBR 5426", en: "NBR 5426 sampling" },
      { pt: "Snapshot imutável", en: "Immutable snapshot" },
      { pt: "API Node/Express", en: "Node/Express API" },
      { pt: "PostgreSQL", en: "PostgreSQL" },
      { pt: "PDF e CSV", en: "PDF and CSV" },
    ],
    stack: ["Vue 3", "Pinia", "Node.js", "Express", "PostgreSQL", "Dexie", "jsPDF"],
    repo: "https://github.com/Iuran-Freire/Quality-System-",
  },
  {
    id: "gestao-fpy",
    stage: "processing",
    featured: true,
    title: { pt: "Gestão FPY", en: "FPY Management" },
    summary: {
      pt: "PWA que reúne produção, defeitos e planos de ação e calcula o FPY (aprovação de primeira) por turno, linha e produto.",
      en: "A PWA that brings production, defects and action plans together and calculates FPY (first pass yield) by shift, line and product.",
    },
    problem: {
      pt: "Os defeitos são lançados hora a hora. Cada lançamento levava de 30 a 45 minutos para inserir os dados e relacionar cada defeito ao seu código.",
      en: "Defects are logged every hour. Each entry took 30 to 45 minutes to input the data and match every defect to its code.",
    },
    solution: {
      pt: "Um cadastro em que os códigos de defeito já se relacionam, fila offline para não perder lançamentos e cálculo do FPY ponderado no servidor, com permissões por perfil e auditoria.",
      en: "A catalog where defect codes are already linked, an offline queue so no entry is lost, and weighted FPY calculated on the server, with role-based permissions and an audit trail.",
    },
    results: [
      {
        pt: "Cerca de 15 minutos a menos por lançamento.",
        en: "About 15 minutes less per entry.",
      },
      {
        pt: "Permissões por perfil e histórico de cada alteração.",
        en: "Role-based permissions and a history of every change.",
      },
      {
        pt: "Lançamentos funcionam offline e sincronizam depois.",
        en: "Entries work offline and sync later.",
      },
    ],
    flow: [
      { pt: "Lançamento por hora", en: "Hourly entry" },
      { pt: "Fila offline (IndexedDB)", en: "Offline queue (IndexedDB)" },
      { pt: "API em Cloudflare Workers", en: "Cloudflare Workers API" },
      { pt: "Drizzle ORM + D1", en: "Drizzle ORM + D1" },
      { pt: "Cálculo do FPY", en: "FPY calculation" },
      { pt: "Análises e planos de ação", en: "Reports and action plans" },
    ],
    stack: ["React", "TypeScript", "Next.js", "Cloudflare Workers", "D1", "Drizzle ORM", "IndexedDB"],
    repo: "https://github.com/Iuran-Freire/gestao-fpy",
    metric: {
      value: "~15 min",
      label: {
        pt: "a menos por lançamento de defeitos",
        en: "saved per defect entry",
      },
      estimated: true,
    },
  },
  {
    id: "dashboards",
    stage: "analysis",
    featured: true,
    title: { pt: "Dashboards de Power BI", en: "Power BI dashboards" },
    summary: {
      pt: "Painéis de produção, defeitos, yield e estoque que transformam os dados capturados em decisão.",
      en: "Production, defect, yield and inventory dashboards that turn captured data into decisions.",
    },
    stack: ["Power BI", "DAX", "Power Query", "Excel"],
    links: [
      {
        label: { pt: "Produção e qualidade", en: "Production and quality" },
        href: "https://app.powerbi.com/view?r=eyJrIjoiY2EyZjllM2QtNDE5Yi00NDhiLTk3MzMtZTI1YjA1ZThmMTVjIiwidCI6IjE5NjNjNWNlLWZjYjUtNDE0Zi1hNWJlLTM4MjM3NTgwMjg0YSIsImMiOjN9",
      },
      {
        label: { pt: "Estoque", en: "Inventory" },
        href: "https://app.powerbi.com/view?r=eyJrIjoiMzI5MGEzMDYtNTI4My00NDRjLWFhYTMtZGZjNDc0NjIzMGI2IiwidCI6IjE5NjNjNWNlLWZjYjUtNDE0Zi1hNWJlLTM4MjM3NTgwMjg0YSIsImMiOjN9",
      },
    ],
  },
];

export function projectsByStage(stage: Stage) {
  return projects.filter((project) => project.stage === stage);
}
