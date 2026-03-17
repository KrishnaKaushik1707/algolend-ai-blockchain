import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, DollarSign, CalendarDays } from 'lucide-react';

const RepayLoan = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('algoLendUser');
    if (!savedUser) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <Container className="py-5 text-center">
        <Col md={8} lg={6} className="mx-auto">
          <div className="bg-success text-white rounded-circle d-inline-flex p-4 mb-4">
             <CheckCircle2 size={48} />
          </div>
          <h2 className="fw-bold mb-3">Payment Successful!</h2>
          <p className="text-muted lead mb-5">Your payment of $406.45 has been applied to Loan #AL-9284. Your next due date is Dec 15, 2026.</p>
          <Button href="/dashboard" variant="primary" size="lg" className="rounded-pill px-5 fw-bold shadow-sm">Return to Dashboard</Button>
        </Col>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Make a Payment</h2>
            <p className="text-muted">Pay your upcoming loan installment securely.</p>
          </div>

          <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="bg-primary bg-opacity-10 text-primary p-4 border-bottom border-primary border-opacity-10">
               <Row className="align-items-center">
                 <Col xs={6}>
                   <h6 className="fw-bold text-uppercase mb-1">Due Amount</h6>
                   <h2 className="fw-bold mb-0 d-flex align-items-center"><DollarSign size={24} className="me-1" /> 406.45</h2>
                 </Col>
                 <Col xs={6} className="text-end">
                   <h6 className="text-dark opacity-75 text-uppercase mb-1 d-flex align-items-center justify-content-end"><CalendarDays size={16} className="me-1" /> Due Date</h6>
                   <h5 className="text-dark fw-bold mb-0">Nov 15, 2026</h5>
                 </Col>
               </Row>
            </div>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between mb-2">
                 <span className="text-muted fw-semibold">Loan Reference</span>
                 <span className="fw-bold">#AL-9284</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                 <span className="text-muted fw-semibold">Remaining Balance</span>
                 <span className="fw-bold">$3,654.12</span>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4">Payment Method</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <div className="border rounded-3 p-3 mb-3 d-flex align-items-center cursor-pointer border-primary bg-primary bg-opacity-10">
                    <Form.Check type="radio" name="paymentMethod" id="bank" className="me-3" defaultChecked />
                    <div>
                      <h6 className="fw-bold mb-0">Bank Account (ACH)</h6>
                      <small className="text-muted">Chase Bank **** 4152</small>
                    </div>
                  </div>
                  <div className="border rounded-3 p-3 d-flex align-items-center cursor-pointer opacity-75">
                    <Form.Check type="radio" name="paymentMethod" id="card" className="me-3" />
                    <div>
                      <h6 className="fw-bold mb-0">Debit Card</h6>
                      <small className="text-muted">Fee applies: 2.5%</small>
                    </div>
                  </div>
                </Form.Group>

                <Alert variant="secondary" className="border-0 bg-light rounded-3 text-muted small d-flex align-items-start py-3">
                  <CheckCircle2 size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                  Your payment will be processed immediately. Setting up AutoPay can qualify you for a 0.25% interest rate reduction.
                </Alert>

                <Button variant="primary" type="submit" size="lg" className="w-100 rounded-pill fw-bold py-3 mt-3 shadow-sm">
                  Pay $406.45
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RepayLoan;
