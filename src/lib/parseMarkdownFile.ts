import matter from 'gray-matter'

export function parseMarkdownFile(raw: string) {
  return matter(raw)
}
