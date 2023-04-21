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
import TagFooter from '../components/TagFooter'
// import { useLocalstorageState } from 'rooks'
export default function PageIndex () {
  const router = useRouter()
  const { handleSubmit, register } = useForm()
  // const [user, setUser] = useLocalstorageState('PageIndex:user', [])
  const [eye, setEye] = useState(true)
  const [loading, setLoading] = useState(false)
  const [status, ToastFire] = useSweetAlert2()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', data)
      if (res.data.code) {
        // const tmp = data.txtLogin.split('@').shift()
        // !user.includes() && setUser([...user, tmp])
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
          <Col lg={3} className='bg-white border rounded text-center mt-lg-0'>
            <Image
              src='/img/Encabezadonew.jpg'
              unoptimized
              className='object-fit-cover rounded border my-2'
              width='320'
              height='320'
              priority
              alt='logo'
            />

            <Card className='mb-3 border-primary'>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className='mb-3' controlId='formUsuario'>
                    <Form.Label>Usuario</Form.Label>
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
                    variant='outline-primary'
                    type='submit'
                    className='w-100'
                    disabled={loading}
                  >
                    <strong>{loading ? 'Entrando...' : 'Entrar'}</strong>
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <TagFooter />
    </main>
  )
}
