import { categories } from '../categories'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Project } from '@/types/Project'
import ProjectListItem from './ProjectListItem'

const ProjectsByTab = () => {
   const [selectedTab, setSelectedTab] = useState(categories[0])

   const getDappsByCategory = async () => {
      return await fetch(
         `https://api-a.meroku.store/dapp?page=1&limit=30&categories=${selectedTab}`
      ).then((res) => res.json())
   }

   useEffect(() => {
      getDappsByCategory()
   }, [selectedTab])

   const { data, error, isFetching, status } = useQuery({
      queryKey: ['dapps'],
      queryFn: getDappsByCategory,
   })

   console.log(data)

   return (
      <>
         <Flex width="100%" overflowX="auto">
            {categories.map((cat, i) => (
               <Button
                  key={`${cat}-${i}`}
                  onClick={() => setSelectedTab(cat)}
                  textTransform="capitalize"
                  variant={cat === selectedTab ? 'black' : ''}
                  size="sm"
               >
                  {cat}
               </Button>
            ))}
         </Flex>
         {/* {isFetching && 'Loading...'} */}
         {error && <Box>An error has occurred</Box>}

         <Flex flexWrap="wrap" gap="3">
            {data?.response?.map((project: Project, i: number) => (
               <ProjectListItem key={project.dappId} project={project} />
            ))}
         </Flex>
      </>
   )
}

export default ProjectsByTab
