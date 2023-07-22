import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'

import { Page } from '~/lib/page.queries'

interface AboutProps {
  about: Page
}

export function About({ about }: AboutProps) {
  return (
    <Box bg="brand.300" id="about" p={8}>
      <Container maxW="container.lg">
        <Stack spacing={8}>
          <Heading as="h2" fontSize="4xl" color="brand.900">
            {about.title}
          </Heading>
          <Stack color="brand.900">
            <PortableText value={about.body} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
