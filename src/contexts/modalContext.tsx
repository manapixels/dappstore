import { Project } from '@/types/Project'
import {
   Box,
   Image,
   Modal,
   ModalContent,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'

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
         >
            <ModalOverlay />
            <ModalContent>
               {activeProject?.images?.logo ? (
                  <Box>
                     <Image
                        src={activeProject.images.logo}
                        alt=""
                        borderRadius="lg"
                        maxW="50"
                        maxH="50"
                     />
                  </Box>
               ) : (
                  <Box background="lightgray.300" width="50" height="50"></Box>
               )}
               {activeProject?.name}
            </ModalContent>
         </Modal>
         {children}
      </ModalContext.Provider>
   )
}

export { ModalContext, ModalProvider }
