import type { Post } from "./posts";

/**
 * Posts publicados "de fábrica" (conteúdo do código).
 * Aparecem no /blog e na home mesmo sem o Firestore configurado.
 * Quando você criar posts no /admin, eles se somam a estes.
 */
export const seedPosts: Post[] = [
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
Acredito que o problema nunca foi a IA. É o **vibecoding às cegas**: aceitar o que a máquina cospe sem entender.

Acredito que você não precisa ser um programador sênior para construir com IA de forma segura. Precisa de um processo — e processo se aprende.

Acredito que a prova vem antes do discurso. Por isso eu mostro o que construí, com nome e link, em vez de prometer.

E acredito que, daqui a pouco, saber operar IA com rigor não será diferencial — será o mínimo. Quem aprender agora larga na frente.

## Por que eu ensino
Porque vejo gente boa com medo de IA por preconceito, e gente sem preparo colocando empresas em risco por excesso de confiança. Os dois extremos perdem.

Eu quero o meio com método: a velocidade da IA **com** a segurança da engenharia. É isso que eu construo todo dia — e é isso que eu ensino aqui.

> Vibecoding não é atalho para quem não sabe o que está fazendo. É alavanca para quem tem método.

Se essa é a sua praia, fica por aqui. Vou te mostrar exatamente como eu faço.`,
  },
  {
    id: "erro-donos-de-empresa-ia-substitui-programadores",
    slug: "erro-donos-de-empresa-ia-substitui-programadores",
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

O dono esperto não pergunta "como demito o time técnico?". Pergunta: **"como faço meu time entregar 3x mais com IA, sem virar um risco?"**. A resposta é método: gente que sabe revisar o que a IA escreve, aplicando um protocolo de segurança antes de qualquer coisa ir para produção.

> Velocidade sem engenharia não é economia. É dívida com juros — e a conta chega na pior hora.

Se você quer adotar IA na sua empresa sem transformar isso numa bomba-relógio, é exatamente esse o trabalho que eu faço. Vamos conversar.

## Fontes
- [Veracode — 2025 GenAI Code Security Report](https://www.veracode.com/blog/ai-generated-code-security-risks/)
- [Cloud Security Alliance — AI-Generated Code Security](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-security-vibe-coding-202/)`,
  },
  {
    id: "os-7-pecados-do-vibecoding-as-cegas",
    slug: "os-7-pecados-do-vibecoding-as-cegas",
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
A solução não é parar de vibecodar — é vibecodar **com engenharia**. Antes de aceitar qualquer linha, aplique um protocolo simples de revisão: entender, ler, blindar, testar e versionar. É o que separa quem rói as unhas de quem dorme tranquilo.

> A IA constrói rápido. Sem método, ela constrói rápido **uma bomba-relógio**.

## Fontes
- [Veracode — 2025 GenAI Code Security Report](https://www.veracode.com/blog/ai-generated-code-security-risks/)
- [Cloud Security Alliance — AI-Generated Code Security](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-security-vibe-coding-202/)
`,
  },

  {
    id: "vibecoding-com-engenharia",
    slug: "vibecoding-com-engenharia",
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
Porque os números do "vibecoding às cegas" são assustadores: código de IA tem **2,74x mais vulnerabilidades** (Veracode, 2025), e **67% dos desenvolvedores dizem gastar mais tempo depurando** código de IA do que antes. Velocidade sem método não é produtividade — é dívida.

Com engenharia, a equação muda: você ganha a velocidade da IA **sem** herdar os buracos de segurança.

## Não é sobre saber programar — é sobre ter método
Você não precisa ser um engenheiro sênior pra vibecodar com segurança. Precisa de um processo: entender o que pediu, ler o que veio, blindar os dados, testar e versionar. Método se aprende — e é mais simples do que parece.

> Vibecoding não é atalho para quem não sabe o que está fazendo. É alavanca para quem tem método.

É essa a diferença entre um app que escala e uma bomba-relógio. E é exatamente o que eu ensino.

## Fontes
- [Veracode — 2025 GenAI Code Security Report](https://www.veracode.com/blog/ai-generated-code-security-risks/)
`,
  },

  {
    id: "ia-vai-roubar-seu-emprego",
    slug: "ia-vai-roubar-seu-emprego",
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
Saber operar IA virou habilidade essencial, como usar computador foi em 2000. Daqui a pouco, não vão nem perguntar — vão exigir. A boa notícia: dá pra começar agora, com método.

> Quem aprende a usar IA não é substituído por IA. É disputado pelas empresas.

## Fontes
- [PwC — 2025 Global AI Jobs Barometer](https://www.pwc.com/gx/en/services/ai/ai-jobs-barometer.html)
- [Harvard Business School — Enhance or Eliminate?](https://www.library.hbs.edu/working-knowledge/enhance-or-eliminate-how-ai-will-likely-change-these-jobs)
`,
  },

  {
    id: "protocolo-de-5-camadas",
    slug: "protocolo-de-5-camadas",
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
Enquanto o Protocolo de 5 Camadas cuida do **código**, o método **P.R.O.M.P.T.E.R.** cuida da **conversa** com a IA: Papel, Realidade, Objetivo, Marcha, Proteção, Texto de saída, Exemplos e Refino. Juntos, eles transformam vibecoding às cegas em vibecoding com engenharia.

> Você não precisa virar programador. Precisa de método para não ser enganado pela própria ferramenta.

## Fontes
- [Veracode — 2025 GenAI Code Security Report](https://www.veracode.com/blog/ai-generated-code-security-risks/)
`,
  },

  {
    id: "como-usar-ia-no-trabalho-peder",
    slug: "como-usar-ia-no-trabalho-peder",
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

Quer ir além? Eu reuni o método completo, um plano de 7 dias e **mais de 130 prompts prontos** no e-book gratuito "IA Sem Medo".

## Fontes
- [PwC — 2025 Global AI Jobs Barometer](https://www.pwc.com/gx/en/services/ai/ai-jobs-barometer.html)
`,
  },
];
