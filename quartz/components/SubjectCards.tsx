import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import style from "./styles/subjectCards.scss"

// Pastas de primeiro nivel que o Quartz gera sozinho e nao sao disciplinas
const naoDisciplinas = new Set(["tags"])

interface Disciplina {
  pasta: string
  index?: QuartzPluginData
  notas: number
}

// "Calculo-2" -> "Calculo 2". Usado quando a disciplina nao tem index.md
// ou o index.md nao define um title.
function nomeDaPasta(pasta: string): string {
  return pasta.replace(/[-_]+/g, " ").trim()
}

export default (() => {
  const SubjectCards: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const disciplinas = new Map<string, Disciplina>()

    for (const file of allFiles) {
      const slug = file.slug
      if (!slug) continue

      const partes = slug.split("/")
      // Arquivos na raiz de content/ nao pertencem a nenhuma disciplina
      if (partes.length < 2 || naoDisciplinas.has(partes[0])) continue

      const pasta = partes[0]
      const disciplina = disciplinas.get(pasta) ?? { pasta, notas: 0 }

      if (partes.length === 2 && partes[1] === "index") {
        disciplina.index = file
      } else if (partes[partes.length - 1] !== "index") {
        disciplina.notas += 1
      }

      disciplinas.set(pasta, disciplina)
    }

    if (disciplinas.size === 0) return null

    const cards = [...disciplinas.values()]
      .map(({ pasta, index, notas }) => {
        const fm = index?.frontmatter
        // O plugin FrontMatter usa o nome do arquivo quando falta title, o que
        // para uma capa de disciplina resultaria no literal "index".
        const title = fm?.title?.trim()
        return {
          pasta,
          notas,
          titulo: !title || title === "index" ? nomeDaPasta(pasta) : title,
          emoji: fm?.emoji as string | undefined,
          codigo: fm?.codigo as string | undefined,
          descricao: fm?.descricao as string | undefined,
        }
      })
      .sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"))

    return (
      <div class="subject-cards">
        {cards.map(({ pasta, notas, titulo, emoji, codigo, descricao }) => (
          <a
            class="subject-card internal"
            href={resolveRelative(fileData.slug!, `${pasta}/` as SimpleSlug)}
          >
            <div class="subject-mark">{emoji ?? [...titulo][0].toUpperCase()}</div>
            <div class="subject-info">
              <h3 class="subject-title">{titulo}</h3>
              {codigo && <span class="subject-code">{codigo}</span>}
              {descricao && <p class="subject-desc">{descricao}</p>}
            </div>
            <span class="subject-count">{notas === 1 ? "1 nota" : `${notas} notas`}</span>
          </a>
        ))}
      </div>
    )
  }

  SubjectCards.css = style
  return SubjectCards
}) satisfies QuartzComponentConstructor
