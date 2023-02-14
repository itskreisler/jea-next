'use client'
import { useState } from 'react'
import Image from 'next/image'
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  InputGroup
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSweetAlert2 } from '../helpers/user-sweet-alert'
export default function PageIndex () {
  const router = useRouter()
  const { handleSubmit, register } = useForm()
  const [eye, setEye] = useState(true)
  const [loading, setLoading] = useState(false)
  const [status, ToastFire] = useSweetAlert2({ icon: 'warning', title: 'hola mundo' })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', data)
      if (res.data.code) {
        router.push('/jea/default')
      } else {
        if (status === 'ready') {
          ToastFire.current({ icon: 'error', title: res.data.message })
        }
      }
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  }
  const handleCLickPass = () => {
    setEye(!eye)
  }
  return (
    <main data-body='ingreso'>
      <Container fluid>
        <Row>
          <Col lg={3} className='bg-lg-white text-center mt-5 mt-lg-0'>
            <Image
              src='/img/Encabezadonew.jpg'
              className='object-fit-cover rounded'
              width='320'
              height='320'
              priority
              alt='...'
            />
            <Card className='mb-3'>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className='mb-3' controlId='formUsuario'>
                    <Form.Label>Usuario </Form.Label>
                    <Form.Control
                      className='text-center'
                      type='email'
                      required
                      {...register('txtLogin', { required: true })}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formPass'>
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        className='text-center'
                        {...{ type: eye ? 'password' : 'text' }}
                        required
                        {...register('txtPassword', { required: true })}
                      />
                      <Button
                        variant='outline-primary'
                        onClick={handleCLickPass}
                      >
                        {eye
                          ? (
                            <i className='fa-solid fa-eye' />
                            )
                          : (
                            <i className='fa-solid fa-eye-slash' />
                            )}
                      </Button>
                    </InputGroup>

                    <Form.Text className='text-muted'>
                      <Link href='#'>¿Has olvidado tu contraseña?</Link>
                    </Form.Text>
                  </Form.Group>
                  <Button
                    variant='primary'
                    type='submit'
                    className='text-white w-100'
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid className='bg-primary'>
        <Row className='justify-content-center py-2 py-lg-2'>
          <Col lg={10}>
            <Row>
              <TagFooterIcons />
              <Col>
                <p className='text-white m-0 text-center'>
                  <small>
                    Calle 7 No. 6-54 Bogotá. Centro de Atención Telefónica -
                    Bogotá 5954410 <br />- Línea gratuita nacional 018000951100
                  </small>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
const TagFooterIcons = () => {
  const links = [
    {
      className: 'fa-brands fa-twitter',
      href: 'https://twitter.com/JovenesAccionCo'
    },
    {
      className: 'fa-brands fa-facebook-f',
      href: 'https://www.facebook.com/JovenesAccionCo'
    },
    {
      className: 'fa-brands fa-instagram',
      href: 'https://www.instagram.com/jovenesaccionco/'
    }
  ]

  return links.map(({ className, href }, key) => (
    <Col xs={4} lg='auto' className='text-center my-auto' key={key}>
      {' '}
      <a {...{ href, className: 'text-white h4', target: '_blank' }}>
        <i {...{ className }} />
      </a>{' '}
    </Col>
  ))
}
