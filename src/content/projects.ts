import type { Localized } from "@/i18n/config";

/*
  Os 8 projetos do portfólio, no mesmo formato.
  Regra de honestidade: só o Valida Laser está em uso; os outros são protótipos.
  Tudo aqui vem dos repositórios (README, código, commits) ou do próprio Iuran.
  "learned" só existe onde o Iuran contou o aprendizado com as palavras dele;
  "skills" lista o que o código comprova.
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
  context?: Localized;
  problem?: Localized;
  challenges?: Localized[];
  built?: Localized;
  features?: Localized[];
  results?: Localized[];
  learned?: Localized;
  skills?: Localized[];
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
      pt: "Sistema web completo para as inspeções de recebimento e de produto final (IQC e OQC), com amostragem calculada pela norma, CPK em tempo real e relatórios em PDF prontos para auditoria.",
      en: "A complete web system for incoming and outgoing inspections (IQC and OQC), with standard-based sampling, live CPK and audit-ready PDF reports.",
    },
    context: {
      pt: "Na inspeção de qualidade, cada lote de material que chega (IQC) e cada lote de produto que sai (OQC) passa por uma amostragem: o inspetor mede características dimensionais, funcionais e visuais e decide se o lote é aprovado ou reprovado. O sistema leva esse processo inteiro para uma aplicação web, do plano de inspeção ao relatório final.",
      en: "In quality inspection, every incoming material lot (IQC) and every outgoing product lot (OQC) is sampled: the inspector measures dimensional, functional and visual characteristics and decides whether the lot passes or fails. The system brings that whole process into a web application, from the inspection plan to the final report.",
    },
    problem: {
      pt: "As inspeções eram registradas em planilhas Excel. O tamanho da amostra era calculado à mão a partir da tabela da norma, cada inspetor seguia um formato diferente, o CPK precisava ser calculado à parte e rastrear o resultado de um lote específico exigia procurar em vários arquivos.",
      en: "Inspections were recorded in Excel spreadsheets. Sample sizes were calculated by hand from the standard's table, every inspector used a different format, CPK had to be calculated separately and tracing a specific lot meant searching through several files.",
    },
    challenges: [
      {
        pt: "Foi o projeto mais difícil que fiz: meu primeiro contato com um projeto real, nascido de uma necessidade concreta da empresa, sem um exemplo pronto para seguir.",
        en: "The hardest project I've built: my first real project, born from a concrete need at the company, with no ready-made example to follow.",
      },
      {
        pt: "Transformar a norma NBR 5426 em código: a partir do tamanho do lote, do nível de inspeção e do NQA, o sistema encontra a letra-código, o tamanho da amostra e os números de aceitação e rejeição, e ainda aplica a comutação entre inspeção normal, severa e atenuada.",
        en: "Turning the NBR 5426 standard into code: from lot size, inspection level and AQL, the system finds the code letter, the sample size and the accept and reject numbers, and also applies switching between normal, tightened and reduced inspection.",
      },
      {
        pt: "Garantir que alterar um plano nunca mude inspeções antigas: no momento em que a inspeção começa, o sistema congela uma cópia das características e da amostragem.",
        en: "Making sure that editing a plan never changes past inspections: the moment an inspection starts, the system freezes a copy of its characteristics and sampling.",
      },
      {
        pt: "Conectar cada parte: telas em Vue, estado com Pinia, armazenamento local com Dexie e uma API em Node/Express com banco relacional, todas conversando entre si.",
        en: "Connecting every piece: Vue screens, Pinia state, local storage with Dexie and a Node/Express API with a relational database, all talking to each other.",
      },
    ],
    built: {
      pt: "Uma aplicação full stack em que o plano de inspeção é a peça central. Cada plano define o modelo, o cliente, o fornecedor, as características a medir e a regra de amostragem; a inspeção é executada a partir dele e termina em um relatório com estatística.",
      en: "A full stack application built around the inspection plan. Each plan defines the model, customer, supplier, characteristics to measure and sampling rule; inspections run from it and end in a report with statistics.",
    },
    features: [
      {
        pt: "Três tipos de característica: medida numérica com CPK, visual por amostra (OK/NG) e visual por caixa.",
        en: "Three characteristic types: numeric measurement with CPK, visual per sample (OK/NG) and visual per box.",
      },
      {
        pt: "Três modos de amostragem: quantidade fixa, NBR 5426 calculada na hora ou regra específica do cliente.",
        en: "Three sampling modes: fixed quantity, NBR 5426 calculated on the spot or a customer-specific rule.",
      },
      {
        pt: "CPK calculado enquanto o inspetor digita as medições, comparando com os limites de especificação.",
        en: "CPK calculated as the inspector types measurements, compared against the specification limits.",
      },
      {
        pt: "Resultado PASS/FAIL automático: qualquer NG reprova, e a inspeção não pode ser finalizada com dado faltando.",
        en: "Automatic PASS/FAIL: any NG fails the lot, and an inspection can't be closed with missing data.",
      },
      {
        pt: "Relatório PDF com tabelas dimensionais, funcionais e visuais, média, desvio padrão, Cp e Cpk.",
        en: "PDF report with dimensional, functional and visual tables, mean, standard deviation, Cp and Cpk.",
      },
      {
        pt: "Histórico de revisões dos planos, notificações, gestão de usuários com filtro por área e exportação CSV.",
        en: "Plan revision history, notifications, user management filtered by area and CSV export.",
      },
    ],
    results: [
      {
        pt: "Amostragem sempre pela norma, sem consulta manual a tabelas nem risco de erro de cálculo.",
        en: "Sampling always follows the standard, with no manual table lookups and no calculation mistakes.",
      },
      {
        pt: "Todas as inspeções no mesmo formato, rastreáveis por lote e por inspetor.",
        en: "Every inspection in the same format, traceable by lot and inspector.",
      },
      {
        pt: "Relatório pronto para auditoria gerado em um clique, já com a estatística do processo.",
        en: "An audit-ready report in one click, with process statistics included.",
      },
    ],
    learned: {
      pt: "Foi meu primeiro projeto real, nascido de uma necessidade da empresa. Usando IA como apoio, aprendi como as linguagens se comportam e como cada bloco do front-end se conecta ao back-end, até ter um sistema completo, do banco ao relatório em PDF.",
      en: "It was my first real project, born from a need at the company. With AI as a learning partner, I learned how languages behave and how each piece of the front end connects to the back end, until I had a complete system, from the database to the PDF report.",
    },
    skills: [
      { pt: "Regras de negócio a partir de norma técnica", en: "Business rules from a technical standard" },
      { pt: "API REST com Node.js e Express", en: "REST API with Node.js and Express" },
      { pt: "Estado global com Pinia", en: "Global state with Pinia" },
      { pt: "Estatística de processo (Cp, Cpk)", en: "Process statistics (Cp, Cpk)" },
      { pt: "Relatórios PDF no navegador", en: "In-browser PDF reports" },
    ],
    flow: [
      { pt: "Plano de inspeção", en: "Inspection plan" },
      { pt: "Amostragem NBR 5426", en: "NBR 5426 sampling" },
      { pt: "Cópia congelada do plano", en: "Frozen copy of the plan" },
      { pt: "Medições e CPK ao vivo", en: "Measurements and live CPK" },
      { pt: "API Node/Express + PostgreSQL", en: "Node/Express API + PostgreSQL" },
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
      pt: "App de celular que confere, a partir de uma única foto, se a série gravada na peça bate com o código Data Matrix, mesmo sem internet. Está em uso na linha de produção.",
      en: "A phone app that checks, from a single photo, whether the serial printed on a part matches its Data Matrix code, even offline. It's in use on the production line.",
    },
    context: {
      pt: "Cada peça leva duas identificações: um código Data Matrix e uma série de 14 caracteres impressa por tampografia. As duas precisam ser iguais, e a série ainda carrega informações codificadas, como ano, mês, dia e o turno em que a peça foi feita.",
      en: "Every part carries two identifiers: a Data Matrix code and a 14-character serial printed on the part. Both must match, and the serial also encodes information such as year, month, day and the shift in which the part was made.",
    },
    problem: {
      pt: "Cada validação, de três peças, era feita a olho: ler o QR Code, ler a série serigrafada, comparar caractere por caractere e lançar o resultado. Levava cerca de 10 minutos, e caracteres parecidos como O e 0, I e 1 ou B e 8 abriam espaço para erro humano.",
      en: "Each validation, covering three parts, was done by eye: read the QR code, read the printed serial, compare character by character and log the result. It took about 10 minutes, and look-alike characters such as O and 0, I and 1 or B and 8 left room for human error.",
    },
    challenges: [
      {
        pt: "Fazer o OCR acertar caracteres quase iguais: a comparação é feita posição por posição, nunca corrigindo a leitura com o código, e o inspetor precisa confirmar quando o OCR lê O no lugar de zero.",
        en: "Getting OCR right on near-identical characters: the comparison runs position by position, never correcting the reading with the code, and the inspector must confirm when OCR reads O instead of zero.",
      },
      {
        pt: "Rodar um modelo de OCR inteiro dentro do celular: a leitura detalhada processa quatro imagens em sequência, liberando cada uma da memória antes da próxima.",
        en: "Running a full OCR model inside the phone: detailed reading processes four images in sequence, releasing each one from memory before the next.",
      },
      {
        pt: "Trabalhar sem internet: registros e fotos ficam guardados no aparelho e só sincronizam com o servidor quando a conexão volta.",
        en: "Working without internet: records and photos stay on the device and only sync with the server once the connection is back.",
      },
    ],
    built: {
      pt: "Uma PWA offline-first instalável no celular. O inspetor informa o nome, o modelo e o turno, tira uma foto e o app lê o código e a série na mesma imagem. Uma regra por posição compara as duas leituras e confere o turno codificado na série. Nada é registrado sem a confirmação do inspetor.",
      en: "An installable offline-first PWA. The inspector sets their name, model and shift, takes a photo and the app reads the code and the serial from the same image. A position-based rule compares both readings and checks the shift encoded in the serial. Nothing is saved without the inspector's confirmation.",
    },
    features: [
      {
        pt: "Leitura rápida em duas etapas e leitura detalhada com quatro passagens, para fotos difíceis.",
        en: "Quick two-step reading and a detailed four-pass reading for difficult photos.",
      },
      {
        pt: "OCR com PaddleOCR rodando em WebAssembly no próprio aparelho: nenhuma imagem é enviada para serviços de terceiros.",
        en: "OCR with PaddleOCR running in WebAssembly on the device itself: no image is sent to third-party services.",
      },
      {
        pt: "Três resultados possíveis: COINCIDE, DIVERGENTE ou PENDENTE, com o motivo de cada pendência registrado.",
        en: "Three possible outcomes: MATCH, MISMATCH or PENDING, with the reason for each pending result recorded.",
      },
      {
        pt: "Cada registro guarda foto, texto original do OCR, correções manuais, confiança da leitura e versão da regra usada.",
        en: "Each record stores the photo, the original OCR text, manual corrections, reading confidence and the rule version used.",
      },
      {
        pt: "Histórico compartilhado entre inspetores, exportação CSV e gestão de inspetores protegida por senha.",
        en: "History shared across inspectors, CSV export and inspector management protected by password.",
      },
      {
        pt: "Ambientes separados de teste e produção na Cloudflare, com banco D1 para registros e R2 para fotos.",
        en: "Separate test and production environments on Cloudflare, with D1 for records and R2 for photos.",
      },
    ],
    results: [
      {
        pt: "Em uso na linha de produção: um inspetor valida as peças quase instantaneamente.",
        en: "In use on the production line: one inspector validates parts almost instantly.",
      },
      {
        pt: "De cerca de 10 minutos para menos de 1 minuto por validação (estimativa).",
        en: "From about 10 minutes to under 1 minute per validation (estimate).",
      },
      {
        pt: "Cada divergência pode ser auditada depois, com a foto e a leitura original guardadas.",
        en: "Every mismatch can be audited later, with the photo and original reading kept on record.",
      },
    ],
    learned: {
      pt: "Foi o reflexo do que aprendi no sistema da qualidade: dessa vez eu já sabia como começar um projeto grande. Usei uma tecnologia diferente e a IA como apoio para aproveitar o máximo dela, da forma correta. E aprendi que a automação não precisa tirar a decisão do inspetor: o app compara e sugere, a pessoa confirma.",
      en: "It reflected what I learned on the quality system: this time I knew how to start a large project. I used a different technology, with AI helping me get the most out of it the right way. I also learned that automation doesn't have to take the decision away from the inspector: the app compares and suggests, the person confirms.",
    },
    skills: [
      { pt: "Visão computacional no navegador (OCR e Data Matrix)", en: "In-browser computer vision (OCR and Data Matrix)" },
      { pt: "PWA offline-first com sincronização", en: "Offline-first PWA with sync" },
      { pt: "Serverless na Cloudflare (Workers, D1, R2)", en: "Serverless on Cloudflare (Workers, D1, R2)" },
      { pt: "Migrações SQL e ambientes de teste e produção", en: "SQL migrations and test/production environments" },
      { pt: "Desenho de automação com revisão humana", en: "Automation design with human review" },
    ],
    flow: [
      { pt: "Foto pela câmera do celular", en: "Photo from the phone camera" },
      { pt: "Data Matrix + OCR no navegador", en: "Data Matrix + OCR in the browser" },
      { pt: "Comparação posição por posição", en: "Position-by-position comparison" },
      { pt: "Confirmação do inspetor", en: "Inspector confirmation" },
      { pt: "Fila offline no aparelho", en: "Offline queue on the device" },
      { pt: "Cloudflare Workers, D1 e R2", en: "Cloudflare Workers, D1 and R2" },
    ],
    stack: ["JavaScript", "PWA", "WebAssembly", "PaddleOCR", "ZXing", "Cloudflare Workers", "D1", "R2"],
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
      pt: "PWA que registra produção e defeitos hora a hora e calcula o FPY, a taxa de aprovação de primeira, por turno, linha e produto, com planos de ação ligados aos números.",
      en: "A PWA that logs production and defects every hour and calculates FPY, the first pass yield, by shift, line and product, with action plans tied to the numbers.",
    },
    context: {
      pt: "O FPY mostra quantas peças passam pelo processo sem nenhum defeito na primeira tentativa. É um dos indicadores mais acompanhados na produção, e só é confiável se cada defeito for lançado no lugar certo, na hora certa.",
      en: "FPY shows how many parts go through the process without any defect on the first try. It's one of the most watched production metrics, and it's only reliable if every defect is logged in the right place at the right time.",
    },
    problem: {
      pt: "Os defeitos são lançados a cada hora. Cada lançamento leva de 30 a 45 minutos para inserir os dados e relacionar cada defeito ao seu código, e os planos de ação ficam separados dos números que os motivaram.",
      en: "Defects are logged every hour. Each entry takes 30 to 45 minutes to input the data and match every defect to its code, and action plans live apart from the numbers that triggered them.",
    },
    challenges: [
      {
        pt: "Calcular o FPY do jeito certo: ponderado pelas quantidades, nunca a média de percentuais, contando só a primeira passagem de cada peça e sem calcular quando falta produção ou os defeitos passam do produzido.",
        en: "Calculating FPY correctly: weighted by quantities, never an average of percentages, counting only each part's first pass and refusing to calculate when production is missing or defects exceed output.",
      },
      {
        pt: "Permitir correções sem perder a verdade: toda correção exige motivo, guarda histórico e, se duas pessoas corrigem ao mesmo tempo, o sistema pede nova leitura em vez de sobrescrever.",
        en: "Allowing corrections without losing the truth: every fix needs a reason, keeps history and, if two people edit at once, the system asks for a reload instead of overwriting.",
      },
      {
        pt: "Funcionar offline sem duplicar nada: cada envio tem um identificador único, e a fila é reenviada ao reconectar.",
        en: "Working offline without duplicating anything: each submission has a unique ID, and the queue is resent on reconnect.",
      },
    ],
    built: {
      pt: "Um sistema com login próprio e perfis de acesso: operadores lançam; líderes, supervisores e técnicas corrigem. O cadastro já relaciona produtos e códigos de defeito, o que encurta cada lançamento, e o dashboard transforma os registros em análise por período, turno, linha e produto.",
      en: "A system with its own login and access roles: operators log entries; leads, supervisors and technicians correct them. The catalog already links products and defect codes, which shortens every entry, and the dashboard turns records into analysis by period, shift, line and product.",
    },
    features: [
      {
        pt: "Dashboard de FPY com filtros, top defeitos por turno e indicadores de PQC.",
        en: "FPY dashboard with filters, top defects by shift and PQC indicators.",
      },
      {
        pt: "Planos de ação com indicadores, separação entre ativos e concluídos e destaque dos atrasados.",
        en: "Action plans with indicators, split between active and completed, with overdue ones highlighted.",
      },
      {
        pt: "Auditoria de cada alteração, gestão de contas e senhas protegidas com scrypt.",
        en: "An audit trail for every change, account management and passwords protected with scrypt.",
      },
      {
        pt: "Exportação CSV pronta para Excel, respeitando os filtros da tela.",
        en: "Excel-ready CSV export that respects the on-screen filters.",
      },
      {
        pt: "Backup manual no R2 e testes automatizados das regras de cálculo, validação e permissões.",
        en: "Manual backup to R2 and automated tests for calculation, validation and permission rules.",
      },
    ],
    results: [
      {
        pt: "Ganho estimado de cerca de 15 minutos por lançamento, graças aos códigos de defeito já relacionados.",
        en: "An estimated ~15 minutes saved per entry, thanks to defect codes that are already linked.",
      },
      {
        pt: "Um único número de FPY, calculado sempre da mesma forma, para todas as linhas e turnos.",
        en: "A single FPY figure, always calculated the same way, for every line and shift.",
      },
    ],
    skills: [
      { pt: "Modelagem de regras de negócio com testes", en: "Business rule modeling with tests" },
      { pt: "Autenticação, perfis e auditoria", en: "Authentication, roles and audit trails" },
      { pt: "TypeScript de ponta a ponta com Drizzle ORM", en: "End-to-end TypeScript with Drizzle ORM" },
      { pt: "Sincronização offline idempotente", en: "Idempotent offline sync" },
      { pt: "Arquitetura em camadas (front, back e domínio)", en: "Layered architecture (front, back and domain)" },
    ],
    flow: [
      { pt: "Lançamento por hora", en: "Hourly entry" },
      { pt: "Fila offline (IndexedDB)", en: "Offline queue (IndexedDB)" },
      { pt: "API em Cloudflare Workers", en: "Cloudflare Workers API" },
      { pt: "Drizzle ORM + D1", en: "Drizzle ORM + D1" },
      { pt: "Cálculo do FPY ponderado", en: "Weighted FPY calculation" },
      { pt: "Dashboard e planos de ação", en: "Dashboard and action plans" },
    ],
    stack: ["React", "TypeScript", "Next.js", "Cloudflare Workers", "D1", "R2", "Drizzle ORM", "IndexedDB"],
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
      pt: "App que digitaliza a verificação diária das estações de solda, com checklist, medições por turno, gráficos de controle estatístico (I-MR) e relatórios em PDF.",
      en: "An app that digitizes daily soldering station checks, with checklists, per-shift measurements, statistical control charts (I-MR) and PDF reports.",
    },
    context: {
      pt: "Toda estação de solda precisa ser verificada diariamente: integridade, validade da calibração, temperatura da ponta, resistência e tensão residual. Uma estação fora do padrão pode comprometer a solda de cada placa que passa por ela.",
      en: "Every soldering station must be checked daily: integrity, calibration validity, tip temperature, resistance and residual voltage. A station out of spec can compromise every board that goes through it.",
    },
    problem: {
      pt: "Sem um registro digital da verificação diária, não havia como acompanhar a tendência de cada estação ao longo do tempo nem perceber um desvio antes que ele virasse problema.",
      en: "Without a digital record of daily checks, there was no way to follow each station's trend over time or catch a drift before it became a problem.",
    },
    challenges: [
      {
        pt: "Implementar as cartas I-MR, com média, amplitude móvel e limites de controle, e deixar os gráficos legíveis com valores reais de temperatura, resistência e tensão.",
        en: "Implementing I-MR charts, with mean, moving range and control limits, and keeping them readable with real temperature, resistance and voltage values.",
      },
      {
        pt: "Funcionar offline em aparelhos compartilhados: cada inspeção é salva no aparelho antes de ser enviada, com reenvio seguro e sem sobrescrever registros.",
        en: "Working offline on shared devices: each inspection is saved locally before sending, with safe retries and no overwritten records.",
      },
      {
        pt: "Organizar o código em camadas, separando telas, API e regras, para que a TI possa trocar o banco no futuro sem reescrever o app.",
        en: "Organizing the code in layers, separating screens, API and rules, so IT can swap the database later without rewriting the app.",
      },
    ],
    built: {
      pt: "Um app instalável no Android e no Windows. Cada estação tem cadastro próprio, com linha, modelo, instrumento, responsável e critérios de aprovação, e um QR Code que abre o app direto no posto certo.",
      en: "An app installable on Android and Windows. Each station has its own record, with line, model, instrument, owner and pass criteria, plus a QR code that opens the app right at the correct workstation.",
    },
    features: [
      {
        pt: "Checklist e medições por turno, com observação e ação obrigatórias para não conformidades.",
        en: "Checklists and measurements per shift, with a required note and action for nonconformities.",
      },
      {
        pt: "Resultados por dia e turno e gráficos individuais de resistência, tensão e temperatura.",
        en: "Results by day and shift and individual charts for resistance, voltage and temperature.",
      },
      {
        pt: "Cartas I-MR com a série histórica completa de cada estação.",
        en: "I-MR charts with each station's full history.",
      },
      {
        pt: "Relatórios PDF por dia, semana ou mês, com gráficos do período.",
        en: "PDF reports by day, week or month, with charts for the period.",
      },
      {
        pt: "Exportação JSON e CSV para backup e conciliação de conflitos.",
        en: "JSON and CSV export for backup and conflict reconciliation.",
      },
    ],
    skills: [
      { pt: "Controle estatístico de processo em software", en: "Statistical process control in software" },
      { pt: "Gráficos de dados com Recharts", en: "Data charts with Recharts" },
      { pt: "PWA instalável com QR Code por posto", en: "Installable PWA with per-station QR codes" },
      { pt: "Arquitetura em camadas", en: "Layered architecture" },
    ],
    stack: ["React", "TypeScript", "Vite", "shadcn/ui", "Recharts", "IndexedDB", "ZXing", "Cloudflare Workers", "D1"],
    repo: "https://github.com/Iuran-Freire/controle-de-solda",
  },
  {
    id: "barcodecam",
    status: "prototype",
    title: { pt: "BarcodeCam", en: "BarcodeCam" },
    oneLiner: {
      pt: "Programa para Windows que lê pela webcam os códigos de barras de S/N e MAC de cada produto, associa os dois, salva sem duplicar e exporta para Excel.",
      en: "A Windows program that reads each product's S/N and MAC barcodes from a webcam, pairs them, saves them without duplicates and exports to Excel.",
    },
    context: {
      pt: "Cada produto tem dois códigos de barras: o número de série (S/N) e o endereço MAC. O par precisa ser registrado sem erro, porque é ele que liga a peça física ao seu registro.",
      en: "Every product has two barcodes: the serial number (S/N) and the MAC address. The pair must be recorded without mistakes, because it links the physical part to its record.",
    },
    problem: {
      pt: "Ler os dois códigos, garantir que formam o par certo e não registrar o mesmo produto duas vezes, usando só uma webcam comum.",
      en: "Reading both codes, making sure they form the right pair and never recording the same product twice, using only a regular webcam.",
    },
    challenges: [
      {
        pt: "Leitura instável da câmera: o programa só aceita um código depois de lê-lo duas vezes igual em 1,5 segundo, com uma pausa entre leituras para não gravar repetido.",
        en: "Unstable camera reads: the program only accepts a code after reading it twice the same way within 1.5 seconds, with a pause between reads to avoid duplicates.",
      },
      {
        pt: "Câmeras diferentes em cada computador: ele testa modos de captura e resoluções até encontrar uma combinação que funcione.",
        en: "Different cameras on every computer: it tries capture modes and resolutions until it finds a combination that works.",
      },
      {
        pt: "Entregar para quem não programa: o sistema foi empacotado como executável, que abre a interface no navegador.",
        en: "Shipping it to non-developers: the system was packaged as an executable that opens its interface in the browser.",
      },
    ],
    built: {
      pt: "Um leitor em Python com OpenCV e pyzbar que identifica o tipo de cada código pelo formato (MAC com 12 dígitos hexadecimais, S/N com 13 caracteres), forma o par e grava em SQLite. Uma interface web em Flask mostra a câmera ao vivo e os últimos registros.",
      en: "A Python reader with OpenCV and pyzbar that identifies each code by its format (MAC with 12 hex digits, S/N with 13 characters), pairs them and stores them in SQLite. A Flask web interface shows the live camera and the latest records.",
    },
    features: [
      {
        pt: "Suporte a nove simbologias de código de barras 1D.",
        en: "Support for nine 1D barcode symbologies.",
      },
      {
        pt: "Banco com S/N e MAC únicos: o mesmo produto nunca entra duas vezes.",
        en: "A database with unique S/N and MAC: the same product never goes in twice.",
      },
      {
        pt: "Exportação para Excel e atalhos para apagar o último registro ou limpar a sessão.",
        en: "Excel export and shortcuts to delete the last record or clear the session.",
      },
    ],
    skills: [
      { pt: "Visão computacional com OpenCV", en: "Computer vision with OpenCV" },
      { pt: "Aplicação web com Flask", en: "Web app with Flask" },
      { pt: "Empacotamento de software para usuário final", en: "Packaging software for end users" },
    ],
    stack: ["Python", "OpenCV", "pyzbar", "Flask", "SQLite", "openpyxl", "PyInstaller"],
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
    context: {
      pt: "Material não conforme parado no estoque é custo. Saber quanto existe, quanto vale e para onde está indo ajuda a decidir o que devolver, retrabalhar ou descartar.",
      en: "Nonconforming material sitting in stock is a cost. Knowing how much there is, what it's worth and where it's going helps decide what to return, rework or scrap.",
    },
    built: {
      pt: "Um painel que reúne custos, volumes e movimentações de materiais em uma única tela, com comparação mês a mês para encontrar desvios rapidamente.",
      en: "A dashboard that brings material costs, volumes and movements into one view, with month-over-month comparison to spot deviations quickly.",
    },
    features: [
      {
        pt: "Impacto financeiro dos materiais não conformes.",
        en: "Financial impact of nonconforming materials.",
      },
      {
        pt: "Movimentações e variação mensal do estoque.",
        en: "Movements and monthly inventory variation.",
      },
      {
        pt: "Tratamento dos dados com Power Query.",
        en: "Data preparation with Power Query.",
      },
    ],
    skills: [
      { pt: "Modelagem e visualização de dados no Power BI", en: "Data modeling and visualization in Power BI" },
      { pt: "Preparação de dados com Power Query", en: "Data preparation with Power Query" },
    ],
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
    context: {
      pt: "Produção e qualidade costumam ser analisadas em relatórios separados. Este painel coloca os dois lado a lado para mostrar onde a qualidade está custando produção.",
      en: "Production and quality are usually analyzed in separate reports. This dashboard puts them side by side to show where quality is costing output.",
    },
    built: {
      pt: "Um painel que cruza volume produzido, defeitos, yield e fail rate e destaca, para cada modelo, os defeitos que mais pesam no resultado.",
      en: "A dashboard that crosses output, defects, yield and fail rate and highlights, for each model, the defects that weigh most on the result.",
    },
    features: [
      {
        pt: "Indicadores de yield e fail rate por modelo.",
        en: "Yield and fail rate indicators by model.",
      },
      {
        pt: "Ranking dos principais defeitos.",
        en: "Ranking of the top defects.",
      },
      {
        pt: "Medidas calculadas em DAX.",
        en: "Measures calculated in DAX.",
      },
    ],
    skills: [
      { pt: "Indicadores de produção e qualidade", en: "Production and quality metrics" },
      { pt: "Medidas em DAX", en: "DAX measures" },
    ],
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
      pt: "O site que você está vendo: bilíngue, com rolagem suave, transições entre as seções e uma versão sem movimento para quem prefere.",
      en: "The site you're on: bilingual, with smooth scrolling, transitions between sections and a reduced-motion version for those who prefer it.",
    },
    built: {
      pt: "Planejado com documento de design e plano de construção antes da primeira linha de código, e construído em etapas, cada uma verificada no navegador antes de seguir.",
      en: "Planned with a design document and a build plan before the first line of code, then built in steps, each one checked in the browser before moving on.",
    },
    features: [
      {
        pt: "Next.js com export estático e rotas em português e inglês.",
        en: "Next.js with static export and Portuguese and English routes.",
      },
      {
        pt: "Rolagem suave com Lenis e animações com GSAP: títulos revelados por máscara, cartões que se empilham e números que contam.",
        en: "Smooth scrolling with Lenis and GSAP animations: masked title reveals, stacking cards and counting numbers.",
      },
      {
        pt: "Tema escuro e claro, mapa lateral de navegação e acessibilidade com teclado.",
        en: "Dark and light themes, a side navigation map and keyboard accessibility.",
      },
    ],
    skills: [
      { pt: "Front-end com foco em experiência do usuário", en: "Front end focused on user experience" },
      { pt: "Animação guiada pela rolagem", en: "Scroll-driven animation" },
      { pt: "Internacionalização", en: "Internationalization" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP", "Lenis", "Cloudflare"],
    repo: "https://github.com/Iuran-Freire/Portifolio3.0",
  },
];
