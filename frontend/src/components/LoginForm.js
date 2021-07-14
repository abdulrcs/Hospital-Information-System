import {
  Text,
  Box,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Image,
  Button,
  useToast,
  ScaleFade,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import form from '../styles/assets/form.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function LoginForm({ setUser }) {
  const history = useHistory()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const handleSubmit = e => {
    setLoading(true)
    e.preventDefault()
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    axios.post(process.env.REACT_APP_API_URL + '/login', data).then(res => {
      let token = res.data.token
      if (!token) {
        toast({
          title: 'Error',
          description: 'Wrong email or password',
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      } else {
        toast({
          title: 'Success',
          description: 'You have been logged in',
          status: 'success',
          isClosable: true,
        })
        localStorage.setItem('user', JSON.stringify(res.data))
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
        history.push('/')
      }
    })
  }
  return (
    <ScaleFade in={true}>
      <Flex
        direction={{ base: 'column-reverse', xl: 'row' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Image
          src={form}
          w={{ base: 400, xl: 500 }}
          h={{ base: 400, xl: 500 }}
        />
        <Box as="form" onSubmit={handleSubmit}>
          <Stack
            borderRadius="10px"
            border="1px solid gray"
            w="500px"
            maxW="90vw"
            p={4}
          >
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" name="email" />
              <FormHelperText>Enter your email.</FormHelperText>
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Password" name="password" />
              <FormHelperText>Enter a password.</FormHelperText>
            </FormControl>

            <Text color="gray" fontSize="sm" textAlign="center" py={2}>
              Doesn't have an account?{' '}
              <Link to="/register">
                <Text as="span" color="blue">
                  Register
                </Text>
              </Link>
            </Text>

            <Button
              isLoading={loading ? true : false}
              colorScheme="purple"
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Flex>
    </ScaleFade>
  )
}
