import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { PageList, SortFn } from "./PageList"
import { htmlToJsx } from "../util/jsx"
import { Root } from "hast"
import { ComponentChildren } from "preact"
import { concatenateResources } from "../util/resources"
import FolderContent from "./pages/FolderContent"
import listStyle from "./styles/listPage.scss"
import style from "./styles/subjectContent.scss"

// Notas mais recentes primeiro. Quem nao declara `ano` no frontmatter vai para o
// fim da lista em vez de sumir.
const porAno: SortFn = (a, b) => {
  const anoA = Number(a.frontmatter?.ano)
  const anoB = Number(b.frontmatter?.ano)
  const temA = Number.isFinite(anoA)
  const temB = Number.isFinite(anoB)

  if (temA && temB && anoA !== anoB) return anoB - anoA
  if (temA !== temB) return temA ? -1 : 1

  const tituloA = a.frontmatter?.title ?? ""
  const tituloB = b.frontmatter?.title ?? ""
  return tituloA.localeCompare(tituloB, "pt-BR")
}

function nomeDaPasta(pasta: string): string {
  return pasta.replace(/[-_]+/g, " ").trim()
}

interface Secao {
  pasta: string
  titulo: string
  notas: QuartzPluginData[]
}

export default (() => {
  // Paginas de pasta que nao sao de disciplina (ex.: Calculo-2/Provas) usam a
  // listagem nativa do Quartz.
  const Folder = FolderContent({ sort: porAno })

  const SubjectContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles } = props
    const partes = fileData.slug!.split("/")

    // "Calculo-2/index" tem duas partes; qualquer coisa mais funda e subpasta
    if (partes.length !== 2 || partes[1] !== "index") {
      return <Folder {...props} />
    }

    const disciplina = partes[0]
    const prefixo = `${disciplina}/`
    const secoes = new Map<string, Secao>()
    const soltas: QuartzPluginData[] = []

    for (const file of allFiles) {
      const slug = file.slug
      if (!slug?.startsWith(prefixo)) continue

      const resto = slug.slice(prefixo.length).split("/")
      const ehIndex = resto[resto.length - 1] === "index"

      if (resto.length === 1) {
        // Nota solta na raiz da disciplina; o proprio index.md nao se lista
        if (!ehIndex) soltas.push(file)
        continue
      }

      const pasta = resto[0]
      const secao = secoes.get(pasta) ?? { pasta, titulo: nomeDaPasta(pasta), notas: [] }

      if (ehIndex && resto.length === 2) {
        // O index.md da subpasta nomeia a secao em vez de virar item dela
        const titulo = file.frontmatter?.title?.trim()
        if (titulo && titulo !== "index") secao.titulo = titulo
      } else if (!ehIndex) {
        secao.notas.push(file)
      }

      secoes.set(pasta, secao)
    }

    const conteudo = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren

    const lista = [...secoes.values()].sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"))

    return (
      <div class="popover-hint">
        <article>{conteudo}</article>

        {soltas.length > 0 && (
          <div class="page-listing">
            <PageList {...props} allFiles={soltas} sort={porAno} />
          </div>
        )}

        {lista.map(({ pasta, titulo, notas }) => (
          <section class="subject-section">
            <h2>
              <a
                class="internal"
                href={resolveRelative(fileData.slug!, `${disciplina}/${pasta}/` as SimpleSlug)}
              >
                {titulo}
              </a>
              <span class="subject-section-count">
                {notas.length === 1 ? "1 nota" : `${notas.length} notas`}
              </span>
            </h2>
            {notas.length > 0 ? (
              <div class="page-listing">
                <PageList {...props} allFiles={notas} sort={porAno} />
              </div>
            ) : (
              <p class="subject-section-empty">Nada aqui ainda.</p>
            )}
          </section>
        ))}
      </div>
    )
  }

  SubjectContent.css = concatenateResources(listStyle, style, PageList.css)
  return SubjectContent
}) satisfies QuartzComponentConstructor
