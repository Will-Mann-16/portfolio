import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { Layout } from '~/components/Layout'
import { PortableText } from '~/components/PortableText'
import { SanityImage } from '~/components/SanityImage'
import { BlogPost, getBlogPost, postSlugsQuery } from '~/lib/blogPost.queries'
import { getClient } from '~/lib/sanity.client'
import { formatDate } from '~/utils'

import bg from '../../assets/bg.svg'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  { blogPost: BlogPost },
  Query
> = async ({ params = {} }) => {
  const client = getClient()
  const blogPost = await getBlogPost(client, params.slug)

  if (!blogPost) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      blogPost,
    },
  }
}

export default function BlogPost({
  blogPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={blogPost.title} description={blogPost.excerpt}>
      <Box
        bgImage={`url(${bg.src})`}
        w="full"
        h="full"
        bgAttachment="scroll"
        bgRepeat="repeat"
        bgPos="center"
        bgSize="contain"
      >
        <Container
          bg="brand.500"
          minH="87.5vh"
          maxW="container.lg"
          h="full"
          py={20}
          px={10}
        >
          <Stack>
            <Box
              aspectRatio={16 / 9}
              position="relative"
              w="full"
              rounded="md"
              overflow="hidden"
            >
              <SanityImage
                image={blogPost.mainImage}
                alt={blogPost.title}
                fill
              />
            </Box>
            <Heading as="h1" fontSize="4xl" color="brand.100">
              {blogPost.title}
            </Heading>
            <Heading as="h2" fontSize="xl" color="brand.200">
              {formatDate(blogPost._createdAt)}
            </Heading>
            <Stack color="brand.100">
              <PortableText value={blogPost.body} />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/blog/${slug}`) || [],
    fallback: 'blocking',
  }
}
