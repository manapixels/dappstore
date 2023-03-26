import Head from 'next/head'
import {
   Heading,
} from '@chakra-ui/react'
import ProjectsByTabInfiniteScroll from '@/components/ProjectsByTab'

export default function App() {
   return (
      <>
         <Head>
            <title>DAppStore • All Apps</title>
            <meta name="description" content="" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Heading size="lg" mb={6}>
            Explore by Category
         </Heading>

         <ProjectsByTabInfiniteScroll />
      </>
   )
}
