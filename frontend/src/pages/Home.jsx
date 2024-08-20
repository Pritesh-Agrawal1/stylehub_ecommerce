import React from 'react';
import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import Base from '../components/Base';
import { NavLink } from 'react-router-dom';


const Home = () => {
  return (
    <Base>
    <div>
      
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="./images/banner.jpg" alt="Summer Collection" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="./images/fashion2.jpg" alt="New Arrivals"/>
        </Carousel.Item>
      </Carousel>

     
      <Container className="my-4">
        <h2 className="text-center">Featured Products</h2>
        <Row>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="./images/tshirt.jpg" style={{ height: '600px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>MENS</Card.Title>
                <Button variant="primary" as={NavLink} to="/mens">View Details</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="./images/suit.jpg" style={{ height: '600px', objectFit: 'cover' }}/>
              <Card.Body>
                <Card.Title>WOMENS</Card.Title>
                <Button variant="primary" as={NavLink} to="/womens">View Details</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="./images/warm.jpg" style={{ height: '600px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>KIDS</Card.Title>
                <Button variant="primary" as={NavLink} to="/kids">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </Base>
  );
};

export default Home;
