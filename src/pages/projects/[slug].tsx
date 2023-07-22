import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'

import { Layout } from '~/components/Layout'
import { PortableText } from '~/components/PortableText'
import { SanityImage } from '~/components/SanityImage'
import { getProject, Project, projectSlugsQuery } from '~/lib/project.queries'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { formatDate } from '~/utils'

import bg from '../../assets/bg.svg'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  { project: Project },
  Query
> = async ({ params = {} }) => {
  const client = getClient()
  const project = await getProject(client, params.slug)

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
    },
  }
}

export default function Project({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={project.title} description={project.excerpt}>
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
              <SanityImage image={project.mainImage} alt={project.title} fill />
            </Box>
            <Heading as="h1" fontSize="4xl" color="brand.100">
              {project.title}
            </Heading>
            <Heading as="h2" fontSize="xl" color="brand.200">
              {formatDate(project._createdAt)}
            </Heading>
            <Stack color="brand.100">
              <PortableText value={project.body} />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(projectSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/projects/${slug}`) || [],
    fallback: 'blocking',
  }
}
