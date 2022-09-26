// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const customTheme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,

  colors: {
    yellow: {
      50: '#fcdd4f',
      100: '#fcdd4f',
      200: '#fcdd4f',
      300:'#fcdd4f',
      400:'#fcdd4f',
      500: '#fcdd4f',
      600: '#fbd321',
      700: '#e2ba0b',
      800: '#b09103',
      900: '#7e6700',
    }
  }
})

export default customTheme