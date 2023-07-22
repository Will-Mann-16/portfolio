import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

import { SanityImageType } from './sanity.image'

export const technologiesQuery = groq`*[_type == "technology"] | order(proficiency desc) {
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
}`

export async function getTechnologies(
  client: SanityClient
): Promise<Technology[]> {
  return await client.fetch(technologiesQuery)
}

export interface Technology {
  _type: 'technology'
  _id: string
  _createdAt: string
  title?: string
  link?: string
  description?: string
  logo?: SanityImageType
  icon?: SanityImageType
  proficiency?: number
}
