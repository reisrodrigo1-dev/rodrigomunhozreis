import type { Post } from "./posts";

/**
 * Posts publicados "de fábrica" (conteúdo do código).
 * Aparecem no /blog e na home mesmo sem o Firestore configurado.
 * Quando você criar posts no /admin, eles se somam a estes.
 */
export const seedPosts: Post[] = [
  {
    id: "criancas-aprender-vibecoding-metodo-2026",
    slug: "criancas-aprender-vibecoding-metodo-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-07-02",
    coverUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    title: "Criança sabe vibecoding. Falta ensinar com método",
    excerpt:
      "Criança de 11 anos já cria mundo no Roblox e mod no Minecraft. Com IA, então, voa. O problema não é acesso. É método. Como ensinar vibecoding pra criança sem virar copy-cola de IA.",
    content: `## O que criança já faz sozinha (e ninguém fala)

Criança de 11 anos hoje:

- Cria mundo no Roblox com script em Lua.
- Faz mod no Minecraft.
- Instala tema no Discord.
- Aprende comando de terminal em tutorial do YouTube pra hackear o jogo.

Ela já vibecoda. Só não sabe que chamam disso.

O problema não é acesso. Nem falta de curiosidade. É que ela faz sem método. Copia código do primeiro tutorial. Roda. Se der certo, deixa. Se não, apaga. Sem entender.

## O que muda quando a IA entra

Agora com Claude, ChatGPT e Gemini de graça, ela pede "faz um jogo em JavaScript" e recebe 200 linhas de código funcionando. Cola. Roda. Funciona. Feliz.

Aí ela quer mudar uma cor. Pede pra IA. Pede de novo. E de novo. Duas horas depois, desistiu do projeto.

Por quê? Ela nunca entendeu o que estava fazendo.

Vibecoding sem método vira copy-cola. E ninguém aprende copiando.

## Meu take

Passei 3 meses estruturando um curso de 30 horas de vibecoding pra criança e adolescente de 12 a 14 anos. Alinhado com o Documento Orientador do MEC (abril de 2026) e a BNCC de Computação.

Não vim vender curso aqui. Vim passar o método. Se quiser conhecer, tem link no fim.

## Cinco regras que valem pra qualquer criança aprender vibecoding

### 1. Adulto por perto
Toda vez que for pôr no ar. Toda vez que for usar chave de API. Toda vez que for testar num serviço externo. Não é babaquice. É segurança.

### 2. LER antes de rodar
Nunca colar código da IA sem entender. Peça pra ela explicar cada linha. Se ela explicar mal, ela também escreveu mal.

### 3. Nunca segredo no código
Senha, chave de API, token. Nunca dentro de arquivo que vai pro GitHub. Isso é regra de ouro do vibecoding adulto e vale mais ainda pra criança, porque ela ainda não tem calo pra medir o estrago.

### 4. Testar antes de mostrar
Site que quebra na frente da família é lição inesquecível. Pior: site que quebra na frente do usuário é confiança perdida.

### 5. Guardar versões
Git básico. Um comando por semana. Depois de 5 semanas ela sabe voltar uma versão quando bagunçou tudo. Habilidade que salva projeto inteiro.

## O Protocolo de 5 Camadas em linguagem de criança

O [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas) é meu método pra vibecoding adulto. Pra criança, vira isso:

1. **Entender.** O que a gente quer fazer? Fala em português antes de pedir pra IA.
2. **Ler.** Ler o que a IA escreveu. Se não entender, pergunta pra ela.
3. **Blindar.** Segredo no lugar certo. Adulto conferindo.
4. **Testar.** Clicar no botão. Digitar errado. Ver o que quebra.
5. **Versionar.** Salvar essa versão com nome. Se quebrar amanhã, volta.

É o mesmo método do adulto. Só que na linguagem certa e no tempo certo.

## O que criança tem que o adulto perde

Coragem de tentar. Zero medo de errar. Curiosidade de verdade. Não tem carreira pra proteger nem currículo pra defender.

Se ela aprender com método desde cedo, aos 18 anos tá construindo produto de verdade. Não precisa fazer bootcamp de 4 meses. Não precisa começar do zero na faculdade.

E aqui mora o ponto que ninguém está vendo: criança que aprende vibecoding com método hoje é fundadora de startup em 2032.

## Por que EAD e não presencial

Escola tradicional vai levar 3 anos pra colocar isso em grade. A criança precisa aprender agora.

EAD misto (vídeo gravado + encontro ao vivo semanal com professor) resolve. Ela assiste no ritmo dela. Semana que vem tira dúvida ao vivo. E o adulto participa do processo, não substitui.

Cada aula tem 25 minutos de vídeo explicando o conceito, 25 minutos de prática guiada e 10 minutos de exercício sem IA (só pra pensar). Um encontro ao vivo por semana. 15 semanas. Termina com projeto no ar. De verdade.

## Vale o ponto

"Isso não vai virar geração que só sabe pedir pra IA?"

Vale o ponto. Vai, se a gente ensinar do jeito errado. Se ensinar do jeito certo, vira geração que sabe pedir bem, LER o que veio, testar e decidir o que fica.

A regra é a mesma da escola tradicional: calculadora não te tornou pior em matemática se você entendeu a conta antes. Calculadora sem entender vira dependência. Com entendimento, vira alavanca.

Vibecoding é a mesma coisa. Depende de quem ensina.

## Conclusão

Criança tem acesso. Tem curiosidade. Tem IA disponível. Só falta método.

Se a gente ensinar direito, criança vibecoda melhor que muita startup. Sem hype. Com fundamento. Com adulto por perto.

Se quiser conhecer o curso EAD 30h de Vibecoding pra crianças e adolescentes 12-14 anos, alinhado ao MEC e à BNCC, [abre a ementa aqui](/cursos/curso-vibecoding-criancas-30h.html). O documento oficial de [alinhamento pedagógico](/cursos/curso-alinhamento-mec-bncc.html) tá aberto também.

A decisão é sua.`,
  },
  {
    id: "seu-app-funciona-mas-o-dev-fugiu-do-repo-2026",
    slug: "seu-app-funciona-mas-o-dev-fugiu-do-repo-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-06-28",
    coverUrl:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=80",
    title: "Seu app funciona. O dev fugiu do seu repositório. E agora?",
    excerpt:
      "6 meses de Cursor + Lovable + Bolt. App no ar, cliente pagando, receita entrando. Aí o dev abre o repo — e desiste. O que fazer sem reescrever tudo.",
    content: `O cenário se repete no Reddit toda semana. É sempre a mesma história — só muda o nome do desenvolvedor:

> "O app funciona. Os usuários estão felizes. A receita está entrando. Aí eu tentei trazer um dev pra me ajudar. Ele abriu o repositório, ficou 2 minutos em silêncio, e disse: *'o que é isso'*."

Se você tá se reconhecendo aqui, respira. Você não é o primeiro. E, mais importante, **você não precisa reescrever tudo**.

## A anatomia do buraco
Seis meses de Cursor, Lovable, Bolt. Cada feature funcionou quando você mandou. Cada bug foi corrigido. O app rodou.

Mas ninguém pensou na **estrutura**. E a IA nunca vai pensar por você — ela só continua adicionando:
- Arquivo novo aqui.
- Função duplicada ali.
- 3 formas diferentes de fazer a mesma coisa.
- Tratamento de erro em 5 padrões.
- Autenticação espalhada em 4 lugares.

Aí você tenta refatorar sozinho. Toca uma coisa, quebra outra totalmente não relacionada. Desiste em 2 horas.

> A geração foi rápida. A limpeza é um pesadelo.

## A tentação que te leva ao segundo buraco
A IA vai te sugerir "reescrever do zero". Ela adora — é o que ela faz de olhos fechados. Você vai:
- Gastar 3 semanas migrando.
- Assustar cliente pagante com "versão nova".
- Descobrir cantos escondidos que o app antigo lidava e o novo não.
- Em 6 meses, cair no mesmo buraco.

Porque **o problema não é o código. É o método.** Reescrever com o mesmo processo produz o mesmo resultado.

## O que fazer no lugar (6 passos)
Isso aqui não é teoria. É o que aplico e o que já dei de conselho pra dezenas de gente na mesma situação.

### 1. Pare de adicionar por uma semana
Nada de feature nova. Só bug crítico. Toda linha nova hoje **piora** a bagunça. Você precisa parar de cavar antes de começar a subir.

### 2. Peça pra IA fazer o mapa (não a limpeza)
Antes de mexer, você precisa **entender**. Cole isso no Cursor/Claude no modo *"ask"* (não *"edit"*):

> "Liste os módulos principais deste repositório. Quais são as responsabilidades de cada um? Onde há funções duplicadas ou padrões inconsistentes (ex.: 3 jeitos diferentes de tratar erro)?"

Você vai ganhar uma planta baixa. Sem ela, refatorar é escuridão.

### 3. Escolha UMA parte pra arrumar. Não tudo
A parte que **mais dói**. A que quebra mais quando você toca. A que dá medo. Não abrace o repositório inteiro — é aí que você desiste.

### 4. ANTES de refatorar, escreva testes
Não teste bonito, teste feio mesmo. Só o suficiente pra você saber **quando quebrou**.

É essa a coisa que o emaranhado te tira: você não sabe se quebrou. Com teste, sabe. Testes viram sua rede de segurança pra tudo que vier depois.

### 5. Aí sim, refatore com IA — com escopo curto
Prompt eficaz:

> "Aqui está o arquivo X e os testes correspondentes. Reescreva mantendo o comportamento exato. Unifique as 3 formas de lidar com Y em uma só. **Não invente feature nova.** Não mexa em nada fora deste arquivo."

A palavra-chave é *"não invente"*. A IA ADORA inventar enquanto refatora. Você tem que dizer explicitamente que não pode.

### 6. Só passa pra próxima fatia depois que a atual está limpa E os testes passam
Se você abraçar tudo de novo, desiste em 2 horas de novo. Uma fatia por vez. É lento no começo. Depois acelera. É a única forma que funciona.

Esse ciclo é o [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas) aplicado à refatoração: Entender, Ler, Blindar, Testar, Versionar.

## O que você NÃO fez (e por que caiu no buraco)
Não foi culpa do Cursor. Nem do Lovable. Nem do Bolt. Todas essas ferramentas são aceleradores excelentes. Acelerador precisa de **motorista que sabe pra onde vai**.

Faltou:
- **Arquiteto no processo.** Alguém decidindo "isso vai aqui, isso não pode existir duas vezes, esse padrão a gente segue no repositório inteiro".
- **Revisão do que a IA cospe** ([o Protocolo de 5 Camadas existe pra isso](/blog/protocolo-de-5-camadas)).
- **Freio.** Uma feature de cada vez. Testada. Integrada. Só aí a próxima.

Se, daqui pra frente, você voltar a ser o motorista — spec antes, revisão depois, teste na fatia crítica — a IA volta a te acelerar em vez de te enterrar. É o que eu chamo de [vibecoding com engenharia](/blog/vibecoding-com-engenharia): a velocidade da IA com o rigor de engenheiro. Sem o rigor, você só volta ao mesmo buraco em 6 meses.

## Lembra da parte boa
Você tem app **no ar**. Cliente **pagante**. Receita **entrando**. Isso é o que **a maioria nunca alcança**. A maioria fica em demo pra sempre.

Não joga fora por medo do backend feio. Backend feio se conserta em fatias. Cliente feliz + receita entrando é ativo — dos raros.

> Backend bagunçado é problema técnico. Não ter cliente é problema existencial. Você tem o segundo resolvido. Foca no primeiro com método.

## Conclusão
Não reescreva. **Delimite, mapeie, teste, refatore em fatias.** E não deixe a IA adicionar feature nova enquanto você está limpando — essa é a armadilha mais comum.

Em 4-6 semanas você tem um repositório que dev novo abre sem fazer aquela cara. Sem downtime. Sem migração. Sem cliente perdido.

Quer o método completo de construir e revisar com IA — sem cair nesse buraco de novo? Está tudo no e-book gratuito [**IA Sem Medo**](/materiais), com 130+ prompts prontos.

A decisão é sua.`,
  },
  {
    id: "foxconn-agentes-ia-chao-de-fabrica-2026",
    slug: "foxconn-agentes-ia-chao-de-fabrica-2026",
    contentVersion: 1,
    status: "published",
    tags: ["IA & Carreira"],
    publishedAt: "2026-06-27",
    coverUrl:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1200&q=80",
    title: "A Foxconn pôs centenas de agentes de IA no chão de fábrica. E acabou a piada",
    excerpt:
      "Foxconn lançou agentes de IA monitorando produção em escala industrial — não demo, fábrica real. O que isso muda pra quem ainda acha 'agente' coisa de PowerPoint.",
    content: `Esta semana morreu a piada de "agente de IA é só hype de PowerPoint". A **Foxconn** — sim, a que monta seu iPhone — lançou o **MoMClaw**, um sistema multi-agente de manufatura rodando em **NVIDIA FOX** que liga **sensores de máquina a centenas de agentes de IA coordenados**. Cada agente é responsável por monitorar, ajustar ou disparar alerta em uma parte do processo de produção.

Não é piloto. Não é demo. É **chão de fábrica de verdade**, montando produto que vai pro mercado, em escala industrial ([cobertura](https://www.devflokers.com/blog/ai-news-june-2026-models-research-developments)).

E isso muda o jogo de quem ainda achava que "agente" era brincadeira de SaaS.

## O que isso significa
Há 6 meses, "agente de IA" era um ChatGPT com plugin. Você pedia "marca uma reunião" e ele às vezes acertava. Era teatro.

Em 2026, a Gartner projeta que **40% das aplicações empresariais terão agentes integrados até o fim do ano** — e a Foxconn acabou de provar com produto físico saindo da linha. Agente parou de ser feature, virou **operação**.

A pergunta deixou de ser "agente funciona?". Virou: **"o seu já está rodando, ou você ainda vai começar?"**

## Por que a Foxconn conseguiu (e a maioria não consegue)
Olha o que a Foxconn fez diferente:

1. **Não é UM agente fazendo tudo.** São **centenas**, cada um responsável por uma parte pequena e bem definida (uma máquina, um sensor, uma decisão). É o oposto do "agente mágico" que tenta resolver o mundo.
2. **Rodou em escala antes de "lançar".** Você não vê a Foxconn postando demo no LinkedIn. Você vê a fábrica funcionando.
3. **Falha de UM agente não derruba a linha.** Cada agente é isolado, tem domínio próprio, e o sistema sobrevive a falhas individuais. Engenharia de verdade.
4. **Observabilidade em tudo.** Quando você rola 200 agentes monitorando 5 mil sensores, [você precisa saber quando um deles para de funcionar](/blog/observabilidade-e-o-produto-falha-silenciosa-ia-2026) — antes do cliente reclamar. Isso na fábrica significa antes da linha parar.

## A lição pra quem constrói com IA
Você não tem uma fábrica. Mas a engenharia é a mesma:

1. **Quebre o problema em N agentes pequenos.** "Agente que faz minha empresa rodar" é fantasia. "Agente que classifica e-mails de suporte por prioridade" é produto.
2. **Cada agente tem dono e domínio.** Quando algo dá errado, você sabe qual agente foi.
3. **Mínimo necessário em cada um.** Já escrevi sobre isso: [agente sem revisar permissão é o erro de segurança da vez](/blog/agente-de-ia-sem-revisar-permissao-2026). A Foxconn não dá acesso total da fábrica pra um agente só — você também não deveria.
4. **Observabilidade SEMPRE.** Sem isso, você vai descobrir que um agente parou de funcionar quando o problema já é grande.

É o oposto do que a maioria das startups está fazendo: **um** super-agente, com **todos** os privilégios, sem observabilidade, lançado **como demo** pra mostrar pro investidor.

## O que muda a partir daqui
Se a Foxconn — que tem **margem apertada** e **zero tolerância a parada de linha** — escolheu agentes de IA pra rodar a fábrica, é sinal claro que a tecnologia saiu do estágio de novidade. Em 6 meses, todo concorrente sério vai ter alguma coisa parecida no fluxo de trabalho deles.

A vantagem competitiva está se movendo:
- **Antes:** quem tinha IA tinha vantagem.
- **Agora:** todo mundo tem. Vantagem é **quem tem agente bem implantado e observado**.
- **Em 1 ano:** todo mundo terá agentes. Vantagem será **quem cruza dados entre agentes** (o que a IA do MoMClaw faz coordenando os 100+ agentes entre si).

Se você ainda está esperando "a hora certa", a hora passou.

## Conclusão
A IA virou commodity. **A engenharia de IA não.** A Foxconn não ganhou implantando "uma IA" — ganhou implantando **arquitetura de agentes** com método, isolamento, observabilidade e foco. É vibecoding com engenharia em escala industrial.

> "Agente de IA" parou de ser apresentação de PowerPoint e virou linha de produção. Quem ainda está fazendo apresentação vai descobrir tarde demais.

Quer começar a construir com agentes do jeito certo — pequenos, isolados, observados — em vez do super-agente de demo? O método está no e-book gratuito [**IA Sem Medo**](/materiais), com prompts prontos.

A decisão é sua.`,
  },
  {
    id: "gta-vi-foco-single-player-licao-startup-2026",
    slug: "gta-vi-foco-single-player-licao-startup-2026",
    contentVersion: 2,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-06-26",
    coverUrl: "/blog/gta-vi.png",
    title: "GTA VI vai lançar pela metade. E isso é genial",
    excerpt:
      "Rockstar vai lançar GTA VI sem multiplayer — abrindo mão de bilhões. A lição que toda startup de IA precisa aprender sobre foco.",
    content: `Esta semana abriram os pre-orders de **GTA VI**: US$ 79,99 a versão padrão, US$ 99,99 a Ultimate. Lançamento em 19 de novembro. Tudo na expectativa de um dos maiores lançamentos da história do entretenimento — eles mesmos esperam **bilhões em receita no primeiro dia**.

E enterrada no comunicado oficial, uma frase que devia ser estudada por toda startup que constrói com IA:

> "GTA VI será lançado como uma **experiência single-player** no dia 19 de novembro."

Sem multiplayer. Sem GTA Online no lançamento. Eles vão lançar **metade** do que os jogadores esperavam.

E essa decisão é gênio puro.

## Por que isso é insano (no bom sentido)
O **GTA Online** — o multiplayer do GTA V — gerou **mais de US$ 8 bilhões** desde 2013. Foi a galinha dos ovos de ouro da Rockstar. É de onde vem a maior parte do lucro recorrente da Take-Two. Lançar GTA VI sem o multiplayer é como abrir uma rede de hambúrgueres mas sem a Coca-Cola. Funciona, mas você está deixando dinheiro na mesa.

A Rockstar olhou pra isso e disse: **"sem problema. Lança single-player primeiro. Multiplayer vem depois."**

## O que isso revela
Quem constrói coisa séria sabe a verdade que ninguém quer ouvir: **fazer DOIS produtos ao mesmo tempo é fazer MEIO produto duas vezes.**

A Rockstar tinha duas opções:
1. **Tudo no lançamento:** single-player ok + multiplayer ok = ambos medíocres, lançamento atropelado, bugs em escala.
2. **Foco:** single-player **excelente** primeiro. Multiplayer **excelente** depois.

Eles escolheram a 2. Vão deixar bilhões na mesa por alguns meses pra entregar **uma experiência completa**. E vão ganhar dez vezes mais ao longo dos anos por ter feito direito.

> Lançar metade do produto perfeito é melhor do que lançar o produto inteiro pela metade.

## Por que isso atinge quem constrói com IA em cheio
Você está com 5 ideias na cabeça pra montar com IA. Quer:
- O assistente que responde clientes.
- O robô que escreve posts.
- O agente que faz cobrança.
- O dashboard com tudo.
- A automação de e-mails.

E quer **tudo no lançamento**, na semana que vem, em paralelo, pra mostrar "o que dá pra fazer com IA".

Vai entregar cinco coisas mal feitas. Cinco demos. Zero produto.

A Rockstar — com 12 anos de desenvolvimento, US$ 2 bilhões de orçamento, dois mil engenheiros — escolheu **lançar UMA coisa**. Você, com seu time menor, vai conseguir mais?

## A lição prática
1. **Escolha A coisa.** Não duas. Não três. Uma. A mais importante.
2. **Termine antes de começar a próxima.** Termine de verdade — incluindo testes, [observabilidade](/blog/observabilidade-e-o-produto-falha-silenciosa-ia-2026), segurança, suporte. Não "subi pra produção", **terminei**.
3. **Vai sentir vontade de fatiar.** Vai pensar "se eu lançar só isso, vão achar pouco". Você está errado. Vão achar **focado**.
4. **Aguente o desconforto de não lançar tudo.** É aqui que mora a diferença entre quem constrói produto e quem só faz demo.

É o mesmo princípio do [MVP enxuto que validei no caso real](/blog/observabilidade-e-o-produto-falha-silenciosa-ia-2026) — foquei no fluxo central e só depois expandi. Pular a etapa do foco é onde 90% morre.

## E os bilhões na mesa?
Eles vão ser perdidos? Não. Vão ser **adiados** — pra serem **multiplicados**.

A Rockstar sabe: jogador que termina o single-player em janeiro tá doido pra entrar no multiplayer em junho. Lança um GTA Online polido em meados de 2027 e os bilhões voltam, com juros, em cima de uma base de jogadores **conquistada** — não atropelada.

Quem constrói com IA precisa entender essa matemática: **foco hoje paga juros amanhã**. Espalhar hoje queima futuro.

## Conclusão
A Rockstar não é "preguiçosa por lançar só metade". É **disciplinada o suficiente** pra abrir mão de bilhões agora pra entregar bilhões depois — feito direito.

Você não tem 12 anos nem US$ 2 bilhões. Tem ainda mais motivo pra focar.

> Em IA, foco não é falta de ambição. É a única forma de a ambição virar produto.

Quer construir com IA focado e com método — escolhendo a coisa certa pra fazer primeiro? O e-book gratuito [**IA Sem Medo**](/materiais) tem o caminho.

A decisão é sua.`,
  },
  {
    id: "biblioteca-de-prompts-pessoal-tutorial-2026",
    slug: "biblioteca-de-prompts-pessoal-tutorial-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Primeiros Passos"],
    publishedAt: "2026-06-26",
    coverUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    title: "O ativo que ninguém tem: sua biblioteca de prompts",
    excerpt:
      "Você criou um prompt que funcionou e jogou fora. Quem organiza compõe valor. O passo a passo da biblioteca de prompts pessoal, com método.",
    content: `Toda vez que você escreve um prompt que funciona, dois caminhos:

1. Copia a resposta, fecha a aba e amanhã reescreve do zero.
2. Salva o prompt, refina, reusa.

A maioria faz o caminho 1. Por isso a maioria sente que "aprendeu IA" e mês que vem está no mesmo lugar. **Prompt que funciona é ativo.** Quem não organiza, joga fora seu próprio trabalho.

## Por que isso importa
Especialistas de marketing relatam ganho de até **10× na velocidade de primeiros rascunhos** quando trabalham com prompts bem montados e reusáveis ([fonte](https://genesysgrowth.com/blog/ai-prompt-engineering-for-marketers-complete-guide)). Não é mágica do modelo — é o **mesmo prompt afiado mil vezes**. Esse é o ativo. Vou te ensinar a construir o seu.

## A biblioteca de prompts (definição)
Um lugar único onde você guarda prompts que funcionam, organizados por tarefa, com **as melhores versões evoluindo no tempo**. Pode ser tão simples quanto um documento. O importante não é a ferramenta — é o **hábito**.

## Onde guardar (3 opções, escolha 1 e siga)
- **Notion/Google Docs** — fácil, busca decente, dá pra organizar em pastas. Recomendado pra começar.
- **Obsidian** — pra quem gosta de markdown e busca por tag.
- **Os próprios "Projects" do Claude / "GPTs" do ChatGPT** — você guarda o prompt **dentro** do assistente. Bom pra prompts que viram um especialista (como [já mostrei aqui](/blog/como-criar-assistente-de-ia-personalizado-sem-codigo-2026)), ruim pra varrer/comparar.

Comece pelo Notion ou Google Docs. Otimize depois.

## A estrutura de UM prompt na biblioteca
Cada prompt salvo precisa ter **5 partes**. Sem isso ele vira "rabisco que você não lembra por que funcionou".

\`\`\`
## Nome do prompt
(curto, descritivo: "E-mail de cobrança gentil")

## Quando usar
(o gatilho — "cliente atrasou 7 dias e ainda não respondeu")

## O prompt
(o texto que você cola na IA, com [variáveis] entre colchetes)

## Resultado esperado
(o que uma boa resposta deve conter — pra você revisar)

## Histórico
v1: 25/06 — funcionou bem com clientes médios
v2: 03/07 — ajustei o tom pra clientes grandes; melhorou
\`\`\`

Esse "Histórico" é o segredo. Você não escreve um prompt perfeito de cara. Você **evolui o mesmo**.

## Como organizar a biblioteca
Categorize por **tarefa**, não por ferramenta. A IA muda toda semana ([nem ligo mais](/blog/modelo-do-mes-mudou-de-novo-o-que-importa-2026)); o seu trabalho não.

Sugestão de categorias iniciais:
- **Escrita** (e-mail, post, copy, proposta)
- **Análise** (resumo, comparativo, pesquisa)
- **Decisão** (pró e contra, priorização)
- **Reuniões** (preparação, ata, follow-up)
- **Aprendizado** (estudar tema, explicar pra leigo)
- **Pessoal** (rotina, planejamento, lista)

Cada categoria, uma página/pasta. Cada prompt, um arquivo.

## Como construir o prompt certo (método)
Não copie prompt aleatório da internet. Construa o seu pelo método [P.R.O.M.P.T.E.R.](/blog/como-usar-ia-no-trabalho-peder) — as 8 partes que fazem um prompt deixar de ser pedido e virar uma instrução profissional.

Para cada novo prompt da biblioteca:
1. **Papel** que a IA assume.
2. **Realidade** (contexto que ela precisa).
3. **Objetivo** claro do resultado.
4. **Marcha** (passo a passo de raciocínio).
5. **Proteção** (limites e o que não pode).
6. **Texto de saída** (formato).
7. **Exemplos** de boa resposta.
8. **Refino** depois de testar.

Sem método, você acumula prompts ruins.

## A regra dos 5 minutos
Antes de fechar a janela da IA, pergunte: **"isso vai acontecer de novo?"**.
- Se sim → 5 minutos pra salvar na biblioteca, no formato acima.
- Se não → tudo bem, fecha mesmo.

Esses 5 minutos são onde mora o juros composto. Daqui a 6 meses você tem **dezenas de prompts afiados** que outros vão tentar reinventar do zero toda vez.

## Erros comuns (e como evitar)
- **Salvar tudo:** vira lixo. Salve só o que você reusaria. Qualidade > quantidade.
- **Salvar sem o "Quando usar":** daqui a 1 mês você não lembra. Sempre escreva o gatilho.
- **Nunca revisitar:** uma vez por mês, abra os 5 mais usados e refine. É o "Histórico".
- **Misturar idiomas e formatos:** padronize. Tudo em português ou tudo em inglês. Decida e segue.

## Bônus: o pacote inicial
Se você quer começar com base, eu já organizei **+130 prompts prontos** no e-book gratuito [**IA Sem Medo**](/materiais). Não pra copiar e colar — pra usar como **ponto de partida** da sua biblioteca, e ir adaptando pelo método.

## Conclusão
Modelo de IA é commodity. Ferramenta muda. **A sua biblioteca de prompts não muda — ela cresce.** É o ativo mais barato que você pode construir hoje e o que mais paga ao longo dos anos.

> Em 6 meses, quem organizou tem 50 prompts afiados. Quem não organizou tem 50 conversas perdidas. Mesma quantidade de trabalho, resultados opostos.

A decisão é sua.`,
  },
  {
    id: "a24-deepmind-ia-equipa-criador-2026",
    slug: "a24-deepmind-ia-equipa-criador-2026",
    contentVersion: 1,
    status: "published",
    tags: ["IA & Carreira"],
    publishedAt: "2026-06-26",
    coverUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    title: "A24 fez parceria com o DeepMind. O que isso ensina sobre IA e criadores",
    excerpt:
      "Estúdio mais artístico de Hollywood + laboratório de IA mais avançado do mundo. Tese: a IA não substitui o criador. Equipa o criador.",
    content: `Saiu esta semana e devia ser obrigatório pra quem ainda acha que IA "vai matar a criatividade": a **A24** — o estúdio de cinema mais artístico/respeitado de Hollywood, dos diretores autorais, dos filmes premiados — fechou parceria de **US$ 75 milhões com o Google DeepMind** pra desenvolver **ferramentas de IA específicas pra produção e distribuição de filmes**.

A casa que escolheu lançar *Tudo em Todo o Lugar ao Mesmo Tempo* e *O Brutalista* não escolheu **resistir** à IA. Escolheu **construir com ela**.

## O que está em jogo
Hollywood teve uma das maiores greves da história em 2023, em grande parte por causa de IA — atores e roteiristas temendo (com razão) ser substituídos. Em 2026, o vento mudou: o estúdio **mais autoral do mercado** está jogando US$ 75 milhões num laboratório de IA pra construir **as próprias ferramentas**, em vez de comprar Sora ou outro modelo genérico.

A diferença é tudo. Eles não querem IA **fazendo filme**. Querem IA **equipando o time** que faz filme.

## O que isso revela
A grande pergunta da IA não é "ela substitui o criador?". É **"quem controla as ferramentas que o criador usa?"**.

Quando você usa o modelo genérico do Google ou da OpenAI, a ferramenta é deles. O fluxo é deles. As limitações são deles. Você vira refém — e quando o produto vira commodity, os 30% mais experientes não conseguem se destacar dos 70% que acabaram de chegar.

Quando você **constrói a ferramenta sob medida** (ou contrata pra construir, como fez a A24), você mantém o que te faz único: o **ofício**.

> A IA virou commodity. O método como você usa, não.

É a mesma tese que [escrevi sobre os modelos virando líderes semanais](/blog/modelo-do-mes-mudou-de-novo-o-que-importa-2026), e que a **Rockstar** demonstrou ao [escolher IA controlada em vez de generativa](/blog/gta-vi-ia-controlada-vs-generativa-2026) pros NPCs do GTA VI. Agora a A24 confirma do lado da arte.

## Não é nova — mas agora é institucional
O que mudou em 2026 é o **enquadramento**. Em 2023, "usar IA" em Hollywood era praticamente palavrão. Em 2026, o estúdio mais prestigiado da indústria assina contrato com a empresa que ganhou um **Nobel** (DeepMind, AlphaFold) e fala abertamente sobre isso.

Pra quem cria conteúdo — texto, design, código, vídeo, qualquer coisa — a mensagem é a mesma:
- **Resistir** virou estratégia perdedora.
- **Substituir** o ofício pela IA é virar mais um de milhões.
- **Equipar** o ofício com IA é o caminho que sobra. É o vibecoding aplicado à criatividade.

## Pra você que constrói com IA (em qualquer área)
A lição prática:

1. **Não delegue o ofício.** A IA escreve, desenha, codifica. Você decide o que vale e o que não vale — esse é o seu valor.
2. **Construa suas próprias ferramentas.** Não precisa de US$ 75 mi: um [assistente de IA personalizado bem feito](/blog/como-criar-assistente-de-ia-personalizado-sem-codigo-2026) e uma [biblioteca de prompts pessoal](/blog/biblioteca-de-prompts-pessoal-tutorial-2026) já te colocam acima de quem só usa o ChatGPT cru.
3. **Especialize-se.** A IA genérica é commodity. O que você sabe sobre **seu** nicho — direito, vendas, ensino, engenharia — é o que vira o cano por onde a IA passa.

## Conclusão
A24 não vai ser substituída por IA. Vai ser **amplificada** por ela. Quem escolher o caminho contrário (resistir, ou se entregar) vai ser substituído — não pela IA, mas por quem aprendeu a usar IA com método.

> A próxima onda não é "IA fazendo arte". É **IA dentro do workflow de quem faz arte**. E essa onda já começou.

Quer entrar nela com método? O e-book gratuito [**IA Sem Medo**](/materiais) te dá o caminho — 130+ prompts e o método P.R.O.M.P.T.E.R. — pra usar IA como amplificador do **seu** trabalho, não substituto.

A decisão é sua.`,
  },
  {
    id: "gta-vi-ia-controlada-vs-generativa-2026",
    slug: "gta-vi-ia-controlada-vs-generativa-2026",
    contentVersion: 3,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-06-25",
    coverUrl: "/blog/gta-vi.png",
    title: "O que GTA VI ensina sobre construir com IA de verdade",
    excerpt:
      "GTA VI tem NPCs incrivelmente espertos — e Rockstar fez questão de NÃO usar IA generativa. Por que isso é a maior aula de vibecoding com engenharia.",
    content: `Saiu o jogo mais esperado da década com NPCs (personagens do jogo) inteligentíssimos: lembram do que você fez, têm rotinas próprias, mudam de humor, reagem ao clima. Parece que a Rockstar enfiou um ChatGPT dentro de cada um deles.

Mas não. **A Rockstar fez questão de NÃO usar IA generativa nos NPCs.** E essa decisão é a maior aula de engenharia com IA que saiu este ano.

## O que de fato tem dentro
A imprensa especializada esclareceu o boato: o GTA VI **não roda em GPT-6** nem em nenhum modelo de linguagem por trás dos NPCs ([cobertura aqui](https://medium.com/@mattcopp_77295/no-gta6-is-not-going-to-have-generative-ai-for-npcs-c3b533472d18)). Os NPCs são incríveis, mas a inteligência deles é uma engenharia caseira da Rockstar, baseada em uma engine própria (RAGE 9) e em uma patente de IA específica para jogos (US11684855B2) que entrega **200× mais NPCs com comportamento realista** — pathfinding hierárquico, modelagem de personalidade, processamento no servidor.

Resultado: NPCs com rotinas diárias complexas, que reagem a fogo, explosões, chuva, congestionamento; lembram se você foi gentil ou agressivo; vão à praia em certos dias e ficam em casa em outros.

Tudo isso **sem** um modelo de linguagem solto improvisando.

## Por que a Rockstar decidiu não usar IA generativa
Pensa no que precisa funcionar em GTA VI:
- **Milhões de jogadores ao mesmo tempo.**
- **Centenas de NPCs por tela**, com lógica em tempo real.
- **Zero tolerância** a um NPC dizer algo racista, vazar um spoiler, ou inventar uma missão que não existe.
- O jogo precisa rodar **igual** pra todo mundo, sempre.

Agora pensa o que uma IA generativa faz num cenário desses: alucina, demora, custa milhões em token por hora, é imprevisível e — pior — é manipulável (alguém escreve algo proibido na tela e o NPC repete).

A Rockstar fez a conta e escolheu o caminho difícil de engenharia: **construir IA específica, controlada, determinística** — em vez de pendurar tudo num modelo genérico mágico.

> O jogo mais esperado da década escolheu IA que ela controla, em vez de IA que controla ela.

## A lição pra quem constrói com IA
Você não está fazendo um jogo bilionário. Mas o princípio é exatamente o mesmo do [vibecoding com engenharia](/blog/vibecoding-com-engenharia):

1. **A pergunta certa não é "uso IA?".** É: **"o que precisa funcionar SEMPRE, e o que pode ser não-determinístico?"**
2. **No núcleo crítico, IA controlada.** Regras explícitas, scripts, prompts calibrados, validações — a parte que **não pode falhar** precisa de algo que você consiga prever e testar.
3. **Na periferia, IA generativa.** Onde a criatividade ajuda e o erro não derruba o produto (rascunho de texto, ideia de variação, primeiro esboço) — aí a IA brilha.
4. **Observabilidade em tudo.** Como [já escrevi por aqui](/blog/observabilidade-e-o-produto-falha-silenciosa-ia-2026), num produto de IA o que separa demo de produto é o que acontece nos 5% que falham.

É a mesma lição da semana passada: [agente que age sozinho é permissão que você concedeu](/blog/agente-de-ia-sem-revisar-permissao-2026). Autonomia bonita na demo, problema sério em produção.

## E o desafio que a Rockstar nem precisou enfrentar
Se a Rockstar tivesse colocado GPT-6 dentro de cada NPC, em 24 horas alguém ia conseguir:
- Fazer um NPC vazar dados de outros jogadores.
- Soltar conteúdo proibido na voz do personagem.
- Quebrar a economia do jogo com truques de prompt.

É o mesmo erro que [a defesa morando no prompt](/blog/seguranca-no-prompt-nao-e-seguranca-2026) provoca em qualquer sistema: vira manchete.

## Conclusão
GTA VI mostra que a IA mais inteligente nem sempre é a mais cara, mais nova ou mais "mágica". Às vezes é a mais **engenheirada** — a que você escolheu não usar nos lugares errados.

> A maior empresa de jogos do mundo construiu IA com regra, não com mágica. É engenharia. É vibecoding com engenharia.

Quer construir com IA com esse rigor — saber onde vale IA generativa e onde vale IA controlada? O método está no e-book gratuito [**IA Sem Medo**](/materiais), e dá pra começar pelos [robôs de IA gratuitos](/robos).

A decisão é sua.`,
  },
  {
    id: "notebooklm-pesquisador-pessoal-tutorial-2026",
    slug: "notebooklm-pesquisador-pessoal-tutorial-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Primeiros Passos"],
    publishedAt: "2026-06-25",
    coverUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    title: "Tutorial: como usar o NotebookLM como seu pesquisador pessoal",
    excerpt:
      "Suba 50 documentos, pergunte e a IA responde só com base no que você subiu — sem alucinar. O passo a passo do NotebookLM, com método.",
    content: `Você tem PDFs, contratos, transcrições de reunião, artigos salvos e uma pilha de "vou ler depois". Aí pergunta pro ChatGPT e ele inventa metade da resposta. Faz sentido pedir uma coisa que ele não leu?

Tem ferramenta gratuita feita exatamente pra resolver isso, e é uma das mais subestimadas de 2026: o **NotebookLM**, do Google.

## O que é, em uma frase
Você sobe **até 50 fontes** (PDFs, Google Docs, sites, vídeos do YouTube, áudios), e uma IA passa a responder **só com base no que você subiu**. Cada resposta vem com **citação direta** da fonte. Se não está lá, ela não inventa.

É a diferença entre um estagiário inventando e um analista que leu o material. ([Documentação oficial](https://notebooklm.google/))

## Por que isso é grande
Resolve três problemas de uma vez:
- **Alucinação:** ela só responde do que você subiu — com link da fonte.
- **Tempo:** você lê 1 hora; ela responde sobre 500 páginas em segundos.
- **Memória:** o "vou ler depois" vira um conhecimento consultável.

E tem um truque que está fazendo gente trocar de podcast: o **Audio Overview** transforma seus documentos numa conversa entre dois "apresentadores" de IA, formato podcast. Ouve no carro, na academia, lavando louça.

## Passo a passo
**1. Crie a conta e o notebook**
- Vá em [notebooklm.google.com](https://notebooklm.google.com) e entre com sua conta Google. É grátis.
- Clique em **"+ Novo notebook"**.

**2. Suba as fontes (a parte crítica)**
- Clique em **"Adicionar fonte"**. Aceita PDF, .txt, Google Docs, link de site, link do YouTube (transcreve), áudio (transcreve).
- Regra de ouro: **um notebook por projeto** — não por tema. O poder do NotebookLM é cruzar fontes, e isso só funciona dentro do mesmo notebook.
- Exemplo prático: "Caso do cliente X" (todos os PDFs, e-mails e atas viram um notebook).

**3. Pergunte com método**
Use o [P.R.O.M.P.T.E.R.](/blog/como-usar-ia-no-trabalho-peder) aplicado ao notebook. Pergunte em três níveis:

- **Visão geral:** "Quais são os principais temas que aparecem em todas as fontes?"
- **Aprofundamento:** "Sobre o tema X, qual evidência específica cada fonte traz?"
- **Confronto:** "Há fontes que se contradizem? Onde?"

A última é a melhor. É onde o NotebookLM brilha — ele aponta a divergência e mostra a citação de cada lado. Você decide o que vale.

**4. Gere um Audio Overview (sério, faça)**
- No painel, clique em **"Audio Overview"** → "Generate".
- 5 a 10 minutos depois, você tem um podcast de uns 12 a 20 min com **duas vozes de IA** discutindo o material.
- Antes de gerar, dá pra personalizar: "Foque em X", "tom formal", "20 minutos".

**5. Use o que ele cospe — com critério**
Cada resposta tem um número clicável que abre **a passagem exata** da fonte. **Sempre confira.** O NotebookLM é menos sujeito a alucinação que um modelo solto, mas pode interpretar mal um trecho. É a sua camada de revisão — o [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas) aplicado ao conhecimento.

## Casos de uso que valem ouro
- **Estudo de prova/concurso:** apostilas e leis sobem como fontes → você pergunta, simula, ouve no áudio.
- **Cliente:** todos os documentos do caso/projeto viram um notebook consultável.
- **Reuniões:** salva as transcrições do mês → pergunta "o que decidimos sobre X?".
- **Pesquisa de mercado:** 10 relatórios sobem juntos → você pede "compare as previsões e me dê o consenso e a divergência".
- **Onboarding de equipe:** documentação interna vira um notebook que responde dúvidas do novato.

## O limite honesto
- É **leitura**, não criação. Pra escrever do zero, use ChatGPT/Claude/Gemini direto.
- 50 fontes por notebook. Em projetos imensos, vale ter mais de um e cruzar à mão.
- **Privacidade:** não suba documento sensível sem checar a política do Google Workspace da sua empresa.

## Conclusão
A IA que responde "do nada" sempre vai te decepcionar em algum momento. A IA que responde **só do que você deu pra ela** muda a conta toda — você termina de ler em segundos, sem inventar, com fonte clicável.

> NotebookLM é o oposto do hype: é IA chata, controlada, citada. E é por isso que vale.

Quer mais ferramentas e métodos pra usar IA com critério? Tudo está no e-book gratuito [**IA Sem Medo**](/materiais), com 130+ prompts prontos.

A decisão é sua.`,
  },
  {
    id: "modelo-do-mes-mudou-de-novo-o-que-importa-2026",
    slug: "modelo-do-mes-mudou-de-novo-o-que-importa-2026",
    contentVersion: 1,
    status: "published",
    tags: ["IA & Carreira"],
    publishedAt: "2026-06-24",
    coverUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    title: "O modelo do mês mudou de novo. Por que isso não importa pra você",
    excerpt:
      "Gemini 2.5 Pro tomou a liderança esta semana. Daqui a 30 dias outro toma. O que muda pra quem constrói com IA — e o que não muda.",
    content: `Essa semana o ranking dos modelos de IA virou de novo. **Gemini 2.5 Pro chegou e bateu todo mundo** em vários benchmarks (89,8% no MMLU-Pro, o mais alto entre os modelos públicos). O **GPT-5.5-Cyber** da OpenAI tomou o lugar do Mythos 5 da Anthropic em segurança (85,6% no CyberGym). Em outro canto, **John Jumper, ganhador do Nobel** pelo AlphaFold, deixou a DeepMind e foi pra Anthropic. E a SpaceX assinou contrato pra pagar **US$ 150 milhões por mês** em GPUs da Nvidia.

Tudo isso. Em uma semana.

## O que acabou de acontecer
- **22/jun — Gemini 2.5 Pro lançado** com "Deep Think" (modo de raciocínio profundo). Ficou na frente do Fable 5 da Anthropic em GPQA Diamond (82,4% vs 79,1%) e bateu o recorde público em MMLU-Pro. ([cobertura](https://www.buildfastwithai.com/blogs/ai-news-today-june-24-2026))
- **GPT-5.5-Cyber da OpenAI** ultrapassou o Mythos 5 em testes de cibersegurança.
- **John Jumper (Nobel de Química 2024)** trocou a DeepMind pela Anthropic.
- **SpaceX-xAI: US$ 150M/mês, US$ 6,3 bi até 2029** em GPUs.
- **Anthropic** anunciou que **65% do código** do time de produto já sai do "Claude Tag" — um agente que vive dentro do Slack.

E tem mais. Mas pra que listar?

## Por que isso não importa pra você (tanto)
Eu sei como essa enxurrada de notícia faz a gente sentir: que está perdendo a janela, que precisa trocar de modelo, que é melhor esperar o próximo lançamento pra começar.

É exatamente o tipo de ansiedade que **paralisa**.

Olha o ritmo: o **Claude Fable 5** foi a referência absoluta em maio. Em junho, [foi tirado do ar pelo governo dos EUA](/blog/seguranca-no-prompt-nao-e-seguranca-2026), [voltou na semana passada](/blog/claude-code-cursor-antigravity-qual-usar-2026), e essa semana o Gemini 2.5 Pro está na frente. Daqui a 30 dias, outro modelo lidera.

> O modelo que está no topo essa semana não é o que está no topo o mês que vem. E não é o que vai estar no topo quando você precisar entregar.

Quem trocou de IDE/modelo toda semana esse ano não entregou nada. Quem escolheu **um** e usou com método entregou produto.

## O que de fato muda
Três coisas dessa semana **importam** pra quem constrói:

1. **A liderança virou commodity.** Quando 3 modelos diferentes alternam na ponta a cada 30 dias, "o melhor modelo" deixou de ser vantagem competitiva. Você usa o que está acessível e bom o suficiente. O Gemini melhor 5% no benchmark X não te faz entregar 5% mais.
2. **IA está virando colega de equipe, não ferramenta.** O Claude Tag dentro do Slack (escrevendo 65% do código de um time da Anthropic) é o sinal: a IA não vai mais "abrir uma janela à parte". Vai conversar com você nos canais onde o trabalho já acontece. [Como já apontei aqui](/blog/ia-escreve-codigo-humano-virou-arquiteto-2026), o humano sobe pra arquiteto e auditor.
3. **A infraestrutura virou geopolítica.** US$ 150 milhões/mês em GPUs, Nobel mudando de empresa, governo derrubando modelo. Quem opera IA hoje opera num campo que não obedece mais só ao mercado.

## O que NÃO muda
Aqui está a parte que ninguém posta no LinkedIn:

- **Saber pedir.** Modelo novo, mesma necessidade de um prompt bem feito ([método P.R.O.M.P.T.E.R.](/blog/como-usar-ia-no-trabalho-peder)).
- **Saber revisar.** [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas). Modelo mais inteligente alucina mais convincente.
- **Saber blindar.** Segurança não mora no prompt. [Continua não morando](/blog/seguranca-no-prompt-nao-e-seguranca-2026).
- **Saber escolher.** Onde vale IA generativa, onde vale IA controlada (a Rockstar acabou de mostrar isso em [GTA VI](/blog/gta-vi-ia-controlada-vs-generativa-2026)).

Essas quatro habilidades **se acumulam**. Você não perde elas quando o modelo muda. É o seu juros composto.

## A recomendação prática
Se você está construindo algo agora:

1. **Pega o modelo que está bom o suficiente** (Claude, GPT, Gemini — qualquer um). Não troca por benchmark.
2. **Investe no método.** Prompt, revisão, segurança, arquitetura.
3. **Olha o ranking 1x por mês**, no máximo. Não toda semana.
4. **Só troca de modelo** se aparecer um ganho real pra **sua** tarefa específica, medido com **sua** métrica.

## Conclusão
A liderança da IA virou um cabo de guerra semanal entre 3 empresas. É emocionante de assistir. É péssimo de seguir.

> Construa com o modelo de hoje, com método de engenheiro. Quando o de amanhã chegar, você troca a peça — e mantém o que vale: o método.

Quer construir com IA sem virar refém do "melhor da semana"? O método está no e-book gratuito [**IA Sem Medo**](/materiais), e dá pra começar pelos [robôs de IA gratuitos](/robos).

A decisão é sua.`,
  },
  {
    id: "risco-nao-e-o-codigo-que-escreve-e-o-que-instala-2026",
    slug: "risco-nao-e-o-codigo-que-escreve-e-o-que-instala-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Segurança"],
    publishedAt: "2026-06-23",
    coverUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    title: "O risco não é o código que você escreve. É o que você instala",
    excerpt:
      "Hackers injetaram malware no open source da Microsoft. A lição pra quem constrói com IA: seu maior risco não é o código que você escreve — é o que você instala.",
    content: `Esta semana a Microsoft fez algo drástico: **cortou o acesso a dezenas dos próprios projetos open source no GitHub**. O motivo? Hackers invadiram esses projetos e **injetaram malware que rouba senhas** direto no código — muitos deles ligados ao Azure e a ferramentas que desenvolvedores usam pra construir com IA.

Ou seja: código "confiável", da Microsoft, virou armadilha. E quem usava esses projetos **baixou a armadilha junto**.

## O que aconteceu
A Microsoft removeu projetos do ar enquanto investiga como os invasores plantaram código malicioso de roubo de credenciais ([cobertura](https://techstartups.com/2026/06/22/top-tech-news-today-june-22-2026/)). E não é um caso isolado — 2026 está sendo o ano dos vazamentos:

- O **iFood** confirmou exposição de dados de cerca de **1,2 milhão de usuários** ([fonte](https://www.opovo.com.br/noticias/tecnologia/2026/06/03/amp/ifood-confirma-vazamento-de-dados-de-12-milhao-de-usuarios.html)).
- Pesquisas apontam **700 milhões de ataques a bancos de dados** no Brasil.
- Mais de **2 milhões de pessoas** tiveram documentos (passaporte, CNH) expostos por falhas básicas de configuração.

O recado de tudo isso junto é um só — e mira em cheio quem constrói rápido com IA.

## O que isso revela
> O código que você **instala** é código que você **executa** — com as suas permissões.

Quando você roda um \`npm install\`, copia um repositório ou aceita a biblioteca que a IA sugeriu, está rodando **código de terceiros** na sua máquina e no seu servidor, com o seu acesso. Se esse código foi comprometido — como o da Microsoft —, o estrago é seu.

É o **ataque de cadeia de suprimentos** (supply chain): o invasor não tenta furar o seu código. Ele contamina algo que você **confia e instala**. Muito mais barato pra ele, muito mais perigoso pra você.

## Por que isso atinge o vibecoding em cheio
Construir com IA é montar rápido em cima de blocos prontos. Você instala dezenas de pacotes sem ler nenhum. A IA diz "instala essa biblioteca" e você instala. Cada \`install\` é um ato de confiança.

E tem um agravante novo, da era da IA: às vezes o modelo **inventa o nome de um pacote** que não existe — e atacantes registram exatamente esse nome com código malicioso, esperando que alguém (ou alguma IA) mande instalar. Chamam isso de *slopsquatting*. Seu app pode estar 100% correto no código que **você** escreveu e ainda assim vazar senhas por uma dependência podre.

## Como se proteger (não é medo, é método)
1. **Trave as versões.** Use o lockfile (\`package-lock.json\`). Sem isso, uma atualização silenciosa troca a dependência por baixo de você.
2. **Audite antes de instalar.** Rode \`npm audit\` e olhe a lib: quem mantém? quantos downloads? última atualização? Nome estranho ou pacote novo com zero histórico = sinal vermelho.
3. **Menos é mais.** Cada dependência é uma porta. Não instale uma biblioteca obscura pra resolver o que 5 linhas resolvem.
4. **Revise o que a IA manda instalar.** Confirme que o pacote **existe e é o oficial** antes de rodar o comando — não confie no nome que o modelo cuspiu.
5. **Segredos fora do alcance.** Se um malware rodar, que ele não ache suas chaves no código. É o básico de [nunca vazar um segredo](/blog/nunca-vaze-uma-senha-variaveis-de-ambiente-gitignore).

É a camada **Blindar** do [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas) aplicada ao que você **não** escreveu — a mesma lógica de [não confiar cegamente no que a IA entrega](/blog/seguranca-no-prompt-nao-e-seguranca-2026).

## Conclusão
Você pode revisar cada linha que a IA gera e ainda assim ser pego — porque o maior pedaço do seu app é código que **outra pessoa escreveu e você instalou**. Em 2026, com ataque de cadeia de suprimentos virando rotina, "de quem é esse pacote?" é pergunta de segurança, não de curiosidade.

> Você é responsável pelo código que roda no seu app — inclusive (e principalmente) o que você não escreveu.

Quer construir com IA sem deixar essa porta aberta? O método de blindar cada etapa está no e-book gratuito [**IA Sem Medo**](/materiais), e dá pra começar pelos [robôs de IA gratuitos](/robos) — incluindo um Revisor de Código & Segurança.

A decisão é sua.`,
  },
  {
    id: "como-criar-assistente-de-ia-personalizado-sem-codigo-2026",
    slug: "como-criar-assistente-de-ia-personalizado-sem-codigo-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Primeiros Passos"],
    publishedAt: "2026-06-22",
    coverUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    title: "Como criar seu assistente de IA personalizado (sem código)",
    excerpt:
      "Agentes de IA são a onda de 2026 — a Gartner prevê 40% das empresas usando até o fim do ano. E você não precisa programar pra ter o seu. O passo a passo, com método.",
    content: `Tem uma mudança acontecendo na IA em 2026 que vale entender: ela deixou de ser só um assistente que responde e virou parte do time, que executa. A Gartner prevê que **40% das aplicações empresariais terão agentes de IA específicos até o fim de 2026**, e o mercado desses agentes cresce quase **50% ao ano**.

A boa notícia: a porta de entrada pra isso **não exige programar**. Começa com um **assistente de IA personalizado** — e você monta o seu hoje. Este é o passo a passo.

## O que é um assistente personalizado (e por que é melhor que "só usar o ChatGPT")
Usar o ChatGPT solto é começar do zero toda vez: você explica de novo quem ele deve ser, o contexto, o tom. Um **assistente personalizado** é um chat com **papel e instruções fixos** — você configura uma vez e ele já "acorda" sabendo a tarefa.

É a mesma ideia dos [robôs de IA](/robos) que eu disponibilizo: cada um é um especialista pronto. A diferença é que aqui você cria **o seu**, pra uma tarefa que só a sua rotina tem.

## Por que isso está em alta
Porque resolve o problema certo. Atendimento ao cliente com assistente de IA já corta cerca de **30%** da carga da equipe. Times montam um assistente por função — um pra e-mail, um pra proposta, um pra primeiro rascunho de relatório. Não é hype: é a IA virando ferramenta de trabalho repetível, não brinquedo de tirar dúvida.

## Onde montar (sem código)
Os três grandes têm a função, de graça ou no plano pago:
- **ChatGPT** → "GPTs" (Explorar → Criar).
- **Claude** → "Projects" (cria um projeto com instruções).
- **Gemini** → "Gems".

Todos funcionam igual: você dá um nome, cola as instruções e pronto. O segredo não é a ferramenta — é **o que você escreve nas instruções**. E é aí que entra o método.

## Passo a passo com o método P.R.O.M.P.T.E.R.
Não escreva as instruções no chute. Use as oito partes do [método P.R.O.M.P.T.E.R.](/blog/como-usar-ia-no-trabalho-peder):

1. **P — Papel:** quem é o assistente. "Você é um atendente de suporte da [empresa], experiente e cordial."
2. **R — Realidade (contexto):** o que ele precisa saber. Produto, política de troca, tom da marca, o que NÃO pode prometer.
3. **O — Objetivo:** o resultado de cada interação. "Resolver a dúvida do cliente em até 2 mensagens, ou encaminhar pro humano."
4. **M — Marcha (passo a passo):** como ele deve raciocinar. "Primeiro entenda o problema, depois consulte a política, só então responda."
5. **P — Proteção:** os limites. "Nunca invente prazo. Nunca dê desconto. Se não souber, diga que vai verificar."
6. **T — Texto de saída:** o formato. "Responda em até 4 linhas, tom gentil, sem jargão."
7. **E — Exemplos:** 2 ou 3 perguntas reais com a resposta ideal. Isso é o que mais melhora o resultado.
8. **R — Refino:** teste com casos reais e ajuste as instruções até acertar.

## Um exemplo pronto (copie e adapte)
Cole isto nas instruções de um GPT/Project/Gem e troque os colchetes:

> Você é o assistente de atendimento da [sua empresa], cordial e objetivo. **Contexto:** vendemos [produto]; nossa política de troca é [X]; nosso tom é [informal/formal]. **Objetivo:** resolver a dúvida do cliente em até 2 mensagens ou encaminhar pro humano. **Regras:** nunca invente prazos, preços ou políticas; se não tiver a informação, diga "vou verificar e te retorno". **Formato:** respostas de até 4 linhas, sem jargão, sempre terminando com uma pergunta que ajuda a avançar. **Exemplos:** [cole 2-3 perguntas reais de clientes e a resposta ideal].

Em 5 minutos você tem um atendente que responde no seu tom e dentro das suas regras — pronto pra usar e reusar.

## O próximo nível: de assistente a agente
O assistente **responde**. O **agente** age — ele usa ferramentas, acessa sistemas, executa tarefas de ponta a ponta. É pra lá que 2026 está indo. Mas vale o aviso de engenheiro: quanto mais autonomia você dá, mais importa revisar **o que ele pode fazer** — [dar acesso sem revisar a permissão é o erro de segurança da vez](/blog/agente-de-ia-sem-revisar-permissao-2026). Comece pelo assistente, domine, e suba o nível com critério.

## Conclusão
Você não precisa esperar virar programador pra surfar a onda dos agentes. Precisa de **uma tarefa repetitiva, um bom conjunto de instruções e método** pra escrevê-las. O assistente que você monta hoje já economiza tempo amanhã — e é o primeiro degrau pro resto.

> A ferramenta de montar é grátis. O que separa um assistente que funciona de um que decepciona são as instruções — e isso é método, não sorte.

Quer pular a parte de montar do zero? Eu já deixei [robôs de IA prontos](/robos) — assistentes especialistas pra copiar e usar — e o método completo está no e-book gratuito [**IA Sem Medo**](/materiais).

A decisão é sua.`,
  },
  {
    id: "comprar-ia-nao-deixa-empresa-produtiva-2026",
    slug: "comprar-ia-nao-deixa-empresa-produtiva-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Negócios"],
    publishedAt: "2026-06-21",
    coverUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    title: "Comprar IA não deixou sua empresa produtiva. Eis o porquê",
    excerpt:
      "A Bain mostrou: empresa que só compra IA colhe ganho 'micro'. O salto — 10 a 25% de EBITDA — vai pra quem muda processo E pessoas, não a ferramenta.",
    content: `Tem um número de uma consultoria que devia estar na mesa de todo dono de empresa que comprou IA esperando produtividade. A **Bain & Company** mediu o resultado real dessas adoções — e a conclusão incomoda: quem só adota a ferramenta colhe o que eles chamam de **"microprodutividade"**. Ganho pequeno, que some no balanço.

O salto de verdade vai pra quem fez **outra coisa junto**.

## O que a Bain achou
No estudo [Want More Out of Your AI Investments? Think People First](https://rhmagazine.pt/produtividade-com-ia-automatizar-nao-chega-o-bloqueio-esta-no-modelo-de-talento/) (março de 2026), os números separam dois grupos:

- Empresas que **alinham a modernização do processo com a das pessoas**: **10% a 15%** de ganho de produtividade, **10% a 25%** de aumento de EBITDA conforme o programa escala, e **2,3×** mais retorno ao acionista que as de baixo desempenho.
- Empresas que **só automatizam**: microprodutividade.

A frase da Bain é cirúrgica: **"o problema é organizacional"**. Falta a ponte entre modernizar o *fluxo de trabalho* e modernizar a *força de trabalho*. Automatizar sem reformar o trabalho, as competências e os times entrega só ganho "micro".

## O que isso revela
> A IA não é o gargalo da sua produtividade. O seu processo é.

Comprar a licença e entregar pra equipe usar do jeito que ela já trabalhava é como dar um carro de Fórmula 1 pra quem vai continuar dirigindo no trânsito de sempre. A máquina ficou melhor; o resultado, quase igual.

É a mesma lição que vale pra quem constrói: [a ferramenta virou commodity, o método não](/blog/ia-virou-infraestrutura-2026). Agora ela aparece no nível da empresa inteira.

## Por que a maioria trava
A sequência errada é quase sempre a mesma:

1. A empresa compra licenças de IA pra todo mundo.
2. Anuncia: "agora somos uma empresa de IA".
3. E... nada muda no **como** o trabalho é feito.

Mesmo processo, mesmas tarefas, mesma divisão de quem faz o quê — só que agora com um copiloto do lado. Cada pessoa economiza uns minutos no e-mail, e ninguém vê isso no resultado do trimestre. A ferramenta entrou; a empresa continuou igual.

## O que de fato muda a conta
A ferramenta é a parte fácil (e barata). O trabalho real é redesenhar em volta dela:

1. **Repense a tarefa, não só a ferramenta.** Pergunte "esse processo ainda precisa existir assim?" antes de "como a IA faz isso mais rápido?". Às vezes a etapa toda some.
2. **Capacite as pessoas de verdade.** Não é "liberamos o ChatGPT". É ensinar a pedir bem, revisar e decidir — [como usar IA no trabalho com método](/blog/como-usar-ia-no-trabalho-peder). Sem isso, a ferramenta vira brinquedo caro.
3. **Redesenhe o fluxo.** Quem faz o quê muda quando a IA assume parte do trabalho. Se o organograma não mexe, o ganho não aparece.
4. **Meça o que importa.** Produtividade de verdade aparece em entrega e margem — não em "quantos usaram a IA".
5. **Governe com segurança.** Dado de cliente, LGPD, o que pode e não pode entrar na ferramenta. Adoção sem governança vira o próximo incidente.

A IA não substitui o dono que pensa o negócio. Ela amplia quem [já tinha clareza do processo](/blog/erro-donos-de-empresa-ia-substitui-programadores) — e expõe quem não tinha.

## Conclusão
Comprar IA é o primeiro passo, e é o mais fácil. Ele te coloca no mesmo lugar que todo concorrente, que também comprou. O que separa quem teve 14% de produtividade de quem teve "micro" não está na ferramenta — está em **reorganizar a empresa em volta dela**: tarefa, pessoas, fluxo, medição.

> A IA virou commodity. A forma como você reorganiza a empresa em torno dela, não.

É exatamente esse trabalho — usar IA com método e segurança, do operacional ao estratégico — que eu detalho no e-book gratuito [**IA Sem Medo**](/materiais), com robôs prontos como o **Copiloto do CEO**. Comece por lá, ou pelos [robôs de IA gratuitos](/robos).

A decisão é sua.`,
  },
  {
    id: "claude-code-cursor-antigravity-qual-usar-2026",
    slug: "claude-code-cursor-antigravity-qual-usar-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-06-20",
    coverUrl:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    title: "Claude Code, Cursor ou Antigravity? Qual usar em 2026",
    excerpt:
      "As ferramentas de IA pra programar viraram agentes autônomos em 2026. Comparo Claude Code, Cursor e Antigravity — e explico por que a ferramenta é a sua menor decisão.",
    content: `Em 2026, a pergunta "qual editor eu uso pra programar?" virou outra coisa. Não é mais sobre autocompletar código mais rápido.

As ferramentas de IA pra programar — **Claude Code, Cursor, o novo Antigravity do Google**, Codex, Copilot, Windsurf — pararam de te ajudar a digitar e começaram a **construir sozinhas**: planejam, escrevem, testam e até verificam o resultado no navegador. O mercado dessas ferramentas saltou para **US$ 16 bilhões em 2026**, com projeção de **US$ 79 bilhões até 2031** ([comparativo de agentes de código](https://ssojet.com/blog/ai-coding-agents-compared)). Se você constrói com IA, vale entender o que mudou — e o que escolher.

## O que mudou em 2026
A geração anterior era **autocomplete e chat** dentro do editor. A de agora é **agente autônomo de desenvolvimento**: você descreve o objetivo e o agente planeja, escreve em vários arquivos, roda, testa e corrige.

- O Google lançou o **Antigravity** (com o time que criou o Windsurf): um IDE inteiro construído em torno de agentes, com **navegador embutido** pra verificar visualmente o que foi feito. A versão 2.0 virou uma plataforma de orquestração multi-agente.
- O **Claude Code** roda no terminal com acesso ao seu sistema de arquivos, shell e git — forte em raciocínio sobre vários arquivos.
- O **Cursor** turbinou a edição do dia a dia (autocomplete, Tab, mudanças inline).

O resumo: a IA deixou de ser a caneta e virou a mão.

## Um mapa rápido (sem tribalismo)
Cada uma brilha num uso. Sem religião:

- **Cursor** — edição do dia a dia, pra quem vive dentro do editor.
- **Claude Code** — tarefas complexas, multi-arquivo, no terminal, com acesso total ao projeto.
- **Antigravity** — tarefas autônomas de ponta a ponta: o agente planeja, coda, testa e verifica no navegador. Grátis em preview.
- **Open source (Aider, Cline, OpenCode)** — você paga só os tokens do modelo; mais controle e custo previsível.

A maioria das pagas começa em **~US$ 20/mês**, e dá pra migrar de uma pra outra em um dia. Guarde isso — é importante pro próximo ponto.

## A virada que de fato importa
Quando o agente planeja, escreve, testa e ainda verifica sozinho, o **gargalo deixa de ser digitar código**. A parte escassa passa a ser duas:

1. **Saber o que construir** — spec, arquitetura, a decisão certa.
2. **Verificar se está certo e seguro** — porque a ferramenta cospe um sistema inteiro em horas, **incluindo os erros, na mesma velocidade**.

> Quanto mais autônoma a ferramenta, mais cara fica a sua falta de critério.

Já vi gente achar que trocar de IDE ia resolver a produtividade. Não resolve. A ferramenta acelera o que você já sabe fazer — e acelera também o desastre, se você não souber.

## Por isso a ferramenta é a sua MENOR decisão
Todas as principais são boas. Trocar custa um dia. O que **compõe valor ao longo do tempo** não é o editor — é o método: especificar antes, revisar depois, blindar a segurança.

É a diferença entre [virar o arquiteto e auditor da própria IA](/blog/ia-escreve-codigo-humano-virou-arquiteto-2026) e virar refém de um [agente que você nem revisou o que pode fazer](/blog/agente-de-ia-sem-revisar-permissao-2026). A ferramenta muda a cada seis meses; o método compõe a vida inteira.

## O que eu recomendo na prática
1. **Pega UMA e domina.** Trocar de brinquedo toda semana é fuga disfarçada de produtividade. Se está começando, comece simples; se já programa, Claude Code ou Cursor resolvem 90% dos casos.
2. **Aplica método no que o agente entrega.** Rode o [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas) — Entender, Ler, Blindar, Testar, Versionar — em tudo que a IA gerar. Autonomia não dispensa revisão; exige mais.
3. **Do zero?** [Configure o básico primeiro](/blog/configurar-vscode-copilot-primeiro-sistema) antes de soltar um agente autônomo no seu projeto.

## Conclusão
A ferramenta ficou dez vezes mais poderosa. A sua responsabilidade também. Escolher entre Claude Code, Cursor e Antigravity é uma decisão de uma tarde — e qualquer uma delas é uma boa escolha. O que separa quem constrói coisa séria de quem só faz demo bonita não está no editor.

> Em 2026, a melhor ferramenta de IA pra programar é a que você domina **com método**. O resto é detalhe.

Quer construir com qualquer uma dessas sem virar estatística de bug em produção? O método completo está no e-book gratuito [**IA Sem Medo**](/materiais), e dá pra começar pelos [robôs de IA gratuitos](/robos).

A decisão é sua.`,
  },
  {
    id: "observabilidade-e-o-produto-falha-silenciosa-ia-2026",
    slug: "observabilidade-e-o-produto-falha-silenciosa-ia-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-06-19",
    coverUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    title: "Num produto de IA, a observabilidade é parte do produto",
    excerpt:
      "Lancei um corretor automático por IA, validei com +1.280 usos — e um bug invisível me ensinou que, em IA, robustez e observabilidade são o produto, não detalhe técnico.",
    content: `Noventa e seis pessoas usaram um produto meu, esperaram a resposta e nunca receberam. O pior: por um tempo, **eu também não sabia disso**. Elas enviaram o trabalho, a tela disse "processando", e a correção simplesmente nunca chegou. Sem erro vermelho, sem alerta, sem reclamação imediata.

Uma falha silenciosa — o tipo mais perigoso num produto de IA. E foi ela que me ensinou a lição mais valiosa de tudo o que construí.

## A aposta que eu precisava validar
Eu tinha lançado uma plataforma de IA para preparação de uma prova profissional de alto risco, com **correção automática** de questões e peças discursivas. A aposta arriscada não era "as pessoas querem estudar para essa prova" — isso eu já sabia. Era outra, bem mais perigosa:

> A IA consegue corrigir uma resposta discursiva com qualidade boa o bastante pra ser realmente útil ao aluno — e na hora?

Correção humana desse tipo é cara, lenta e não escala. Se a IA entregasse um **feedback estruturado** (nota + análise por critério) em segundos, isso mudaria a economia inteira do produto. Mas só se a correção fosse confiável.

## Como validei sem construir tudo
Não construí a plataforma inteira. Fiz um **MVP enxuto**, focado no fluxo central: o aluno envia o treino, a IA corrige, ele recebe o feedback na hora. Coloquei na frente de usuários reais o quanto antes e medi só duas coisas:

- Eles **voltavam** para fazer de novo? (sinal de utilidade real, não novidade)
- A correção era **confiável**?

Validar a aposta mais arriscada primeiro, com o mínimo de código, é o oposto de gastar três meses construindo tudo para só então descobrir se a premissa se sustenta.

## O que funcionou
- **Mais de 1.280 treinos corrigidos** com feedback automático, e gente voltando para fazer mais.
- A validação mais forte veio do **B2B**: uma universidade adotou a plataforma e rodou um **simulado oficial com 845 alunos**. Não era interesse individual — uma instituição confiou no produto.

No papel, validação concluída. A IA corrigia bem, as pessoas voltavam, uma instituição apostou. Foi aí que o problema apareceu.

## O erro que me ensinou a lição
No meio da operação, descobri as **96 correções que falharam silenciosamente**. As causas eram técnicas e banais: créditos da IA esgotados em um pico e **race conditions** quando várias correções aconteciam ao mesmo tempo. O usuário enviava, o sistema engasgava, e ninguém era avisado — nem ele, nem eu.

Numa aplicação comum, um erro costuma ser barulhento: a tela trava, aparece um vermelho, a pessoa reclama. Num produto de IA, a falha tende a ser **silenciosa**: a chamada externa falhou, o saldo acabou, duas requisições colidiram — e o resultado é "nada acontece". O pior estado possível, porque ninguém percebe até ser tarde.

## A lição: num produto de IA, robustez e observabilidade SÃO o produto
Quando o seu produto é uma resposta gerada por IA, você não está entregando "uma resposta". Está entregando a **confiança de que ela chega, certa, sempre**.

Eu tratava a robustez da correção como detalhe técnico — algo pra arrumar depois. Errado. Para o aluno que enviou e não recebeu, a qualidade do modelo é irrelevante: o produto simplesmente não funcionou. A confiabilidade e a capacidade de **enxergar** o que está acontecendo não são infraestrutura por baixo do produto. Elas **são** o produto.

> A funcionalidade que entrega 95% das vezes não é um produto de IA bom. É um protótipo perigoso. O que separa demo de produto é o que acontece nos 5% que falham.

## O que passei a fazer (e o que você deveria)
1. **Taxa de sucesso da correção virou métrica de produto**, não de infra. Se ela cai, é um problema de negócio.
2. **Idempotência e retries** nas chamadas de IA — pra sobreviver a timeout, pico e race condition sem duplicar nem perder.
3. **Alertas** quando saldo, fila ou taxa de erro saem da faixa. Eu quero saber antes do usuário.
4. **Reprocessamento:** detectei as 96, reprocessei e entreguei o feedback atrasado. Recuperar é parte do trabalho.
5. **Observabilidade desde o início** — é a camada "saber quando quebra em produção", a mesma lógica de [revisar antes de confiar](/blog/protocolo-de-5-camadas) e de [auditar o que a IA faz sozinha](/blog/agente-de-ia-sem-revisar-permissao-2026).

## Conclusão
A parte difícil de um produto de IA não é fazer a IA responder bem uma vez, na demo. É garantir que ela responde **toda vez** — e que, quando não responder, você descobre na hora, não pelo cliente irritado uma semana depois.

> Num produto de IA, a resposta certa é metade do trabalho. A outra metade é garantir que ela sempre chega — e saber, na hora, quando não chegou.

É exatamente isso que eu chamo de **vibecoding com engenharia**: a velocidade de construir com IA, com o rigor de quem trata produção a sério. O método completo está no e-book gratuito [**IA Sem Medo**](/materiais), e dá pra começar pelos [robôs de IA gratuitos](/robos).

A decisão é sua.`,
  },
  {
    id: "agente-de-ia-sem-revisar-permissao-2026",
    slug: "agente-de-ia-sem-revisar-permissao-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Segurança"],
    publishedAt: "2026-06-18",
    coverUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    title: "Você soltou um agente de IA sem revisar o que ele pode",
    excerpt:
      "88% das empresas já tiveram incidente com agente de IA, mas só 14% subiram com aval de segurança. O que esse abismo ensina pra quem constrói com IA.",
    content: `Um número de um relatório novo devia tirar o sono de quem constrói com IA em 2026: **88% das empresas já tiveram — ou suspeitam ter tido — um incidente de segurança com agentes de IA** no último ano.

E o detalhe que explica tudo: **80,9% já colocaram agentes em teste ou produção, mas só 14,4% subiram com aprovação completa de segurança.** A pressa de dar autonomia à IA passou na frente da pergunta "isso é seguro?".

## O que está acontecendo
Os dados são do relatório [State of AI Agent Security 2026](https://www.gravitee.io/blog/state-of-ai-agent-security-2026-report-when-adoption-outpaces-control) (Gravitee, com mais de 900 executivos e técnicos). Além do 88%:

- **45,6%** usam a **mesma chave de API compartilhada** para autenticar um agente com o outro.
- **Mais de 50%** dos agentes operam **sem monitoramento ou log** de segurança.
- Só **21,9%** tratam o agente como uma identidade própria (com permissões próprias).

E não é cenário hipotético. Em 2025 a Anthropic detectou um grupo estatal (GTG-1002) que **sequestrou instâncias do Claude Code** para rodar espionagem cibernética **autônoma** contra cerca de 30 alvos. A IA tocou **80–90% das operações sozinha**, achando e explorando falhas a milhares de requisições por segundo. Foi o primeiro ataque documentado rodado, em escala, quase sem humano no comando.

Enquanto isso, o mercado só acelera: a conversa do setor virou "qual parte da minha empresa eu transformo em agente primeiro?".

## O que isso revela
Junte as duas pontas — todo mundo dando autonomia, quase ninguém revisando — e a lição salta:

> Um agente que age sozinho não é mágica. É uma permissão que **você** concedeu.

Quando você dá a um agente acesso ao código, ao banco, às chaves e às APIs, você está **concedendo privilégios**. Sem mínimo necessário, sem revisão e sem log, isso é uma escalada de privilégio esperando acontecer — do seu lado, por um erro do agente, ou do lado de quem sequestrar esse agente.

## Por que isso é a sua realidade no vibecoding
Você talvez não rode uma frota de agentes corporativos. Mas, construindo com IA, você faz a versão pessoal disso o tempo todo:

- Dá ao agente (Claude Code e afins) acesso **total** ao repositório, ao deploy e ao banco — porque é mais rápido.
- Usa **a mesma chave pra tudo** (os tais 45,6%). Uma vaza, vazou tudo.
- Não tem **log** do que o agente fez (os mais de 50%). Se der ruim, você não sabe nem o que aconteceu.
- Subiu sem perguntar **"o que esse agente pode fazer de pior?"** (os 85,6% sem aval de segurança).

É o mesmo erro de [subir com o banco de dados aberto](/blog/ia-deixa-banco-aberto-incidentes-2026) — só que agora o banco tem um agente com a chave na mão.

## Como construir com agentes sem virar estatística
A defesa é a de sempre — só que aplicada ao que o agente **pode** fazer, não só ao que ele fez:

1. **Mínimo necessário (least privilege).** Dê ao agente acesso só ao que a tarefa exige, nada além. É a camada "Blindar" do [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas).
2. **Uma chave por agente, não uma chave pra tudo.** Credencial separada e revogável — o oposto de [reusar segredo em todo lugar](/blog/nunca-vaze-uma-senha-variaveis-de-ambiente-gitignore).
3. **Humano no loop para ação crítica.** Deletar, mexer em produção, mover dinheiro → exige confirmação. Autonomia não é cheque em branco.
4. **Log e observabilidade.** Registre o que o agente fez. Sem isso, você é cego quando o incidente chega.
5. **Revise a permissão, não só o resultado.** Antes de soltar, pergunte: "qual o pior que ele consegue fazer com esse acesso?". Essa é a mentalidade de [virar o auditor de segurança da própria IA](/blog/ia-escreve-codigo-humano-virou-arquiteto-2026).

## Conclusão
A pergunta de 2026 deixou de ser "a IA consegue fazer sozinha?" — ela consegue. Virou **"o que ela pode fazer sozinha, e quem autorizou isso?"**. Dar autonomia sem revisar a permissão é o novo subir com o banco aberto: funciona lindamente, até alguém — ou outro agente — perceber.

> Autonomia sem mínimo necessário não é produtividade. É um incidente agendado.

Quer construir com IA e agentes sem deixar essa porta aberta? O método de blindar cada etapa está no e-book gratuito [**IA Sem Medo**](/materiais), com prompts prontos — e dá pra começar pelos [robôs de IA gratuitos](/robos).

A decisão é sua.`,
  },
  {
    id: "ia-escreve-codigo-humano-virou-arquiteto-2026",
    slug: "ia-escreve-codigo-humano-virou-arquiteto-2026",
    contentVersion: 1,
    status: "published",
    tags: ["IA & Carreira"],
    publishedAt: "2026-06-17",
    coverUrl:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    title: "A IA escreve 90% do código da Anthropic. E o humano?",
    excerpt:
      "A Anthropic confirma: mais de 90% do código dos modelos novos é escrito por IA. O cargo humano não sumiu — subiu pra arquiteto e revisor. O que isso muda pra você.",
    content: `A Anthropic — a empresa que faz o Claude — confirmou um número que assusta quem lê rápido e anima quem lê com atenção: **mais de 90% do código dos seus modelos novos já é escrito por IA**, não por humanos.

O CEO, Dario Amodei, chamou isso de "transição de fase". O desenvolvimento interno deixou de girar em torno de gente digitando código. A IA virou a desenvolvedora principal. E os humanos? Subiram de cargo: viraram **arquitetos de alto nível e auditores de segurança**.

Guarda essa última frase. É o post inteiro.

## O que aconteceu
A confirmação veio do próprio CEO da Anthropic e foi reforçada nas notícias de junho ([cobertura aqui](https://markets.financialcontent.com/woonsocketcall/article/tokenring-2026-1-13-90-of-claudes-code-is-now-ai-written-anthropic-ceo-confirms-historic-shift-in-software-development)). No mesmo período, a empresa lançou o **Claude Opus 4.8**, descrito como seu modelo de programação mais capaz, e uma camada de orquestração de agentes ([Dynamic Workflows](https://aimagazine.com/news/anthropics-claude-code-is-changing-enterprise-workflows)).

E não é só a Anthropic. Na **Microsoft Build 2026**, a conversa do setor virou de "agentes de IA são reais?" para "**qual parte da minha empresa vira agente primeiro?**". O GitHub passou a tratar o agente de código como algo que gera, depura, refatora e ajuda a corrigir falhas de segurança — sozinho.

O recado, somando tudo: escrever código deixou de ser a parte escassa. A máquina faz, rápido e em volume.

## O que isso revela
A leitura preguiçosa é "pronto, programador acabou". Está errada.

Olha de novo o que os humanos da Anthropic foram fazer: **arquitetura e auditoria de segurança.** Eles não saíram do processo. Saíram da digitação e foram pra parte que decide se o sistema presta.

> A IA assumiu o "como escrever". O humano ficou com o "o quê construir", o "por que assim" e o "isso está seguro?".

Isso não é o fim do trabalho técnico. É a migração dele pra cima — pra camada onde julgamento vale mais que velocidade de digitação.

## Por que essa é a melhor notícia pra quem tem método
Aqui está o ponto que quase ninguém fala. Se a IA escreve o código pra todo mundo — pro engenheiro da Anthropic e pro vibecoder de primeira viagem —, então **digitar código parou de ser o diferencial.** O que separa um resultado do outro é o que sobra:

- **Saber o que pedir.** Arquitetar a solução antes de mandar a IA codar. Um plano ruim gera código bonito e inútil.
- **Saber revisar.** Aceitar tudo que a máquina cospe é confundir velocidade com competência. Auditar é o novo trabalho.
- **Saber blindar.** Justo a função que a Anthropic deu aos humanos: auditor de segurança. [Ontem mesmo escrevi por que a defesa que mora no prompt não é defesa](/blog/seguranca-no-prompt-nao-e-seguranca-2026) — alguém precisa olhar isso, e esse alguém é você.
- **Saber decidir** o que faz sentido no mundo real. A máquina não tem essa parte.

É literalmente a definição de [vibecoding com engenharia](/blog/vibecoding-com-engenharia): a IA constrói, você dirige e responde pelo resultado. A maior empresa de IA do planeta organizou o trabalho dela exatamente assim. Não é teoria minha — é o estado da arte.

## O que muda na prática pra você
Se você constrói com IA (ou quer começar), pare de se medir pela coisa errada.

1. **Não se orgulhe de "quantas linhas a IA gerou".** Orgulhe-se de quão bem você revisou o que ela gerou.
2. **Planeje antes de pedir.** Decida arquitetura, telas e dados primeiro. O código é a última etapa, não a primeira.
3. **Trate revisão como o trabalho, não como burocracia.** Use um método — o [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas): Entender, Ler, Blindar, Testar, Versionar.
4. **Assuma o chapéu de auditor de segurança.** Banco fechado, segredo fora do código, validação no servidor. Se a Anthropic colocou humano nessa função, é porque ela não é opcional.

O medo de que "a IA vai substituir o programador" mira no lugar errado. [Já falei sobre isso](/blog/erro-donos-de-empresa-ia-substitui-programadores): a IA não substitui quem constrói com método. Ela substitui quem só sabia digitar e parou de aprender.

## Conclusão
A IA escrever 90% do código não é o fim do humano técnico. É a promoção dele — de digitador a arquiteto e auditor. O detalhe incômodo é que promoção exige competência nova. Quem desenvolve o olho de arquiteto e o rigor de auditor sobe junto com a maré. Quem só queria que a IA "fizesse tudo" fica pra trás, agora com código que ninguém revisou.

> A ferramenta ficou igual pra todo mundo. O método, não.

Quer construir já no papel de arquiteto — com plano, revisão e segurança em cada etapa? Está tudo no e-book gratuito [**IA Sem Medo**](/materiais), com prompts prontos pra cada fase. Ou comece pelos [robôs de IA gratuitos](/robos).

A decisão é sua.`,
  },
  {
    id: "seguranca-no-prompt-nao-e-seguranca-2026",
    slug: "seguranca-no-prompt-nao-e-seguranca-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Segurança"],
    publishedAt: "2026-06-16",
    coverUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    title: "Se a segurança mora no prompt, não é segurança",
    excerpt:
      "O system prompt de uma IA de ponta vazou no GitHub e revelou que a defesa era só texto. A lição pra quem constrói com IA: trava de verdade mora em camadas.",
    content: `Dia 10 de junho, um pesquisador anunciou que tinha furado as defesas do **Fable 5**, um dos modelos de IA mais avançados do mundo. Dois dias depois, o governo dos EUA tirou o modelo do ar. Aí veio a parte que interessa pra quem constrói com IA: o **system prompt completo do modelo vazou no GitHub** — cerca de **120 mil caracteres**.

Lendo aquilo, a comunidade descobriu algo desconfortável. Boa parte da segurança do modelo era texto. Instruções em linguagem natural pedindo pra ele se comportar.

## O que aconteceu
A linha do tempo, segundo o [resumo de notícias de IA do dia](https://www.buildfastwithai.com/blogs/ai-news-today-june-15-2026):

- **10/06** — o pesquisador "Pliny the Liberator" divulga um jailbreak: um ataque coordenado com vários agentes, truques de caracteres Unicode pra driblar filtros e uma técnica de "decompor e recompor" (perguntas inofensivas isoladas, montadas depois numa resposta perigosa).
- **12/06** — o governo dos EUA derruba o Fable 5 globalmente com uma ordem de controle de exportação.
- **Na sequência** — vaza o system prompt inteiro, ~120 mil caracteres. É o primeiro vazamento integral de um prompt de segurança de um modelo desse porte.

E a frase da análise técnica que vale o post inteiro:

> "A arquitetura de segurança depende fortemente de instruções em linguagem natural embutidas no system prompt, em vez de lógica de recusa codificada no modelo."

Traduzindo: a defesa era um texto longo pedindo "não faça isso". Quando o texto vazou, o atacante ganhou o mapa.

## O que isso revela
Instrução não é trava.

Pedir educadamente pra um sistema não fazer algo não é o mesmo que **impedir** que ele faça. Quando a sua defesa é texto, ela carrega duas fraquezas de nascença:

1. **Pode ser contornada** — é só achar a frase certa, o caractere certo, o caminho que a instrução não previu.
2. **Pode vazar** — e quando vaza, deixa de ser defesa e vira manual de ataque.

Um laboratório bilionário, com os melhores times de segurança do mundo, tropeçou nisso. A lição não é "a IA é insegura". É **onde** a segurança estava.

## Por que isso é a sua realidade no vibecoding
Você não treina modelos de fronteira. Mas comete o mesmo erro, em escala menor, o tempo todo — principalmente construindo rápido com IA:

- **"Validei no front."** A regra que impede o usuário de mandar lixo está só no navegador. E o navegador é do usuário.
- **A chave de API "escondida" no código do cliente.** Ela está no bundle. O F12 acha em segundos.
- **Confiar que a API só vai ser chamada "do jeito certo".** Quem te garante? O cliente faz a chamada que quiser.
- **A regra de "quem pode ver o quê" na lógica da tela**, não no banco.

Tudo isso é segurança que mora no prompt: **instrução, não trava.** Funciona lindamente — até alguém abrir o capô.

## Onde a segurança mora de verdade
A regra é antiga e a notícia só reforçou: **o que protege é o que roda no servidor, onde o usuário não alcança.** O cliente pede; o servidor decide.

- **Banco fechado por regra.** Não importa o que o código do cliente tente — o servidor recusa o que a regra não permite. Isso é trava, não instrução. É o oposto do erro que já [derrubou apps inteiros com o banco aberto](/blog/ia-deixa-banco-aberto-incidentes-2026).
- **Segredos fora do código.** Chave de API vive no servidor, nunca no bundle. [O passo a passo está aqui](/blog/nunca-vaze-uma-senha-variaveis-de-ambiente-gitignore).
- **Validação no servidor, sempre.** A do front é conveniência pro usuário, não defesa.
- **Revisão com método.** Antes de aceitar o que a IA escreveu, passe pelo [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas) — Entender, Ler, **Blindar**, Testar, Versionar. "Blindar" é exatamente perguntar: essa proteção é trava ou é só texto?

Um teste rápido pra qualquer defesa que você escrever: **se ela pode ser lida, copiada ou contornada com jeitinho a partir do navegador, ela não é segurança.** É pedido.

## A janela encolheu
Tem um agravante de 2026. Com IA dos dois lados — a que constrói e a que ataca —, o tempo entre "subi inseguro" e "fui encontrado" caiu de meses para minutos. [A semana em que a IA virou caçadora de falhas](/blog/ia-caca-falhas-codigo-semana-2026) mostrou isso na prática. Não dá mais pra contar com "provavelmente ninguém vai notar". Uma IA nota. Automaticamente. Em escala.

E isso importa agora porque construir com IA deixou de ser nicho: metade das empresas já usa ferramentas de IA pra programar, contra um quarto um ano atrás. Mais gente construindo rápido é mais gente subindo defesa de texto pra produção.

## Conclusão
O Fable 5 não caiu porque a IA é burra. Caiu porque a defesa estava no lugar errado — num texto que podia ser lido e contornado. O seu app cai pelo mesmo motivo quando a trava mora no cliente, no prompt, na boa vontade do usuário.

> Se a defesa pode ser lida, copiada ou pedida com jeitinho, ela é instrução — não segurança. A trava de verdade mora onde o usuário não chega: no servidor.

Quer o método completo pra blindar cada etapa — banco, segredos, deploy — com prompts prontos? Está no e-book gratuito [**IA Sem Medo**](/materiais), e dá pra começar agora pelos [robôs de IA gratuitos](/robos).

A decisão é sua.`,
  },
  {
    id: "ia-caca-falhas-codigo-semana-2026",
    slug: "ia-caca-falhas-codigo-semana-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Segurança"],
    publishedAt: "2026-06-15",
    coverUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    title: "A IA agora caça (e explora) falhas no seu código — a semana que provou isso",
    excerpt:
      "Esta semana, uma IA capaz de achar e explorar vulnerabilidades fez o governo dos EUA reagir, e a Microsoft bateu recorde de falhas corrigidas. O que isso muda pra quem constrói com IA.",
    content: `Esta semana o jogo da segurança mudou de patamar — e quem constrói software com IA precisa entender por quê.

A Anthropic liberou um preview de modelo (o **Claude Mythos**) **capaz de encontrar e explorar vulnerabilidades de software sozinho**. O impacto foi tão grande que o governo dos EUA reagiu com **restrição de exportação e de acesso**. No mesmo período, o **Patch Tuesday da Microsoft** bateu um recorde sombrio: **206 vulnerabilidades** corrigidas de uma vez, incluindo seis "zero-days" já sendo explorados por um grupo de ataque. E, na sua conferência de desenvolvedores, a Microsoft dedicou o palco a uma ideia só: **proteger código, agentes e modelos ao longo de todo o ciclo de desenvolvimento.**

Junte as três notícias e o recado é um só.

## A IA que escreve o seu código agora também acha os buracos dele
Por anos, achar uma falha de segurança exigia um especialista humano, horas de trabalho e conhecimento raro. Isso está virando commodity. Se um modelo consegue **varrer um sistema e apontar (ou explorar) a brecha** em minutos, duas coisas acontecem ao mesmo tempo:

1. **Você** ganha uma ferramenta poderosa pra se proteger.
2. **O atacante** ganha a mesma ferramenta pra te invadir — e ele não dorme.

> Antes, código inseguro era uma bomba-relógio. Agora é um alvo que se anuncia sozinho.

## Por que isso atinge em cheio o vibecoding
Código gerado por IA já tem mais vulnerabilidades que o humano. Some a isso uma legião de pessoas subindo pra produção o que a IA cuspiu, sem ler. O que antes era "provavelmente ninguém vai notar" virou **"uma IA de ataque vai notar, automaticamente, em escala"**.

A janela entre "subi inseguro" e "fui encontrado" encolheu de meses para minutos.

## O que fazer (não é medo, é método)
A defesa não mudou — ela só ficou **obrigatória**. O básico que resolve a maioria dos casos:

1. **Revise antes de aceitar.** Use um agente revisor e o [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas): Entender, Ler, Blindar, Testar, Versionar.
2. **Feche o banco e os segredos.** Regras de Firestore publicadas, chaves fora do Git. [O passo a passo aqui](/blog/nunca-vaze-uma-senha-variaveis-de-ambiente-gitignore).
3. **Use a IA a seu favor.** A mesma capacidade que assusta é a sua melhor auditora: peça pra ela caçar as próprias falhas antes de você subir.
4. **Trave as dependências.** O ataque não vem só do seu código — vem do que você instalou.

## A virada de chave
A segurança parou de ser "boa prática de quem tem tempo". Com IA dos dois lados — a que constrói e a que ataca —, **operar com rigor de engenheiro virou o piso, não o teto.** Quem trata a IA como júnior brilhante (que se revisa) sai na frente. Quem trata como oráculo (que se aceita) vira manchete.

A decisão de revisar é sua. Em 2026, ela ficou muito mais barata que o vazamento.

## Quer o método completo?
No e-book gratuito **"Vibecoding para CEOs"** eu detalho como blindar cada etapa — banco, segredos, deploy — com 22 prompts prontos, incluindo o **Revisor de Código & Segurança**.

[**→ Baixe o e-book gratuito aqui**](/materiais) ou comece pelos [robôs de IA gratuitos](/robos).`,
  },
  {
    id: "ia-virou-infraestrutura-2026",
    slug: "ia-virou-infraestrutura-2026",
    contentVersion: 1,
    status: "published",
    tags: ["IA & Carreira"],
    publishedAt: "2026-06-15",
    coverUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    title: "Acabou o deslumbramento: 2026 é o ano em que a IA virou infraestrutura",
    excerpt:
      "Os analistas marcam a virada do hype pro pragmático — IA saindo das demos e entrando no fluxo de trabalho real. Por que isso é ótimo pra quem tem método (e ruim pra quem só tem a ferramenta).",
    content: `Tem uma frase circulando entre os analistas de tecnologia neste mês, e ela resume bem onde a gente chegou: **a IA deixou de ser "ferramenta" e virou "infraestrutura".**

Traduzindo: acabou a fase das demos futuristas que impressionam no palco e somem na segunda-feira. 2026 é o ano em que a IA entra no **fluxo de trabalho real** — automatizando processo, influenciando decisão, cortando custo. Menos espetáculo, mais resultado mensurável.

E não é só discurso. Olha a semana: a Anthropic lançou novos modelos de ponta, a Microsoft apresentou uma família inteira de modelos próprios, o Google soltou tradução de voz ao vivo em mais de 70 idiomas, e a Casa Branca publicou uma ordem executiva sobre inovação **e segurança** em IA. Modelo virou commodity. Tem pra todo lado.

## E é exatamente aí que mora a boa notícia
Quando **todo mundo** tem acesso à mesma IA, a ferramenta para de ser o diferencial.

Pensa comigo: se a IA é luz elétrica, ter luz não te diferencia de ninguém — todo concorrente também acendeu. O que diferencia é **o que você constrói com ela, e como.**

> A IA virou commodity. O seu método não.

## O diferencial migrou da ferramenta pro operador
Eu vejo isso todo dia rodando empresas com IA. Duas pessoas com a **mesma** ferramenta entregam resultados a anos-luz de distância. A diferença nunca está no modelo. Está em:

- **Saber pedir** — um bom prompt vale por dez tentativas no escuro.
- **Saber revisar** — aceitar tudo o que a máquina cospe é confundir velocidade com competência.
- **Saber proteger** — justamente porque a IA virou infraestrutura, a segurança virou parte da conta. [A semana provou isso](/blog/ia-caca-falhas-codigo-semana-2026).
- **Saber decidir** o que faz sentido no mundo real. Isso a máquina não tem.

Isso é método. E método não vem de fábrica com o modelo — se aprende.

## Por que "infraestrutura" muda a sua cabeça
Quando algo é ferramenta, você usa de vez em quando. Quando é infraestrutura, você **depende** dela — e depender de algo que você não entende é perigoso. Ninguém constrói um prédio sobre uma fundação que não inspecionou.

Por isso o discurso de "qualquer um faz com IA" é meia verdade. Qualquer um **começa**. Quem termina com algo que funciona, é seguro e escala é quem trata a IA com rigor de engenheiro.

## A conclusão sem hype
Não acredito em bala de prata e não vou te dizer que a IA vai resolver sua vida. Vou dizer o contrário do que o hype diz: **agora que a ferramenta é de todos, o seu valor está no que ela nunca te deu de graça — julgamento, método e responsabilidade.**

A decisão de operar com rigor é sua. E, em 2026, ela vale mais do que escolher entre o modelo A ou B.

## Comece pelo método
Quer dar o primeiro passo no caminho certo? O método P.R.O.M.P.T.E.R. está no e-book gratuito **"IA Sem Medo"** — junto de um plano de 7 dias e mais de 130 prompts prontos.

[**→ Baixe de graça aqui**](/materiais) ou veja [como eu penso sobre isso](/blog/manifesto).`,
  },
  {
    id: "ia-deixa-banco-aberto-incidentes-2026",
    slug: "ia-deixa-banco-aberto-incidentes-2026",
    contentVersion: 1,
    status: "published",
    tags: ["Segurança"],
    publishedAt: "2026-06-11",
    coverUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    title: "A IA deixa seu banco de dados aberto por padrão — e 2026 está cheio de provas",
    excerpt:
      "Os vazamentos de sistemas feitos com IA em 2026 têm um padrão: a IA monta tudo com a porta destrancada. Os casos reais, os números — e o método para não ser o próximo.",
    content: `Em fevereiro de 2026, o **Moltbook** — uma rede social para agentes de IA, construída 100% com vibecoding — deixou o banco de dados com **leitura e escrita públicas**. Qualquer pessoa na internet podia ler e alterar tudo.

O detalhe que importa: ninguém "errou" digitando. A IA criou o banco com permissões abertas durante o desenvolvimento — o padrão dela — e o sistema foi para produção **exatamente do jeito que estava**. Ninguém trocou a fechadura antes de abrir a porta ao público.

Eu quase fiz o mesmo. No meu próprio site, as regras de segurança do banco só valem depois de um passo separado: publicá-las. Escrever a regra no arquivo não basta. Por um momento, o formulário "funcionava na tela" — e "funcionar na tela" não é "estar seguro".

## Não é azar. É padrão.
Os números de 2026 são desconfortáveis:

- A Georgia Tech criou um "Vibe Security Radar" que atribui falhas (CVEs) a código feito com IA. Em **janeiro de 2026 foram 6**. Em **março, 35** — quase 6x em dois meses.
- Commits feitos com auxílio de IA **expõem segredos (senhas, chaves) 2x mais** que os escritos por humanos: 3,2% contra 1,5%.
- Uma pesquisa do início de 2026 confirmou: **24,7% do código gerado por IA tem ao menos uma falha de segurança**. A Georgetown (CSET) encontrou falha de XSS em **86% das amostras** testadas em cinco modelos diferentes.
- A Tenzai testou cinco agentes de IA de programação no fim de 2025. **Todos os cinco** introduziram a mesma falha (SSRF) no mesmo tipo de funcionalidade. Não é "um modelo ruim" — é o comportamento da categoria.

## Por que a IA faz isso
A IA otimiza para uma única coisa: **fazer funcionar**. E "seguro" não é a mesma coisa que "funcional" — ela pega o caminho mais curto até a tela funcionando. Banco aberto funciona. Chave no código funciona. Dependência desatualizada funciona. Até o dia em que não funciona mais — e aí já virou vazamento.

> A IA é um júnior brilhante e veloz. Não é um oráculo. Você não entrega produção a um júnior sem revisar.

E tem o vetor que quase ninguém olha: a **cadeia de suprimentos**. Em março de 2026, invasores assumiram a conta de um mantenedor e injetaram código malicioso em atualizações **oficiais** do Axios — uma biblioteca que milhões de projetos usam. Você não escreveu o bug; você o **instalou**.

## O método (não é medo, é engenharia)
A boa notícia: dá para ter a velocidade da IA sem herdar os riscos. O básico que resolve a maioria dos casos:

1. **Banco com regras — e publicadas.** Escreva as regras de segurança antes de ir ao ar e confirme que estão ativas. [Como configurar o Firebase do zero](/blog/conectar-banco-de-dados-firebase-sem-medo).
2. **Nunca suba segredos.** Chaves e senhas ficam em variáveis de ambiente, fora do GitHub. [O passo a passo aqui](/blog/nunca-vaze-uma-senha-variaveis-de-ambiente-gitignore).
3. **Revise antes de aceitar.** Use um agente revisor e o [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas): Entender, Ler, Blindar, Testar e Versionar.
4. **Trave e revise as dependências.** Fixe as versões e desconfie de updates automáticos em bibliotecas críticas.
5. **Repositório privado.** É grátis no GitHub e fecha uma porta inteira de uma vez.

## A parte que ninguém vai fazer por você
A IA não vai te avisar que deixou a porta aberta. Ela vai dizer "pronto, está funcionando" — e estará falando a verdade. A fechadura é com você.

Isso é vibecoding com engenharia: a velocidade da máquina **com** a desconfiança saudável de quem já viu sistema vazar. A decisão de revisar é sua — e, em 2026, ela ficou muito mais barata que o vazamento.

## Quer o método completo?
No e-book gratuito **"Vibecoding para CEOs"** eu detalho como blindar cada etapa — banco, segredos, deploy — com 22 prompts prontos (incluindo o **Revisor de Código & Segurança**, que audita o que a IA escreveu antes de você confiar).

[**→ Baixe o e-book gratuito aqui**](/materiais) ou comece pelos [robôs de IA gratuitos](/robos).`,
  },
  {
    id: "qual-ia-usar-2026-modelos-empataram",
    slug: "qual-ia-usar-2026-modelos-empataram",
    contentVersion: 1,
    status: "published",
    tags: ["Produtividade"],
    publishedAt: "2026-06-11",
    coverUrl:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
    title: "Qual IA usar em 2026? Os modelos empataram no topo — e a decisão é sua",
    excerpt:
      "GPT-5, Gemini 3 e Claude Opus 4.5 chegaram tão perto que a diferença virou detalhe. A pergunta mudou: não é 'qual é a melhor IA', é 'qual resolve o SEU problema'. Sem hype.",
    content: `A pergunta que mais me fazem: "Rodrigo, qual IA é a melhor?" Em 2026, a resposta honesta incomoda um pouco: **para a maioria dos usos, tanto faz.** E isso é a melhor notícia possível para você.

## O topo virou um empate técnico
Os três modelos de fronteira — **GPT-5.2 (OpenAI), Claude Opus 4.5 (Anthropic) e Gemini 3 Pro (Google)** — chegaram ao que o Intelligence Index v4.0 chamou de **"platô da fronteira"**: as diferenças entre eles ficaram marginais. Todos raciocinam, todos são multimodais (texto, imagem, áudio e vídeo na mesma conversa) e todos resolvem 95% do que você precisa.

Traduzindo: parar de caçar "a mais inteligente" e começar a escolher "a que encaixa no seu fluxo" deixou de ser preguiça — virou a decisão certa.

## O que mudou de verdade em 2026 não foi o QI
Foram três coisas:

**1. Agentes autônomos.** OpenAI, Google e Anthropic lançaram modelos que executam tarefas de várias etapas **sozinhos** — pesquisar, escrever, testar, corrigir, repetir. É a maior mudança do ano. E o maior risco: autonomia sem revisão é como dar a chave do carro a um estagiário e dormir no banco de trás. ([Por que isso é perigoso em produção](/blog/ia-deixa-banco-aberto-incidentes-2026).)

**2. Multimodal de verdade.** Mandar um print, um áudio e um PDF na mesma conversa e a IA entender tudo junto. Isso mudou como a gente trabalha — não só o número do benchmark.

**3. IA em tudo.** Na CES 2026, o Google colocou o Gemini até na **geladeira**. A habilidade mais valiosa de 2026 não é "usar IA" — é **separar sinal de ruído** e não comprar hype.

## Como escolher (critério, não torcida)
Esqueça o ranking da internet. Escolha pelo SEU caso:

1. **Qual é o problema?** Texto e raciocínio, código, imagem ou dados sensíveis — cada um tem um favorito diferente.
2. **Para onde vão seus dados?** Se envolve dado de cliente, privacidade e LGPD pesam mais que meio ponto no benchmark.
3. **Integra no que você já usa?** A melhor IA é a que está a um clique de onde você trabalha.
4. **Quanto custa no uso real?** Quase tudo começa de graça e a conta cresce com o uso. Saiba onde ela explode antes de escalar.
5. **Teste com o SEU exemplo.** Pegue uma tarefa real sua, rode nas três e compare. Vinte minutos valem mais que vinte reviews no YouTube.

## Para quem constrói (vibecoding)
Aqui o segredo desaponta: **o modelo importa menos que o método em volta dele.** A melhor IA mal operada perde feio para uma IA mediana bem conduzida — com um bom prompt ([o método P.R.O.M.P.T.E.R.](/blog/como-usar-ia-no-trabalho-peder)) e revisão ([o Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas)). Trocar de modelo raramente é o que vai te destravar. Melhorar o processo, quase sempre.

> Não existe "a melhor IA". Existe a melhor IA para o seu problema, no seu contexto, com o seu método.

## A decisão é sua
Eu não vou te dizer "use a ferramenta X". Não tenho patrocínio e não acredito em bala de prata. Te dou os critérios; a parte difícil — escolher e testar — fica com você. Em 2026, com os modelos empatados, **errar a escolha ficou barato. Não testar é que sai caro.**

## Quer ajuda para montar seu setup?
Use o robô **Sugestão de Stack** (ele recomenda ferramentas pelo seu caso, sem te prender a nenhuma) na [Central de Robôs gratuita](/robos) — ou baixe o [e-book "Vibecoding para CEOs"](/materiais) e monte sua base do jeito certo.`,
  },
  {
    id: "boas-praticas-vibecoding-para-empresas",
    slug: "boas-praticas-vibecoding-para-empresas",
    status: "published",
    tags: ["Negócios"],
    publishedAt: "2026-06-08",
    coverUrl:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=1200&q=80",
    title: "Vibecoding sem desastre: 6 boas práticas para donos de empresa",
    excerpt:
      "Construir software com IA é a maior alavanca que existe — e uma bomba-relógio sem cuidado. 6 práticas que evitam o desastre (e onde pegar o guia completo).",
    content: `Cada vez mais donos de empresa estão construindo software com IA — o chamado vibecoding. É a maior alavanca de produtividade que já apareceu. Mas, sem cuidado, vira bomba-relógio: código gerado por IA tem **2,74x mais vulnerabilidades** que o humano (Veracode, 2025), e só **10,5% passa numa revisão de segurança**.

A boa notícia: dá para ter a velocidade da IA sem herdar os riscos. Aqui vão 6 práticas que evitam 90% dos desastres.

## 1. Plano antes do código
Peça à IA o plano em fases (MVP primeiro) e a arquitetura antes de gerar qualquer coisa. Construir sem plano é construir dívida.

## 2. Nunca suba segredos — e mantenha o repositório privado
Suas chaves e senhas ficam no arquivo de variáveis de ambiente, que NUNCA pode ir para o GitHub. E o repositório do seu produto deve ser privado (é grátis no GitHub).

## 3. Sempre dê "git pull" antes de subir
Baixe as últimas alterações antes de enviar as suas. Evita sobrescrever trabalho e conflitos feios.

## 4. Banco de dados com regras (e LGPD)
No Firebase, configure as regras de segurança — sem elas, qualquer um lê e escreve seus dados. E mapeie quais dados pessoais você coleta (LGPD não é opcional).

## 5. Revise antes de aceitar
Use um agente revisor e o Protocolo de 5 Camadas: Entender, Ler, Blindar, Testar e Versionar. "Funcionou na tela" não é "está pronto".

## 6. Saiba os custos (não terceirize às cegas)
Quase tudo começa de graça e a conta cresce com o uso. Conheça onde ela pode explodir antes de escalar — e como avaliar um dev sem ser técnico.

## Quer tudo isso em detalhe?
Isso é só a ponta. No e-book gratuito **"Vibecoding para CEOs"** eu detalho cada prática — com as ferramentas que você precisa, como conectar o Firebase, subir no GitHub e publicar na Vercel, um glossário, um roadmap de 30 dias e **22 prompts prontos** (incluindo o de "instruções iniciais", que ensina a IA a trabalhar com segurança e bom design desde o primeiro comando).

[**→ Baixe o e-book gratuito aqui**](/materiais)`,
  },
  {
    id: "manifesto",
    slug: "manifesto",
    contentVersion: 3,
    status: "published",
    tags: ["Manifesto"],
    publishedAt: "2026-06-08",
    coverUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    title: "Manifesto: por que eu construo (e ensino) vibecoding com engenharia",
    excerpt:
      "Não vendo mágica nem medo. Rodo empresas reais 100% em vibecoding — e acredito que IA é alavanca para quem tem método, não atalho para quem não sabe.",
    content: `Eu rodo empresas inteiras com vibecoding. Não uma demo, não um protótipo — produtos reais, em produção, com clientes pagantes e dados sensíveis. E é justamente por isso que eu preciso te dizer uma coisa incômoda.

A forma como a maioria está usando IA para construir software é uma bomba-relógio.

## Dois tipos de pessoas
Existem dois tipos de gente fazendo vibecoding hoje.

A primeira abre a IA, pede um sistema, aceita tudo o que aparece na tela e sobe para produção. Não lê o código. Não entende o que foi feito. Confunde velocidade com competência.

A segunda usa a mesma IA — mas como engenheiro. Lê cada parte antes de aceitar. Sabe onde os dados trafegam. Testa antes de confiar. Trata a IA como um júnior brilhante, não como um oráculo.

Eu sou o segundo tipo. E não por talento — por **método**.

## No que eu acredito
Acredito que o problema nunca foi a IA. É o **[vibecoding às cegas](/blog/os-7-pecados-do-vibecoding-as-cegas)**: aceitar o que a máquina cospe sem entender.

Acredito que você não precisa ser um programador sênior para construir com IA de forma segura. Precisa de um processo — e processo se aprende.

Acredito que a prova vem antes do discurso. Por isso eu mostro o que construí, com nome e link, em vez de prometer.

E acredito que, daqui a pouco, saber operar IA com rigor não será diferencial — será o mínimo. Quem aprender agora larga na frente.

## Por que eu ensino
Porque vejo gente boa com medo de IA por preconceito, e gente sem preparo colocando empresas em risco por excesso de confiança. Os dois extremos perdem.

Eu quero o meio com método: a velocidade da IA **com** a segurança da engenharia. É isso que eu construo todo dia — e é isso que eu ensino aqui.

> Vibecoding não é atalho para quem não sabe o que está fazendo. É alavanca para quem tem método.

Se essa é a sua praia, fica por aqui. Vou te mostrar exatamente como eu faço — comece pelos [robôs de IA gratuitos](/robos) ou pelo [e-book IA Sem Medo](/#materiais).`,
  },
  {
    id: "erro-donos-de-empresa-ia-substitui-programadores",
    slug: "erro-donos-de-empresa-ia-substitui-programadores",
    contentVersion: 3,
    status: "published",
    tags: ["Negócios"],
    publishedAt: "2026-06-06",
    coverUrl:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=1200&q=80",
    title:
      "O erro que donos de empresa cometem ao achar que a IA substitui todos os programadores",
    excerpt:
      "Achar que a IA dispensa engenharia é caro: projetos sobem inseguros, sem arquitetura e viram dívida. O que os dados mostram — e o que fazer no lugar.",
    content: `"Agora com IA eu não preciso mais de programador." Se você é dono de empresa, provavelmente já pensou — ou ouviu — essa frase. Ela parece economia inteligente. Na prática, costuma sair muito mais cara.

## O que realmente acontece
A IA escreve código rápido. O que ela **não** faz sozinha é engenharia: decidir arquitetura, blindar segurança, modelar dados, pensar em escala. Quando ninguém com esse olhar revisa, o resultado é previsível:

- **Projetos sobem inseguros.** Um estudo da Veracode (2025) mostra que código gerado por IA tem **2,74x mais vulnerabilidades** que código humano. Em uma análise de 5.600 apps "vibecodados", pesquisadores acharam 400+ segredos expostos e 175 vazamentos de dados pessoais.
- **Sem arquitetura.** Funciona com 10 usuários, quebra (ou explode a conta) com 1.000. A dívida técnica se acumula invisível.
- **Falsa sensação de pronto.** 61% do código de IA funciona, mas só **10,5% passa numa revisão de segurança**. "Funcionou na tela" não é "está pronto".
- **Mais retrabalho, não menos.** 67% dos desenvolvedores dizem gastar **mais** tempo depurando código de IA do que antes.

No Brasil, ainda tem a LGPD: um vazamento de dados de cliente não é só vergonha — é multa.

## Por que o erro é sedutor
Porque a demo é linda. Em minutos você vê algo "funcionando" e conclui que o trabalho acabou. Mas o trabalho difícil — o que protege a sua empresa — é justamente o invisível: segurança, arquitetura, testes, versionamento.

## A verdade que economiza dinheiro
A IA não substitui o programador. Ela **substitui a digitação** do que já foi pensado. O julgamento de engenharia continua sendo necessário — e, com IA, fica até mais valioso.

O dono esperto não pergunta "como demito o time técnico?". Pergunta: **"como faço meu time entregar 3x mais com IA, sem virar um risco?"**. A resposta é método: gente que sabe revisar o que a IA escreve, aplicando um [protocolo de segurança](/blog/protocolo-de-5-camadas) antes de qualquer coisa ir para produção.

> Velocidade sem engenharia não é economia. É dívida com juros — e a conta chega na pior hora.

Se você quer adotar IA na sua empresa sem transformar isso numa bomba-relógio, é exatamente esse o trabalho que eu faço. [Vamos conversar](/#trabalhe).

## Fontes
- [Veracode — 2025 GenAI Code Security Report](https://www.veracode.com/blog/ai-generated-code-security-risks/)
- [Cloud Security Alliance — AI-Generated Code Security](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-security-vibe-coding-202/)`,
  },
  {
    id: "os-7-pecados-do-vibecoding-as-cegas",
    slug: "os-7-pecados-do-vibecoding-as-cegas",
    contentVersion: 3,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-06-07",
    coverUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    title: "Os 7 pecados do vibecoding às cegas (e como evitá-los)",
    excerpt:
      "Código gerado por IA tem 2,74x mais vulnerabilidades. Os 7 erros que transformam vibecoding em bomba-relógio — e como blindar o seu projeto.",
    content: `Vibecoding — construir software conversando com a IA — explodiu. E com razão: dá pra tirar uma ideia do papel numa velocidade que era impensável há dois anos. Mas existe um lado que quase ninguém mostra.

Um estudo da Veracode (2025) analisou código gerado por IA e encontrou **2,74x mais vulnerabilidades** do que em código escrito por humanos. Pior: numa análise de 5.600 aplicações "vibecodadas", pesquisadores acharam mais de **2.000 vulnerabilidades, 400+ segredos expostos e 175 vazamentos de dados pessoais**. O código até funciona — 61% roda certo — mas só **10,5% passa numa revisão de segurança**.

O problema não é a IA. É o **vibecoding às cegas**: aceitar tudo o que ela gera sem entender. Aqui estão os 7 pecados mais comuns.

## 1. Aceitar sem ler
O pecado original. A IA entrega, você clica em "aceitar" e segue. Se você não leu, não sabe o que subiu. Trate a IA como um estagiário brilhante: tudo passa por revisão.

## 2. Expor segredos e chaves
Chaves de API, senhas e tokens hardcoded no código é o vazamento nº1. Aquele "400+ segredos expostos" não é exagero — é o padrão de quem não revisa.

## 3. Ignorar a camada de segurança
CSRF, validação de entrada, controle de acesso. A IA escreve a funcionalidade, mas raramente blinda. Um login "funcionando" pode ser uma porta destrancada.

## 4. Vazar dados sensíveis (e ferir a LGPD)
Onde os dados dos seus clientes ficam? Quem consegue ler? Vibecoding sem cuidado expõe dados pessoais — e no Brasil isso é problema de LGPD, com multa.

## 5. Não testar
"Funcionou na minha tela" não é teste. Sem provar que funciona (e que continua funcionando), você está apostando, não construindo.

## 6. Subir sem versionar
Sem commits pequenos e sem rollback, um erro vira incêndio. Versionar é o seu cinto de segurança.

## 7. Confundir "funciona" com "está pronto"
Esse é o pecado-mãe. Lembre: 61% do código de IA funciona, mas só 10,5% é seguro. Funcionar é o começo, não o fim.

## Como evitar todos eles
A solução não é parar de vibecodar — é vibecodar **[com engenharia](/blog/vibecoding-com-engenharia)**. Antes de aceitar qualquer linha, aplique um [protocolo simples de revisão](/blog/protocolo-de-5-camadas): entender, ler, blindar, testar e versionar. É o que separa quem rói as unhas de quem dorme tranquilo.

> A IA constrói rápido. Sem método, ela constrói rápido **uma bomba-relógio**.

## Fontes
- [Veracode — 2025 GenAI Code Security Report](https://www.veracode.com/blog/ai-generated-code-security-risks/)
- [Cloud Security Alliance — AI-Generated Code Security](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-security-vibe-coding-202/)
`,
  },

  {
    id: "vibecoding-com-engenharia",
    slug: "vibecoding-com-engenharia",
    contentVersion: 3,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-06-05",
    coverUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    title: "Vibecoding com Engenharia: o que é e por que muda tudo",
    excerpt:
      "Vibecoding não é atalho para quem não sabe o que faz — é alavanca para quem tem método. O que significa construir com IA usando rigor de engenheiro.",
    content: `"Vibecoding" virou sinônimo de "construir software conversando com a IA". O termo pegou — e com ele veio a fama de que é coisa de quem não sabe programar. Em parte, com razão: muito do que se produz por aí é frágil e inseguro.

Mas existe outro caminho, e é o que defendo: **vibecoding com engenharia**.

## O que é vibecoding com engenharia
É usar a IA como ferramenta de construção mantendo o rigor de quem entende o que está sendo feito. A IA acelera a digitação; o julgamento continua sendo seu. Na prática, são quatro princípios:

1. **Arquitetura primeiro.** Você decide o desenho da solução. A IA preenche os detalhes — não o contrário.
2. **Prompt como especificação.** Pedido vago gera lixo. Pedido preciso gera código que dá pra revisar.
3. **IA é um júnior brilhante, não um oráculo.** Rápida e prestativa, mas tudo passa por revisão.
4. **Você é o gargalo de qualidade — de propósito.** Nada vai pra produção sem o seu aval.

## Por que isso importa
Porque os números do "[vibecoding às cegas](/blog/os-7-pecados-do-vibecoding-as-cegas)" são assustadores: código de IA tem **2,74x mais vulnerabilidades** (Veracode, 2025), e **67% dos desenvolvedores dizem gastar mais tempo depurando** código de IA do que antes. Velocidade sem método não é produtividade — é dívida.

Com engenharia, a equação muda: você ganha a velocidade da IA **sem** herdar os buracos de segurança.

## Não é sobre saber programar — é sobre ter método
Você não precisa ser um engenheiro sênior pra vibecodar com segurança. Precisa de um processo — o [Protocolo de 5 Camadas](/blog/protocolo-de-5-camadas): entender o que pediu, ler o que veio, blindar os dados, testar e versionar. Método se aprende — e é mais simples do que parece.

> Vibecoding não é atalho para quem não sabe o que está fazendo. É alavanca para quem tem método.

É essa a diferença entre um app que escala e uma bomba-relógio. E é exatamente o que eu ensino.

## Fontes
- [Veracode — 2025 GenAI Code Security Report](https://www.veracode.com/blog/ai-generated-code-security-risks/)
`,
  },

  {
    id: "ia-vai-roubar-seu-emprego",
    slug: "ia-vai-roubar-seu-emprego",
    contentVersion: 3,
    status: "published",
    tags: ["IA & Carreira"],
    publishedAt: "2026-06-04",
    coverUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    title: "A IA vai roubar seu emprego? O que os dados realmente dizem",
    excerpt:
      "A frase certa não é 'a IA vai te substituir'. Veja o que mostram os dados da PwC e de Harvard sobre IA, salários e empregos — e o que fazer com isso.",
    content: `É a pergunta que tira o sono de muita gente. E a resposta honesta não é nem o pânico ("vai acabar com tudo") nem a negação ("não muda nada"). É algo mais útil — e os dados ajudam.

## A frase certa
A IA não vai, sozinha, te substituir. Mas **uma pessoa que sabe usar IA pode**. O risco nunca foi a máquina; é ficar parado enquanto o vizinho aprende.

## O que os dados mostram
O **Global AI Jobs Barometer 2025 da PwC**, que analisou quase 1 bilhão de anúncios de emprego, encontrou algo contraintuitivo: nos setores mais expostos à IA, os **salários estão subindo 2x mais rápido**. A IA está tornando as pessoas mais valiosas, não menos.

Uma pesquisa de **Harvard Business School** olhou o mercado depois do ChatGPT e viu o padrão com clareza: vagas para tarefas **repetitivas e estruturadas caíram 13%**, enquanto a demanda por trabalho **analítico, técnico e criativo cresceu 20%**.

Goldman Sachs, BCG e outros chegam à mesma conclusão: o efeito dominante é de **aumento (augmentation)**, não de substituição. A IA automatiza tarefas — não pessoas inteiras.

## Quem realmente corre risco
A IA é excelente em tarefa repetitiva e sem pensamento. Então quem fazia **só isso** precisa evoluir. Não é sobre idade. É sobre agregar o que a máquina não tem: julgamento, responsabilidade, contexto e ética.

A IA escreve o e-mail. Quem decide se ele deve ser enviado é você. Esse "decidir" é o seu valor — e ele acabou de subir de preço.

## O que fazer hoje
Saber operar IA virou habilidade essencial, como usar computador foi em 2000. Daqui a pouco, não vão nem perguntar — vão exigir. A boa notícia: dá pra começar agora, com método — pegue de graça o [e-book IA Sem Medo](/#materiais) e os [robôs de IA](/robos).

> Quem aprende a usar IA não é substituído por IA. É disputado pelas empresas.

## Fontes
- [PwC — 2025 Global AI Jobs Barometer](https://www.pwc.com/gx/en/services/ai/ai-jobs-barometer.html)
- [Harvard Business School — Enhance or Eliminate?](https://www.library.hbs.edu/working-knowledge/enhance-or-eliminate-how-ai-will-likely-change-these-jobs)
`,
  },

  {
    id: "protocolo-de-5-camadas",
    slug: "protocolo-de-5-camadas",
    contentVersion: 3,
    status: "published",
    tags: ["Vibecoding"],
    publishedAt: "2026-06-02",
    coverUrl:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=1200&q=80",
    title: "O Protocolo de 5 Camadas: como revisar o que a IA escreve",
    excerpt:
      "As 5 verificações que faço antes de aceitar qualquer código gerado por IA. O método que transforma vibecoding às cegas em vibecoding com engenharia.",
    content: `Se só 10,5% do código gerado por IA passa numa revisão de segurança, a pergunta não é "devo usar IA?" — é "como reviso o que ela me entrega?". A resposta é um protocolo de cinco camadas que aplico antes de aceitar qualquer linha.

## Camada 1 — Entender
Antes de gerar, saiba exatamente o que está pedindo e por quê. Pedido confuso gera código confuso. Clareza no pedido é a primeira camada de segurança.

## Camada 2 — Ler
Leia o que a IA escreveu. Não precisa ser um sênior pra reconhecer o que cada bloco faz — e perguntar à própria IA "o que essa parte faz e que riscos ela tem?". O pecado nº1 é aceitar sem ler.

## Camada 3 — Blindar
Aqui mora a segurança. Confira onde os dados sensíveis trafegam, se há chaves expostas, se a autenticação e a validação de entrada estão de pé, se a LGPD está sendo respeitada. Foi essa camada que faltou nos 175 vazamentos de dados que pesquisadores encontraram em apps vibecodados.

## Camada 4 — Testar
"Funcionou na tela" não é teste. Prove que funciona — e que continua funcionando quando algo muda. Testar antes de confiar é o que separa engenharia de aposta.

## Camada 5 — Versionar
Commits pequenos, histórico limpo, rollback fácil. Quando algo quebra (e vai quebrar), você volta atrás em segundos em vez de entrar em pânico.

## P.R.O.M.P.T.E.R., o irmão do protocolo
Enquanto o Protocolo de 5 Camadas cuida do **código**, o método **[P.R.O.M.P.T.E.R.](/blog/como-usar-ia-no-trabalho-peder)** cuida da **conversa** com a IA: Papel, Realidade, Objetivo, Marcha, Proteção, Texto de saída, Exemplos e Refino. Juntos, eles transformam [vibecoding às cegas](/blog/os-7-pecados-do-vibecoding-as-cegas) em [vibecoding com engenharia](/blog/vibecoding-com-engenharia).

> Você não precisa virar programador. Precisa de método para não ser enganado pela própria ferramenta.

## Fontes
- [Veracode — 2025 GenAI Code Security Report](https://www.veracode.com/blog/ai-generated-code-security-risks/)
`,
  },

  {
    id: "como-usar-ia-no-trabalho-peder",
    slug: "como-usar-ia-no-trabalho-peder",
    contentVersion: 3,
    status: "published",
    tags: ["Produtividade"],
    publishedAt: "2026-06-01",
    coverUrl:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
    title: "Como usar IA no trabalho: o método P.R.O.M.P.T.E.R. (com exemplos)",
    excerpt:
      "Pedido vago gera resposta ruim. Aprenda o método P.R.O.M.P.T.E.R. para fazer bons pedidos à IA e ganhar tempo de verdade no trabalho — com exemplos prontos.",
    content: `A maior parte das pessoas usa IA do jeito errado: faz um pedido vago e recebe uma resposta genérica. Aí conclui que "a IA não serve pra muita coisa". O problema não é a ferramenta — é o pedido.

A boa notícia: fazer um bom pedido é simples. Toda vez que for **pedir** algo importante, lembre da palavra **P.R.O.M.P.T.E.R.**

## P — Papel
Diga quem a IA deve ser. "Aja como um redator corporativo experiente…". Dar um papel ajusta o tom e a profundidade da resposta.

## R — Realidade
Dê o seu contexto real. Quanto mais contexto, mais a resposta serve para o **seu** caso, e não para qualquer um.

## O — Objetivo
Diga exatamente o que quer: um e-mail? Uma lista? Um resumo? Um plano? Seja direto sobre o resultado.

## M — Marcha
Peça o passo a passo: "pense antes de responder" e "me pergunte se faltar algo". Isso evita que a IA chute.

## P — Proteção
Cuide dos dados: não cole informações sigilosas sem necessidade. A decisão final é sempre sua.

## T — Texto de saída
Defina tom e formato. Formal ou descontraído? Curto ou detalhado? Em tópicos ou texto corrido?

## E — Exemplos
Mostre um modelo do que espera. Um bom exemplo vale mais que dez instruções.

## R — Refino
Não gostou? Ajuste. "Deixa mais curto", "outro tom", "me dá 3 opções". É o passo que a maioria esquece — e o que mais faz diferença. É uma conversa, não um comando único.

## Antes e depois
**Pedido vago:** "faça um anúncio de bolo." → genérico, serve pra qualquer um.

**Pedido P.R.O.M.P.T.E.R.:** "Aja como um vendedor experiente. Estou vendendo bolo caseiro de cenoura para a vizinhança. Escreva um anúncio curto para WhatsApp, simpático, com emojis, em 3 linhas. Depois me dê 2 variações." → pronto para copiar e colar.

Mesma IA. A diferença foi só o pedido.

## Por que vale a pena
Não é só conforto: nos setores mais expostos à IA, os salários estão subindo **2x mais rápido** (PwC, 2025). Quem domina a ferramenta fica mais valioso. E começar custa quase nada — dá pra usar de graça hoje à noite.

Quer ir além? Eu reuni o método completo, um plano de 7 dias e **mais de 130 prompts prontos** no [e-book gratuito "IA Sem Medo"](/#materiais) — ou use o [Criador de Prompts](/robos) de graça.

## Fontes
- [PwC — 2025 Global AI Jobs Barometer](https://www.pwc.com/gx/en/services/ai/ai-jobs-barometer.html)
`,
  },
  {
    id: "configurar-vscode-copilot-primeiro-sistema",
    slug: "configurar-vscode-copilot-primeiro-sistema",
    contentVersion: 3,
    status: "published",
    tags: ["Primeiros Passos"],
    publishedAt: "2026-06-09",
    coverUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    title:
      "Do zero ao primeiro sistema: configure o VS Code + GitHub Copilot e comece a construir com IA",
    excerpt:
      "Nunca programou? Sem problema. O passo a passo completo para instalar o VS Code, ativar o GitHub Copilot e criar seu primeiro sistema com IA — com os porquês, os links e os prompts prontos para copiar.",
    content: `Você **não precisa saber programar** para começar a construir software hoje. Com a ferramenta certa e um método, dá para sair do zero absoluto — sem nunca ter escrito uma linha de código — e colocar seu primeiro sistema de pé. Este guia é o passo a passo completo, pensado para quem **não sabe nada** de programação nem de tecnologia. Vou explicar o porquê de cada coisa, com os links e os prompts prontos.

## Os 3 ingredientes (e o que cada um faz)
Pense numa cozinha:

- **VS Code** é a sua **bancada** — o programa onde o código mora e onde você trabalha.
- **GitHub Copilot** é o seu **cozinheiro de IA** — ele escreve o código por você, ali dentro da bancada, conversando em português.
- **GitHub** é a sua **geladeira na nuvem** — guarda seu projeto com segurança e histórico, para nada se perder.

Você vai instalar os três, aprender a conversar com a IA pelo método **P.R.O.M.P.T.E.R.** e construir com segurança.

## Passo 1 — Instale o VS Code
1. Acesse [code.visualstudio.com](https://code.visualstudio.com/) e clique em **Download**.
2. Abra o arquivo baixado e siga "avançar, avançar, concluir".
3. Abra o VS Code.

**Por quê:** é o editor de código mais usado do mundo — gratuito — e é onde a IA vai viver.

## Passo 2 — Crie sua conta no GitHub
1. Acesse [github.com](https://github.com/) e clique em **Sign up**.
2. Escolha usuário, e-mail e senha, e confirme o e-mail.

**Por quê:** o GitHub guarda seu projeto na nuvem (sua "geladeira") e é a conta que libera o Copilot.

## Passo 3 — Ative o GitHub Copilot
O Copilot é a IA que escreve o código. Ele tem **período de teste grátis** e é **gratuito para estudantes e professores** verificados; fora isso, é uma assinatura mensal baratinha.

1. Acesse [github.com/features/copilot](https://github.com/features/copilot) e clique para começar.
2. Siga o passo a passo para ativar na sua conta.

**Por quê:** é ele quem transforma o que você pede em português em código de verdade.

## Passo 4 — Instale a extensão no VS Code
1. No VS Code, clique no ícone de **Extensões** (os quadradinhos) na barra lateral esquerda.
2. Busque **GitHub Copilot** e clique em **Install**. Faça o mesmo com **GitHub Copilot Chat**.
3. Quando pedir, faça login com sua conta do GitHub (aparece no canto inferior).

**Por quê:** o **Copilot Chat** é a janelinha onde você conversa com a IA — pede, ela responde e constrói.

## Passo 5 — (quando precisar) Instale o Node.js
Se for criar um site ou sistema web, você vai precisar do **Node.js**, o "motor" que faz o projeto rodar no seu computador.

- Baixe a versão **LTS** em [nodejs.org](https://nodejs.org/) e instale (avançar, avançar, concluir).

Não precisa entender o que ele faz por dentro — só deixe instalado.

## Como falar com a IA: o método P.R.O.M.P.T.E.R.
A IA não adivinha. Pedido vago gera resposta ruim. Todo bom pedido tem 8 partes:

- **P — Papel:** quem a IA deve ser ("aja como um engenheiro sênior…").
- **R — Realidade:** seu contexto real (o que você está construindo, que você é iniciante).
- **O — Objetivo:** o que você quer, exatamente.
- **M — Marcha:** peça para pensar passo a passo e perguntar se faltar algo.
- **P — Proteção:** nada de senhas no código; a decisão é sempre sua.
- **T — Texto de saída:** o formato e o tom da resposta.
- **E — Exemplos:** mostre um modelo quando ajudar.
- **R — Refino:** trate como conversa — ajuste até ficar bom.

E duas regras de engenharia que evitam 90% das dores de cabeça: **plano antes do código** e **segurança em primeiro lugar**.

## Construindo seu primeiro sistema (com prompts prontos)
Abra o **Copilot Chat** no VS Code (ícone de balãozinho na lateral) e use os prompts abaixo na ordem. Troque o que está **[entre colchetes]** pela sua situação.

### 1) Peça o plano antes de tudo
Copie e cole:

> **Papel:** Aja como um Arquiteto de Produto e CTO virtual sênior, especialista em transformar ideias em planos de software simples e seguros para quem está construindo com IA pela primeira vez. **Contexto:** eu **não sei programar** e estou usando o GitHub Copilot dentro do VS Code; quero criar **[descreva sua ideia em 1 frase]**, para **[quem vai usar]**. **Objetivo:** que você monte um plano em fases, começando pelo mínimo que já funciona (o MVP). Antes de começar, se faltar alguma informação importante, me faça de 1 a 3 perguntas simples e espere minha resposta — não invente nada. Cuide da segurança desde o início (nada de senhas no código) e me explique cada termo técnico em linguagem simples. Entregue o plano em passos numerados, com uma frase de "por quê" em cada um e os nomes dos arquivos que vamos criar. No fim, diga qual é o primeiro passo prático e ofereça começar por ele. A decisão é sempre minha.

### 2) Prepare a base do projeto
Copie e cole:

> **Papel:** Aja como um Engenheiro Full-Stack sênior e paciente, especialista em ensinar quem nunca programou. **Contexto:** estou no VS Code com o Copilot e já tenho o Node.js instalado; vamos seguir o plano que você me deu. **Objetivo:** criar a base do projeto **[nome]** e deixá-lo rodando na minha tela. **Como fazer:** pense passo a passo e me guie com os comandos exatos para eu digitar no terminal, explicando em 1 linha o que cada comando faz. Se algum passo costuma dar erro, me avise antes. Nunca coloque senhas ou chaves no código — use um arquivo de variáveis de ambiente e me explique como. Ao final, me diga como abrir o projeto no navegador para eu ver funcionando. Se eu colar um erro, explique a causa em português simples e a correção mais segura.

### 3) Construa a primeira tela
Copie e cole:

> **Papel:** Aja como um Engenheiro Full-Stack sênior. **Contexto:** o projeto **[nome]** já está rodando; agora quero construir **[a primeira funcionalidade — ex.: a tela inicial com um formulário]**. **Objetivo:** que você implemente isso de forma limpa e simples. Antes, me explique em 1 parágrafo o que vai fazer e o que pode quebrar. Liste os arquivos que vai criar ou mudar e escreva o código comentado nos pontos importantes. Cuide de segurança e de dados pessoais (LGPD) se a tela coletar informações de pessoas. Faça só o que pedi, sem adicionar coisas extras. No fim, me diga como testar e ofereça ajustar o visual se eu quiser.

### 4) Blinde antes de publicar
Antes de subir qualquer coisa, peça uma revisão de segurança. Copie e cole:

> **Papel:** Aja como um Engenheiro de Segurança de Aplicações (AppSec) sênior. Vou colar abaixo o código que a IA gerou e quero que você revise antes de eu publicar, com foco em segurança. Verifique: há alguma senha, chave ou segredo escrito no código? As entradas do usuário estão validadas? Há algum dado pessoal exposto? Tem algo sensível que não deveria ir para o GitHub? Para cada problema, explique por que importa (em linguagem simples) e me dê a correção pronta. Não invente vulnerabilidade — se estiver tudo certo, diga e explique por quê. Código: **[cole aqui]**.

## Regras de ouro da segurança (decore estas)
- **Nunca** escreva senhas, chaves ou tokens direto no código. Eles ficam num arquivo de variáveis de ambiente (a IA te ensina a criar) que **nunca** vai para o GitHub.
- Deixe o repositório do seu projeto **privado** (é grátis no GitHub).
- Antes de enviar mudanças, rode **git pull** para não sobrescrever nada.
- A IA escreve; **você confere e decide**. Sempre.

## Seus próximos passos
1. Não sabe escrever um bom prompt? Use o **[Criador de Prompts](/robos)** — meu presente grátis: você diz o que quer e a IA monta o prompt completo para você.
2. Quer um time de IA pronto? Os **robôs** (Arquiteto de Produto, Engenheiro Full-Stack, Revisor de Segurança…) estão na [Área do Cliente](/cliente).
3. Quer o método completo, com plano de 7 dias e +130 prompts? Baixe o e-book gratuito **IA Sem Medo** na seção de [materiais](/#materiais).

Você acabou de montar a bancada, contratar um cozinheiro de IA e aprender a fazer o pedido certo. Agora é construir — com a velocidade da máquina e o cuidado de quem entende de engenharia.
`,
  },
  {
    id: "publicar-site-de-graca-na-vercel",
    slug: "publicar-site-de-graca-na-vercel",
    contentVersion: 3,
    status: "published",
    tags: ["Primeiros Passos"],
    publishedAt: "2026-06-09",
    coverUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    title: "Coloque seu site no ar de graça: deploy na Vercel pelo GitHub, passo a passo",
    excerpt:
      "Seu projeto está pronto no computador, mas ninguém vê. Aprenda a publicá-lo de graça na Vercel — do GitHub ao ar em minutos, com domínio próprio e segredos protegidos.",
    content: `Você construiu seu site ou sistema, ele funciona no seu computador… mas só você consegue ver. **Publicar** (ou "fazer deploy") é colocar seu projeto no ar, com um endereço que qualquer pessoa acessa. E dá para fazer isso **de graça**, em minutos, com a **Vercel**. Este é o passo a passo para quem nunca publicou nada.

## O que é a Vercel (e por que ela)
Pense na Vercel como a **gráfica + correio** do seu site: ela pega o seu projeto, monta a versão final e entrega ao mundo num endereço na internet. É gratuita para projetos pessoais, rápida e feita para iniciantes.

**Pré-requisito:** seu projeto precisa estar no **GitHub** (sua "geladeira na nuvem"). Se ainda não está, peça ajuda ao Copilot — tem um prompt pronto no fim deste post.

## Passo 1 — Crie sua conta na Vercel
1. Acesse [vercel.com](https://vercel.com/) e clique em **Sign Up**.
2. Escolha **Continue with GitHub**.

**Por quê:** entrar com o GitHub já conecta as duas contas, e a Vercel passa a "enxergar" seus projetos.

## Passo 2 — Importe seu projeto
1. No painel, clique em **Add New… → Project**.
2. Encontre o repositório do seu projeto e clique em **Import**.

## Passo 3 — Publique (deploy)
1. A Vercel detecta sozinha o tipo do seu projeto. Normalmente é só clicar em **Deploy**.
2. Espere 1 a 2 minutos. Quando aparecer o "Congratulations", seu site **está no ar**.
3. Clique no endereço (algo como **seu-projeto.vercel.app**) e veja funcionando.

**Por que funciona "sozinho":** a Vercel já sabe construir os tipos de projeto mais comuns (como Next.js). Você não precisa configurar nada técnico.

## Passo 4 — As variáveis de ambiente (segredos)
Se o seu projeto usa senhas ou chaves (de banco de dados, pagamento etc.), elas **NUNCA** ficam no código. Vão num lugar separado e seguro:

1. Na Vercel, abra seu projeto → **Settings → Environment Variables**.
2. Adicione cada chave (nome e valor) e salve. Depois clique em **Redeploy**.

**Por quê:** o código vai para o GitHub; os segredos não. Assim ninguém rouba suas chaves.

## Passo 5 — Domínio próprio (opcional)
Quer **www.seusite.com.br** no lugar do endereço .vercel.app?
1. Compre o domínio (ex.: Registro.br, GoDaddy).
2. Na Vercel: projeto → **Settings → Domains** → adicione o domínio e siga as instruções.

## A mágica do deploy automático
A partir de agora, **toda vez que você salvar uma mudança no GitHub, a Vercel publica sozinha** a nova versão. Você programa, salva, e o site se atualiza. Sem trabalho manual.

## Prompt pronto — peça ajuda ao seu robô de Deploy
Travou em algum passo? Cole no Copilot Chat:

> **Papel:** Aja como um Especialista em Deploy (GitHub + Vercel) sênior, paciente, especialista em ensinar quem nunca publicou um site. **Contexto:** tenho um projeto **[descreva — ex.: um site em Next.js]** e quero colocá-lo no ar de graça na Vercel; meu nível é iniciante total. **Objetivo:** me guiar, passo a passo e com os cliques exatos, de onde estou **[ainda no meu computador / já no GitHub]** até o site publicado. Antes, me pergunte em que ponto estou se não estiver claro. Cuide da segurança: me lembre de NUNCA subir senhas ou chaves para o GitHub e de cadastrá-las nas variáveis de ambiente da Vercel. Explique cada termo técnico em uma linha e me avise do erro nº 1 de iniciante (esquecer uma variável de ambiente). No fim, me diga como ver o site no ar e como configurar um domínio próprio.

## Próximos passos
- Seu site no ar precisa de conteúdo bom: use o **[Criador de Prompts](/robos)** para criar textos com método.
- Quer um sistema com login e banco de dados? Veja o próximo tutorial: **conectar um banco de dados sem medo**.

Pronto: seu projeto saiu da sua tela e ganhou o mundo. Bem-vindo ao ar.
`,
  },
  {
    id: "conectar-banco-de-dados-firebase-sem-medo",
    slug: "conectar-banco-de-dados-firebase-sem-medo",
    contentVersion: 3,
    status: "published",
    tags: ["Primeiros Passos"],
    publishedAt: "2026-06-09",
    coverUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    title: "Conecte um banco de dados sem medo: Firebase do zero para iniciantes",
    excerpt:
      "Seu sistema precisa guardar informações — cadastros, mensagens, pedidos. Aprenda a usar o Firebase do zero: salvar dados, criar login e, o mais importante, blindar tudo com as regras de segurança.",
    content: `Todo sistema sério precisa **guardar informações**: cadastros de clientes, mensagens, pedidos, posts. Para isso existe o **banco de dados**. E o mais fácil para iniciantes é o **Firebase**, do Google. Neste guia você vai criar um banco do zero, guardar dados, fazer um login de usuário e — o pulo do gato — **proteger tudo** com as regras de segurança, explicadas em português de gente.

## O que é um banco de dados (sem susto)
Pense numa **agenda de contatos gigante na nuvem**: cada informação fica organizada e você busca quando quiser. O **Firebase** é essa agenda — pronta, segura e grátis para começar. Ele tem três partes que você vai usar:

- **Firestore** — onde os dados moram (a agenda).
- **Authentication** — o login dos usuários (a portaria com a lista de convidados).
- **Regras de segurança** — o porteiro que decide quem entra e o que cada um pode ver.

## Passo 1 — Crie seu projeto no Firebase
1. Acesse [console.firebase.google.com](https://console.firebase.google.com/) e entre com sua conta Google.
2. Clique em **Adicionar projeto**, dê um nome e siga.

## Passo 2 — Conecte seu app
1. Dentro do projeto, clique no ícone **</>** (Web) para registrar um app.
2. O Firebase mostra uma configuração (umas chaves). **Não cole isso direto no código** — essas chaves vão nas **variáveis de ambiente** (a IA te ensina a fazer certo).

**Por quê:** manter a configuração fora do código é o primeiro passo de segurança.

## Passo 3 — Crie o banco (Firestore)
1. No menu lateral, vá em **Firestore Database → Criar banco de dados**.
2. **MUITO IMPORTANTE:** comece em **modo de produção** (não em modo de teste). O modo de teste deixa seu banco **aberto para o mundo inteiro** por 30 dias — qualquer um lê e escreve. É o erro nº 1 de iniciante.

## Passo 4 — Ligue o login (Authentication)
1. Vá em **Authentication → Começar**.
2. Ative o método **E-mail/senha** (ou Google). Pronto: seus usuários já podem criar conta e entrar.

## Passo 5 — O pulo do gato: as regras de segurança
As **regras** dizem quem pode ler e escrever cada coisa. A lógica certa é: **negar tudo por padrão e liberar só o necessário.** Em português, uma boa regra diz coisas como:

- "O cadastro de um cliente só pode ser lido pelo próprio cliente ou pelo admin."
- "Os posts publicados, qualquer um lê; mas só o admin escreve."

Você não precisa decorar a sintaxe — peça à IA (prompt no fim). Mas **entenda o princípio**: cada permissão é uma decisão sua, nunca um "deixa aberto pra funcionar".

## Passo 6 — Ative o App Check
O **App Check** garante que só o **seu** site fale com o banco — bloqueando robôs e scripts de fora. Ative em **App Check** no console (com reCAPTCHA). É a tranca extra que protege seu custo e seus dados.

## Prompt pronto — seu robô de Firebase
Cole no Copilot Chat:

> **Papel:** Aja como um Engenheiro de Dados sênior, especialista em Firebase (Firestore, Authentication, App Check e regras de segurança), paciente com quem nunca usou banco de dados. **Contexto:** estou criando **[descreva o sistema]** e os dados que vou guardar são **[ex.: cadastros com nome, e-mail e telefone]**; meu nível é iniciante. **Objetivo:** me guiar a conectar o Firebase com segurança — a configuração via variáveis de ambiente (nunca no código), o modelo dos dados e as **regras de segurança restritivas** (negar por padrão, liberar só o necessário), explicando cada regra em uma frase simples. Antes, me pergunte quais dados pessoais eu coleto e quem pode ler ou escrever cada coisa. Cuide da LGPD e me lembre de NÃO usar o modo de teste e de ativar o App Check. No fim, me diga como testar se as regras estão bloqueando o acesso indevido.

## Regras de ouro
- **Nunca** o modo de teste em produção.
- Regras **restritivas** por padrão.
- A configuração e as chaves vão em **variáveis de ambiente**, nunca no código.
- Dados pessoais = **LGPD**: colete só o necessário e proteja.

## Próximos passos
- Já tem banco? Aprenda a **proteger seus segredos** no próximo tutorial.
- Use o robô **Especialista em Firebase** na [Área do Cliente](/cliente) sempre que precisar.

Banco conectado e blindado. Agora seu sistema tem memória — e segurança.
`,
  },
  {
    id: "nunca-vaze-uma-senha-variaveis-de-ambiente-gitignore",
    slug: "nunca-vaze-uma-senha-variaveis-de-ambiente-gitignore",
    contentVersion: 3,
    status: "published",
    tags: ["Primeiros Passos"],
    publishedAt: "2026-06-09",
    coverUrl:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
    title: "Nunca vaze uma senha: variáveis de ambiente, .gitignore e repositório privado",
    excerpt:
      "A falha de segurança nº 1 de quem começa a construir com IA é vazar uma senha no código. Entenda, em linguagem de gente, o que são segredos, o .env, o .gitignore e o que fazer se vazar.",
    content: `A falha de segurança número 1 de quem começa a construir com IA é simples e perigosa: **deixar uma senha ou chave escrita no código** e, sem querer, mandar isso para a internet. Um robô acha em minutos, e o estrago vem (conta invadida, custo na sua fatura). A boa notícia: evitar isso é fácil quando você entende 3 ideias. Vamos lá — sem jargão.

## O que são "segredos"
Segredos são as **chaves da sua casa digital**: senhas, chaves de API (do banco de dados, de pagamento, de e-mail), tokens. Quem tem a chave, entra. Por isso elas **nunca** podem ficar à vista.

## Ideia 1 — O arquivo de variáveis de ambiente (.env)
Em vez de escrever a chave no código, você a guarda num arquivo separado chamado **.env** (ou .env.local). O código apenas "pede" a chave a esse arquivo, sem nunca mostrá-la.

> Pense assim: o código diz "use a chave do cofre", e o cofre (.env) fica só no seu computador.

## Ideia 2 — O .gitignore (a lista do "não enviar")
Quando você manda seu projeto para o **GitHub**, nem tudo deve ir junto. O **.gitignore** é uma listinha que diz: "estes arquivos NÃO sobem". Nela entram, obrigatoriamente, o .env e qualquer arquivo de segredo.

**Por que isso é o coração da segurança:** com o .env no .gitignore, suas chaves ficam só com você, mesmo que o código vá para a internet.

## Ideia 3 — Repositório privado
No GitHub, deixe o repositório do seu projeto **privado** (é grátis). Assim, só você (e quem você convidar) vê o código. Uma camada a mais de proteção.

## E na hora de publicar?
Lembra que o .env não sobe? Então, ao publicar na Vercel (ou onde for), você **recadastra** essas mesmas chaves nas **variáveis de ambiente** do painel. O segredo viaja por um caminho seguro, nunca pelo código.

## Socorro, acho que vazei uma chave!
Calma — e aja rápido:
1. **Troque (revogue) a chave** no serviço de origem (Firebase, Stripe etc.). A chave antiga vira inútil na hora.
2. Coloque a chave nova no .env e nas variáveis de ambiente.
3. Garanta que o .env está no .gitignore para não repetir o erro.

> Apagar o arquivo do GitHub depois **não basta** — o histórico guarda tudo. Por isso o passo 1 (revogar) é o que importa de verdade.

## Prompt pronto — seu robô de Segurança
Antes de subir qualquer projeto, cole no Copilot Chat:

> **Papel:** Aja como um Engenheiro de Segurança de Aplicações (AppSec) sênior, paciente com iniciantes. **Contexto:** vou publicar meu projeto e quero ter certeza de que não estou vazando nenhum segredo; meu nível é iniciante. **Objetivo:** que você (1) configure meu .gitignore para ignorar todos os arquivos .env e segredos; (2) verifique, no código que eu colar, se há alguma senha, chave ou token escrito direto; (3) me explique, em linguagem simples, o que encontrou e como corrigir. **Como fazer:** pense passo a passo. Se eu já tiver subido algo, me diga como revogar a chave exposta. Não invente problema — se estiver tudo certo, confirme. Código ou arquivos: **[cole aqui]**.

## Regras de ouro (cole na geladeira)
- Segredo **nunca** no código — sempre no .env.
- .env **sempre** no .gitignore.
- Repositório **privado**.
- Vazou? **Revogue a chave** imediatamente.
- A IA escreve; **você confere** antes de publicar.

## Próximos passos
- Use o robô **Revisor de Código & Segurança** na [Área do Cliente](/cliente) antes de cada deploy.
- Quer o método completo de construir com IA com segurança? Baixe o e-book **IA Sem Medo** nos [materiais](/#materiais).

Segurança não é o assunto chato do final — é o que separa quem brinca de quem constrói de verdade. Agora você já está do lado certo.
`,
  },
  {
    id: "encontrar-erros-sistema-ia-f12-console",
    slug: "encontrar-erros-sistema-ia-f12-console",
    contentVersion: 3,
    status: "published",
    tags: ["Primeiros Passos"],
    publishedAt: "2026-06-09",
    coverUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    title: "Deu erro no sistema que a IA fez? Aprenda a achar o bug com o F12 e devolver para a IA",
    excerpt:
      "Construiu com IA e apareceu um erro? Calma. Aprenda a abrir o console (F12), encontrar a mensagem, copiar e devolver para a IA com o prompt certo — sem entender de código.",
    content: `Vai acontecer: você constrói algo com IA, abre no navegador e… não funciona. Tela branca, botão que não responde, algo quebrado. **Isso é normal** — acontece até com programador experiente. A diferença é que ele sabe uma coisa simples que ninguém te ensinou: **como capturar o erro e devolver para a IA resolver.** É isso que você vai aprender aqui, sem precisar entender de código.

## Erro não é fracasso — é informação
Quando algo quebra, o computador quase sempre **diz exatamente o que aconteceu**, numa mensagem escondida. Pense nas **luzes do painel do carro**: a luz acende, você não conserta o motor sozinho — mas lê a luz e leva a informação certa ao mecânico. O "mecânico" aqui é a IA. Seu trabalho é **ler a luz** (o erro) e **passar para ela**.

## Onde os erros aparecem (são 3 lugares)
Erro tem endereço. Saber onde olhar já resolve metade:
- **No navegador (a frente do site):** tela branca, botão que não faz nada, layout quebrado → o erro está no **Console** (é o que veremos com o F12).
- **No seu computador (enquanto você programa):** o erro aparece no **Terminal** do VS Code (a janelinha preta embaixo).
- **No site publicado:** os erros ficam nos **Logs** da Vercel (no painel do seu projeto).

Comece sempre pelo Console — é onde aparecem 80% dos erros de iniciante.

## Passo 1 — Abra o Console (o famoso F12)
Com o seu site aberto no navegador (Chrome, Edge ou Firefox):
- Aperte **F12**.
- Ou clique com o **botão direito** em qualquer lugar da página → **Inspecionar**.
- No Mac: **Cmd + Option + I**.

Vai abrir um painel cheio de abas. Não se assuste — você só vai usar duas.

## Passo 2 — Vá na aba "Console"
Clique na aba **Console** (no topo desse painel).
- Linhas em **vermelho** = erros. É o que importa.
- Linhas em amarelo = avisos. Quase sempre dá pra ignorar.

Se a tela estava branca ou algo quebrou, provavelmente tem um texto vermelho ali. **Esse texto é a "luz do painel".**

## Passo 3 — Copie o erro INTEIRO
Não anote "deu um erro vermelho". **Copie o texto:**
- Selecione a mensagem vermelha com o mouse e **Ctrl + C** (Cmd + C no Mac).
- Pegue **tudo**: a mensagem principal **e** as linhas de baixo (o "stack trace", que mostra o arquivo e a linha onde quebrou). Quanto mais completo, mais a IA acerta.
- Dica de ouro: muitas vezes aparece um nome de arquivo e um número (ex.: **App.js:42**). Isso diz **exatamente** onde está o problema.

## Passo 4 — Se for "salvar/carregar dados", olhe a aba "Network"
Se o problema é "cliquei em salvar e não foi" ou "não carregou", clique na aba **Network**, repita a ação e procure uma linha **vermelha** (com status 400, 401, 403 ou 500). Clique nela para ver o detalhe. Esse número também ajuda muito a IA a entender o que houve.

## Passo 5 — Devolva para a IA do jeito certo
Aqui está o pulo do gato: **não cole só o erro.** A IA resolve muito melhor quando você dá **contexto** — o que você estava fazendo, o erro completo e (se souber) o trecho de código. Use este prompt:

> **Papel:** Aja como um Engenheiro Sênior de Depuração, paciente e especialista em explicar para quem não programa. **Contexto:** estou construindo **[descreva — ex.: um site em Next.js]** com ajuda da IA e apareceu um erro; meu nível é iniciante. Eu estava tentando **[o que você fazia quando quebrou]**. **Objetivo:** que você descubra a causa e me dê a correção mais segura. **Como fazer:** pense passo a passo: 1) explique a causa provável em português simples, em 1 ou 2 frases; 2) me dê a correção pronta, mudando **só o necessário** (sem gambiarra e sem refatorar o resto); 3) diga como evitar que o erro volte; 4) confirme que a correção não cria risco de segurança. Se precisar ver outro arquivo, me peça. **O erro é:** **[cole o erro do console aqui]**. O trecho de código relacionado, se eu souber qual é, é: **[cole aqui, ou escreva "não sei"]**.

## Passo 6 — Entenda antes de aceitar
A IA vai propor uma correção. **Não aceite no automático.** Peça para ela explicar a causa em uma frase e mudar só o necessário. Se você não entendeu o porquê, pergunte de novo. Esse é o método: rápido, mas com rigor — nada de gambiarra que volta a quebrar amanhã.

## A regra de ouro do depurador
- **Erro é informação, não vergonha.** Capture, não entre em pânico.
- **Copie o erro inteiro** (mensagem + arquivo + linha).
- **Dê contexto à IA** (o que você fez + o código).
- **Entenda a causa** antes de aceitar a correção.
- **Cuidado:** se aparecer alguma senha ou chave no meio do erro, **não cole isso em lugar nenhum** — troque por [XXXX] antes de enviar.

## E os outros dois lugares?
- **Travou enquanto você programa?** Olhe o **Terminal** do VS Code (menu Terminal → Novo Terminal). O texto vermelho ali é o erro — mesmo processo: copie e devolva à IA com contexto.
- **Quebrou só depois de publicar?** Vá na **Vercel → seu projeto → aba Logs**. Os erros de produção ficam lá.

## Próximos passos
- Use o robô **Engenheiro de Depuração** na [Área do Cliente](/cliente) — ele já vem com todo esse método embutido.
- Não sabe montar o prompt? O [Criador de Prompts](/robos) faz por você.
- Quer o método completo de construir com IA com segurança? Baixe o [e-book IA Sem Medo](/#materiais).

Erro vai aparecer sempre — para todo mundo. O que separa quem trava de quem avança é saber **ler a luz do painel e passar a informação certa**. Agora você sabe.
`,
  },
];
