import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoanCard from "../components/LoanCard";
import { Search, SlidersHorizontal } from "lucide-react";
import axios from "axios";

const LoanMarketplace = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);

  // Check login
  useEffect(() => {
    const savedUser = localStorage.getItem("algoLendUser");
    if (!savedUser) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch loans from backend
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/loan-marketplace",
        );

        console.log("API response:", response.data);

        // Handle both response formats
        if (Array.isArray(response.data)) {
          setLoans(response.data);
        } else if (Array.isArray(response.data.loans)) {
          setLoans(response.data.loans);
        } else {
          setLoans([]);
        }
      } catch (error) {
        console.error("Failed to fetch loans:", error);
        setLoans([]);
      }
    };

    fetchLoans();
  }, []);

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Loan Marketplace</h2>
          <p className="text-muted mb-0">
            Browse and fund active loan requests.
          </p>
        </div>

        <div
          className="d-flex gap-2 w-100 flex-md-grow-0"
          style={{ maxWidth: "400px" }}
        >
          <div className="input-group bg-white rounded-pill shadow-sm overflow-hidden border">
            <span className="input-group-text bg-white border-0 text-muted ps-3">
              <Search size={18} />
            </span>

            <Form.Control
              type="text"
              placeholder="Search loans..."
              className="border-0 shadow-none"
            />
          </div>

          <button className="btn btn-outline-secondary rounded-pill d-flex align-items-center px-3 shadow-sm bg-white">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        <Badge bg="primary" className="p-2 px-3 rounded-pill fw-medium">
          All Loans
        </Badge>

        <Badge
          bg="light"
          text="dark"
          className="border p-2 px-3 rounded-pill fw-medium text-muted"
        >
          Low Risk
        </Badge>

        <Badge
          bg="light"
          text="dark"
          className="border p-2 px-3 rounded-pill fw-medium text-muted"
        >
          Moderate Risk
        </Badge>

        <Badge
          bg="light"
          text="dark"
          className="border p-2 px-3 rounded-pill fw-medium text-muted"
        >
          Short Term
        </Badge>
      </div>

      {/* Loan Cards */}
      <Row className="g-4">
        {Array.isArray(loans) && loans.length > 0 ? (
          loans.map((loan, idx) => (
            <Col md={6} xl={4} key={idx}>
              <LoanCard
                id={loan.id}
                borrowerName={loan.borrower}
                amount={loan.amount}
                term={loan.duration}
                interestRate={loan.interestRate || 8.5}
                type="marketplace"
              />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-muted text-center">No loans available yet.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default LoanMarketplace;
