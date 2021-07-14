import React, { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './styles/theme'
import Container from './components/Container'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Homepage from './components/Homepage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppointmentForm from './components/AppointmentForm'
import EditAppointmentForm from './components/EditAppointmentForm'

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'))
    setUser(localUser)
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Container user={user}>
          <Switch>
            <Route path="/login">
              <LoginForm setUser={setUser} />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/add_appointment">
              <AppointmentForm />
            </Route>
            <Route path="/edit_appointment">
              <EditAppointmentForm />
            </Route>
            <Route path="/">
              <Homepage user={user} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ChakraProvider>
  )
}
