'use client'
import {
  Alert,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Col,
  Form, Placeholder, Card
} from 'react-bootstrap'
import { useState, useEffect } from 'react'
export default function PageDefault () {
  const [info, setInfo] = useState([])
  const getProfile = async () => {
    const res = await fetch('/api/profile')
    const data = await res.json()
    data.code && setInfo(data.data)
  }
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      <Container className='px-0 px-sm-0-75'>
        <Navbar className='mt-lg-2' bg='csscustom' variant='dark'>
          <Container>
            <Nav className='me-auto'>
              <Nav.Link href='#'>Mis Datos</Nav.Link>
              <NavDropdown title='Consultas' id='navbarConsultar'>
                <NavDropdown.Item href='#3'>
                  Información Académica
                </NavDropdown.Item>
                <NavDropdown.Item href='#4'>
                  Consulta Verificación
                </NavDropdown.Item>
                <NavDropdown.Item href='#5'>
                  Consulta Liquidación
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='Novedades' id='navbarNovedades'>
                <NavDropdown.Item href='#3'>Datos basicos</NavDropdown.Item>
                <NavDropdown.Item href='#4'>
                  Datos de ubicación
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </Container>
      <Container>
        <Alert className='my-2 text-justify' variant='primary'>
          Bienvenido(a) {JSON.stringify('{name}')} Verifique que toda su
          información de datos básicos y de ubicación/contacto sea correcta. Si
          no es así, haga click en Actualizar información.
        </Alert>
        <Row>
          <Col sm='12'>
            <fieldset>
              <legend>
                Mis Datos
                <hr />
              </legend>
            </fieldset>
          </Col>
          {info.length === 0 && Array(22).fill(null).map((_, i) => {
            const min = 1; const max = 12
            return (
              <Col md='3' key={i}>
                <Form.Group className='mb-3'>
                  <Placeholder animation='glow'>
                    <Placeholder xs={Math.floor(Math.random() * (max - min + 1)) + min} />
                  </Placeholder>
                  <Placeholder.Button variant='secondary' xs={12} />
                </Form.Group>
              </Col>
            )
          })}
          {info.length > 0 && info.map(({ label, input, select, selected }, i) => {
            return (
              <Col md='3' key={i}>
                {select.length > 0
                  ? (
                    <>
                      <Form.Label>{label}</Form.Label>
                      <Form.Select className='cursor-not-allowed' disabled>
                        <option selected='selected'>{select.find(({ value }) => value === selected)?.text}</option>

                      </Form.Select>
                    </>
                    )
                  : (
                    <Form.Group className='mb-3'>
                      <Form.Label>{label}</Form.Label>
                      <Form.Control
                        className='cursor-not-allowed'
                        value={input}
                        type='text'
                        disabled
                      />
                    </Form.Group>
                    )}
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
}
