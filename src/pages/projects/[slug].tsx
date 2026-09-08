import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { ContentImage } from '~/components/ContentImage'
import { Layout } from '~/components/Layout'
import { MarkdownBody } from '~/components/MarkdownBody'
import { getProject, getProjectSlugs, Project } from '~/lib/project.queries'
import { formatDate } from '~/utils'

import bg from '../../assets/bg.svg'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  { project: Project },
  Query
> = async ({ params = {} }) => {
  const project = getProject(params.slug)

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

export default function ProjectPage({
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
              <ContentImage
                src={project.mainImage.src}
                alt={project.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Heading as="h1" fontSize="4xl" color="brand.100">
              {project.title}
            </Heading>
            <Heading as="h2" fontSize="xl" color="brand.200">
              {formatDate(project.date)}
            </Heading>
            <Stack color="brand.100">
              <MarkdownBody markdown={project.body} />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const slugs = getProjectSlugs()

  return {
    paths: slugs.map((slug) => `/projects/${slug}`),
    fallback: 'blocking',
  }
}
