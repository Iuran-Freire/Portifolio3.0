import type { Localized } from "@/i18n/config";

/*
  Os 8 projetos do portfólio, no mesmo formato.
  Regra de honestidade: só o Valida Laser está em uso; os outros são protótipos.
  Campos sem informação confirmada pelo Iuran ficam de fora (nada inventado).
  Fonte: docs/rascunho-projetos.md
*/

export type ProjectStatus = "in-use" | "prototype" | "dashboard" | "this-site";

export type Metric = {
  value: string;
  label: Localized;
  // Estimativas do Iuran, sem medição formal.
  estimated: boolean;
};

export type Project = {
  id: string;
  status: ProjectStatus;
  title: Localized;
  oneLiner: Localized;
  problem?: Localized;
  challenges?: Localized[];
  built?: Localized;
  results?: Localized[];
  learned?: Localized;
  flow?: Localized[];
  stack: string[];
  repo?: string;
  links?: { label: Localized; href: string }[];
  metric?: Metric;
};

export const projects: Project[] = [
  {
    id: "sistema-qualidade",
    status: "prototype",
    title: { pt: "Sistema de Gestão da Qualidade", en: "Quality Management System" },
    oneLiner: {
      pt: "Sistema web para as inspeções de entrada e saída (IQC/OQC), com amostragem pela norma, CPK em tempo real e relatórios em PDF.",
      en: "A web system for incoming and outgoing inspections (IQC/OQC), with standard-based sampling, live CPK and PDF reports.",
    },
    problem: {
      pt: "As inspeções eram feitas em planilhas Excel. O tamanho da amostra era calculado à mão, cada inspeção seguia um formato e rastrear resultados por lote dava trabalho.",
      en: "Inspections lived in Excel spreadsheets. Sample sizes were calculated by hand, every inspection had its own format and tracing results by lot took effort.",
    },
    challenges: [
      {
        pt: "Foi o projeto mais difícil que fiz: meu primeiro contato com um projeto real, nascido de uma necessidade da empresa.",
        en: "The hardest project I've built: my first real project, born from an actual need at the company.",
      },
      {
        pt: "Transformar a norma NBR 5426 em código: letra-código, tamanho da amostra, aceitação e rejeição, e a troca entre inspeção normal, severa e atenuada.",
        en: "Turning the NBR 5426 standard into code: code letter, sample size, accept and reject numbers, and switching between normal, tightened and reduced inspection.",
      },
      {
        pt: "Garantir que mudar um plano não altere inspeções antigas: cada inspeção congela uma cópia do plano.",
        en: "Making sure that editing a plan never changes past inspections: each one freezes a copy of the plan.",
      },
    ],
    built: {
      pt: "Planos de inspeção com características, limites e regra de amostragem; execução com medições e CPK calculado na hora; resultado PASS/FAIL que bloqueia a finalização se faltar dado; relatório PDF com média, desvio padrão, Cp e Cpk; histórico de revisões, notificações, gestão de usuários e exportação CSV.",
      en: "Inspection plans with characteristics, limits and sampling rules; measurements with CPK calculated on the spot; PASS/FAIL results that block closing with missing data; PDF reports with mean, standard deviation, Cp and Cpk; revision history, notifications, user management and CSV export.",
    },
    results: [
      {
        pt: "Amostragem sempre pela norma, sem cálculo manual.",
        en: "Sampling always follows the standard, with no manual math.",
      },
      {
        pt: "Rastreabilidade por lote e por inspetor, com relatório pronto para auditoria.",
        en: "Traceability by lot and inspector, with audit-ready reports.",
      },
    ],
    learned: {
      pt: "Usando IA como apoio, aprendi como as linguagens se comportam e como cada bloco do front-end se conecta ao back-end, até ter um sistema completo, do banco ao relatório em PDF.",
      en: "With AI as a learning partner, I learned how languages behave and how each piece of the front end connects to the back end, until I had a complete system, from the database to the PDF report.",
    },
    flow: [
      { pt: "Plano de inspeção", en: "Inspection plan" },
      { pt: "Amostragem NBR 5426", en: "NBR 5426 sampling" },
      { pt: "Cópia congelada do plano", en: "Frozen copy of the plan" },
      { pt: "API Node/Express", en: "Node/Express API" },
      { pt: "PostgreSQL", en: "PostgreSQL" },
      { pt: "Relatório PDF e CSV", en: "PDF report and CSV" },
    ],
    stack: ["Vue 3", "Pinia", "Node.js", "Express", "PostgreSQL", "Dexie", "jsPDF"],
    repo: "https://github.com/Iuran-Freire/Quality-System-",
  },
  {
    id: "valida-laser",
    status: "in-use",
    title: { pt: "Valida Laser", en: "Valida Laser" },
    oneLiner: {
      pt: "App de celular que confere, por foto, se a série gravada na peça bate com o código Data Matrix, mesmo sem internet.",
      en: "A phone app that checks, from a photo, whether the serial printed on a part matches its Data Matrix code, even offline.",
    },
    problem: {
      pt: "Cada validação (três peças) era feita a olho: ler o QR Code, ler a série serigrafada, comparar caractere por caractere e lançar. Levava cerca de 10 minutos, e letras parecidas como O/0 e I/1 geravam erro.",
      en: "Each validation (three parts) was done by eye: read the QR code, read the printed serial, compare character by character and log it. It took about 10 minutes, and look-alike characters such as O/0 and I/1 caused errors.",
    },
    challenges: [
      {
        pt: "Fazer o OCR acertar letras quase iguais: a comparação é feita posição por posição, e o inspetor confirma quando o OCR lê O no lugar de zero.",
        en: "Getting OCR right on near-identical characters: the comparison runs position by position, and the inspector confirms when OCR reads O instead of zero.",
      },
      {
        pt: "Rodar o OCR dentro do celular sem estourar a memória: as leituras detalhadas processam uma imagem por vez.",
        en: "Running OCR on the phone without running out of memory: detailed readings process one image at a time.",
      },
    ],
    built: {
      pt: "Uma PWA offline-first: uma foto captura o código e a série, o OCR (PaddleOCR em WebAssembly) roda no aparelho e uma regra por posição compara as leituras, validando também o turno codificado na série. Nada é registrado sem a confirmação do inspetor. Registros vão para o Cloudflare D1 e as fotos para o R2, com ambientes separados de teste e produção.",
      en: "An offline-first PWA: one photo captures the code and the serial, OCR (PaddleOCR in WebAssembly) runs on the device and a position-based rule compares both readings, also checking the shift encoded in the serial. Nothing is saved without the inspector's confirmation. Records go to Cloudflare D1 and photos to R2, with separate test and production environments.",
    },
    results: [
      {
        pt: "Em uso na linha de produção: um inspetor valida as peças quase instantaneamente.",
        en: "In use on the production line: one inspector validates parts almost instantly.",
      },
      {
        pt: "Cada registro guarda foto, leitura do OCR e correções manuais, então qualquer divergência pode ser auditada.",
        en: "Every record keeps the photo, the OCR reading and manual corrections, so any mismatch can be audited.",
      },
    ],
    learned: {
      pt: "Foi o reflexo do que aprendi no sistema da qualidade: dessa vez eu já sabia como começar um projeto grande. Usei uma tecnologia diferente e a IA como apoio para aproveitar o máximo dela, da forma correta. E aprendi que a automação não precisa tirar a decisão do inspetor: o app compara e sugere, a pessoa confirma.",
      en: "It reflected what I learned on the quality system: this time I knew how to start a large project. I used a different technology, with AI helping me get the most out of it the right way. I also learned that automation doesn't have to take the decision away from the inspector: the app compares and suggests, the person confirms.",
    },
    flow: [
      { pt: "Câmera do celular", en: "Phone camera" },
      { pt: "OCR + Data Matrix no navegador", en: "OCR + Data Matrix in the browser" },
      { pt: "Comparação por posição", en: "Position-based comparison" },
      { pt: "Confirmação do inspetor", en: "Inspector confirmation" },
      { pt: "Fila offline (IndexedDB)", en: "Offline queue (IndexedDB)" },
      { pt: "Cloudflare Workers, D1 e R2", en: "Cloudflare Workers, D1 and R2" },
    ],
    stack: ["JavaScript", "PWA", "WebAssembly", "PaddleOCR", "Cloudflare Workers", "D1", "R2"],
    repo: "https://github.com/Iuran-Freire/Projeto-Valida-o-da-Laser",
    metric: {
      value: "~90%",
      label: {
        pt: "menos tempo por validação, de ~10 min para menos de 1 min",
        en: "less time per validation, from ~10 min to under 1 min",
      },
      estimated: true,
    },
  },
  {
    id: "gestao-fpy",
    status: "prototype",
    title: { pt: "Gestão FPY", en: "FPY Management" },
    oneLiner: {
      pt: "PWA que registra produção e defeitos hora a hora e calcula o FPY (aprovação de primeira) por turno, linha e produto.",
      en: "A PWA that logs production and defects every hour and calculates FPY (first pass yield) by shift, line and product.",
    },
    problem: {
      pt: "Os defeitos são lançados a cada hora, e cada lançamento leva de 30 a 45 minutos para inserir os dados e relacionar cada defeito ao seu código.",
      en: "Defects are logged every hour, and each entry takes 30 to 45 minutes to input the data and match every defect to its code.",
    },
    challenges: [
      {
        pt: "Calcular o FPY do jeito certo: ponderado pelas quantidades, nunca a média de percentuais, e contando só a primeira passagem de cada peça.",
        en: "Calculating FPY correctly: weighted by quantities, never an average of percentages, counting only each part's first pass.",
      },
      {
        pt: "Permitir correções sem perder a verdade: toda correção exige motivo, guarda histórico e nunca sobrescreve a alteração de outra pessoa.",
        en: "Allowing corrections without losing the truth: every fix needs a reason, keeps history and never overwrites someone else's change.",
      },
    ],
    built: {
      pt: "Login próprio com perfis (operador lança; líder, supervisor e técnica corrigem), auditoria de cada alteração, cadastro de produtos e defeitos já relacionados, dashboard de FPY com filtros, top defeitos por turno, planos de ação e exportação CSV. Funciona offline sem duplicar lançamentos.",
      en: "Its own login with roles (operators log; leads, supervisors and technicians correct), an audit trail, a catalog where products and defects are already linked, an FPY dashboard with filters, top defects by shift, action plans and CSV export. It works offline without duplicating entries.",
    },
    results: [
      {
        pt: "Ganho estimado de ~15 minutos por lançamento, graças aos códigos de defeito já relacionados.",
        en: "An estimated ~15 minutes saved per entry, thanks to defect codes that are already linked.",
      },
    ],
    flow: [
      { pt: "Lançamento por hora", en: "Hourly entry" },
      { pt: "Fila offline (IndexedDB)", en: "Offline queue (IndexedDB)" },
      { pt: "API em Cloudflare Workers", en: "Cloudflare Workers API" },
      { pt: "Drizzle ORM + D1", en: "Drizzle ORM + D1" },
      { pt: "Cálculo do FPY ponderado", en: "Weighted FPY calculation" },
      { pt: "Dashboard e planos de ação", en: "Dashboard and action plans" },
    ],
    stack: ["React", "TypeScript", "Next.js", "Cloudflare Workers", "D1", "Drizzle ORM", "IndexedDB"],
    repo: "https://github.com/Iuran-Freire/gestao-fpy",
    metric: {
      value: "~15 min",
      label: {
        pt: "de ganho estimado por lançamento de defeitos",
        en: "estimated time saved per defect entry",
      },
      estimated: true,
    },
  },
  {
    id: "controle-de-solda",
    status: "prototype",
    title: { pt: "Controle de Solda", en: "Soldering Control" },
    oneLiner: {
      pt: "App que digitaliza a verificação diária das estações de solda, com gráficos de controle estatístico (I-MR) e relatórios em PDF.",
      en: "An app that digitizes daily soldering station checks, with statistical control charts (I-MR) and PDF reports.",
    },
    challenges: [
      {
        pt: "Implementar as cartas I-MR (média, amplitude móvel e limites de controle) e deixar os gráficos legíveis com valores reais.",
        en: "Implementing I-MR charts (mean, moving range and control limits) and keeping them readable with real values.",
      },
      {
        pt: "Funcionar offline em aparelhos compartilhados, sem perder nem sobrescrever inspeções.",
        en: "Working offline on shared devices without losing or overwriting inspections.",
      },
    ],
    built: {
      pt: "Cadastro de estações com critérios, checklist e medições por turno, QR Code por estação para abrir direto no posto, resultados por dia e turno, cartas I-MR e relatórios PDF por dia, semana ou mês. Instalável no Android e no Windows.",
      en: "Station setup with criteria, checklists and measurements per shift, a QR code per station to open it right at the workstation, results by day and shift, I-MR charts and PDF reports by day, week or month. Installable on Android and Windows.",
    },
    stack: ["React", "TypeScript", "Vite", "shadcn/ui", "Recharts", "IndexedDB", "Cloudflare Workers", "D1"],
    repo: "https://github.com/Iuran-Freire/controle-de-solda",
  },
  {
    id: "barcodecam",
    status: "prototype",
    title: { pt: "BarcodeCam", en: "BarcodeCam" },
    oneLiner: {
      pt: "Programa para Windows que lê pela webcam os códigos de barras de S/N e MAC de cada produto, associa os dois e salva sem duplicar.",
      en: "A Windows program that reads each product's S/N and MAC barcodes from a webcam, pairs them and saves them without duplicates.",
    },
    challenges: [
      {
        pt: "Leitura instável da câmera: o programa só aceita um código lido duas vezes igual em 1,5 segundo.",
        en: "Unstable camera reads: the program only accepts a code read twice the same way within 1.5 seconds.",
      },
      {
        pt: "Câmeras diferentes em cada computador: ele testa modos e resoluções até achar um que funcione.",
        en: "Different cameras on every computer: it tries modes and resolutions until one works.",
      },
    ],
    built: {
      pt: "Leitor em Python com OpenCV e pyzbar que classifica cada código (MAC com 12 hexadecimais, S/N com 13 caracteres), salva em SQLite sem duplicar, mostra os últimos registros numa interface web e exporta para Excel. Empacotado como executável para quem não programa.",
      en: "A Python reader with OpenCV and pyzbar that classifies each code (MAC with 12 hex digits, S/N with 13 characters), stores it in SQLite without duplicates, shows recent records in a web interface and exports to Excel. Packaged as an executable for non-developers.",
    },
    stack: ["Python", "OpenCV", "pyzbar", "Flask", "SQLite", "PyInstaller"],
    repo: "https://github.com/Iuran-Freire/BarcodeCam",
  },
  {
    id: "gestao-estoque",
    status: "dashboard",
    title: { pt: "Gestão de Estoque", en: "Inventory Management" },
    oneLiner: {
      pt: "Dashboard de Power BI que acompanha materiais não conformes, impacto financeiro, movimentações e variação mensal do estoque.",
      en: "A Power BI dashboard that tracks nonconforming materials, financial impact, movements and monthly inventory changes.",
    },
    built: {
      pt: "Painel com custos, volumes e movimentações de materiais para analisar o mês e encontrar desvios.",
      en: "A dashboard with material costs, volumes and movements to review each month and spot deviations.",
    },
    stack: ["Power BI", "Power Query", "Excel"],
    links: [
      {
        label: { pt: "Abrir dashboard", en: "Open dashboard" },
        href: "https://app.powerbi.com/view?r=eyJrIjoiMzI5MGEzMDYtNTI4My00NDRjLWFhYTMtZGZjNDc0NjIzMGI2IiwidCI6IjE5NjNjNWNlLWZjYjUtNDE0Zi1hNWJlLTM4MjM3NTgwMjg0YSIsImMiOjN9",
      },
    ],
  },
  {
    id: "performance-producao",
    status: "dashboard",
    title: { pt: "Performance de Produção e Qualidade", en: "Production and Quality Performance" },
    oneLiner: {
      pt: "Dashboard de Power BI que relaciona produção, defeitos, yield, fail rate e os principais problemas de cada modelo.",
      en: "A Power BI dashboard that connects production, defects, yield, fail rate and the top issues for each model.",
    },
    built: {
      pt: "Painel que cruza produção e qualidade e destaca os defeitos que mais pesam no yield.",
      en: "A dashboard that crosses production and quality data and highlights the defects that weigh most on yield.",
    },
    stack: ["Power BI", "DAX", "Excel"],
    links: [
      {
        label: { pt: "Abrir dashboard", en: "Open dashboard" },
        href: "https://app.powerbi.com/view?r=eyJrIjoiY2EyZjllM2QtNDE5Yi00NDhiLTk3MzMtZTI1YjA1ZThmMTVjIiwidCI6IjE5NjNjNWNlLWZjYjUtNDE0Zi1hNWJlLTM4MjM3NTgwMjg0YSIsImMiOjN9",
      },
    ],
  },
  {
    id: "portfolio",
    status: "this-site",
    title: { pt: "Este portfólio", en: "This portfolio" },
    oneLiner: {
      pt: "O site que você está vendo: bilíngue, com rolagem suave e transições entre as seções.",
      en: "The site you're on: bilingual, with smooth scrolling and transitions between sections.",
    },
    built: {
      pt: "Next.js com export estático, Tailwind e shadcn/ui; animações com GSAP e Lenis; versão sem movimento para quem prefere; publicado no Cloudflare.",
      en: "Next.js with static export, Tailwind and shadcn/ui; animations with GSAP and Lenis; a reduced-motion version; deployed on Cloudflare.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Cloudflare"],
    repo: "https://github.com/Iuran-Freire/Portifolio3.0",
  },
];
