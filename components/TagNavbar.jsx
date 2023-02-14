'use client'
import Image from 'next/image'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'
import { useMedia } from 'react-use'
const TagNavbar = () => {
  const breakpoint = useMedia('(min-width: 576px)')

  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>
          <Image
            src='/img/encabezado.jpg'
            width='280'
            height='40'
            className='d-inline-block align-top object-fit-cover rounded'
            alt='React Bootstrap logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav className='justify-content-end'>
          {breakpoint
            ? (
              <Navbar.Text className='text-white'>
                Bienvenido : &nbsp;
              </Navbar.Text>
              )
            : <></>}
          <NavDropdown
            id='nav-dropdown-dark-example'
            title='Name'
            align={breakpoint ? { sm: 'end' } : { md: 'start' }}
          >
            <NavDropdown.Item href='#action/3.1'>Mis Datos</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>
              Cambio Contraseña
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>
              Cerrar Sesíon
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default TagNavbar
