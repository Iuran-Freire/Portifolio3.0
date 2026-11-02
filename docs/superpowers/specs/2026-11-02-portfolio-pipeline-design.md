# Portfólio Iuran Freire — design "Pipeline de dados"

Data: 2026-11-02 · Repositório: https://github.com/Iuran-Freire/Portifolio3.0

## 1. Intenção e o porquê

O Iuran quer sair do setor industrial e ser contratado por **startups ou institutos de tecnologia**, em vaga de **estágio ou júnior**, em uma de duas frentes:

- **Dados / Power BI** (analista de dados, desenvolvedor de Power BI);
- **Desenvolvimento** (desenvolvedor júnior, com força em back-end).

O portfólio atual o incomoda porque ele não sabe se as partes "se casam", se o tom está certo e se a ordem é agradável para um recrutador. Ele quer um site **bonito e chamativo**, sem ser pesado, com **interatividade que prenda** o recrutador, faça-o rolar até o fim e desperte curiosidade pelo trabalho.

Todos os projetos dele nasceram na indústria (ele trabalha na Inventus Power). Essa vivência **fica visível como experiência e contexto**, mas **não é o foco nem a estética** do site. A mensagem é: "resolvo problemas técnicos reais, e já fiz isso em produção".

## 2. Público

Recrutadores e líderes técnicos de startups e institutos de tecnologia no Brasil (e eventualmente fora), avaliando estágio/júnior. Gastam poucos segundos para decidir se continuam; muitos precisam anexar um currículo em PDF no sistema da empresa.

## 3. Objetivos, não-objetivos e anti-objetivos

**Objetivos**
- Em 5 segundos, o recrutador entende: nome, as duas frentes (dados e desenvolvimento), nível (estágio/júnior) e que há projetos reais.
- A ordem do conteúdo é guiada por uma metáfora coerente (o pipeline de dados), para que tudo "se case".
- A interação faz o recrutador querer rolar até o fim.
- O fim converte: chamar para conversar e baixar o currículo.

**Não-objetivos**
- Não é blog nem site com várias páginas; é uma página única (com versão PT e EN).
- Não busca vagas de qualidade industrial nem de qualidade de software.

**Anti-objetivos** (falharia mesmo funcionando)
- Ter cara de indústria: laranja de sinalização, grade de chão de fábrica, linguagem de fábrica no topo.
- A metáfora engolir o conteúdo: se o recrutador precisa "decifrar" a animação para achar os projetos, falhou.
- Ficar pesado ou travar no celular.
- Parecer template genérico de IA (gradiente roxo, "Olá, eu sou X 👋", barras de porcentagem de habilidade).
- Prometer números que não existem.

## 4. Restrições

- Stack: **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui**, animações com **GSAP + ScrollTrigger**. *(Escolha do Claude; o Iuran delegou.)*
- Publicação no **Cloudflare** (como os projetos atuais dele). O construtor escolhe entre export estático (Pages/Workers Assets) ou adaptador OpenNext; preferir export estático se nada exigir servidor.
- Bilíngue **PT (padrão) e EN**, com seletor de idioma e rotas `/pt` e `/en`. *(Escolha do Claude: ele tem currículo nos dois idiomas.)*
- Desempenho: carregar só o GSAP como biblioteca de animação pesada; efeitos de luz e textura em CSS/SVG. Sem 3D (Three.js) e sem fundos em vídeo.
- Acessibilidade: todo o conteúdo legível sem animação; respeitar `prefers-reduced-motion` (versão estática); contraste AA; navegação por teclado; HTML semântico com um único `h1`.
- Pasta local: `C:\Users\IURAN\Desktop\portfolio-iuran-freire` (Windows; evitar caminhos longos).
- As skills instaladas guiam a execução: **frontend-design** (direção visual), **copywriting** (textos), **landing-page-guide-v2** (estrutura e elementos de conversão).

## 5. Abordagens consideradas

