import {
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
import form from '../styles/assets/form.png'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

export default function RegisterForm() {
  const toast = useToast()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const handleSubmit = e => {
    setLoading(true)
    e.preventDefault()
    const data = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      age: e.target.age.value,
      username: e.target.username.value,
    }

    if (
      data.first_name &&
      data.last_name &&
      data.email &&
      data.password &&
      data.age &&
      data.username
    ) {
      axios
        .post(process.env.REACT_APP_API_URL + '/register', data)
        .then(res => {
          if (res.data.email) {
            toast({
              title: 'Success',
              status: 'success',
              description: 'Registration successful!',
              isClosable: true,
            })
            history.push('/login')
          } else if (res.data.message === 'User already exists') {
            toast({
              title: 'Warning',
              status: 'warning',
              description: 'User already exist',
              isClosable: true,
            })
          } else {
            toast({
              title: 'Error',
              status: 'error',
              description: 'Check your form again',
              isClosable: true,
            })
          }
        })
    } else {
      toast({
        status: 'warning',
        description: ' fill all fields.',
        isClosable: true,
      })
      setLoading(false)
    }
  }
  return (
    <ScaleFade in={true}>
      <Flex
        direction={{ base: 'column-reverse', xl: 'row' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src={form} w={500} h={{ base: 400, xl: 500 }} />
        <Box as="form" onSubmit={handleSubmit}>
          <Stack
            borderRadius="10px"
            border="1px solid gray"
            w="500px"
            maxW="90vw"
            p={4}
          >
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="Username" name="username" />
              <FormHelperText>Enter your username.</FormHelperText>
            </FormControl>

            <Stack isInline>
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
            </Stack>

            <Stack isInline>
              <FormControl id="first_name">
                <FormLabel>First Name</FormLabel>
                <Input type="text" placeholder="First Name" name="first_name" />
                <FormHelperText>Enter your first name.</FormHelperText>
              </FormControl>

              <FormControl id="last_name">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" placeholder="Last Name" name="last_name" />
                <FormHelperText>Enter your last name.</FormHelperText>
              </FormControl>
            </Stack>

            <FormControl id="age">
              <FormLabel>Age</FormLabel>
              <Input type="number" placeholder="Age" name="age" />
              <FormHelperText>Enter your age.</FormHelperText>
            </FormControl>

            <Button
              isLoading={loading ? true : false}
              colorScheme="purple"
              type="submit"
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Flex>
    </ScaleFade>
  )
}
