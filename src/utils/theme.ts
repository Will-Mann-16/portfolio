import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#D3E1F6',
      200: '#AAC3EE',
      300: '#7592CC',
      400: '#476199',
      500: '#192A56',
      600: '#122049',
      700: '#0C173D',
      800: '#071031',
      900: '#040A29',
    },
  },
  fonts: {
    heading: 'proxima-nova, sans-serif',
    body: 'proxima-nova, sans-serif',
  },
  components: {
    Link: {
      baseStyle: {
        color: 'blue.300',
      },
    },
  },
})
