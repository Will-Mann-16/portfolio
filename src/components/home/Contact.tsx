import { Box, Container, Heading, Link, Stack, Text } from '@chakra-ui/react'

export function Contact() {
  return (
    <Box bg="brand.300" id="contact" p={8}>
      <Container maxW="container.lg">
        <Stack spacing={8}>
          <Stack>
            <Heading as="h2" fontSize="4xl" color="brand.900">
              Contact
            </Heading>
            <Text color="brand.900">
              If you&apos;d like to get in touch, feel free to send me an email
              at{' '}
              <Link href="mailto:will@willmann.me.uk" color="blue.700">
                will@willmann.me.uk
              </Link>{' '}
              or feel free to reach out to me on{' '}
              <Link
                href="https://www.linkedin.com/in/will-mann-265574156/"
                color="blue.700"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
              . I&apos;m always open to new opportunities, so if you&apos;d like
              to work with me, please get in touch.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
