// theme.js
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: '#00a8e8',
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#f0f0f0',
        color: '#333',
        fontFamily: 'Inter',
      },
      // styles for the `a`
      a: {
        _hover: {
          textDecoration: 'none',
        },
      },
      // ::-webkit-scrollbar-track
      // {
      //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      //   border-radius: 10px;
      //   background-color: #F5F5F5;
      // }
    },
  },
})

export default theme
