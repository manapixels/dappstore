import { useCallback, useEffect, useRef } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Project } from '@/types/Project'
import ProjectListItem from '@/components/ProjectListItem'
const LIMIT = 30

const ProjectsInfiniteScroll = () => {

   const observerElem = useRef(null)

   const getDapps = async (page: number) => {
      return await fetch(
         `https://api-a.meroku.store/dapp?page=${page}&limit=${LIMIT}`
      ).then((res) => res.json())
   }

   const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      status,
   } = useInfiniteQuery({
      queryKey: ['dapps'],
      queryFn: ({ pageParam = 1 }) => getDapps(pageParam),
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
      </>
   )
}

export default ProjectsInfiniteScroll