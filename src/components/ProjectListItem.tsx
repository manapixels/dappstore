import React from 'react'
import { Badge, Box, Button, Flex, HStack, Image, Link, Tag, Tooltip } from '@chakra-ui/react'
import { Project } from '@/types/Project'
import { ExternalLink, Star } from 'react-feather'
import { chains } from '../constants/chains'

const ProjectListItem = ({ project }: { project: Project }) => (
   <Flex pos="relative" role="group">
      <Button
         as={Flex}
         height="auto"
         cursor="pointer"
         justifyContent="flex-start"
         _hover={{
            background: 'white',
            borderColor: 'darkgray.100',
            boxShadow: '0px 0px 3px 1px var(--chakra-colors-lightgray-400)',
         }}
         key={project.dappId}
         background="white"
         borderRadius="lg"
         p={3}
         width={280}
         border="1px solid var(--chakra-colors-lightgray-400)"
      >
         {project?.images?.logo ? (
            <Box>
               <Image
                  src={project.images.logo}
                  alt=""
                  borderRadius="lg"
                  maxW="50"
                  maxH="50"
               />
            </Box>
         ) : (
            <Box background="lightgray.300" width="50" height="50"></Box>
         )}
         <Box px={4} overflow="hidden" whiteSpace="nowrap">
            <Box>
               <Badge fontSize="66%" color="darkgray.100">
                  {project.category}
               </Badge>
            </Box>
            <Box fontWeight="bold" fontSize="md" pb={1}>
               {project.name}
            </Box>
            <Box fontSize="xs" color="lightgray.700">
               {project.metrics?.rating ? (
                  <Flex>
                     <Box mr={1}>{project.metrics.rating}</Box>
                     <Star
                        fill="var(--chakra-colors-lightgray-800)"
                        color="transparent"
                        size="13"
                     />
                  </Flex>
               ) : (
                  'No rating yet'
               )}{' '}
            </Box>
         </Box>
      </Button>
      <HStack pos="absolute" bottom="-1" right="2" zIndex="2" spacing={-1}>
         {project?.chains?.map((chain) => (
            <Tooltip key={chain} label={chains[chain]?.name}>
               <Image
                  src={chains[chain]?.logo}
                  alt=""
                  width="4"
                  height="4"
                  filter={`grayscale(100%)`}
                  opacity="0.7"
                  _groupHover={{ filter: `grayscale(0%)`, opacity: 1 }}
               />
            </Tooltip>
         ))}
      </HStack>
      <Tooltip label={project?.appUrl}>
         <Button
            as={Link}
            href={project?.appUrl}
            size="xs"
            target="_blank"
            fontSize="xs"
            textOverflow="ellipsis"
            background="white"
            height="calc(100% - 2px)"
            borderLeftRadius={0}
            border="none"
            _hover={{
               background: 'white',
            }}
            marginLeft="-1px"
            position="absolute"
            top="1px"
            right="1px"
         >
            <ExternalLink size="18" color="#656E85" />
         </Button>
      </Tooltip>
   </Flex>
)

export default ProjectListItem
