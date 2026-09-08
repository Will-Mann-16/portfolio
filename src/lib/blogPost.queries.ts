import { listContentFiles, readContentFile } from '~/lib/contentDir'
import { ContentImage, publicImage } from '~/lib/contentImage'
import { parseMarkdownFile } from '~/lib/parseMarkdownFile'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
  mainImage: ContentImage
}

function loadPost(slug: string): BlogPost {
  const parsed = parseMarkdownFile(readContentFile('blog', `${slug}.md`))
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
  return listContentFiles('blog', '.md').map((name) => name.replace(/\.md$/, ''))
}

export function getBlogPosts(): BlogPost[] {
  return getPostSlugs()
    .map(loadPost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    return loadPost(slug)
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
