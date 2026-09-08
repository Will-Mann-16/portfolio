import { readContentFile, readMarkdown } from '~/lib/contentDir'

export interface Page {
  title: string
  body: string
}

export function getAboutPage(): Page {
  const parsed = readMarkdown('about.md')
  return {
    title: parsed.data.title,
    body: parsed.content.trim(),
  }
}

export function getContact(): string {
  return readContentFile('contact.md').trim()
}
