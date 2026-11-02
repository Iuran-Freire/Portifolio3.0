# Plano de construção — Portfólio "Pipeline de dados"

Base: [documento de design](../specs/2026-11-02-portfolio-pipeline-design.md) (aprovado em 2026-11-02).
Skills que guiam a execução: **landing-page-guide-v2** (estrutura e conversão), **frontend-design** (direção visual), **copywriting** (textos).

## 1. Plano de design (passo 1 da frontend-design)

### Assunto, público e trabalho principal
- **Assunto:** um desenvolvedor júnior que constrói o caminho completo do dado — do app que captura ao painel que decide.
- **Público:** recrutadores e líderes técnicos de startups e institutos de tecnologia.
- **Trabalho principal da página:** fazer o recrutador entender as duas frentes em 5 s, percorrer os projetos e chamar para conversar.

### Primeira proposta e revisão contra os padrões genéricos
A primeira versão (no design) era: fundo escuro, uma cor elétrica de destaque, rótulos em monoespaçada, palavra do título destacada num bloco de cor. Revisando com a frontend-design, isso cai em três vícios de página gerada: fundo quase preto com um acento ácido (vício 2), monoespaçada em rótulos pequenos como enfeite (vício 5) e destacar uma única palavra do título. **Revisão:**

- **"Folha de dados" em vez de "fundo preto com neon".** O mundo do dado é o do gráfico plotado e do papel milimetrado: grade técnica discreta e traço de plotter em azul-cobalto. Foram comparadas uma versão clara e uma escura; **o Iuran escolheu a escura como identidade principal** (2026-11-02). Para não cair no vício "quase preto + acento ácido", o escuro é um azul-marinho profundo (não preto) com a grade visível e um cobalto suave (não neon). A versão clara fica disponível num botão de tema no cabeçalho. *(Botão de tema: escolha do Claude.)*
- **Monoespaçada só para valor real** (leituras, tempos, contagens) — nunca para rótulos decorativos.
- **Sem palavra destacada.** O título ganha personalidade pela própria tipografia (largura variável), e a palavra que alterna no topo é movimento com função: mostra as frentes uma de cada vez.

### Tokens
**Cor — tema escuro (principal)**
| Nome | Hex | Papel |
|---|---|---|
| Papel | `#0F1522` | fundo principal, azul-marinho profundo (não preto) |
| Grade | `#1E2837` | linhas do papel milimetrado e divisórias |
| Tinta | `#E6EAF0` | texto e traços principais |
| Cobalto | `#6F8BFF` | o traço do pipeline, o pacote de dados, links e ação principal |
| Válido | `#34C79A` | estados "ok/coincide" e linhas de gráfico secundárias |
| Alerta | `#F08A5D` | só estados "divergente/pendente" nos exemplos de dados (uso raríssimo) |

Tema claro (opcional, pelo botão): Papel `#E8ECF1`, Grade `#CBD3DD`, Tinta `#121A2B`, Cobalto `#2747E8`, Válido `#0E8A6A`, Alerta `#C2410C`. Contraste AA conferido no build.

**Tipografia**
- **Archivo** (variável, eixo de largura): títulos em largura expandida e peso alto — lembra legenda de gráfico técnico; corpo em largura normal. Uma família, com a largura como parte ativa do design.
- **IBM Plex Mono**: só para valores de dados (5 s, ~90%, contagens, leituras do sinal).
- Escala (razão 1,333): 14 · 16 · 21 · 28 · 38 · 50 · 67 · 89 px. Corpo 17–18 px, linhas até ~70 caracteres, entrelinha 1,6.

**Layout**
Alinhado à esquerda, com o pipeline correndo numa coluna fixa à esquerda no desktop (no celular, uma linha fina na margem).

```
desktop
+---+-------------------------------------------+
| | | Iuran Freire            PT/EN  Currículo  |
| o | Construo [sistemas] que transformam dados |
| | | em decisão.               ( foto recortada)|
| | | ~~~~ sinal pulsando ~~~~                  |
| o | Ingestão: Valida Laser (grande) + 2 compactos
| | | Processamento: Qualidade | FPY  (feixes)   |
| o | Análise: telas Power BI empilhadas + números
| | | Perguntas de recrutador                   |
| o | Deploy: etiqueta impressa + 2 botões      |
+---+-------------------------------------------+
  ^ traço do pipeline com o pacote de dados
```

**Princípios**
1. **O memorável é um só:** o traço do pipeline com o pacote de dados que muda de forma. Todo o resto é calmo e disciplinado.
2. **Estrutura é informação:** numerar só as etapas do pipeline (são de fato uma sequência).
3. **Movimento com motivo:** uma abertura orquestrada no topo e o pacote guiado pela rolagem; nada de "fade-up" em toda seção.
4. **Conteúdo legível sem animação**, sempre.

## 2. Adaptação dos 11 elementos da landing-page-guide-v2

