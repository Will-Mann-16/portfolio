import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export const contentDir = path.join(process.cwd(), 'content')

export function readContentFile(...segments: string[]) {
  return fs.readFileSync(path.join(contentDir, ...segments), 'utf8')
}

export function readMarkdown(...segments: string[]) {
  return matter(readContentFile(...segments))
}

export function listContentFiles(subdir: string, ext: string) {
  return fs
    .readdirSync(path.join(contentDir, subdir))
    .filter((name) => name.endsWith(ext))
    .sort()
}

export function listSlugs(subdir: string) {
  return listContentFiles(subdir, '.md').map((name) =>
    name.replace(/\.md$/, '')
  )
}

export function missingFile<T>(load: () => T): T | null {
  try {
    return load()
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

export function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
}
