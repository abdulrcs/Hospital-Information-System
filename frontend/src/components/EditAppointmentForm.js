import {
  Box,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import authHeader from '../utilities/authHeader'
import { useState } from 'react'

export default function EditAppointmentForm({ setUser }) {
  const toast = useToast()
  const history = useHistory()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const handleSubmit = e => {
    setLoading(true)
    e.preventDefault()
    const data = {
      doctor_name: e.target.doctor_name.value,
      description: e.target.description.value,
    }
    axios
      .put(
        process.env.REACT_APP_API_URL + '/appointment/' + location.state.id,
        data,
        {
          headers: { authorization: authHeader() },
        }
      )
      .catch(err =>
        toast({ type: 'error', description: 'Error editing appointment' })
      )
      .then(() => {
        setLoading(false)
        toast({ type: 'success', description: 'Appointment Edited!' })
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
              placeholder={location.state.doctor_name}
              name="doctor_name"
              required
            />
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              placeholder={location.state.description}
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
