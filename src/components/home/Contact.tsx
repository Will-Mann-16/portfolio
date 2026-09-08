import { Box, Container, Heading, Link, Stack, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'

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
            <ReactMarkdown
              components={{
                p: ({ children }) => <Text color="brand.900">{children}</Text>,
                a: ({ href, children }) => {
                  const external = href?.startsWith('http')
                  return (
                    <Link
                      href={href}
                      color="blue.700"
                      isExternal={external}
                      rel={external ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </Link>
                  )
                },
              }}
            >
              {body}
            </ReactMarkdown>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
