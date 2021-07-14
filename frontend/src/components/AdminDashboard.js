import authHeader from '../utilities/authHeader'
import {
  Box,
  Badge,
  Stack,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState, useEffect } from 'react'

import CustomModal from './CustomModal'
import { Link, useHistory } from 'react-router-dom'

export default function AdminDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const token = authHeader()
  const toast = useToast()
  const history = useHistory()
  const [appointments, setAppointments] = useState([])
  const [selectIndex, setSelectIndex] = useState(0)

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/appointment/list', {
        headers: { authorization: token },
      })
      .then(res => setAppointments(res.data))
  }, [])

  const handleDelete = id => {
    axios
      .delete(process.env.REACT_APP_API_URL + '/appointment/' + id, {
        headers: { authorization: token },
      })
      .catch(err => toast({ status: 'error', title: err.message }))
      .then(() => {
        setAppointments(appointments.filter(e => e._id !== id))
        toast({ status: 'success', title: 'Appointment Deleted!' })
      })
  }

  const handleEdit = (id, doctor_name, description) => {
    history.push({
      pathname: '/edit_appointment',
      state: { id: id, doctor_name: doctor_name, description: description },
    })
  }

  return (
    <>
      <Stack alignItems="center">
        <Stack
          w="100%"
          maxW={{ base: '90vw', xl: '80vw' }}
          isInline
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Text
            color="gray.500"
            fontSize={{ base: 'xl', md: '2xl', xl: '4xl' }}
            fontWeight="black"
          >
            Appointment Dashboard
          </Text>
          <Link to="/add_appointment">
            <Button size="md" colorScheme="green">
              Add Appointment
            </Button>
          </Link>
        </Stack>

        <Box w="100%" maxW={{ base: '90vw', xl: '80vw' }} overflowX="auto">
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
                <Th>Registrants</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments.map((appointment, index) => (
                <Tr key={index}>
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
                  <Td>
                    <Button
                      isDisabled={
                        appointment.registrant.length === 0 ? true : false
                      }
                      size="sm"
                      colorScheme="green"
                      onClick={() => {
                        setSelectIndex(index)
                        onOpen()
                      }}
                    >
                      Show All
                    </Button>
                  </Td>
                  <Td>
                    <Stack isInline>
                      <Button
                        size="sm"
                        colorScheme="orange"
                        onClick={() =>
                          handleEdit(
                            appointment._id,
                            appointment.doctor_name,
                            appointment.description
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(appointment._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          data={appointments[selectIndex]}
          title="Registrant List"
        ></CustomModal>
      </Stack>
    </>
  )
}
