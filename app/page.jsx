'use client'
import Image from 'next/image'
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import './globals.scss'
export default function Page () {
  const { handleSubmit, register } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={3} className='bg-lg-white text-center mt-5 mt-lg-0 pt-xl-5'>
            <Image
              src='/img/Encabezadonew.jpg'
              className='object-fit-cover rounded'
              width={320}
              height={320}
              alt='...'
            />
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className='mb-3' controlId='formUsuario'>
                    <Form.Label>Usuario </Form.Label>
                    <Form.Control
                      className='text-center'
                      type='email'
                      placeholder='****@***.***'
                      required
                      {...register('txtLogin', { required: true })}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formPass'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      className='text-center'
                      type='password'
                      required
                      placeholder='****'
                      {...register('txtPassword', { required: true })}
                    />
                    <Form.Text className='text-muted'>
                      <a href='#'>¿Has olvidado tu contraseña?</a>
                    </Form.Text>
                  </Form.Group>
                  <Button
                    variant='primary'
                    type='submit'
                    className='text-white w-100'
                  >
                    Entrar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid className='bg-primary mt-1'>
        <Row className='justify-content-center py-lg-2'>
          <Col lg={10}>
            <Row>
              <TagFooterIcons />
              <Col>
                <p className='text-white m-0'>
                  <small>Calle 7 No. 6-54 Bogotá. Centro de Atención Telefónica - Bogotá 5954410 - Línea gratuita nacional 018000951100  </small>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
const TagFooterIcons = () => {
  return [
    'fa-brands fa-twitter',
    'fa-brands fa-facebook-f',
    'fa-brands fa-instagram'
  ].map((className, key) => (
    <Col xs={1} lg='auto' key={key}>
      {' '}
      <a href='#' className='text-white'>
        <i {...{ className }} />
      </a>{' '}
    </Col>
  ))
}
