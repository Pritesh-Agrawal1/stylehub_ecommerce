import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Base from '../components/Base.jsx';
const Kids = () => {
    return (
      <Base>
        <Container className="my-4">
          <Row className="text-center mb-4">
                <Col>
                    <h2>Kid's Clothing</h2>
                    <p>Discover our stylish and trendy men's clothing collection.</p>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Men's T-Shirts" />
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
                        <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Men's Jackets" />
                        <Card.Body>
                            <Card.Title>Men's Jackets</Card.Title>
                            <Card.Text>
                                Stay warm and stylish with our collection of men's jackets.
                            </Card.Text>
                            <Button variant="primary">Shop Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Men's Jeans" />
                        <Card.Body>
                            <Card.Title>Men's Jeans</Card.Title>
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
                        <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Men's T-Shirts" />
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
                        <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Men's Jackets" />
                        <Card.Body>
                            <Card.Title>Men's Jackets</Card.Title>
                            <Card.Text>
                                Stay warm and stylish with our collection of men's jackets.
                            </Card.Text>
                            <Button variant="primary">Shop Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Men's Jeans" />
                        <Card.Body>
                            <Card.Title>Men's Jeans</Card.Title>
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

export default Kids;
