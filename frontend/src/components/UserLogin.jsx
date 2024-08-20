// src/UserLogin.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import '../styles/UserLogin.css'; // Import custom CSS for styling
import Base from './Base';
import { loginUser } from '../services/userService';
import { doLogin } from '../auth';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

const UserLogin = () => {
  const navigate = useNavigate()

  const [loginDetail, setLoginDetail] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      email: '',
      password: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage(''); // Clear previous success message

    // Simple validation
    if (loginDetail.email === '' || loginDetail.password === '') {
      swal('Please fill in both fields');
      return;
    }

    // Submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log('User login:', data);

        //save the data to localstorage
        doLogin(data,()=>{
          console.log("login detail is saved to localstorage")
           // Redirect based on user role
          if (data.user.role === 'ROLE_ADMIN') {
           navigate("/admin/dashboard");
          } else if (data.user.role === 'ROLE_CUSTOMER') {
          navigate("/user/dashboard");
          } else {
          console.error('Unknown role:', data.role);
          setError('Unknown role, unable to navigate.');
      }
        })
      })
      .catch((error) => {
        console.error(error);
        if (error.response && (error.response.status === 400 || error.response.status === 404)) {
          setError(error.response.data.message);
        } else {
          setError('Something went wrong on the server!');
        }
      });
  };

  return (
    <Base>
      <div className="bg-container">
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row className="w-100">
            <Col xs={12} md={10} lg={8} xl={6} className="mx-auto">
              <div className="login-form-container border p-4 rounded shadow-sm bg-white">
                <h2 className="mb-4 text-center">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={loginDetail.email}
                      onChange={(e) => handleChange(e, 'email')}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, 'password')}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 mt-3">
                    Login
                  </Button>
                  <Button variant="secondary" type="button" className="w-100 mt-2" onClick={handleReset}>
                    Reset
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default UserLogin;
