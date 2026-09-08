import {
  byDateDesc,
  listSlugs,
  missingFile,
  readMarkdown,
} from '~/lib/contentDir'
import { ContentImage, publicImage } from '~/lib/contentImage'
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
  const parsed = readMarkdown('projects', `${slug}.md`)
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
  return listSlugs('projects')
}

export function getProjects(): Project[] {
  return getProjectSlugs().map(loadProject).sort(byDateDesc)
}

export function getProject(slug: string): Project | null {
  return missingFile(() => loadProject(slug))
}
