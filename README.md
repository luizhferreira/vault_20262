# vault_20262

Provas, listas e simulados em Markdown, escritos no Obsidian e publicados em
<https://luizhferreira.github.io/vault_20262>.

Construído sobre [Quartz 4](https://quartz.jzhao.xyz/).

## Uso diário

Abra a pasta `content/` como vault no Obsidian. Escreva normalmente. Ao terminar:

```bash
git add -A && git commit -m "adiciona P2 de Cálculo 2" && git push
```

O GitHub Actions publica em cerca de um minuto e meio. Nada além disso.

## Como o site se organiza

Toda pasta de primeiro nível dentro de `content/` vira uma disciplina na home
automaticamente. Criar a pasta basta; não existe lista para manter em lugar
nenhum.

```
content/
├─ index.md          ← texto da home
├─ Calculo-2/
│  ├─ index.md       ← capa da disciplina (opcional)
│  ├─ Provas/
│  ├─ Exercicios/
│  └─ Simulados/
└─ Fisica-3/
```

As subpastas são livres — `Provas`, `Exercicios` e `Simulados` são só a
convenção. A página da disciplina mostra as seções que existirem.

### Frontmatter

Na capa da disciplina, todos os campos são opcionais:

```yaml
---
title: Cálculo 2
emoji: ∫
codigo: MAT2454
descricao: Integrais múltiplas, séries e EDOs
---
```

Sem `title` o card usa o nome da pasta; sem `emoji`, a inicial.

Nas notas, `ano` controla a ordenação (mais recente primeiro):

```yaml
---
title: P1 2025
tipo: prova # prova | exercicios | simulado
ano: 2025
tags: [calculo-2]
---
```

Nota sem `ano` vai para o fim da lista, nunca some.

## Rodar localmente

```bash
npx quartz build --serve
```

Abre em <http://localhost:8080> e recarrega ao salvar.

## O que foi alterado no Quartz

Atualizar o motor é `git pull upstream v4`. Estes pontos podem conflitar — todos
pequenos e fáceis de resolver a favor da versão local:

| Arquivo                              | Alteração                                                     |
| ------------------------------------ | ------------------------------------------------------------- |
| `quartz.config.ts`                   | baseUrl, locale pt-BR, sem analytics, sem OG images           |
| `quartz.layout.ts`                   | cards na home, graph view removido, links do rodapé           |
| `quartz/components/SubjectCards.tsx` | novo — grade de disciplinas                                    |
| `quartz/components/SubjectContent.tsx` | novo — agrupa notas por seção na página da disciplina        |
| `quartz/i18n/locales/pt-BR.ts`       | "folder" traduzido como "pasta", não "arquivo"                |
| `quartz/plugins/emitters/folderPage.tsx` | título de pasta sem index.md vira o nome da pasta         |

Os workflows `ci.yaml`, `build-preview.yaml`, `deploy-preview.yaml` e
`docker-build-push.yaml` são do desenvolvimento do próprio Quartz e só rodam no
repositório original — ficam inertes aqui e por isso foram mantidos intactos.
