import { AtSignIcon } from '@chakra-ui/icons'
import { Flex, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { Links } from './Navbar'

export function Footer() {
  return (
    <Flex
      as="footer"
      flex={0}
      bg="brand.500"
      flexDir="column"
      align="center"
      justify="space-evenly"
      w="100%"
      p={4}
    >
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={4}>
        <Links />
      </Stack>
      <HStack spacing={4}>
        <IconButton
          as="a"
          href="mailto:will@willmann.me.uk"
          icon={<AtSignIcon />}
          aria-label="email"
          fontSize="4xl"
          color="white"
          variant="link"
          transitionDuration="0.3s"
          _hover={{
            color: 'whiteAlpha.700',
          }}
        />
        <IconButton
          as="a"
          href="https://github.com/Will-Mann-16"
          icon={<FaGithub />}
          aria-label="github"
          fontSize="4xl"
          color="white"
          variant="link"
          transitionDuration="0.3s"
          _hover={{
            color: 'whiteAlpha.700',
          }}
        />
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/will-mann-265574156/"
          icon={<FaLinkedin />}
          aria-label="linked-in"
          fontSize="4xl"
          color="white"
          variant="link"
          transitionDuration="0.3s"
          _hover={{
            color: 'whiteAlpha.700',
          }}
        />
      </HStack>
      <Flex mt={4} align="center" justify="center">
        <Text fontSize="sm" color="white">
          Will Mann is a computing graduate who developed this portfolio as a
          showcase of his skills.
        </Text>
      </Flex>
    </Flex>
  )
}
