import authHeader from '../utilities/authHeader'
import {
  Box,
  Badge,
  Stack,
  Heading,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Image,
  ScaleFade,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import homepage from '../styles/assets/homepage.png'
import { Link } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'

export default function Homepage({ user }) {
  const token = authHeader()
  const toast = useToast()
  const [appointments, setAppointments] = useState([])

  const getAppointments = () => {
    axios
      .get(process.env.REACT_APP_API_URL + '/appointment/list', {
        headers: { authorization: token },
      })
      .then(res => setAppointments(res.data))
  }
  useEffect(() => {
    getAppointments()
  }, [appointments])

  const handleApply = id => {
    axios
      .post(
        process.env.REACT_APP_API_URL + '/appointment/apply/' + id,
        {},
        {
          headers: { authorization: token },
        }
      )
      .catch(err => toast({ status: 'error', title: err.message }))
      .then(toast({ status: 'success', title: 'Applied!' }))
    getAppointments()
  }

  const handleCancel = id => {
    axios
      .put(
        process.env.REACT_APP_API_URL + '/appointment/cancel/' + id,
        {},
        {
          headers: { authorization: token },
        }
      )
      .then(toast({ status: 'success', title: 'Cancelled!' }))
    getAppointments()
  }

  return (
    <>
      {user ? (
        user.isAdmin ? (
          <AdminDashboard />
        ) : (
          <Stack alignItems="center">
            <ScaleFade in={true}>
              <Text
                w={{ base: '90vw', xl: '80vw' }}
                textAlign="left"
                pb={4}
                color="gray.500"
                fontSize={{ base: 'xl', md: '2xl', xl: '4xl' }}
                fontWeight="black"
              >
                Appointment List
              </Text>
              <Box
                w="100%"
                maxW={{ base: '90vw', xl: '80vw' }}
                overflowX="auto"
              >
                <Table
                  variant="simple"
                  colorScheme="blackAlpha"
                  bg="whiteAlpha.700"
                  borderRadius="15px"
                >
                  <Thead>
                    <Tr>
                      <Th>Doctor Name</Th>
                      <Th>Description</Th>
                      <Th>Status</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {appointments.map(appointment => (
                      <Tr key={appointment._id}>
                        <Td>{appointment.doctor_name}</Td>
                        <Td>{appointment.description}</Td>
                        <Td>
                          {appointment.registrant.length < 5 ? (
                            <Badge colorScheme="green" borderRadius="5px">
                              {`Available (${appointment.registrant.length} / 5)`}
                            </Badge>
                          ) : (
                            <Badge colorScheme="red" borderRadius="5px">
                              {`Fully Booked 5/5`}
                            </Badge>
                          )}
                        </Td>
                        <Td textAlign="center">
                          <Button
                            isDisabled={
                              appointment.registrant.length >= 5 &&
                              appointment.registrant.indexOf(user.name) < 0
                                ? true
                                : false
                            }
                            w={100}
                            colorScheme={
                              appointment.registrant.indexOf(user.name) >= 0
                                ? 'yellow'
                                : 'purple'
                            }
                            onClick={() =>
                              appointment.registrant.indexOf(user.name) >= 0
                                ? handleCancel(appointment._id)
                                : handleApply(appointment._id)
                            }
                          >
                            {appointment.registrant.indexOf(user.name) >= 0
                              ? 'Cancel'
                              : 'Apply'}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </ScaleFade>
          </Stack>
        )
      ) : (
        <ScaleFade in={true}>
          <Stack
            spacing={5}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            h="100%"
          >
            <Heading fontSize={{ base: '3xl', xl: '5xl' }}>
              Hospital Information System
            </Heading>
            <Image w={350} h={350} src={homepage} />
            <Link to="/login">
              <Button colorScheme="purple">Get Started &rarr;</Button>
            </Link>
          </Stack>
        </ScaleFade>
      )}
    </>
  )
}
