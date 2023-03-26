import React from 'react'
import { ModalContext } from '@/contexts/modalContext'
import { Project } from '@/types/Project'
import { Box, Button, Flex, Image } from '@chakra-ui/react'

const SearchResultListItem = ({
   project,
   onClose,
}: {
   project: Project
   onClose: () => void
}) => {
   //@ts-ignore
   let { onOpen, setActiveProject } = React.useContext(ModalContext)
   return (
      <Flex
         as={Button}
         py={2}
         px={4}
         alignItems="center"
         height="auto"
         variant="white"
         border="none"
         justifyContent="flex-start"
         onClick={() => {
            setActiveProject(project)
            onOpen()
            onClose()
         }}
      >
         {project?.images?.logo ? (
            <Box>
               <Image
                  src={project.images.logo}
                  alt=""
                  borderRadius="lg"
                  maxW="35"
                  maxH="35"
               />
            </Box>
         ) : (
            <Box background="lightgray.300" width="50" height="50"></Box>
         )}
         <Box px={4}>
            <Box fontWeight="bold" fontSize="md">
               {project.name}
            </Box>
         </Box>
      </Flex>
   )
}

export default SearchResultListItem
