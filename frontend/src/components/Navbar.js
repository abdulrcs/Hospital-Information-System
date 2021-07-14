import { Flex, Text, Stack, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Navbar({ user }) {
  const handleClick = () => {
    localStorage.removeItem('user')
    window.location.reload(true)
  }
  return (
    <Flex
      w="100%"
      shadow="md"
      fontSize="md"
      fontWeight="bold"
      justifyContent="space-between"
      alignItems="center"
      p={4}
    >
      <Link to="/">
        <Text fontSize={{ base: 'sm', xl: 'xl' }}>🏥 E-Hospital</Text>
      </Link>
      <Stack spacing={{ base: 4, xl: 8 }} isInline>
        {!user ? (
          <Link to="/login">
            <Text>Login</Text>
          </Link>
        ) : (
          <Text>{user.name}</Text>
        )}
        {!user ? (
          <Link to="/register">
            <Text>Sign Up</Text>
          </Link>
        ) : (
          <Box
            variant="ghost"
            onClick={handleClick}
            _hover={{ cursor: 'pointer' }}
          >
            <Text>Logout</Text>
          </Box>
        )}
      </Stack>
    </Flex>
  )
}
