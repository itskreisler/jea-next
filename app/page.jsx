'use client'
import Image from 'next/image'
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import './globals.scss'
export default function Page () {
  const { handleSubmit, register } = useForm()
  const onSubmit = data => console.log(data)
  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <Image src='/img/' />
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3' controlId='formUsuario'>
                  <Form.Label>Usuario </Form.Label>
                  <Form.Control type='email' placeholder='****@***.***' required {...register('txtLogin', { required: true })} />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formPass'>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type='password' required placeholder='****' {...register('txtPassword', { required: true })} />
                  <Form.Text className='text-muted'>
                    <a href='#'>¿Has olvidado tu contraseña?</a>
                  </Form.Text>
                </Form.Group>
                <Button variant='primary' type='submit' className='text-white w-100'>
                  Entrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
