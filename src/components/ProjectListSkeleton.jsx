import { Flex, Skeleton } from '@chakra-ui/react'

const ProjectListSkeleton = () => {
   return (
      <Flex wrap="wrap" gap={3}>
         {[...Array(9)].map((e, i) => (
            <Skeleton
               key={`${e}-${i}`}
               height="82.4px"
               width="280px"
               borderRadius="lg"
               border="1px solid var(--chakra-colors-lightgray-400)"
               startColor="lightgray.400"
               endColor="lightgray.500"
            />
         ))}
      </Flex>
   )
}

export default ProjectListSkeleton
