// src/components/UserRegistration.js

import React, { useState } from 'react';
import { signUp } from '../services/userService';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/UserRegistration.css'; // Import the custom CSS file
import Base from './Base';

const UserRegistration = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    password: '',
    role: 'ROLE_CUSTOMER',
    address: {
      addressLine: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const validate = () => {
    const errors = {};
    if (!user.firstName) errors.firstName = 'First name is required';
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!user.password) errors.password = 'Password is required';
    else if (user.password.length < 6) errors.password = 'Password must be at least 6 characters long';
    if (!user.phoneNo) errors.phoneNo = 'Phone number is required';
    if (!user.address.addressLine) errors.addressLine = 'Address line is required';
    if (!user.address.city) errors.city = 'City is required';
    if (!user.address.state) errors.state = 'State is required';
    if (!user.address.country) errors.country = 'Country is required';
    if (!user.address.zipCode) errors.zipCode = 'Zip Code is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setError('Please fix the errors above.');
      return;
    }

    signUp(user)
      .then((resp) => {
        console.log(resp);
        console.log("Registration successful");
        setError('');
      })
      .catch((error) => {
        console.log("Error during registration ", error);
        setError('An error occurred during registration.');
      });
  };

  return (
    <Base>
    <div className="background-image">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="form-light">
              <Card.Body>
                <Card.Title className="mb-4 text-center">User Registration</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formFirstName">
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={user.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formLastName">
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={user.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formPhoneNo">
                        <Form.Control
                          type="text"
                          name="phoneNo"
                          value={user.phoneNo}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          isInvalid={!!errors.phoneNo}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phoneNo}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Control
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          placeholder="Email"
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formPassword">
                        <Form.Control
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          placeholder="Password"
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formRole">
                        <Form.Control
                          type="hidden"
                          name="role"
                          value="ROLE_CUSTOMER"
                          onChange={handleChange}
                          placeholder="Role"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Card className="mb-3 p-3 border form-light">
                    <Card.Body>
                      <Card.Title>Address Details</Card.Title>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="formAddressLine">
                            <Form.Control
                              type="text"
                              name="addressLine"
                              value={user.address.addressLine}
                              onChange={handleAddressChange}
                              placeholder="Address Line"
                              isInvalid={!!errors.addressLine}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.addressLine}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="formCity">
                            <Form.Control
                              type="text"
                              name="city"
                              value={user.address.city}
                              onChange={handleAddressChange}
                              placeholder="City"
                              isInvalid={!!errors.city}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.city}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formState">
                            <Form.Control
                              type="text"
                              name="state"
                              value={user.address.state}
                              onChange={handleAddressChange}
                              placeholder="State"
                              isInvalid={!!errors.state}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.state}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="formCountry">
                            <Form.Control
                              type="text"
                              name="country"
                              value={user.address.country}
                              onChange={handleAddressChange}
                              placeholder="Country"
                              isInvalid={!!errors.country}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.country}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formZipCode">
                            <Form.Control
                              type="text"
                              name="zipCode"
                              value={user.address.zipCode}
                              onChange={handleAddressChange}
                              placeholder="Zip Code"
                              isInvalid={!!errors.zipCode}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.zipCode}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Button variant="primary" type="submit" className="w-100 mb-3">
                    Register
                  </Button>
                  {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </Base>
  );
};

export default UserRegistration;
