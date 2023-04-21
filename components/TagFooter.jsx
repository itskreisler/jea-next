import React from 'react'
import {
    Card,
    Col,
    Container,
    Row,
    Form,
    Button,
    InputGroup
  } from 'react-bootstrap'
const TagFooter = () => {
  return (
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
export default TagFooter
