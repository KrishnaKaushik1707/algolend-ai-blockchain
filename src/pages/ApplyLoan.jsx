import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { DollarSign, ShieldCheck, FileCheck2 } from 'lucide-react';

const ApplyLoan = () => {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <Container className="py-5 text-center">
        <Col md={8} lg={6} className="mx-auto">
          <div className="bg-success text-white rounded-circle d-inline-flex p-4 mb-4">
             <FileCheck2 size={48} />
          </div>
          <h2 className="fw-bold mb-3">Application Submitted!</h2>
          <p className="text-muted lead mb-5">Your loan application has been placed in the marketplace. Lenders will review and decide to fund shortly. You can track its status in your dashboard.</p>
          <Button href="/dashboard" variant="primary" size="lg" className="rounded-pill px-5 fw-bold shadow-sm">Go to Dashboard</Button>
        </Col>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Apply for a Loan</h2>
            <p className="text-muted">Complete the steps below to request funding.</p>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between position-relative">
              <div className="position-absolute top-50 start-0 w-100 border-top bg-light" style={{zIndex: -1}}></div>
              <div className={`rounded-circle px-3 py-2 fw-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-light text-muted'}`}>1</div>
              <div className={`rounded-circle px-3 py-2 fw-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-light text-muted'}`}>2</div>
              <div className={`rounded-circle px-3 py-2 fw-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-light text-muted'}`}>3</div>
            </div>
            <div className="d-flex justify-content-between mt-2 small text-muted fw-semibold">
               <span>Details</span>
               <span>Terms</span>
               <span>Review</span>
            </div>
          </div>

          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div>
                    <h5 className="fw-bold mb-4">Loan Details</h5>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Requested Amount</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted"><DollarSign size={18} /></span>
                        <Form.Control type="number" placeholder="5000" className="border-start-0 ps-0 fw-bold fs-5" required />
                      </div>
                      <Form.Text className="text-muted">Min: $100 | Max: $10,000</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Purpose of Loan</Form.Label>
                      <Form.Select className="py-2" required>
                        <option value="">Select a purpose...</option>
                        <option value="debt">Debt Consolidation</option>
                        <option value="home">Home Improvement</option>
                        <option value="medical">Medical Expenses</option>
                        <option value="business">Small Business</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h5 className="fw-bold mb-4">Preferred Terms</h5>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Repayment Term</Form.Label>
                      <div className="d-flex gap-2 text-center">
                        <div className="flex-fill border rounded-3 p-3 bg-primary bg-opacity-10 border-primary cursor-pointer text-primary fw-bold">6 Months</div>
                        <div className="flex-fill border rounded-3 p-3 cursor-pointer fw-semibold text-muted">12 Months</div>
                        <div className="flex-fill border rounded-3 p-3 cursor-pointer fw-semibold text-muted">24 Months</div>
                      </div>
                    </Form.Group>

                    <Alert variant="info" className="d-flex align-items-center rounded-3 bg-primary bg-opacity-10 border-0 text-dark">
                      <ShieldCheck size={32} className="text-primary me-3" />
                      <div>
                        Based on your credit profile, the expected APR is <strong>7.5% - 10.5%</strong>. Exact rate determined upon funding.
                      </div>
                    </Alert>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h5 className="fw-bold mb-4">Review Application</h5>
                    <div className="bg-light p-4 rounded-3 mb-4">
                       <Row className="mb-3">
                         <Col xs={6} className="text-muted fw-semibold">Amount</Col>
                         <Col xs={6} className="text-end fw-bold fs-5">$5,000</Col>
                       </Row>
                       <Row className="mb-3">
                         <Col xs={6} className="text-muted fw-semibold">Purpose</Col>
                         <Col xs={6} className="text-end fw-semibold">Debt Consolidation</Col>
                       </Row>
                       <Row className="mb-2">
                         <Col xs={6} className="text-muted fw-semibold">Term</Col>
                         <Col xs={6} className="text-end fw-semibold">6 Months</Col>
                       </Row>
                    </div>
                    <Form.Group className="mb-4 bg-light p-3 rounded-3 border">
                      <Form.Check 
                        type="checkbox" 
                        label={<span className="ms-2 fw-medium text-dark">I agree to the Terms of Service and Credit Check Authorization.</span>} 
                        required 
                        className="d-flex align-items-center" 
                      />
                    </Form.Group>
                  </div>
                )}

                <div className="d-flex justify-content-between mt-5">
                  {step > 1 ? (
                    <Button variant="outline-secondary" type="button" onClick={() => setStep(step - 1)} className="px-4 rounded-pill fw-semibold">Back</Button>
                  ) : (
                    <div></div> // Spacers
                  )}
                  <Button variant="primary" type="submit" className="px-5 rounded-pill fw-bold shadow-sm">
                    {step === 3 ? 'Submit Application' : 'Continue'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyLoan;
