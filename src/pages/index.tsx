import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import ProjectsByTabInfiniteScroll from '@/components/ProjectsByTabInfiniteScroll'
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import SearchProjects from '@/components/SearchProjects'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
//   const [chains, setChains] = useState<IChainData[]>([])

  useEffect(() => {
   //  setChains(getAllChains())
  }, [])


   return (
      <>
         <Head>
            <title>DAppStore</title>
            <meta name="description" content="" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Grid
            gridTemplateColumns="repeat(4, 1fr)"
            gap={4}
            style={inter.style}
            >
            <GridItem colSpan={1} px={16} py={12} w={["xl", "100%"]} background="white" h="100vh" pos="sticky">
               <Box mb={5}>
                  <Image
                     src="/images/logo.svg"
                     alt=""
                     width="200"
                     height="55"
                  />
               </Box>
               <SearchProjects />
            </GridItem>
            <GridItem colSpan={3} px={16} py={8} h="100vh" overflow="auto">
               <Heading size="lg" mb={6}>Explore by Category</Heading>

               <ProjectsByTabInfiniteScroll />

               {/* <Heading size="xl">All DApps</Heading> */}
               {/* <ProjectsInfiniteScroll /> */}
            </GridItem>
         </Grid>
      </>
   )
}
