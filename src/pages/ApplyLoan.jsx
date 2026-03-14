import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, ShieldCheck, FileCheck2 } from 'lucide-react';

const ApplyLoan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [term, setTerm] = useState(6);
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('algoLendUser');
    if (!savedUser) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save loan to localStorage
      const savedUser = JSON.parse(localStorage.getItem('algoLendUser'));
      const newLoan = {
        id: `AL-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: Number(amount),
        interestRate: parseFloat((Math.random() * (10.5 - 7.5) + 7.5).toFixed(1)), // Random rate between 7.5 and 10.5
        term: term,
        borrowerName: savedUser.name,
        purpose: purpose,
        type: 'marketplace',
        createdAt: new Date().toISOString()
      };
      
      const existingMarketplaceLoans = JSON.parse(localStorage.getItem('algoLendMarketplace')) || [];
      localStorage.setItem('algoLendMarketplace', JSON.stringify([newLoan, ...existingMarketplaceLoans]));
      
      const existingUserLoans = JSON.parse(localStorage.getItem('algoLendUserLoans')) || [];
      localStorage.setItem('algoLendUserLoans', JSON.stringify([{...newLoan, status: 'Active', type: 'dashboard'}, ...existingUserLoans]));

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
                        <span className="input-group-text bg-light border-end-0 text-muted"><IndianRupee size={18} /></span>
                        <Form.Control type="number" placeholder="50000" className="border-start-0 ps-0 fw-bold fs-5" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                      </div>
                      <Form.Text className="text-muted">Min: ₹10,000 | Max: ₹10,00,000</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Purpose of Loan</Form.Label>
                      <Form.Select className="py-2" value={purpose} onChange={(e) => setPurpose(e.target.value)} required>
                        <option value="">Select a purpose...</option>
                        <option value="Debt Consolidation">Debt Consolidation</option>
                        <option value="Home Improvement">Home Improvement</option>
                        <option value="Medical Expenses">Medical Expenses</option>
                        <option value="Small Business">Small Business</option>
                        <option value="Other">Other</option>
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
                        <div 
                          className={`flex-fill border rounded-3 p-3 cursor-pointer ${term === 6 ? 'bg-primary bg-opacity-10 border-primary text-primary fw-bold' : 'fw-semibold text-muted'}`}
                          onClick={() => setTerm(6)}
                        >6 Months</div>
                        <div 
                          className={`flex-fill border rounded-3 p-3 cursor-pointer ${term === 12 ? 'bg-primary bg-opacity-10 border-primary text-primary fw-bold' : 'fw-semibold text-muted'}`}
                          onClick={() => setTerm(12)}
                        >12 Months</div>
                        <div 
                          className={`flex-fill border rounded-3 p-3 cursor-pointer ${term === 24 ? 'bg-primary bg-opacity-10 border-primary text-primary fw-bold' : 'fw-semibold text-muted'}`}
                          onClick={() => setTerm(24)}
                        >24 Months</div>
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
                         <Col xs={6} className="text-end fw-bold fs-5">₹{amount ? Number(amount).toLocaleString('en-IN') : '0'}</Col>
                       </Row>
                       <Row className="mb-3">
                         <Col xs={6} className="text-muted fw-semibold">Purpose</Col>
                         <Col xs={6} className="text-end fw-semibold">{purpose}</Col>
                       </Row>
                       <Row className="mb-2">
                         <Col xs={6} className="text-muted fw-semibold">Term</Col>
                         <Col xs={6} className="text-end fw-semibold">{term} Months</Col>
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
