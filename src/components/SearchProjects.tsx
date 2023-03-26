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
import { useEffect, useState } from 'react'
import { Search } from 'react-feather'
import { useQuery } from '@tanstack/react-query'

const SearchProjects = () => {
    const [query, setQuery] = useState("")
   const [isModalOpen, setIsModalOpen] = useState(false)
   const { isOpen, onOpen, onClose } = useDisclosure()

   const getDappsByKeyword = async () => {
      return await fetch(
         `https://api-a.meroku.store/dapp?page=1&limit=10&keyword=${query}`
      ).then((res) => res.json())
   }

   const { data, error, isFetching, status } = useQuery({
      queryKey: ['dapps', { query }],
      queryFn: getDappsByKeyword,
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
