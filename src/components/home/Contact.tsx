import { Box, Container, Heading, Stack } from '@chakra-ui/react'

import { ContactMarkdown } from '~/components/MarkdownBody'

interface ContactProps {
  body: string
}

export function Contact({ body }: ContactProps) {
  return (
    <Box bg="brand.300" id="contact" p={8}>
      <Container maxW="container.lg">
        <Stack spacing={8}>
          <Stack>
            <Heading as="h2" fontSize="4xl" color="brand.900">
              Contact
            </Heading>
            <ContactMarkdown markdown={body} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
