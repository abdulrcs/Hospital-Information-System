import React from 'react'
import { Stack } from '@chakra-ui/react'
import Navbar from './Navbar'

export default function Container({ children, user }) {
  return (
    <Stack h="100vh" alignItems="center" justifyContent="center">
      <Navbar user={user} />
      <Stack w={{ base: '95vw', xl: '80vw' }} h="90%" py={8}>
        {children}
      </Stack>
    </Stack>
  )
}
