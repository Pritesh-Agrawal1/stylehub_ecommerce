import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Tab, Card, Button, Form } from 'react-bootstrap';
import '../styles/Userdashboard.css';
import Base from '../components/Base.jsx';

const sampleProducts = [
  { id: 1, image: '/images/img2.webp', name: 'Product 1', price: 29.99 },
  { id: 2, image: '/images/img2.webp', name: 'Product 2', price: 39.99 },
  { id: 3, image: '/images/img2.webp', name: 'Product 3', price: 49.99 },
];

const Userdashboard = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setQuantity(prev => ({ ...prev, [id]: newQuantity }));
  };

  const placeOrder = () => {
    alert('Order placed!');
    setCart([]);
  };

  return (
    <Base>
    <div className="user-dashboard">
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} className="sidebar">
            <h2 className="text-center my-4">User Dashboard</h2>
            <Nav className="flex-column">
              <Nav.Link href="#products">Products</Nav.Link>
              <Nav.Link href="#cart">Cart</Nav.Link>
              <Nav.Link href="#orders">Orders</Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={9} className="content">
            <Tab.Container id="left-tabs-example" defaultActiveKey="products">
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="products">
                      <h3>Available Products</h3>
                      <Row>
                        {sampleProducts.map(product => (
                          <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
                            <Card className="product-card">
                              <Card.Img variant="top" src={product.image} />
                              <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                                <Button 
                                  variant="primary" 
                                  onClick={() => addToCart(product)}
                                >
                                  Add to Cart
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="cart">
                      <h3>Your Cart</h3>
                      {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                      ) : (
                        <div>
                          {cart.map((item, index) => (
                            <Card className="my-4" key={index}>
                              <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>${item.price.toFixed(2)}</Card.Text>
                                <Form.Group controlId={`quantity-${item.id}`}>
                                  <Form.Label>Quantity</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={quantity[item.id] || 1}
                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                    min="1"
                                  />
                                </Form.Group>
                                <Button 
                                  variant="danger" 
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  Remove
                                </Button>
                              </Card.Body>
                            </Card>
                          ))}
                          <Button 
                            variant="success" 
                            onClick={placeOrder}
                          >
                            Place Order
                          </Button>
                        </div>
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="orders">
                      <h3>Order History</h3>
                      {/* Add your order history functionality here */}
                      <p>Order history will be displayed here.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </div>
    </Base>
  );
};

export default Userdashboard;
