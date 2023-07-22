import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'

import { About } from '~/components/home/About'
import { Contact } from '~/components/home/Contact'
import { Hero } from '~/components/home/Hero'
import { Projects } from '~/components/home/Projects'
import { Technologies } from '~/components/home/Technologies'
import { Layout } from '~/components/Layout'
import { MotionBox } from '~/components/Motion'
import { getAboutPage, Page } from '~/lib/page.queries'
import { getProjects, Project } from '~/lib/project.queries'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { getTechnologies, Technology } from '~/lib/technology.queries'

export default function IndexPage({
  about,
  projects,
  technologies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero />
      <About about={about} />
      <Projects projects={projects} />
      <Technologies technologies={technologies} />
      <Contact />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{
  about: Page
  projects: Project[]
  technologies: Technology[]
}> = async () => {
  const client = getClient()
  const about = await getAboutPage(client)

  if (!about) {
    return {
      notFound: true,
    }
  }

  const projects = await getProjects(client)
  const technologies = await getTechnologies(client)

  return {
    props: {
      about,
      projects,
      technologies,
    },
  }
}
