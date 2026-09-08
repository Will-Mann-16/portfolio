import { readContentFile } from '~/lib/contentDir'
import { parseMarkdownFile } from '~/lib/parseMarkdownFile'

export interface Page {
  title: string
  body: string
}

export function getAboutPage(): Page {
  const parsed = parseMarkdownFile(readContentFile('about.md'))
  return {
    title: parsed.data.title,
    body: parsed.content.trim(),
  }
}

export function getContact(): string {
  return readContentFile('contact.md').trim()
}
