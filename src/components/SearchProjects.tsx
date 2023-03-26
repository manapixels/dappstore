import {
   Input,
   InputGroup,
   InputLeftElement,
   Modal,
   ModalOverlay,
   ModalContent,
   useDisclosure,
   Box,
   Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Search } from 'react-feather'
import { useQuery } from '@tanstack/react-query'
import useDebounce from '@/hooks/useDebounce'
import SearchResultListItem from './SearchResultListItem'
import { Project } from '@/types/Project'


const SearchProjects = () => {
   const [query, setQuery] = useState('')
   const [isModalOpen, setIsModalOpen] = useState(false)
   const { isOpen, onOpen, onClose } = useDisclosure()
   const debouncedQuery = useDebounce(query, 300)

   const getDappsByKeyword = async () => {
      return await fetch(
         `https://api-a.meroku.store/dapp?page=1&limit=6&search=${query}`
      ).then((res) => res.json())
   }

   const { data, error, isFetching, status } = useQuery({
      queryKey: ['dapps', { debouncedQuery }],
      queryFn: getDappsByKeyword,
   })

   console.log(data, error, isFetching, status, query, debouncedQuery)
   return (
      <Box w="100%">
         <InputGroup onClick={onOpen}>
            <InputLeftElement
               pointerEvents="none"
               top="50%"
               transform="translateY(-50%)"
               width={12}
            >
               <Search color="var(--chakra-colors-lightgray-500)" size={20} />
            </InputLeftElement>
            <Input
               type="text"
               placeholder="Search projects"
               background="white"
               size="lg"
               paddingLeft={12}
               fontSize="md"
            />
         </InputGroup>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <InputGroup>
                  <InputLeftElement
                     pointerEvents="none"
                     top="50%"
                     transform="translateY(-50%)"
                     width={12}
                  >
                     <Search
                        color="var(--chakra-colors-lightgray-500)"
                        size={20}
                     />
                  </InputLeftElement>
                  <Input
                     type="text"
                     placeholder="Search projects"
                     background="white"
                     size="lg"
                     paddingLeft={12}
                     fontSize="md"
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                  />
               </InputGroup>
               <Stack>
                  {data?.response?.map((project: Project, i: number) => (
                     <SearchResultListItem
                        key={project.dappId}
                        project={project}
                     />
                  ))}
               </Stack>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default SearchProjects
