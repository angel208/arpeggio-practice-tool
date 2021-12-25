import Layout from '../components/Layout'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    100: '#563BFFE6',
  },
  body:{
    100: '#f4f5fe'
  }
}

const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'normal',
    borderRadius: '6px', // <-- border radius is same for all variants and sizes
    padding: '8px 0',
    shadow: 'md',
    transition: 'box-shadow  0.2s'
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    secondary: {
      border: '1px solid',
      borderColor: 'brand.100',
      color: 'brand.100',
      transition: 'background 0.3s',
      _hover : { bg: "brand.100", borderColor: 'none', color: 'white' }
    },
    primary: {
      bg: 'brand.100',
      color: 'white',
      border: 'none',
      _hover : { shadow: '0 4px 8px 0 rgba(0,0,0,0.3)' }
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
}

const Heading = {
  baseStyle: {
    fontWeight: 'normal',
    fontSize: '20',
    color:"gray.600"
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'xl',
      fontWeight: 'light',
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: '2xl',
      fontWeight: 'light',
      py: 5, // <-- these values are tokens from the design system
    },
    lg: {
      fontSize: '2xl',
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    xl: {
      fontSize: '3xl',
      py: 4, // <-- these values are tokens from the design system
    },
    
  },
  defaultProps: {
    size: 'xl',
  },
}

const theme = extendTheme({
  colors,
  components: {
    Button: Button,
    Heading: Heading,
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
    
  )
}

export default MyApp
