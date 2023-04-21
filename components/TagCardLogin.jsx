import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

const TagCardLogin = ({ user }) => {
  return (
    <Card className={!user.length ? 'd-none' : 'mb-3'}>
      <Card.Body>
        {user.map((u, i) => (
          <Row key={i} className='justify-content-center'>
            <Col xs='2' md='auto'>
              <div className='reviewer-photo'>
                <span className='initial-profile profile-style-0'>
                  {[...u].shift()}
                </span>
              </div>
            </Col>
            <Col xs='10' md='8'>
              <Button variant='outline-secondary' className='w-100'>
                {u}
              </Button>
            </Col>
          </Row>

        ))}
      </Card.Body>
    </Card>
  )
}

export default TagCardLogin
