import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserProfileCard from "../components/UserProfileCard";
import CreditScoreCard from "../components/CreditScoreCard";
import LoanCard from "../components/LoanCard";
import axios from "axios";
import { getDefaultUserLoans } from "../data/defaultLoans";

const Dashboard = () => {
  const [userLoans, setUserLoans] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("algoLendUser");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    fetchUserLoans(parsedUser.name);
  }, [navigate]);

  const fetchUserLoans = async (borrowerName) => {
    try {
      const res = await axios.get(
        `http://localhost:9000/user-loans/${borrowerName}`,
      );

      const apiLoans = Array.isArray(res.data) ? res.data : [];
      setUserLoans(apiLoans.length > 0 ? apiLoans : getDefaultUserLoans(borrowerName));
    } catch (error) {
      console.error("Failed to fetch user loans:", error);
      setUserLoans(getDefaultUserLoans(borrowerName));
    }
  };

  if (!user) return null;

  const pendingLoans = userLoans.filter((loan) => loan.status === "pending");
  const activeLoans = userLoans.filter((loan) => loan.status === "active");
  const paidLoans = userLoans.filter((loan) => loan.status === "paid");

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Welcome back, {user.name.split(" ")[0]}!</h2>
        <p className="text-muted">
          Here is a summary of your financial profile and active loans.
        </p>
      </div>

      <Row className="g-4 mb-5">
        <Col lg={4}>
          <UserProfileCard user={user} />
        </Col>

        <Col lg={8}>
          <CreditScoreCard score={712} />
        </Col>
      </Row>

      <div className="mb-4 d-flex justify-content-between align-items-end">
        <div>
          <h3 className="fw-bold mb-0">My Loans</h3>
        </div>

        <a
          href="/apply-loan"
          className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm"
        >
          Apply for New Loan
        </a>
      </div>

      {/* Active Loans */}

      <div className="d-flex align-items-center mb-4">
        <h5 className="fw-bold mb-0 me-3">Pending Loans</h5>
        <div className="flex-grow-1 border-bottom border-warning opacity-50"></div>
        <span className="badge bg-warning text-dark ms-3 rounded-pill px-3 py-2">{pendingLoans.length} Requests</span>
      </div>

      <Row className="g-4 mb-5">
        {pendingLoans.length > 0 ? (
          pendingLoans.map((loan, idx) => (
            <Col md={6} xl={4} key={idx}>
              <LoanCard
                id={loan._id}
                borrowerName={loan.borrower}
                amount={loan.amount}
                term={loan.duration}
                interestRate={loan.interestRate || 8.5}
                status="Pending"
                type="dashboard"
              />
            </Col>
          ))
        ) : (
          <p className="text-muted">No pending loans</p>
        )}
      </Row>

      <div className="d-flex align-items-center mb-4">
        <h5 className="fw-bold mb-0 me-3">Active Loans</h5>
        <div className="flex-grow-1 border-bottom border-success opacity-50"></div>
        <span className="badge bg-success ms-3 rounded-pill px-3 py-2">{activeLoans.length} Loans</span>
      </div>

      <Row className="g-4 mb-5">
        {activeLoans.length > 0 ? (
          activeLoans.map((loan, idx) => (
            <Col md={6} xl={4} key={idx}>
              <LoanCard
                id={loan._id}
                borrowerName={loan.borrower}
                amount={loan.amount}
                term={loan.duration}
                interestRate={loan.interestRate || 8.5}
                status="Active"
                type="dashboard"
              />
            </Col>
          ))
        ) : (
          <p className="text-muted">No active loans</p>
        )}
      </Row>

      {/* Paid Loans */}

      <div className="d-flex align-items-center mb-4 mt-5">
        <h5 className="fw-bold mb-0 me-3 text-muted">Paid Loans</h5>
        <div className="flex-grow-1 border-bottom opacity-25"></div>
        <span className="badge bg-secondary ms-3 rounded-pill px-3 py-2">{paidLoans.length} Completed</span>
      </div>

      <Row className="g-4">
        {paidLoans.length > 0 ? (
          paidLoans.map((loan, idx) => (
            <Col md={6} xl={4} key={idx}>
              <LoanCard
                id={loan._id}
                borrowerName={loan.borrower}
                amount={loan.amount}
                term={loan.duration}
                interestRate={loan.interestRate || 8.5}
                status="Paid"
                type="dashboard"
              />
            </Col>
          ))
        ) : (
          <p className="text-muted">No paid loans</p>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
