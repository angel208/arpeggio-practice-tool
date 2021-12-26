import Layout from '../components/Layout'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '../theme/theme'




function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
    
  )
}

export default MyApp