| Elemento | No portfólio |
|---|---|
| 1. URL com palavras-chave | `/pt` e `/en`; domínio próprio fica para depois |
| 2. Logo | nome "Iuran Freire" no topo à esquerda, cabeçalho fixo com fundo que ganha desfoque ao rolar |
| 3. Título e subtítulo | a etapa Fonte (topo) |
| 4. CTA principal | "Ver projetos" + "Baixar currículo" no topo |
| 5. Prova social | números reais estimados (Valida Laser ~90% menos tempo; FPY ~15 min a menos por lançamento) e "sistemas usados em produção" |
| 6. Imagens/vídeo | capturas reais dos projetos quando houver; até lá, ilustrações vivas de cada fluxo (sem imagens falsas) |
| 7. Benefícios | as etapas Ingestão/Processamento/Análise com os projetos |
| 8. Depoimentos | **omitido** enquanto não houver recomendação real (ex.: de gestor no LinkedIn); nada inventado |
| 9. FAQ | "Perguntas de recrutador": disponibilidade, modelo de trabalho, idiomas, início — respostas vêm do Iuran |
| 10. CTA final | etapa Deploy: etiqueta impressa + "Vamos conversar" e "Baixar currículo" |
| 11. Rodapé | contatos, GitHub, LinkedIn, link do código do site, ano |

## 3. Tarefas

Cada tarefa termina com typecheck, lint e build passando, e vira um commit.

1. **Base do projeto** — Next.js (App Router, versão estável atual) + TypeScript + Tailwind + shadcn/ui; GSAP; fontes via `next/font`; export estático; `.gitignore` incluindo `assets-source/`.
2. **Tokens e estrutura** — variáveis de cor/tipo/espaço (escuro padrão + claro pelo botão de tema), layout com a coluna do pipeline, rotas `/pt` e `/en` com redirecionamento de `/`, dicionários PT/EN.
3. **Conteúdo em dados** — arquivo de projetos, números (com "estimado"), links e contatos, a partir do design.
4. **Seções estáticas** — Cabeçalho, Fonte, Ingestão, Processamento, Análise, Perguntas, Deploy, Rodapé; tudo funcionando sem animação. Textos finais com a skill copywriting.
5. **O pipeline** — traço SVG + pacote de dados guiado por GSAP ScrollTrigger, ativando cada etapa; versão calma no celular; versão estática com `prefers-reduced-motion`.
6. **Visuais vivos por etapa** — sinal pulsando (Fonte), eventos chegando (Ingestão), feixes cliente → API → banco (Processamento), gráfico que se desenha e números que contam (Análise), etiqueta impressa (Deploy).
7. **Foto e arquivos** — recorte do fundo da foto e tratamento de cor; currículos PT/EN em `public/`.
8. **SEO e compartilhamento** — título, descrição, Open Graph com imagem própria, favicon.
9. **Revisão** — navegador no desktop e no celular (375 px), teclado, contraste, desempenho; autocrítica com capturas de tela e ajustes ("tirar um acessório").
10. **Publicação** — Cloudflare (exige login do Iuran no Wrangler) e envio ao GitHub, só com autorização dele.

## 4. Pendências do Iuran (não bloqueiam as tarefas 1–3)
- Respostas das "Perguntas de recrutador" (disponibilidade de horário, presencial/híbrido/remoto, cidade, quando pode começar, nível de inglês).
- Recomendação real para depoimento (opcional).
- Capturas de tela/GIFs do Valida Laser e do FPY (opcional).

## 5. Mudanças de direção (2026-11-02, depois das tarefas 1–5)

Decididas pelo Iuran ao ver o site no navegador. Valem sobre o que está acima.

- **Identidade visual:** a do portfólio atual dele — fundo `#111110`, texto `#EFEEE7`, vermelho `#EF554B` (token `--signal`), títulos em **Anton maiúsculo** (o topo em duas cores, branco e vermelho), rótulos em mono maiúscula espaçada, logo "IF." com ponto vermelho e navegação numerada 01–05. A paleta "folha de dados" azul foi abandonada; o tema claro acompanha a nova paleta.
- **Perguntas de recrutador:** removidas. O portfólio mostra o que ele constrói; dados práticos (disponibilidade, inglês etc.) ficam no currículo.
- **3D no topo:** testado e descartado (a figura não comunicava). O "impacto" pedido era de **transições fluidas entre seções**.
- **Transições (implementadas):** rolagem suave com Lenis integrada ao GSAP; títulos revelados por máscara (SplitText); estudos de caso que abrem e se empilham no Processamento; caminho do dado acendendo com a rolagem; números que contam; brilho de fundo que muda por etapa; etiqueta final "impressa".
- **Indicador de rolagem:** o trilho vertical com o pacote de dados saiu. No lugar, um **mapa lateral** à direita (marcas finas por etapa, a atual em vermelho com o nome, clicáveis), que também marca a etapa atual no cabeçalho.

Tarefas que continuam: 6 (visuais por etapa, agora focados nas telas reais dos projetos), 7 (foto e arquivos), 8 (SEO), 9 (revisão), 10 (publicação).
