// About.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../styles/About.css';
import Base from '../components/Base';

const About = () => {
  return (
    <Base>
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <h2 className="about-title">About Us</h2>
          <p className="about-text">
            Welcome to StyleHub! We are dedicated to providing top-notch products and services to our customers. Our team is passionate about delivering exceptional quality and customer satisfaction. With years of experience in the industry, we strive to exceed your expectations and build long-lasting relationships with our clients.
          </p>
          <p className="about-text">
            Our mission is to [insert mission statement]. We believe in [insert values or philosophy]. Thank you for choosing us, and we look forward to serving you!
          </p>
        </Col>
        <Col md={6}>
          <Image src="./images/img3.jpg" alt="About Us" fluid className="about-image" />
        </Col>
      </Row>
    </Container>
    </Base>
  );
};

export default About;
