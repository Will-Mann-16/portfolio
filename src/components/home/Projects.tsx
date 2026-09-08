import {
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import Link from 'next/link'

import { ContentImage } from '~/components/ContentImage'
import type { Project } from '~/lib/project.queries'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <Box bg="brand.700" id="projects" p={8}>
      <Container maxW="container.lg">
        <Stack spacing={8}>
          <Stack>
            <Heading as="h2" fontSize="4xl" color="brand.100">
              Projects
            </Heading>
            <Text color="brand.100">
              Side projects from school and university. Click one to find out
              more.
            </Text>
          </Stack>
          <Stack
            color="brand.100"
            divider={
              <StackDivider borderColor="brand.500" borderWidth="1.5px" />
            }
          >
            {projects.map((project) => (
              <Stack
                flexDir={{ base: 'column', md: 'row' }}
                alignItems="center"
                as={Link}
                href={`/projects/${project.slug}`}
                key={project.slug}
                cursor="pointer"
                transitionDuration="0.3s"
                rounded="md"
                p={4}
                _hover={{
                  textDecoration: 'none',
                  bg: 'brand.600',
                }}
              >
                <ContentImage
                  src={project.mainImage.src}
                  alt={project.title}
                  style={{
                    height: '90px',
                    width: '160px',
                    objectFit: 'contain',
                    borderRadius: '0.5rem',
                  }}
                />
                <Stack>
                  <HStack alignItems="stretch">
                    <Heading
                      as="h3"
                      fontSize="2xl"
                      verticalAlign="middle"
                      pt={1}
                    >
                      {project.title}
                    </Heading>
                    {project.technologies?.map((technology) => (
                      <Tooltip label={technology.title} key={technology.id}>
                        <Tag p={1} bg="brand.500">
                          <ContentImage
                            src={technology.icon.src}
                            alt={technology.title}
                            style={{
                              height: '25px',
                              width: '25px',
                              objectFit: 'contain',
                            }}
                          />
                        </Tag>
                      </Tooltip>
                    ))}
                  </HStack>
                  <Text>{project.excerpt}</Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
