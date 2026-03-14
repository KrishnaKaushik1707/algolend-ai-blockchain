import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserProfileCard from '../components/UserProfileCard';
import CreditScoreCard from '../components/CreditScoreCard';
import LoanCard from '../components/LoanCard';

const Dashboard = () => {
  const [userLoans, setUserLoans] = useState([]);
  const [user, setUser] = useState({
    name: 'Priya Patel',
    memberSince: 'Oct 2023',
    email: 'priya.p@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, MH'
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const savedUser = localStorage.getItem('algoLendUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login');
    }

    // Load user loans from storage and mix with some mocks
    const savedUserLoans = JSON.parse(localStorage.getItem('algoLendUserLoans')) || [];
    const mockLoans = [
      { id: 'AL-9284', amount: 4500, interestRate: 8.5, term: 12, status: 'Active', type: 'dashboard' },
      { id: 'AL-3310', amount: 1200, interestRate: 11.2, term: 6, status: 'Paid', type: 'dashboard' }
    ];
    setUserLoans([...savedUserLoans, ...mockLoans]);
  }, [navigate]);


  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Welcome back, {user.name.split(' ')[0]}!</h2>
        <p className="text-muted">Here is a summary of your financial profile and active loans.</p>
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
        <a href="/apply-loan" className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm">
          Apply for New Loan
        </a>
      </div>

      <Row className="g-4">
        {userLoans.map((loan, idx) => (
          <Col md={6} xl={4} key={idx}>
            <LoanCard {...loan} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
