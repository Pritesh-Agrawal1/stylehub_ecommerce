import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f8f9fa', padding: '1rem 0', marginTop: '2rem' }}>
            <Container>
                <Row className="text-center">
                    <Col>
                        <h5>About StyleHub</h5>
                        <p>
                            StyleHub is your go-to destination for the latest fashion trends and styles. 
                            Explore our collections and stay ahead in fashion.
                        </p>
                        <p>&copy; 2024 StyleHub. All rights reserved.</p>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <h5>Follow Us</h5>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <a href="https://facebook.com/stylehub" target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                                <FaFacebookF size={24} />
                            </a>
                            <a href="https://instagram.com/stylehub" target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://twitter.com/stylehub" target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://pinterest.com/stylehub" target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                                <FaPinterestP size={24} />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
