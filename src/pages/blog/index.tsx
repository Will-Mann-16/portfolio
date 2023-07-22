import {
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Layout } from '~/components/Layout'
import { SanityImage } from '~/components/SanityImage'
import { BlogPost, getBlogPosts } from '~/lib/blogPost.queries'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { formatDate } from '~/utils'

import bg from '../../assets/bg.svg'

export default function Blog({
  blogPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Blog">
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
          maxW="container.lg"
          minH="87.5vh"
          py={20}
          px={10}
        >
          <Stack spacing={8}>
            <Stack>
              <Heading as="h2" fontSize="4xl" color="brand.100">
                Blog
              </Heading>
              <Text color="brand.100">
                Here are some of the blog posts I&apos;ve written recently.
                Click a post to find out more.
              </Text>
            </Stack>
            <Stack
              color="brand.100"
              divider={
                <StackDivider borderColor="brand.500" borderWidth="1.5px" />
              }
            >
              {blogPosts.map((post) => (
                <Stack
                  flexDir={{ base: 'column', md: 'row' }}
                  alignItems="center"
                  as={Link}
                  href={`/blog/${post.slug.current}`}
                  key={post._id}
                  cursor="pointer"
                  transitionDuration="0.3s"
                  rounded="md"
                  p={4}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'brand.600',
                  }}
                >
                  {post.mainImage ? (
                    <SanityImage
                      image={post.mainImage}
                      alt={post.title}
                      style={{
                        width: '160px',
                        height: '90px',
                        objectFit: 'contain',
                        borderRadius: '0.5rem',
                      }}
                    />
                  ) : (
                    <Box height={160} width={90} />
                  )}
                  <Stack>
                    <HStack alignItems="stretch" justifyContent="space-between">
                      <Heading
                        as="h3"
                        fontSize="2xl"
                        verticalAlign="middle"
                        pt={1}
                      >
                        {post.title}
                      </Heading>
                      <Heading
                        as="h4"
                        fontSize="md"
                        verticalAlign="middle"
                        textAlign="right"
                        pt={3}
                        color="brand.300"
                      >
                        {formatDate(post._createdAt)}
                      </Heading>
                    </HStack>
                    <Text>{post.excerpt}</Text>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{
  blogPosts: BlogPost[]
}> = async () => {
  const client = getClient()
  const blogPosts = await getBlogPosts(client)

  return {
    props: {
      blogPosts,
    },
  }
}
