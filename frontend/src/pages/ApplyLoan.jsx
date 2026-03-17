import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DollarSign, ShieldCheck, FileCheck2 } from "lucide-react";
import axios from "axios";

const ApplyLoan = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [term, setTerm] = useState(6);
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    // The rest of the app uses algoLendUser as the "signed-in" signal
    const savedUser = localStorage.getItem("algoLendUser");
    if (!savedUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem("algoLendUser"));

      const loanData = {
        borrower: savedUser?.name || "Anonymous",
        amount: Number(amount),
        purpose: purpose,
        duration: term,
      };

      const token = localStorage.getItem("token");
      await axios.post(
        "https://algolend-backend.onrender.com/apply-loan",
        loanData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
      );

      setSuccess(true);
    } catch (error) {
      console.error("Loan submission failed:", error);
      alert("Failed to apply loan");
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
          <p className="text-muted lead mb-5">
            Your loan application has been placed in the marketplace. Lenders
            will review and decide to fund shortly.
          </p>
          <Button
            href="/dashboard"
            variant="primary"
            size="lg"
            className="rounded-pill px-5 fw-bold shadow-sm"
          >
            Go to Dashboard
          </Button>
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
            <p className="text-muted">
              Complete the steps below to request funding.
            </p>
          </div>

          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    <h5 className="fw-bold mb-4">Loan Details</h5>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Requested Amount
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-body-tertiary border-end-0 text-primary">
                          <DollarSign size={18} />
                        </span>
                        <Form.Control
                          type="number"
                          placeholder="5000"
                          className="border-start-0 ps-0 fw-bold fs-5"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Purpose of Loan
                      </Form.Label>
                      <Form.Select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                      >
                        <option value="">Select a purpose...</option>
                        <option value="Debt Consolidation">
                          Debt Consolidation
                        </option>
                        <option value="Home Improvement">
                          Home Improvement
                        </option>
                        <option value="Medical Expenses">
                          Medical Expenses
                        </option>
                        <option value="Small Business">Small Business</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h5 className="fw-bold mb-4">Preferred Terms</h5>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        Repayment Term
                      </Form.Label>

                      <div className="d-flex gap-2 text-center">
                        {[6, 12, 24].map((t) => (
                          <div
                            key={t}
                            className={`flex-fill border rounded-3 p-3 cursor-pointer ${
                              term === t
                                ? "bg-primary bg-opacity-10 border-primary text-primary fw-bold"
                                : "fw-semibold text-muted"
                            }`}
                            onClick={() => setTerm(t)}
                          >
                            {t} Months
                          </div>
                        ))}
                      </div>
                    </Form.Group>

                    <Alert
                      variant="info"
                      className="d-flex align-items-center rounded-3"
                    >
                      <ShieldCheck size={28} className="me-3" />
                      Expected APR:
                      <strong className="ms-2">7.5% - 10.5%</strong>
                    </Alert>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h5 className="fw-bold mb-4">Review Application</h5>

                    <div className="p-4 rounded-4 mb-4 bg-light">
                      <Row className="mb-2">
                        <Col className="text-muted">Amount</Col>
                        <Col className="text-end fw-semibold">
                          ${Number(amount || 0).toLocaleString()}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="text-muted">Purpose</Col>
                        <Col className="text-end fw-semibold">{purpose}</Col>
                      </Row>
                      <Row>
                        <Col className="text-muted">Term</Col>
                        <Col className="text-end fw-semibold">
                          {term} Months
                        </Col>
                      </Row>
                    </div>

                    <Form.Group className="mb-4 p-3 rounded-4 bg-light">
                      <Form.Check
                        type="checkbox"
                        label={
                          <span className="ms-2 fw-semibold">
                            I agree to the Terms and Conditions
                          </span>
                        }
                        required
                      />
                    </Form.Group>
                  </>
                )}

                <div className="d-flex justify-content-between mt-4">
                  {step > 1 && (
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                  )}

                  <Button type="submit">
                    {step === 3 ? "Submit Application" : "Continue"}
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
