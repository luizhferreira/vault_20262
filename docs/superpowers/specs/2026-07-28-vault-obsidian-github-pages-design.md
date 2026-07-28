# Vault de Estudos — Obsidian publicado no GitHub Pages

**Data:** 2026-07-28
**Autor:** luizhferreira
**Status:** aprovado, pronto para planejamento

## Problema

Provas, listas de exercícios e simulados transcritos para Markdown vivem hoje sem
casa. Escrevê-los no Obsidian resolve a edição, mas não a consulta: para ler uma
prova fora do computador é preciso abrir o Obsidian naquele computador.

O objetivo é ler o mesmo material de qualquer navegador, organizado por
disciplina, sem mudar o jeito de escrever.

## Solução

Um site estático gerado por [Quartz 4](https://quartz.jzhao.xyz/) a partir de uma
vault do Obsidian versionada no Git. O repositório **é** a vault: editar no
Obsidian e dar `git push` publica o site.

- **Repositório:** `luizhferreira/vault_20262` (público)
- **URL:** `https://luizhferreira.github.io/vault_20262`
- **Publicação:** GitHub Actions a cada push na branch principal

Quartz foi escolhido por nascer para este caso de uso. Wikilinks, callouts,
LaTeX, imagens `![[...]]`, busca full-text e tema claro/escuro funcionam sem
plugin de terceiros. As alternativas consideradas — MkDocs Material e um site
Astro do zero — exigiriam remendos ou reimplementação justamente nesses pontos.

## Estrutura

```
vault_20262/
├─ content/                      ← a vault aberta no Obsidian
│  ├─ index.md                   ← home
│  ├─ Calculo-2/
│  │  ├─ index.md                ← capa da disciplina (opcional)
│  │  ├─ Provas/
│  │  │  └─ 2025-P1.md
│  │  ├─ Exercicios/
│  │  └─ Simulados/
│  └─ Fisica-3/
├─ quartz/                       ← motor; alterações apenas em components/
├─ quartz.config.ts
├─ quartz.layout.ts
└─ .github/workflows/deploy.yml
```

**Descoberta automática.** Toda pasta de primeiro nível dentro de `content/` é
uma disciplina. Criar a pasta no Obsidian basta para o card surgir na home;
apagá-la o remove. Não existe lista de disciplinas em arquivo de configuração —
duplicar essa informação seria uma fonte garantida de desatualização.

**Subpastas livres.** `Provas`, `Exercicios` e `Simulados` são a convenção, não
uma exigência. A página da disciplina lista as seções que existirem.

### Frontmatter

Capa da disciplina (`Calculo-2/index.md`), todos os campos opcionais:

```yaml
---
title: Cálculo 2
emoji: ∫
codigo: MAT2454
descricao: Integrais múltiplas, séries e EDOs
---
```

Nota individual:

```yaml
---
title: P1 2025
tipo: prova # prova | exercicios | simulado
ano: 2025
tags: [calculo-2]
---
```

## Telas

### Home (`/`)

Grade de cards, um por disciplina, com emoji, nome, código, descrição e contagem
de notas. Um componente novo, `SubjectCards`, percorre a árvore de arquivos
durante o build e monta a grade.

Este é o único componente realmente novo do projeto.

### Disciplina (`/Calculo-2`)

Subpastas viram seções. Dentro de cada seção, as notas aparecem ordenadas por
`ano` decrescente, com título e data. Reaproveita a listagem de pasta nativa do
Quartz, com o agrupamento por seção acrescentado por cima.

### Nota (`/Calculo-2/Provas/2025-P1`)

Markdown renderizado com LaTeX (KaTeX), callouts do Obsidian, imagens e
wikilinks navegáveis. Funcionalidade nativa; cabe apenas configurar.

### Elementos permanentes

Sidebar esquerda com a árvore de pastas expansível, busca global por `Ctrl+K`
sobre o texto completo das notas, breadcrumb no topo e alternância claro/escuro.
Todos nativos do Quartz.

**Responsivo.** No celular a sidebar recolhe em menu e os cards passam a uma
coluna. Consultar material no trânsito é metade do valor do projeto.

**Graph view desligado.** Bonito, porém pouco útil numa vault organizada por
pastas rígidas, e polui a interface. Reativável em minutos se fizer falta.

## Robustez

Um arquivo mal preenchido nunca pode impedir os outros de aparecerem.

| Situação                  | Comportamento                            |
| ------------------------- | ---------------------------------------- |
| Disciplina sem `index.md` | Card usa o nome da pasta                 |
| Sem `emoji`               | Mostra a inicial do nome                 |
| Sem `ano`                 | Nota vai para o fim da lista, nunca some |
| Wikilink quebrado         | Marcado visualmente; build continua      |
| Imagem ausente            | Espaço vazio; build continua             |
| Pasta de disciplina vazia | Card aparece com contagem zero           |

## Verificação

Antes de publicar:

1. `npx quartz build --serve` sobe o site local.
2. Duas disciplinas de exemplo, uma com prova contendo LaTeX inline e em bloco,
   callout, imagem e wikilink.
3. Conferir no navegador: cards na home, fórmula renderizada, busca encontrando
   o texto da prova, árvore navegável, wikilink funcionando, layout íntegro em
   largura de celular.

Depois de publicar, conferir a URL real. Build local verde não garante Pages
funcionando — caminho de assets em subpasta (`/vault_20262/`) é a falha clássica
desse tipo de deploy, e só aparece no site publicado.

## Fora de escopo

Autenticação, comentários, graph view, edição pelo navegador, geração automática
de flashcards e busca por fórmula matemática. Nenhum deles é necessário para
ler uma prova no celular.

## Nota de implementação

O repositório nasce de um clone do Quartz, o que preserva o histórico do upstream
e permite atualizar depois com `git pull upstream v4`. Por isso este documento é
commitado no primeiro passo da implementação, junto ao setup do repositório, e
não antes — um histórico órfão criado agora tornaria esse merge desnecessariamente
penoso.
