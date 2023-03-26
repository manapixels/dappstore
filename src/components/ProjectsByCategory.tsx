import { useCallback, useEffect, useRef } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Project } from '@/types/Project'
import ProjectListItem from '@/components/ProjectListItem'
import ProjectListSkeleton from '@/components/ProjectListSkeleton'

const LIMIT = 15

const ProjectsInfiniteScroll = ({ category }: { category: string }) => {
   const observerElem = useRef(null)

   const getDappsByCategory = async (page: number) => {
      return await fetch(
         `https://api-a.meroku.store/dapp?page=${page}&limit=${LIMIT}&categories=${category}`
      ).then((res) => res.json())
   }

   const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
   } = useInfiniteQuery({
      queryKey: ['dapps', { category }],
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

    console.log(data)

   return (
      <>
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
