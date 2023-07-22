import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const aboutPageQuery = groq`*[_type == "page" && slug.current == "about"][0]`

export async function getAboutPage(client: SanityClient): Promise<Page> {
  return await client.fetch(aboutPageQuery)
}

export interface Page {
  _type: 'page'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  body: PortableTextBlock[]
}