| Abordagem | Como funciona | Troca |
|---|---|---|
| **1. Pipeline guiado pela rolagem com GSAP** (escolhida) | Uma linha em SVG acompanha a página; um "pacote de dados" desce com a rolagem e acende cada etapa; nas etapas de projeto a seção fixa por um instante enquanto o fluxo se monta. | Efeito mais forte e controlado, funciona em todos os navegadores; exige cuidado com desempenho no celular e uma versão sem movimento. |
| 2. Animações leves por seção (Motion) | Cada seção anima ao entrar na tela, sem um elemento contínuo. | Mais simples, mas perde a sensação de percorrer um caminho — o que o Iuran escolheu. |
| 3. Pipeline 3D (Three.js) | Cena 3D com câmera seguindo o pacote. | Impressiona, mas é pesado, demora no celular, engole o conteúdo e não mostra habilidades de dados/back-end. Descartada. |

**Escolha:** abordagem 1, na versão "chamativa" (o Iuran pediu explicitamente um site bonito e chamativo, não simples).

Histórico: antes, a metáfora era uma "linha de produção" industrial. O Iuran pediu para sair da estética industrial; a mecânica foi mantida e a linguagem passou a ser **pipeline de dados**.

## 6. O que foi decidido

### 6.1 A metáfora: pipeline de dados

A página inteira é um pipeline. Um **pacote de dados** (um pequeno elemento luminoso) nasce no topo como um sinal bruto e desce pela linha, mudando de forma em cada etapa:

1. **Fonte** → sinal bruto (linha de pulso)
2. **Ingestão** → registro capturado (um "cartão" de evento)
3. **Processamento** → registro validado (com marca de verificação/estado)
4. **Análise** → ponto de um gráfico que se desenha
5. **Deploy** → "pronto para produção" (etiqueta final)

A linha e o pacote são uma camada visual por cima de um conteúdo que funciona sozinho.

### 6.2 Seções, em ordem

**0. Cabeçalho** — logo/nome, navegação pelas etapas (Fonte, Ingestão, Processamento, Análise, Deploy — rótulos em PT/EN), seletor PT/EN, botão "Currículo".

**1. Fonte (topo / sobre)**
- Título grande com uma palavra que alterna (referência: *Brick Text Flip*, 60fps): algo como "Construo **sistemas** / **dashboards** / **APIs** que transformam dados em decisão". Texto final fica com a skill de copywriting.
- Subtítulo dizendo nível e frentes: estágio/júnior em dados (Power BI) e desenvolvimento.
- Uma linha de sinal pulsando sobre uma grade técnica discreta, com pequenas leituras em fonte monoespaçada (referência: *Runmo ECG Pulse*, 60fps) — é desse sinal que nasce o pacote de dados.
- Chamadas: "Ver projetos" (rola até Ingestão) e "Baixar currículo".
- Bloco curto de trajetória (3–4 linhas, estilo linha do tempo): técnico em automação → estágio construindo sistemas e dashboards → hoje, estudante de ADS buscando tecnologia. A indústria aparece aqui como **vivência**, não como objetivo.

**2. Ingestão — apps que capturam dados**
- **Valida Laser** em destaque: PWA offline-first que lê Data Matrix e roda OCR (PaddleOCR em WebAssembly) no próprio celular, compara séries caractere a caractere e sincroniza com Cloudflare Workers + D1 + R2.
- Em formato compacto: **Controle de Solda** (PWA offline, React/TypeScript, Workers, D1, relatórios PDF, QR Code) e **BarcodeCam** (Python, OpenCV, Flask, SQLite, exportação Excel).
- Efeito: a etapa ativa acende com luz percorrendo a borda (referência: *Glow Features*, motionsites; componente tipo Border Beam).

**3. Processamento — APIs, regras e dados**
- **Sistema de Gestão da Qualidade** em destaque: Vue 3 + Node/Express + SQL (o currículo cita PostgreSQL), amostragem NBR 5426, CPK em tempo real, snapshot imutável da inspeção, relatórios PDF.
- **Gestão FPY**: React/TypeScript/Next.js, Workers, D1, Drizzle ORM, fila offline, permissões por perfil e auditoria.
- Layout em três colunas **dado → sistema → painel**, cada uma com mini-ilustração viva (referência: *Data Integration*, unsection; *NexaCore Process*, motionsites só como inspiração): eventos chegando um a um, feixes de luz ligando cliente → API → banco (componente tipo Animated Beam).
- Os projetos são contados pelo **problema técnico** (offline-first, regras de validação, modelagem, auditoria). A indústria é contexto em uma frase, não o título.

