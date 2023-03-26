import { Box, Flex, Stack, Image } from '@chakra-ui/react'
import { chakraComponents, Select } from 'chakra-react-select'
import Link from 'next/link'
import { Grid as IconGrid, Film as IconFilm, DollarSign } from 'react-feather'

import SearchProjects from '@/components/SearchProjects'
import ActiveLink from '@/components/ActiveLink'
import { chains } from '@/constants/chains'

const chainOptions = chains && [
   {
      value: '',
      label: 'All chains',
      icon: <Box></Box>,
   },
   ...Object.keys(chains).map((chainId: any) => ({
      value: chainId,
      label: chains[chainId].name,
      icon: (
         <Image
            src={chains[chainId].logo}
            alt={chains[chainId].name}
            width={8}
            height={8}
         />
      ),
   })),
]

const customComponents = {
   // @ts-ignore
   Option: ({ children, ...props }) => (
      // @ts-ignore
      <chakraComponents.Option {...props}>
         <Box mr={2}>{props.data.icon}</Box> {children}
      </chakraComponents.Option>
   ),
   // MultiValueLabel: (props: MultiValueGenericProps<Chain>) => (
   //    <components.MultiValueLabel {...props}>
   //       <Image src={props.data?.icon} width={10} height={10} alt="" />
   //       {props.data?.name}
   //    </components.MultiValueLabel>
   // ),
}

const Sidebar = () => {
   return (
      <Flex
         flexFlow="column"
         justifyContent="space-between"
         height={{ base: 'auto', md: '100%' }}
         width={{ base: '100%', md: 'auto' }}
         pos={{ base: 'fixed', md: 'relative' }}
         top={{ base: '0', md: 'initial' }}
         left={{ base: '0', md: 'initial' }}
         zIndex="docked"
         background="white"
         p={4}
      >
         <Box>
            <Box mb={{ base: 2, md: 5 }}>
               <Image
                  src="/images/logo.svg"
                  alt=""
                  width={{ base: '150px', md: '200px' }}
                  height={{ base: '41.25px', md: '55px' }}
               />
            </Box>
            <SearchProjects />
            <Stack
               textAlign="left"
               mt={{ base: 0, md: 4 }}
               mb={{ base: 2, md: 0 }}
               direction={{ base: 'row', md: 'column' }}
            >
               <Flex
                  as={ActiveLink}
                  href="/category/finance"
                  w="100%"
                  activeClassName="active"
                  p={3}
                  borderRadius="md"
                  _hover={{
                     background: 'lightgray.300',
                  }}
               >
                  <DollarSign
                     stroke="var(--chakra-colors-lightgray-700)"
                     style={{ marginRight: '.6rem' }}
                  />
                  DeFi
               </Flex>
               <Flex
                  as={ActiveLink}
                  href="/category/games"
                  w="100%"
                  activeClassName="active"
                  p={3}
                  borderRadius="md"
                  _hover={{
                     background: 'lightgray.300',
                  }}
               >
                  <IconFilm
                     stroke="var(--chakra-colors-lightgray-700)"
                     style={{ marginRight: '.6rem' }}
                  />
                  Games
               </Flex>
               <Flex
                  as={ActiveLink}
                  href="/apps"
                  w="100%"
                  activeClassName="active"
                  p={3}
                  borderRadius="md"
                  _hover={{
                     background: 'lightgray.300',
                  }}
               >
                  <IconGrid
                     stroke="var(--chakra-colors-lightgray-700)"
                     style={{ marginRight: '.6rem' }}
                  />
                  Apps
               </Flex>
            </Stack>
         </Box>
         <Box>
            <Select
               // isMulti
               menuPlacement="top"
               name="chains"
               options={chainOptions}
               placeholder="All chains"
               components={customComponents}
            />
         </Box>
      </Flex>
   )
}

export default Sidebar
