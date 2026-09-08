import {
  byDateDesc,
  listSlugs,
  missingFile,
  readMarkdown,
} from '~/lib/contentDir'
import { ContentImage, publicImage } from '~/lib/contentImage'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
  mainImage: ContentImage
}

function loadPost(slug: string): BlogPost {
  const parsed = readMarkdown('blog', `${slug}.md`)
  return {
    slug,
    title: parsed.data.title,
    date: String(parsed.data.date),
    excerpt: parsed.data.excerpt,
    body: parsed.content.trim(),
    mainImage: publicImage(`blog/${slug}/main.png`),
  }
}

export function getPostSlugs(): string[] {
  return listSlugs('blog')
}

export function getBlogPosts(): BlogPost[] {
  return getPostSlugs().map(loadPost).sort(byDateDesc)
}

export function getBlogPost(slug: string): BlogPost | null {
  return missingFile(() => loadPost(slug))
}
