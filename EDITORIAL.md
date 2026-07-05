# Padrão editorial do blog

Guia rápido pra manter consistência de voz, SEO e AEO (Answer Engine Optimization) nos posts.

## Voz (obrigatório)

- Frases curtas. Se passar de 20 palavras, quebra em duas.
- **ZERO travessão** (— ou –). Trocar por dois-pontos, ponto, parênteses ou "e".
- Ritmo por repetição curta. Exemplo: "A geração foi rápida. A limpeza é um pesadelo."
- Concreto > abstrato. Exemplo real, cena, cifra. Não "muitas pessoas". Diz "o cara que ontem no Reddit".
- Punchline no fim. Última frase é a mais forte. Curta.
- Assinatura: "A decisão é sua." no fim da maioria dos posts.
- Anti-padrões: "portanto", "outrossim", "revolucionário", "game changer", exclamação no meio do texto, emoji no corpo, "espero que este artigo tenha ajudado".

Detalhes completos em `.claude/projects/.../memory/rodrigo-voz-escrita.md`.

## Estrutura obrigatória de todo post novo

Cada post no `seed-posts.ts` deve ter:

```ts
{
  id: "slug",
  slug: "slug",
  contentVersion: 1,
  status: "published",
  tags: ["Vibecoding" | "IA & Carreira" | ...],
  publishedAt: "2026-MM-DD",
  coverUrl: "https://images.unsplash.com/...",
  title: "Título curto e provocativo",
  excerpt: "1-2 frases que resumem a tese",
  summary: "3 linhas densas com resposta direta pra IA citar (AEO)",  // NOVO
  faq: [                                                              // NOVO (quando faz sentido)
    { q: "Pergunta comum", a: "Resposta direta em 1-3 frases" }
  ],
  content: `markdown do post`
}
```

## `summary` (AEO/GEO)

Campo obrigatório em posts novos. Aparece no topo do post como bloco destacado.

Formato: **3 linhas densas** com a resposta central do post. Escreva pensando: se a IA lê só esse trecho, ela sabe do que o post trata?

Boa: "Vibecoding é construir com IA. Vibecoding com engenharia é construir com IA sem virar risco. Este guia reúne o método (P.R.O.M.P.T.E.R.), o Protocolo de 5 Camadas e as armadilhas mais comuns."

Ruim: "Neste artigo falamos sobre vibecoding e mostramos várias dicas úteis."

## `faq` (Schema FAQPage)

Opcional. Aplicar quando o post responde perguntas que aparecem no Google/Perplexity.

Renderiza no fim do post como acordeão + gera JSON-LD `FAQPage` (bom pra AI Overviews).

Formato: 3-5 perguntas curtas. Respostas em 1-3 frases. Cada resposta autossuficiente (não presume que leu o post).

## Interlinking

- Sempre linke pra pillar page quando citar "vibecoding com engenharia" pela primeira vez no post.
- Sempre linke pra `/blog/prompter` quando citar "P.R.O.M.P.T.E.R.".
- Sempre linke pra `/blog/protocolo-de-5-camadas` quando citar "Protocolo de 5 Camadas".
- Um script automático (em `scratchpad/auto_interlinking.py`) faz isso quando esquecemos.

## Headers (H2)

Use no máximo 2 níveis de profundidade (H2 e H3). O TOC do site pega automaticamente os H2. Portanto:

- H2 deve ser autossuficiente. Ex: "Meu take", "Vale o ponto", "O que fazer", "Conclusão".
- H3 só quando o H2 tem 3+ sub-seções.

## CTA obrigatório

Todo post tem no rodapé (automático via template):
1. `<PostFaq />` se houver FAQ
2. `<NewsletterSignup />` (captura de e-mail)
3. `<PostCta />` (guias grátis + robôs)
4. `<AuthorBio />`
5. `<RelatedPosts />`

Nada a fazer no markdown. Só escreve o conteúdo.

## Checklist rápido antes de publicar

- [ ] Título curto e provocativo (< 70 chars)
- [ ] Excerpt em 1-2 frases (< 200 chars)
- [ ] Summary em 3 linhas densas (AEO)
- [ ] FAQ opcional (só se responde perguntas)
- [ ] Pelo menos 3 H2 (pra ligar o TOC)
- [ ] Pelo menos 1 link interno pra post relacionado
- [ ] Punchline no fim ("A decisão é sua." ou variante)
- [ ] Zero travessão em todo o texto
- [ ] Cover URL do Unsplash com `?auto=format&fit=crop&w=1200&q=80`
