// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const customTheme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,

  fonts: {
    heading: `'M PLUS Rounded 1c', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },

  shadows: {
    outline: '0 0 0 3px #ff0000',
  },

  colors: {
    brand: {
      100: "#000000",
      200: "#ffffff",
      300: "#808080",
      500: "#404040",
      900: "#ffdb00",
    },
  },
  
})

export default customTheme