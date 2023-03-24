import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
   QueryClient,
   QueryClientProvider,
} from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
   const queryClient = new QueryClient()
   return (
      <ChakraProvider>
         <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
         </QueryClientProvider>
      </ChakraProvider>
   )
}
