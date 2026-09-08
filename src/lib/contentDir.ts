import fs from 'fs'
import path from 'path'

export const contentDir = path.join(process.cwd(), 'content')

export function readContentFile(...segments: string[]) {
  return fs.readFileSync(path.join(contentDir, ...segments), 'utf8')
}

export function listContentFiles(subdir: string, ext: string) {
  return fs
    .readdirSync(path.join(contentDir, subdir))
    .filter((name) => name.endsWith(ext))
    .sort()
}
