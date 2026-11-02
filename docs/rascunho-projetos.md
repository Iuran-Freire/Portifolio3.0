# Rascunho: a história de cada projeto

Escrito a partir dos repositórios (README, estrutura e commits). **Revise tudo.**

- Trechos marcados com **[CONFIRME]** são deduções minhas a partir do código.
- Trechos marcados com **[PREENCHA]** só você sabe.
- O formato é o mesmo para todos, para o recrutador comparar com facilidade.

Projetos: os mesmos 8 do portfólio atual. Ordem: o Sistema da Qualidade primeiro (o mais difícil e um dos que mais ensinaram), depois os de maior impacto medido, e por fim os dashboards.

---

## 1. Sistema de Gestão da Qualidade (IQC/OQC) — projeto principal

**Em uma frase:** sistema web que substituiu as planilhas de inspeção de entrada e saída, calculando a amostra pela norma e gerando relatórios em PDF.

**O problema:** as inspeções eram feitas em Excel. O tamanho da amostra era calculado à mão, cada inspeção seguia um formato e rastrear resultados por lote dava trabalho.

**A maior dificuldade:**
- Transformar a norma NBR 5426 em código: letra-código, tamanho da amostra, números de aceitação e rejeição, e a comutação entre inspeção normal, severa e atenuada. **[CONFIRME]**
- Garantir que mudar um plano não altere inspeções antigas: cada inspeção congela uma cópia do plano. **[CONFIRME]**
- **Foi o projeto mais difícil** (confirmado): o primeiro contato com um projeto real, nascido de uma necessidade da empresa. Foi preciso entender como as linguagens se comportam e como cada parte do front-end se conecta ao back-end, aprendendo com o apoio de IA.

**O que construí:** planos de inspeção com características, limites e amostragem; execução com medições e CPK calculado em tempo real; resultado PASS/FAIL automático que bloqueia a finalização se faltar dado; relatório PDF com média, desvio padrão, Cp e Cpk; histórico de revisão dos planos, notificações, gestão de usuários e exportação CSV.

**Ganhos:**
- Tempo: **[PREENCHA: quanto tempo levava uma inspeção em Excel e quanto leva agora?]**
- Qualidade: amostragem sempre pela norma, sem cálculo manual, e rastreabilidade por lote e inspetor.
- Pessoas: **[PREENCHA]**

**O que aprendi (rascunho com as suas palavras):** *"Foi meu primeiro projeto real, nascido de uma necessidade da empresa. Usando IA como apoio, aprendi como as linguagens se comportam e como cada bloco do front-end se conecta ao back-end, até ter um sistema completo, do banco ao relatório em PDF."*

**Stack:** Vue 3, Pinia, Node.js, Express, PostgreSQL, Dexie (IndexedDB), jsPDF.
**Código:** github.com/Iuran-Freire/Quality-System-
**Situação:** **[CONFIRME]**

---

## 2. Valida Laser

**Em uma frase:** app de celular que confere, por foto, se a série gravada na peça bate com o código Data Matrix, mesmo sem internet.

**O problema:** cada validação (3 peças) era feita a olho: ler o QR Code, ler a série serigrafada, comparar caractere por caractere e lançar. Levava cerca de 10 minutos, e letras parecidas (O/0, I/1, B/8) geravam erro.

**A maior dificuldade:**
- Fazer o OCR acertar letras quase iguais na serigrafia. O app passou a comparar posição por posição e a exigir que o inspetor confirme quando o OCR lê "O" no lugar de zero. **[CONFIRME]**
- Rodar o OCR (PaddleOCR) dentro do celular sem estourar a memória: as leituras detalhadas processam uma imagem por vez e liberam cada uma antes da próxima. **[CONFIRME]**
- Você tentou detectar falhas visuais da serigrafia automaticamente e depois trocou por conferência manual da foto. **[CONFIRME: por que desistiu da detecção automática?]**

**O que construí:** uma PWA offline-first. Uma foto captura o código e a série, o OCR roda no aparelho, uma regra por posição compara as leituras e valida o turno codificado na série. Nada é registrado sem a confirmação do inspetor. Registros vão para o Cloudflare D1, as fotos para o R2, e tudo espera no aparelho quando não há rede. Há ambientes separados de teste e produção e gestão de inspetores protegida por senha.

