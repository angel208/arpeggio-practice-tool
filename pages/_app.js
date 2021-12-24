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

const   textStyles = {
  
}

const theme = extendTheme({ colors, textStyles })

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
