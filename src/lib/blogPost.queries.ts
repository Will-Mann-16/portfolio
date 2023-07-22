import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

import { SanityImageType } from './sanity.image'

export const blogPostsQuery = groq`*[_type == "blogPost" && defined(slug.current)] | order(_createdAt desc) {
    ...,
    mainImage {
        ...,
        asset-> {
          ...,
          metadata
        }
    }
}`

export async function getBlogPosts(client: SanityClient): Promise<BlogPost[]> {
  return await client.fetch(blogPostsQuery)
}

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
    ...,
    mainImage {
        ...,
        asset-> {
          ...,
          metadata
        }
    }
}`

export async function getBlogPost(
  client: SanityClient,
  slug: string
): Promise<BlogPost> {
  return await client.fetch(blogPostBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "blogPost" && defined(slug.current)][].slug.current
`

export interface BlogPost {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: SanityImageType
  body: PortableTextBlock[]
}
