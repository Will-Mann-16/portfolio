import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { ContentImage } from '~/components/ContentImage'
import { Layout } from '~/components/Layout'
import { MarkdownBody } from '~/components/MarkdownBody'
import { BlogPost, getBlogPost, getPostSlugs } from '~/lib/blogPost.queries'
import { formatDate } from '~/utils'

import bg from '../../assets/bg.svg'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  { blogPost: BlogPost },
  Query
> = async ({ params = {} }) => {
  const blogPost = getBlogPost(params.slug)

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

export default function BlogPostPage({
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
              <ContentImage
                src={blogPost.mainImage.src}
                alt={blogPost.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Heading as="h1" fontSize="4xl" color="brand.100">
              {blogPost.title}
            </Heading>
            <Heading as="h2" fontSize="xl" color="brand.200">
              {formatDate(blogPost.date)}
            </Heading>
            <Stack color="brand.100">
              <MarkdownBody markdown={blogPost.body} />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const slugs = getPostSlugs()

  return {
    paths: slugs.map((slug) => `/blog/${slug}`),
    fallback: 'blocking',
  }
}
