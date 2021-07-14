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
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import authHeader from '../utilities/authHeader'
import { useState } from 'react'

export default function AppointmentForm({ setUser }) {
  const toast = useToast()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const handleSubmit = e => {
    setLoading(true)
    e.preventDefault()
    const data = {
      doctor_name: e.target.doctor_name.value,
      description: e.target.description.value,
    }
    axios
      .post(process.env.REACT_APP_API_URL + '/appointment/create', data, {
        headers: { authorization: authHeader() },
      })
      .catch(err =>
        toast({ type: 'error', description: 'Error adding appointment' })
      )
      .then(() => {
        setLoading(false)
        toast({ type: 'sucess', description: 'Appointment Added!' })
        history.push('/')
      })
  }
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box as="form" onSubmit={handleSubmit}>
        <Stack
          borderRadius="10px"
          border="1px solid gray"
          w="500px"
          maxW="90vw"
          p={4}
        >
          <FormControl id="doctor_name">
            <FormLabel>Doctor Name</FormLabel>
            <Input
              type="text"
              placeholder="Doctor Name"
              name="doctor_name"
              required
            />
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              placeholder="Description"
              name="description"
              required
            />
          </FormControl>

          <Button
            isLoading={loading ? true : false}
            colorScheme="purple"
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}