**4. Análise — dados que viram decisão**
- Dashboards de Power BI (yield/defeitos/produção e estoque), com links públicos:
  - Produção e qualidade: https://app.powerbi.com/view?r=eyJrIjoiY2EyZjllM2QtNDE5Yi00NDhiLTk3MzMtZTI1YjA1ZThmMTVjIiwidCI6IjE5NjNjNWNlLWZjYjUtNDE0Zi1hNWJlLTM4MjM3NTgwMjg0YSIsImMiOjN9
  - Estoque: https://app.powerbi.com/view?r=eyJrIjoiMzI5MGEzMDYtNTI4My00NDRjLWFhYTMtZGZjNDc0NjIzMGI2IiwidCI6IjE5NjNjNWNlLWZjYjUtNDE0Zi1hNWJlLTM4MjM3NTgwMjg0YSIsImMiOjN9
- Telas empilhadas que se abrem com a rolagem (referência: *Animated Cards*, motionsites).
- Bloco de números grandes numa grade com linhas finas, contando ao aparecer (referência: *Impact Metrics*, unsection). **Só números verdadeiros**, sempre marcados como estimativa quando forem estimativa (ver 6.6).
- Stack resumida aqui ou numa faixa própria, agrupada por frente: Dados (Power BI, DAX, Power Query, SQL, Excel) e Desenvolvimento (TypeScript, React, Vue, Node, Express, Python, Cloudflare Workers/D1, PostgreSQL). Sem barras de porcentagem.

