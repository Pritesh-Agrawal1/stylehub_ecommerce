import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Base from '../components/Base';
const Mens = () => {
    return (
        <Base>
        <Container className="my-4">
          <Row className="text-center mb-4">
                <Col>
                    <h2>Men's Clothing</h2>
                    <p>Discover our stylish and trendy men's clothing collection.</p>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="/mens/img1.jpg" alt="Men's T-Shirts" style={{ height: '600px', objectFit: 'cover' }} />
                        <Card.Body>
                            <Card.Title>Men's T-Shirts</Card.Title>
                            <Card.Text>
                                Explore a variety of comfortable and fashionable t-shirts.
                            </Card.Text>
                            <Button variant="primary">Shop Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card> 
                        <Card.Img variant="top" src="/mens/img2.webp" alt="Men's Jeans" style={{ height: '600px', objectFit: 'cover' }} />
                        <Card.Body>
                            <Card.Title>Men's Jeans</Card.Title>
                            <Card.Text>
                                Stay warm and stylish with our collection of men's jackets.
                            </Card.Text>
                            <Button variant="primary">Shop Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="/mens/img3.webp" alt="Men's Sherwani" style={{ height: '600px', objectFit: 'cover' }}/>
                        <Card.Body>
                            <Card.Title>Men's Sherwani</Card.Title>
                            <Card.Text>
                                Find the perfect pair of jeans for every occasion.
                            </Card.Text>
                            <Button variant="primary">Shop Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="/mens/img4.webp" alt="Men's Shirt" style={{ height: '600px', objectFit: 'cover' }} />
                        <Card.Body>
                            <Card.Title>Men's Shirts</Card.Title>
                            <Card.Text>
                                Explore a variety of comfortable and fashionable t-shirts.
                            </Card.Text>
                            <Button variant="primary">Shop Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="/mens/img5.jpg" alt="Men's Trousers" style={{ height: '600px', objectFit: 'cover' }} />
                        <Card.Body>
                            <Card.Title>Men's Trousers</Card.Title>
                            <Card.Text>
                                Stay warm and stylish with our collection of men's jackets.
                            </Card.Text>
                            <Button variant="primary">Shop Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="/mens/img6.jpg" alt="Men's Suit" style={{ height: '600px', objectFit: 'cover' }}/>
                        <Card.Body>
                            <Card.Title>Men's Suit</Card.Title>
                            <Card.Text>
                                Find the perfect pair of jeans for every occasion.
                            </Card.Text>
                            <Button variant="primary">Shop Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Base>
    );
};

export default Mens;
