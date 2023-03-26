import { chains } from '@/constants/chains'
import { Project } from '@/types/Project'
import {
   Badge,
   Box,
   Button,
   Divider,
   Flex,
   Heading,
   HStack,
   Image,
   Link,
   Modal,
   ModalContent,
   ModalOverlay,
   Text,
   Tooltip,
   useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Star } from 'react-feather'

type ModalContextType = {
   isOpen: boolean
   onOpen: () => void
   onClose: () => void
   setActiveProject: React.Dispatch<React.SetStateAction<Project>> | undefined
}

const ModalContext = React.createContext<ModalContextType | null>(null)

interface ModalProvider {
   children: React.ReactNode
}

interface Props {
   children?: React.ReactNode
}

const ModalProvider = ({ children }: Props) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [activeProject, setActiveProject] = useState<Project | undefined>()

   return (
      <ModalContext.Provider
         //@ts-ignore
         value={{ isOpen, onOpen, onClose, setActiveProject }}
      >
         <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInBottom"
            size="2xl"
            trapFocus={false}
         >
            <ModalOverlay />
            <ModalContent p={6}>
               <Flex gap={4} mb={4}>
                  {activeProject?.images?.logo ? (
                     <Box>
                        <Image
                           src={activeProject.images.logo}
                           alt=""
                           borderRadius="lg"
                           maxW="100"
                           maxH="100"
                        />
                     </Box>
                  ) : (
                     <Box
                        background="lightgray.300"
                        width="100"
                        height="100"
                     ></Box>
                  )}
                  <Box>
                     <Box fontWeight="bold" fontSize="3xl">
                        {activeProject?.name}
                     </Box>
                     <Box>
                        <Badge color="darkgray.100" mb={1}>
                           {activeProject?.category}
                        </Badge>
                     </Box>
                  </Box>
               </Flex>
               <HStack gap={3} mb={4}>
                  <Box>
                     <Box fontSize="sm" fontWeight="bold">
                        {activeProject?.metrics?.downloads}
                     </Box>
                     <Box color="lightgray.800" fontSize="sm">
                        Downloads
                     </Box>
                  </Box>
                  <Divider orientation="vertical" height={6} />
                  <Box>
                     <Box fontSize="md">
                        {activeProject?.metrics?.rating ? (
                           <Box>
                              {activeProject?.metrics?.rating}{' '}
                              <Star
                                 fill="var(--chakra-colors-lightgray-800)"
                                 color="transparent"
                                 size="15"
                              />
                           </Box>
                        ) : (
                           <Box color="lightgray.800" fontSize="sm">
                              No ratings yet
                           </Box>
                        )}
                     </Box>
                     <Box color="lightgray.800" fontSize="sm">
                        Rating
                     </Box>
                  </Box>
                  <Divider orientation="vertical" height={6} />
                  <Box>
                     <Box>
                        <Box
                           fontSize="sm"
                           fontWeight="bold"
                           background="darkgray.800"
                           color="white"
                           px={1}
                           borderRadius="md"
                           display="inline-block"
                        >
                           {activeProject?.minAge}+
                        </Box>
                     </Box>
                     <Box color="lightgray.800" fontSize="sm">
                        Rated for {activeProject?.minAge}+
                     </Box>
                  </Box>
               </HStack>
               <Box>
                  <Tooltip label={activeProject?.appUrl}>
                     <Button
                        as={Link}
                        href={activeProject?.appUrl}
                        target="_blank"
                        variant="black"
                        _hover={{ textDecoration: 'none' }}
                     >
                        Go to dapp
                     </Button>
                  </Tooltip>
               </Box>
               <Divider pt={3} mb={5} />
               <Box>
                  <Heading size="sm" mb={2}>
                     About this dapp
                  </Heading>
                  <Text fontSize="sm">{activeProject?.description}</Text>
               </Box>
               <Divider pt={3} mb={5} />
               <Box mb={6}>
                  <Heading size="sm" mb={2}>
                     Available on
                  </Heading>
                  <HStack>
                     {activeProject?.chains?.map((chainId) => (
                        <Flex alignItems="center" key={chainId}>
                           <Image
                              src={chains[chainId]?.logo}
                              alt=""
                              width="25"
                              height="25"
                              mr={2}
                           />
                           <Box fontSize="sm">{chains[chainId]?.name}</Box>
                        </Flex>
                     ))}
                  </HStack>
               </Box>
               <Box>
                  <Text fontSize="sm" color="lightgray.800">
                     {activeProject?.dappId} | Listed on{' '}
                     {activeProject?.listDate}
                  </Text>
               </Box>
            </ModalContent>
         </Modal>
         {children}
      </ModalContext.Provider>
   )
}

export { ModalContext, ModalProvider }