**5. Deploy — contato**
- O pacote chega ao fim e "imprime" uma etiqueta, algo como "Build aprovado · pronto para o seu time" (referência: *CRED Printing Tickets*, 60fps).
- Ação principal: **"Vamos conversar"** → abre e-mail (iuranhumberto99@gmail.com) com assunto preenchido.
- Ao lado: **"Baixar currículo (PDF)"** — PT ou EN conforme o idioma da página.
- Discretos: LinkedIn (https://www.linkedin.com/in/iuran-freire-a23092204), GitHub (github.com/Iuran-Freire), WhatsApp.
- Estrutura de dois botões forte + secundário (referência: *Tines*, cta.gallery).

### 6.3 Direção visual

- **Tecnologia, não indústria.** Fundo escuro de produto tech, **uma** cor de destaque elétrica (a definir com a skill frontend-design; evitar laranja industrial e evitar gradiente roxo genérico), fonte monoespaçada para rótulos, leituras e metadados.
- Do *Kraftline* (cta.gallery) aproveitar **só a estrutura** do título: palavra destacada num bloco de cor e rótulos técnicos pequenos. Não a paleta nem as fotos de fábrica.
- Luz sutil nas etapas ativas, textura de grade técnica discreta, detalhes que reagem ao mouse no desktop.
- Referências gerais: motionsites.ai, cta.gallery, unsection.com, 60fps.design (todas aprovadas pelo Iuran como fonte). Nada é copiado; componentes vêm de bibliotecas livres (shadcn/ui, Magic UI, Aceternity UI, React Bits) ou são escritos do zero.

### 6.4 Tom do texto

Direto, técnico sem jargão vazio, confiante sem exagero. Primeira pessoa. Fala a língua de startup (problema → solução → resultado). Sem frases de IA ("não é X, é Y", listas "sem X, sem Y"). A skill **copywriting** escreve os textos finais a partir do conteúdo deste documento.

### 6.5 Currículos

- Arquivos: `C:\Users\IURAN\Downloads\Curriculo_IuranFreire (3).pdf` (PT) e `C:\Users\IURAN\Downloads\Curriculo_IuranFreire_Ingles.pdf` (EN). Copiar para `public/` com nomes simples (ex.: `curriculo-iuran-freire-pt.pdf`, `resume-iuran-freire-en.pdf`).
- Ajustes nos currículos (fora deste site, para o Iuran fazer): tirar "Qualidade" do objetivo; trocar o link do portfólio antigo pelo novo; incluir Valida Laser, FPY e Controle de Solda.

### 6.6 Números (estimativas do Iuran, organizadas)

Não há medição formal; são estimativas de quem opera o processo. No site, aparecem com a palavra "estimado"/"cerca de" e a base do cálculo fica no texto do projeto.

| Projeto | Antes (manual) | Depois (sistema) | Como mostrar |
|---|---|---|---|
| **Valida Laser** | ~10 min por validação (cada validação = 3 peças: ler o QR Code, ler a serigrafia, comparar e lançar) | uma foto do QR Code com a serigrafia, ~5 s de validação automática + até ~1 min para o inspetor conferir e dar OK | "De ~10 min para ~1 min por validação (estimado)" · destaque: **~90% menos tempo** |
| **Gestão FPY** | 30–45 min por lançamento para inserir os dados e relacionar os defeitos (os lançamentos são feitos hora a hora) | ~15 min a menos, graças ao cadastro pré-estabelecido em que os códigos de defeito já se relacionam | "~15 min a menos por lançamento (estimado), cerca de um terço a metade do tempo" |

Uso: o Valida Laser rende o número mais forte (vai para a grade de números da Análise e para o resultado do projeto). O FPY entra no resultado do projeto. Outros números da grade, se necessários, só com fatos verificáveis (ex.: quantidade de sistemas em uso, tecnologias).

### 6.7 Foto

O Iuran forneceu uma selfie ao ar livre (fundo com estacionamento, carros e árvores; enquadramento de celular; fones visíveis). Para o topo:

- Usar **com o fundo removido** e tratamento de cor que integre ao tema escuro (ex.: tons de cinza com leve toque da cor de destaque), recortada do ombro para cima. Assim o fundo poluído some e a foto conversa com o visual tech.
- Recomendação ao Iuran: quando possível, uma foto nova com fundo neutro, luz frontal suave e câmera na altura dos olhos substitui esta sem mudar o layout.
- Arquivo de origem: `assets-source/foto-original.jpg` (copiado da conversa).
- A foto é complemento: o título e o pipeline continuam sendo o centro da primeira tela.

## 7. O que fica para o construtor

- Paleta exata, tipografia e escala (via frontend-design), dentro da direção 6.3.
- Formato exato do pacote de dados em cada etapa e a coreografia GSAP, desde que o conteúdo funcione sem animação.
- Versão do celular: mais calma (menos pinagem de seção, animações mais curtas).
- Estrutura de pastas, componentes e i18n (dicionários PT/EN simples são suficientes).
- Escolha entre export estático e OpenNext no Cloudflare.
- Imagens dos projetos: usar capturas reais quando o Iuran fornecer; até lá, capas tipográficas/ilustrativas em vez de imagens falsas.
- SEO básico: `title`, `meta description` coerente com as duas frentes (dados e desenvolvimento, nunca "BI e qualidade"), Open Graph com imagem própria, favicon, `lang` correto por idioma.
- Sem ferramentas de analytics/rastreamento por padrão. *(Escolha do Claude.)*
- Publicar primeiro no subdomínio gratuito do Cloudflare (`*.workers.dev` ou `*.pages.dev`); domínio próprio fica para depois. O site antigo continua no ar até o Iuran decidir.

## 8. Pendências que dependem do Iuran

1. ~~Números reais~~ — estimativas fornecidas (6.6), unidades confirmadas: por validação (3 peças) no Valida Laser e por lançamento (hora a hora) no FPY. Não somar o ganho do FPY por turno ou por dia sem confirmação do Iuran.
2. ~~Repositório da Gestão FPY~~ — agora público: https://github.com/Iuran-Freire/gestao-fpy
3. ~~URL do LinkedIn~~ — https://www.linkedin.com/in/iuran-freire-a23092204 (sem os parâmetros de rastreamento do link compartilhado).
4. ~~Foto~~ — fornecida (6.7).
5. **Capturas de tela/GIFs** do Valida Laser e do FPY, se possível.

## 9. Decisões tomadas pelo Claude (para conferir)

- Stack Next.js + Tailwind + shadcn/ui + GSAP, publicação no Cloudflare.
- Site bilíngue PT/EN.
- Ordem e nomes das etapas do pipeline.
- Valida Laser como destaque de Ingestão e Gestão da Qualidade como destaque de Processamento.
- Gestão FPY entra em Processamento; Controle de Solda e BarcodeCam como compactos em Ingestão.
- Nada de 3D e de fundos em vídeo.
