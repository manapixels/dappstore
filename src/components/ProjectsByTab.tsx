import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Project } from '@/types/Project'
import ProjectListItem from '@/components/ProjectListItem'
import { categories } from '../constants/categories'
import ProjectListSkeleton from './ProjectListSkeleton'

const LIMIT = 15

const ProjectsInfiniteScroll = () => {

   const observerElem = useRef(null)
   const [selectedTab, setSelectedTab] = useState(categories[0])

   const getDappsByCategory = async (page: number) => {
      return await fetch(
         `https://api-a.meroku.store/dapp?page=${page}&limit=${LIMIT}&categories=${selectedTab}`
      ).then((res) => res.json())
   }

   const {
      data,
      error,
      isFetching,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      status
   } = useInfiniteQuery({
      queryKey: ['dapps', { selectedTab }],
      queryFn: ({ pageParam = 1 }) => getDappsByCategory(pageParam),
      getNextPageParam: (lastPage, pages) => pages.length + 1,
   })

   const handleObserver = useCallback(
      (entries: any) => {
         const [target] = entries
         if (target.isIntersecting) {
            fetchNextPage()
         }
      },
      [fetchNextPage, hasNextPage]
   )

   useEffect(() => {
      const element = observerElem.current
      const option = { threshold: 0 }

      const observer = new IntersectionObserver(handleObserver, option)
      if (element) {
         observer.observe(element)
      }
      return () => {
         if (element) observer.unobserve(element)
      }
   }, [fetchNextPage, hasNextPage, handleObserver])

   //  console.log(data)

   return (
      <>
         <Flex width="100%" overflowX="auto" mb={8}>
            {categories.map((cat, i) => (
               <Button
                  key={`${cat}-${i}`}
                  onClick={() => setSelectedTab(cat)}
                  textTransform="capitalize"
                  variant={cat === selectedTab ? 'black' : ''}
                  color={cat === selectedTab ? 'white' : 'lightgray.900'}
                  _hover={{
                     color: cat === selectedTab ? 'white' : 'darkgray.700',
                  }}
                  size="sm"
               >
                  {cat}
               </Button>
            ))}
         </Flex>
         {isFetching && status !== 'success' && <ProjectListSkeleton />}
         <Flex wrap="wrap" gap={3}>
            {data?.pages?.map((page, i) =>
               page?.response?.map((project: Project, i: number) => (
                  <ProjectListItem key={project.dappId} project={project} />
               ))
            )}
         </Flex>
         <div className="loader" ref={observerElem}>
            {isFetchingNextPage && hasNextPage ? 'Loading...' : ''}
         </div>
         {error && <Box>An error has occurred</Box>}
         {/* {console.log(data?.pages?.length, data)} */}
         {status === 'success' &&
            !isFetchingNextPage &&
            data?.pageParams[0] === undefined && <Box>No app found</Box>}
      </>
   )
}

export default ProjectsInfiniteScroll