**Ganhos:**
- Tempo: de ~10 min para ~1 min por validação (~90% menos, estimado).
- Qualidade: cada registro guarda foto, leitura do OCR e correções manuais, então qualquer divergência pode ser auditada depois.
- Pessoas: **[PREENCHA: o que mudou para os inspetores? Menos cansaço visual? Menos retrabalho? Quantos usam?]**

**O que aprendi (rascunho com as suas palavras):** *"Foi o reflexo do que aprendi no sistema da qualidade: dessa vez eu já sabia como começar um projeto grande. Usei uma tecnologia diferente (OCR rodando no próprio celular) e a IA como apoio para aproveitar o máximo dela da forma correta. E aprendi que a automação não precisa tirar a decisão do inspetor: o app compara e sugere, a pessoa confirma."*

**Stack:** JavaScript, PWA, WebAssembly, PaddleOCR, ZXing, Cloudflare Workers, D1, R2.
**Código:** github.com/Iuran-Freire/Projeto-Valida-o-da-Laser
**Situação:** **[CONFIRME: está em uso na linha ou em teste?]**

---

## 3. Gestão FPY

**Em uma frase:** sistema que registra produção e defeitos hora a hora e calcula o FPY (aprovação de primeira) por turno, linha e produto.

**O problema:** os defeitos são lançados a cada hora. Cada lançamento levava de 30 a 45 minutos para inserir os dados e relacionar cada defeito ao seu código, e os planos de ação ficavam separados dos números.

**A maior dificuldade:**
- Calcular o FPY do jeito certo: ponderado pelas quantidades (nunca a média de percentuais), contando só a primeira passagem de cada peça e não calculando quando falta produção ou quando os defeitos passam do produzido. **[CONFIRME]**
- Permitir correções sem perder a verdade: toda correção exige motivo, guarda histórico e, se duas pessoas corrigem ao mesmo tempo, o sistema pede nova leitura em vez de sobrescrever. **[CONFIRME]**
- Funcionar offline sem duplicar lançamentos (cada envio tem um identificador único). **[CONFIRME]**

**O que construí:** uma PWA com login próprio, perfis (operador lança; líder, supervisor e técnica corrigem), auditoria de cada alteração, cadastro de produtos e defeitos, dashboard de FPY com filtros, top defeitos por turno, planos de ação com indicadores e exportação CSV. Senhas com scrypt, sessões seguras e backup no R2.

**Ganhos:**
- Tempo: ~15 min a menos por lançamento (estimado), com lançamentos a cada hora.
- Qualidade: os números deixam de depender de planilhas soltas, e toda correção fica registrada.
- Pessoas: **[PREENCHA]**

**O que aprendi:** **[PREENCHA]**. Sugestão: *"a modelar regras de negócio com testes e a pensar em segurança desde o começo (senhas, permissões e auditoria)"*.

**Stack:** React, TypeScript, Next.js, Cloudflare Workers, D1, R2, Drizzle ORM, IndexedDB.
**Código:** github.com/Iuran-Freire/gestao-fpy
**Situação:** o README diz que a implantação é privada e que faltam importar o histórico e homologar no aparelho da linha. **[CONFIRME o status atual]**

---

## 4. Controle de Solda

**Em uma frase:** app que digitaliza a verificação diária das estações de solda, com gráficos de controle estatístico (I-MR) e relatórios em PDF.

**O problema:** **[CONFIRME: a verificação diária das estações era feita em papel?]** Sem histórico digital, não dava para ver a tendência de temperatura, resistência e tensão de cada estação.

**A maior dificuldade:**
- Implementar as cartas I-MR (média, amplitude móvel e limites de controle) e deixar os gráficos legíveis com valores reais. **[CONFIRME]**
- Funcionar offline em aparelhos compartilhados: cada registro é salvo no aparelho antes de enviar, com reenvio seguro e sem sobrescrever inspeções. **[CONFIRME]**
- Organizar o código em camadas para que a TI possa migrar o banco depois. **[CONFIRME]**

**O que construí:** cadastro de estações com critérios; checklist e medições por turno; QR Code por estação para abrir direto no posto; resultados por dia e turno; cartas I-MR; relatórios PDF por dia, semana ou mês; app instalável no Android e no Windows.

**Ganhos:**
- Tempo: **[PREENCHA]**
- Qualidade: tendência de cada estação visível no gráfico, e não conformidades exigem observação e ação.
- Pessoas: **[PREENCHA]**

