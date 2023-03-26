import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
   QueryClient,
   QueryClientProvider,
} from '@tanstack/react-query'
import {
   ChakraProvider,
   extendTheme,
   Input,
   withDefaultColorScheme,
} from '@chakra-ui/react'

const theme = extendTheme(
   {
      colors: {
         lightgray: {
            100: '#FAFAFB',
            200: '#F5F6F7',
            300: '#EEEFF2',
            400: '#E2E4E8',
            500: '#CACDD5',
            600: '#B2B7C2',
            700: '#A4A9B6',
            800: '#959CAB',
            900: '#8C93A3',
         },
         darkgray: {
            100: '#747c90',
            200: '#656E85',
            300: '#5C657D',
            400: '#525C76',
            500: '#49536E',
            600: '#3A4662',
            700: '#2C3857',
            800: '#192648',
            900: '#0F1D40',
         },
      },
      shadows: {
         outline: '0 0 0 3px var(--chakra-colors-lightgray-700)',
      },
      components: {
         Button: {
            baseStyle: {
               fontWeight: 'normal',
               border: '1px solid transparent',
               _hover: {
                  // boxShadow: '0px 0px 0px 1px var(--chakra-colors-darkgray-100)',
                  borderColor: 'black',
                  _disabled: {
                     boxShadow: 'none',
                  },
               },
            },
            variants: {
               black: {
                  bg: 'black',
                  color: 'white',
                  _hover: {
                     bg: 'darkgray.900',
                     borderColor: 'black',
                     boxShadow: 'none',
                     _disabled: {
                        bg: 'darkgray.900',
                     },
                  },
               },
               white: {
                  bg: 'white',
                  color: 'darkgray.800',
                  _hover: { bg: 'lightgray.200' },
               },
               outline: {
                  borderColor: 'darkgray.400',
               },
               morePadding: {
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 6,
                  paddingBottom: 6,
               },
            },
         },
      },
   },
   withDefaultColorScheme({ colorScheme: 'gray' })
)

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: 'lightgray.800' }

export default function App({ Component, pageProps }: AppProps) {
   const queryClient = new QueryClient()
   return (
      <ChakraProvider theme={theme}>
         <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
         </QueryClientProvider>
      </ChakraProvider>
   )
}
