import { HamburgerIcon } from '@chakra-ui/icons'
import { Link, LinkProps } from '@chakra-ui/next-js'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MouseEvent, useCallback, useRef } from 'react'

import { MotionBox } from './Motion'
import { WM } from './WM'

function Navlink({ children, ...props }: LinkProps) {
  return (
    <Link
      color="white"
      fontWeight="bold"
      _hover={{
        color: 'whiteAlpha.700',
      }}
      transitionDuration="0.3s"
      textAlign="center"
      px={{ base: 4, md: 2 }}
      py={{ base: 2, md: 0 }}
      {...props}
    >
      {children}
    </Link>
  )
}

interface LinksProps {
  onSuccess?: () => void
}

export function Links({ onSuccess }: LinksProps) {
  const router = useRouter()

  const callback = useCallback(
    (url: string) => async (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const id = url.split('#')[1]

      onSuccess?.()

      if (id) {
        if (router.pathname !== '/') {
          await router.push('/')
        }

        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
          })
        }
      } else {
        router.push(url)
      }
    },
    [onSuccess, router]
  )

  return (
    <>
      <Navlink href="/#home" onClick={callback('/#home')}>
        Home
      </Navlink>
      <Navlink href="/#about" onClick={callback('/#about')}>
        About
      </Navlink>
      <Navlink href="/#projects" onClick={callback('/#projects')}>
        Projects
      </Navlink>
      <Navlink href="/#technologies" onClick={callback('/#technologies')}>
        Technologies
      </Navlink>
      <Navlink href="/#contact" onClick={callback('/#contact')}>
        Contact
      </Navlink>
      <Navlink href="/blog" onClick={callback('/blog')}>
        Blog
      </Navlink>
    </>
  )
}

function MobileNav() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <>
      <IconButton
        ref={ref}
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        colorScheme="brand"
      />
      <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={ref} size="full">
        <DrawerOverlay />
        <DrawerContent bg="brand.500">
          <DrawerHeader color="white">Will Mann</DrawerHeader>
          <DrawerCloseButton color="white" />
          <DrawerBody>
            <Stack>
              <Links />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <MotionBox
      px={6}
      py={4}
      as="nav"
      position="fixed"
      left={0}
      right={0}
      bgGradient="linear(to-b, brand.900, transparent)"
      zIndex={10}
    >
      <Flex
        w="full"
        justifyContent="space-between"
        mx="auto"
        maxW="container.md"
      >
        <WM />
        {isMobile ? (
          <MobileNav />
        ) : (
          <HStack>
            <Links />
          </HStack>
        )}
      </Flex>
    </MotionBox>
  )
}
