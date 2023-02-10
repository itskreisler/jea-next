'use client'
import { Alert, Container, Nav, Navbar, NavDropdown, Row, Col, Form } from 'react-bootstrap'

export default function PageDefault () {
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
                <NavDropdown.Item href='#3'>
                  Datos basicos
                </NavDropdown.Item>
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
          Bienvenido(a) {JSON.stringify('{name}')} Verifique que toda su información de datos básicos y de ubicación/contacto sea correcta. Si no es así, haga click en Actualizar información.
        </Alert>
        <Row>
          <Col sm='12'>
            <fieldset>
              <legend>Mis Datos
                <hr />
              </legend>
            </fieldset>
          </Col>

          {Array(22).fill('label').map((label, i) => {
            return (
              <Col md='3' key={i}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control className='cursor-not-allowed' value={Math.floor(Math.random() * 789)} type='text' disabled />
                </Form.Group>
              </Col>
            )
          })}

        </Row>
      </Container>
    </>
  )
}
