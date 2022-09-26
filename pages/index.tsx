import { Box, Heading, Link, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import HookForm from '../components/form'

const Home: NextPage = () => {
  return (
    <>
      <Box p={4}>
        <Heading>SpaceMerch x Frens</Heading>
        <Text mt="4" mb="4">Get you NFT now, reedem for real merch on Wednesday!</Text>
        <HookForm />

        <Text fontSize="sm" mt="10">
          Powered by <Link href="https://madeinblock.tech" textDecoration={"underline"}>Made in Block</Link> & <Link href="https://frens.army/" textDecoration={"underline"}>Frens Validator</Link>
        </Text>
      </Box>
    </>
  )
}

export default Home
