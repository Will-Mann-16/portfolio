import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

import { contentDir } from '~/lib/contentDir'
import { ContentImage, publicImage } from '~/lib/contentImage'

export interface Technology {
  id: string
  title: string
  link: string
  description: string
  logo: ContentImage
  icon: ContentImage
}

type TechnologyFile = {
  id: string
  title: string
  link: string
  description: string
}

function techImages(id: string): { logo: ContentImage; icon: ContentImage } {
  const shared = path.join(contentDir, 'images', 'technologies', `${id}.png`)
  if (fs.existsSync(shared)) {
    const img = publicImage(`technologies/${id}.png`)
    return { logo: img, icon: img }
  }
  return {
    logo: publicImage(`technologies/${id}-logo.png`),
    icon: publicImage(`technologies/${id}-icon.png`),
  }
}

export function getTechnologies(): Technology[] {
  const raw = fs.readFileSync(
    path.join(contentDir, 'technologies.yaml'),
    'utf8'
  )
  const rows = yaml.load(raw) as TechnologyFile[]
  return rows.map((row) => ({
    ...row,
    ...techImages(row.id),
  }))
}

export function getTechnologiesById(): Record<string, Technology> {
  return Object.fromEntries(getTechnologies().map((t) => [t.id, t]))
}
