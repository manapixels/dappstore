import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import ProjectsByCategory from '@/components/ProjectsByCategory'
import { useRouter } from 'next/router'

export default function AppsByCategory() {

    const router = useRouter()
    const category = router.query.category ? String(router.query.category) : ""

   return (
      <>
         <Head>
            <title>DAppStore • {category}</title>
            <meta name="description" content="" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Heading size="lg" mb={6} textTransform="capitalize">
            {category}
         </Heading>

         <ProjectsByCategory category={category} />
      </>
   )
}
