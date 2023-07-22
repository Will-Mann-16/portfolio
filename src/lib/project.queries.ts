import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

import { SanityImageType } from './sanity.image'
import { Technology } from './technology.queries'

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
    ...,
    technologies[]-> {
        ...,
        logo {
            ...,
            asset-> {
                ...,
                metadata
            }
        },
        icon {
            ...,
            asset-> {
                ...,
                metadata
            }
        }
    },
    mainImage {
        ...,
        asset-> {
            ...,
            metadata
        }
    }
}`

export async function getProjects(client: SanityClient): Promise<Project[]> {
  return await client.fetch(projectsQuery)
}

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
    ...,
    technologies[]-> {
        ...,
        logo {
            ...,
            asset-> {
                ...,
                metadata
            }
        },
        icon {
            ...,
            asset-> {
                ...,
                metadata
            }
        }
    },
    mainImage {
        ...,
        asset-> {
            ...,
            metadata
        }
    },
}`

export async function getProject(
  client: SanityClient,
  slug: string
): Promise<Project> {
  return await client.fetch(projectBySlugQuery, {
    slug,
  })
}

export const projectSlugsQuery = groq`
*[_type == "project" && defined(slug.current)][].slug.current
`

export interface Project {
  _type: 'project'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: SanityImageType
  body: PortableTextBlock[]
  technologies: Technology[]
}
