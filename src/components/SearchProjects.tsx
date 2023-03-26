import {
   Input,
   InputGroup,
   InputLeftElement,
   Modal,
   ModalOverlay,
   ModalContent,
   useDisclosure,
   Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Search } from 'react-feather'
import { useQuery } from '@tanstack/react-query'

const SearchProjects = () => {
    const [query, setQuery] = useState("")
   const [isModalOpen, setIsModalOpen] = useState(false)
   const { isOpen, onOpen, onClose } = useDisclosure()

   const getDappsByCategory = async () => {
      return await fetch(
         `https://api-a.meroku.store/dapp?page=1&limit=30&categories=${selectedTab}`
      ).then((res) => res.json())
   }

   useEffect(() => {
      getDappsByCategory()
   }, [selectedTab])

   const { data, error, isFetching, status } = useQuery({
      queryKey: ['dapps', { query }],
      queryFn: getDappsByCategory,
   })

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
                     />
                  </InputGroup>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default SearchProjects
