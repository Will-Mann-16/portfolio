import {
  Box,
  Button,
  Container,
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
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { ContentImage } from '~/components/ContentImage'
import type { Technology } from '~/lib/technology.queries'

interface TechnologiesProps {
  technologies: Technology[]
}

export function Technologies({ technologies }: TechnologiesProps) {
  return (
    <Box bg="brand.500" id="technologies" p={8}>
      <Container maxW="container.lg">
        <Stack spacing={8}>
          <Stack>
            <Heading as="h2" fontSize="4xl" color="brand.100">
              Technologies
            </Heading>
            <Text color="brand.100">
              These are the tools I work with most. Click one for a short note.
            </Text>
            <SimpleGrid minChildWidth={200} spacing={4} w="full">
              {technologies.map((technology) => (
                <TechnologyCard technology={technology} key={technology.id} />
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

interface TechnologyCardProps {
  technology: Technology
}

function TechnologyCard({ technology }: TechnologyCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <HStack
        w="full"
        align="center"
        bg="brand.200"
        cursor="pointer"
        onClick={onOpen}
        _hover={{
          bg: 'brand.300',
        }}
        transitionDuration="0.3s"
        rounded="md"
        p={3}
      >
        <Box height={65} width={65} position="relative">
          <ContentImage
            src={technology.logo.src}
            alt={technology.title}
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Heading as="h3" flex={1} fontSize="2xl" color="brand.600">
          {technology.title}
        </Heading>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="brand.500">
          <ModalHeader>
            <HStack>
              <Box height={65} width={65} position="relative">
                <ContentImage
                  src={technology.logo.src}
                  alt={technology.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Heading as="h3" fontSize="2xl" color="brand.100">
                {technology.title}
              </Heading>
            </HStack>
            <ModalCloseButton color="brand.100" />
          </ModalHeader>
          <ModalBody>
            {technology.description && (
              <Text color="brand.100">{technology.description}</Text>
            )}
            {technology.link && (
              <Link
                w="full"
                href={technology.link}
                textAlign="center"
                color="blue.300"
                _hover={{
                  textDecoration: 'underline',
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find out more
              </Link>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="brand">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
