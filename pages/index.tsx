import { Heading, Link, Text, Flex, Image } from '@chakra-ui/react'
import type { NextPage } from 'next'
import HookForm from '../components/form'

const Home: NextPage = () => {
  return (
      <Flex color="brand.100" bgColor="brand.900" pt='50px' pb='50px' align='center' justify='center' direction='column'>
          <Heading  pb='30px'>SpaceMerch x frens</Heading>
          <Image h='50px'  w='auto' mb='25px' src='/cosmoverse.png' alt='stakinglikeafren'/>
          <Text pr='20px' pl='20px' pb='25px' textAlign='center'>Get you NFT now, reedem for real merch on Wednesday!</Text>
          <Image h='200px' mb='25px' w='auto' src='/copertina.png' alt='stakinglikeafren'/>
          <HookForm />
          <Text mt="50px" mb="10px" >Powered by</Text>
          <Flex fontSize="sm">
              <Link mr='5px' fontWeight="bold" href="https://madeinblock.tech" textDecoration={"underline"}>Made in Block</Link> <Image h='20px' w='auto' src='/frens-hands.png' alt='Ciao' /> <Link ml='5px' fontWeight="bold"  href="https://frens.army/" textDecoration={"underline"}>frens Validator</Link>
          </Flex>
      </Flex>
  )
}

export default Home
