import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { Technology } from '~/lib/technology.queries'

import { SanityImage } from '../SanityImage'

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
              Here are some of the technologies I&apos;ve worked with recently.
              I&apos;m always learning new things, so this list is always
              growing. Click a technology to find out more.
            </Text>
            <SimpleGrid minChildWidth={200} spacing={4} w="full">
              {technologies.map((technology) => (
                <TechnologyCard technology={technology} key={technology._id} />
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
          <SanityImage
            image={technology.logo}
            alt={technology.title}
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Heading as="h3" flex={1} fontSize="2xl" color="brand.600">
          {technology.title}
        </Heading>
        <Tooltip label="Proficiency">
          <CircularProgress value={technology.proficiency} color="green.600">
            <CircularProgressLabel
              fontSize="sm"
              color="green.800"
              fontWeight="bold"
            >
              {technology.proficiency}%
            </CircularProgressLabel>
          </CircularProgress>
        </Tooltip>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="brand.500">
          <ModalHeader>
            <HStack>
              <Box height={65} width={65} position="relative">
                <SanityImage
                  image={technology.logo}
                  alt={technology.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Heading as="h3" fontSize="2xl" color="brand.100">
                {technology.title}
              </Heading>
              <Tooltip label="Proficiency">
                <CircularProgress
                  value={technology.proficiency}
                  color="green.400"
                >
                  <CircularProgressLabel fontSize="sm" color="green.200">
                    {technology.proficiency}%
                  </CircularProgressLabel>
                </CircularProgress>
              </Tooltip>
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
