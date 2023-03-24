import React from 'react'
import { Box, Button, Image, Link } from '@chakra-ui/react'
import { Project } from '@/types/Project'

const ProjectListItem = ({ project }: { project: Project }) => (
   <Box key={project.dappId} background="white" borderRadius="lg" p={6} width={300}>
      {project?.images?.logo && (
         <Box>
            <Image src={project.images.logo} alt="" />
         </Box>
      )}
      <Box fontWeight="bold">{project.name}</Box>
      <Box fontSize="sm">{project.description}</Box>
      <Box>{project.metrics?.downloads}</Box>
      <Box>{project.metrics?.installs}</Box>
      <Box>{project.metrics?.uninstalls}</Box>
      <Box>{project.metrics?.ratingsCount}</Box>
      <Box>{project.category}</Box>
      <Button as={Link} href={project?.appUrl}>
         {project?.appUrl}
      </Button>
   </Box>
)

export default ProjectListItem
