import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    income: '',
    employment: 'Employed Full-Time'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a user object simulating registration
    const newUser = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      phone: 'Not provided',
      location: 'Not provided'
    };

    // Save to localStorage
    localStorage.setItem('algoLendUser', JSON.stringify(newUser));

    // Redirect to dashboard
    navigate('/dashboard');
  };
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center mb-4">
            <Link to="/" className="text-decoration-none text-primary d-inline-flex align-items-center fw-bold fs-3">
              <Wallet className="me-2" size={32} />
              AlgoLend
            </Link>
          </div>
          <Card className="border-0 shadow-lg rounded-5 overflow-hidden">
            <div className="bg-primary text-white p-4 text-center">
              <h3 className="fw-bold mb-0">Create an Account</h3>
              <p className="opacity-75 mb-0">Join AlgoLend today to unlock financial power.</p>
            </div>
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold small">First Name</Form.Label>
                      <Form.Control type="text" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} className="rounded-3" required />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold small">Last Name</Form.Label>
                      <Form.Control type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} className="rounded-3" required />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Email Address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} className="rounded-3" required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold small">Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} className="rounded-3" required />
                </Form.Group>

                <hr className="my-4 opacity-25" />
                <h6 className="fw-bold mb-3 text-muted">Financial Information</h6>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Annual Income ($)</Form.Label>
                  <Form.Control type="number" name="income" placeholder="50000" value={formData.income} onChange={handleChange} className="rounded-3" required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold small">Employment Status</Form.Label>
                  <Form.Select name="employment" value={formData.employment} onChange={handleChange} className="rounded-3">
                    <option>Employed Full-Time</option>
                    <option>Employed Part-Time</option>
                    <option>Self-Employed</option>
                    <option>Unemployed</option>
                    <option>Student</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" size="lg" className="w-100 rounded-pill fw-bold mb-3 shadow-sm">
                  Register Account
                </Button>

                <p className="text-center text-muted small mb-0">
                  Already have an account? <Link to="/login" className="text-primary fw-semibold text-decoration-none">Log in here</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
