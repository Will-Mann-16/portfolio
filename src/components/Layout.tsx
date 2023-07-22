import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'

import { Footer } from './Footer'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export function Layout({ children, title, description }: LayoutProps) {
  return (
    <Box
      bg="brand.500"
      w="full"
      minH="100vh"
      h="full"
      display="flex"
      flexDir="column"
      alignItems="stretch"
    >
      <Head>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
          name="viewport"
        />
        <title>{title ? `${title} | Will Mann` : 'Will Mann'}</title>
        <meta
          name="description"
          content={description ?? 'Will Mann Portfolio'}
        />
      </Head>

      <Navbar />
      <Box as="main" flex={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
