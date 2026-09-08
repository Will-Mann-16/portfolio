import { listContentFiles, readContentFile } from '~/lib/contentDir'
import { ContentImage, publicImage } from '~/lib/contentImage'
import { parseMarkdownFile } from '~/lib/parseMarkdownFile'
import { getTechnologiesById, Technology } from '~/lib/technology.queries'

export interface Project {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
  mainImage: ContentImage
  technologies: Technology[]
}

function loadProject(slug: string): Project {
  const parsed = parseMarkdownFile(readContentFile('projects', `${slug}.md`))
  const byId = getTechnologiesById()
  const ids = (parsed.data.technologies as string[]) || []
  return {
    slug,
    title: parsed.data.title,
    date: String(parsed.data.date),
    excerpt: parsed.data.excerpt,
    body: parsed.content.trim(),
    mainImage: publicImage(`projects/${slug}/main.png`),
    technologies: ids.map((id) => {
      const tech = byId[id]
      if (!tech) {
        throw new Error(`Unknown technology id ${id} on project ${slug}`)
      }
      return tech
    }),
  }
}

export function getProjectSlugs(): string[] {
  return listContentFiles('projects', '.md').map((name) => name.replace(/\.md$/, ''))
}

export function getProjects(): Project[] {
  return getProjectSlugs()
    .map(loadProject)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getProject(slug: string): Project | null {
  try {
    return loadProject(slug)
  } catch (err) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code: string }).code === 'ENOENT'
    ) {
      return null
    }
    throw err
  }
}