**O que aprendi:** **[PREENCHA]**. Sugestão: *"a aplicar controle estatístico de processo em software e a desenhar um app que funciona bem em aparelho compartilhado"*.

**Stack:** React, TypeScript, Vinext/Vite, shadcn, Recharts, IndexedDB, ZXing, Cloudflare Workers, D1.
**Código:** github.com/Iuran-Freire/controle-de-solda
**Situação:** piloto publicado. **[CONFIRME]**

---

## 5. BarcodeCam

**Em uma frase:** programa para Windows que lê pela webcam os códigos de barras de S/N e MAC de cada produto, associa os dois e salva sem duplicar.

**O problema:** **[CONFIRME: S/N e MAC eram digitados ou lidos com leitor manual um por um?]**

**A maior dificuldade:**
- Leitura instável da câmera: o programa só aceita um código depois de lê-lo duas vezes iguais em 1,5 segundo, com uma pausa entre leituras para não gravar repetido. **[CONFIRME]**
- Câmeras diferentes em cada computador: ele testa vários modos e resoluções até encontrar um que funcione. **[CONFIRME]**
- Entregar para quem não programa: o sistema virou um executável (.exe) que abre a interface no navegador. **[CONFIRME]**

**O que construí:** leitor em Python com OpenCV e pyzbar que classifica cada código (MAC com 12 hexadecimais, S/N com 13 caracteres), salva em SQLite sem duplicar, mostra os últimos registros numa interface web (Flask) e exporta para Excel.

**Ganhos:**
- Tempo: **[PREENCHA]**
- Qualidade: nenhum S/N ou MAC duplicado, porque o banco recusa repetição.
- Pessoas: **[PREENCHA]**

**O que aprendi:** **[PREENCHA]**. Sugestão: *"visão computacional na prática e como empacotar um programa para quem não é da área"*.

**Stack:** Python, OpenCV, pyzbar, Flask, SQLite, openpyxl, PyInstaller.
**Código:** github.com/Iuran-Freire/BarcodeCam
**Situação:** **[CONFIRME]**

---

## 6. Gestão de Estoque (Power BI)

**Em uma frase:** dashboard que acompanha materiais não conformes, impacto financeiro, movimentações e variação mensal do estoque.

**O problema:** **[PREENCHA: de onde vinham esses dados antes e como eram analisados?]**

**A maior dificuldade:** **[PREENCHA: limpeza dos dados no Power Query? Medidas em DAX? Juntar fontes diferentes?]**

**O que construí:** painel com custos, volumes e movimentações de materiais, para analisar o mês e encontrar desvios.

**Ganhos:** **[PREENCHA: tempo para montar o relatório antes e depois, decisões que ele ajudou a tomar]**

**O que aprendi:** **[PREENCHA]**

**Stack:** Power BI, Excel, Power Query.
**Link:** dashboard público no Power BI (o mesmo do portfólio atual).

---

## 7. Performance de Produção e Qualidade (Power BI)

**Em uma frase:** dashboard que relaciona produção, defeitos, yield, fail rate e os principais problemas de cada modelo.

**O problema:** **[PREENCHA]**

**A maior dificuldade:** **[PREENCHA]**

**O que construí:** painel que cruza produção e qualidade e destaca os defeitos que mais pesam no yield.

**Ganhos:** **[PREENCHA]**

**O que aprendi:** **[PREENCHA]**

**Stack:** Power BI, Excel, DAX.
**Link:** dashboard público no Power BI (o mesmo do portfólio atual).

---

## 8. Portfólio

**[DECIDA]** No portfólio atual, ele aparece como projeto. Aqui, eu sugiro mostrar o código deste site novo (Next.js, GSAP, Lenis, Cloudflare) como um projeto curto, já que ele também demonstra front-end e experiência de usuário. Ou deixar só o link no rodapé.

---

## Perguntas rápidas que destravam o texto

1. Quais projetos estão **em uso de verdade** na fábrica, e por quantas pessoas, mais ou menos?
2. Para Qualidade, Solda, BarcodeCam e os dois dashboards: **quanto tempo levava antes e quanto leva agora**? Estimativa serve.
3. ~~Qual projeto foi o mais difícil?~~ O Sistema da Qualidade (IQC/OQC). Falta só o porquê.
4. ~~Qual deu mais aprendizado?~~ Qualidade e Valida Laser, já escritos. Falta uma frase para FPY, Solda, BarcodeCam e os dashboards (opcional).
