import React from 'react';
import { Container, Row, Col, Form, Badge } from 'react-bootstrap';
import LoanCard from '../components/LoanCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const LoanMarketplace = () => {
  // Mock Data
  const marketplaceLoans = [
    {
      id: 'AL-1092',
      amount: 4500,
      interestRate: 8.5,
      term: 12,
      borrowerName: 'Sarah J.',
      type: 'marketplace'
    },
    {
      id: 'AL-1104',
      amount: 2500,
      interestRate: 10.2,
      term: 6,
      borrowerName: 'Marcus T.',
      type: 'marketplace'
    },
    {
      id: 'AL-1115',
      amount: 10000,
      interestRate: 7.1,
      term: 24,
      borrowerName: 'Emily W.',
      type: 'marketplace'
    },
    {
      id: 'AL-1120',
      amount: 3200,
      interestRate: 9.5,
      term: 12,
      borrowerName: 'David K.',
      type: 'marketplace'
    },
    {
      id: 'AL-1135',
      amount: 1500,
      interestRate: 11.5,
      term: 6,
      borrowerName: 'Jessica R.',
      type: 'marketplace'
    },
    {
      id: 'AL-1142',
      amount: 8000,
      interestRate: 8.0,
      term: 24,
      borrowerName: 'Michael B.',
      type: 'marketplace'
    }
  ];

  return (
    <Container className="py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Loan Marketplace</h2>
          <p className="text-muted mb-0">Browse and fund active loan requests.</p>
        </div>
        
        <div className="d-flex gap-2 w-100 flex-md-grow-0" style={{maxWidth: '400px'}}>
          <div className="input-group bg-white rounded-pill shadow-sm overflow-hidden border">
            <span className="input-group-text bg-white border-0 text-muted ps-3"><Search size={18} /></span>
            <Form.Control type="text" placeholder="Search loans..." className="border-0 shadow-none" />
          </div>
          <button className="btn btn-outline-secondary rounded-pill d-flex align-items-center px-3 shadow-sm bg-white">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="mb-4 d-flex gap-2 flex-wrap">
        <Badge bg="primary" className="p-2 px-3 rounded-pill fw-medium cursor-pointer">All Loans</Badge>
        <Badge bg="light" text="dark" className="border p-2 px-3 rounded-pill fw-medium cursor-pointer text-muted transition-hover">Low Risk (7.0 - 8.5%)</Badge>
        <Badge bg="light" text="dark" className="border p-2 px-3 rounded-pill fw-medium cursor-pointer text-muted transition-hover">Moderate Risk (8.6 - 10.5%)</Badge>
        <Badge bg="light" text="dark" className="border p-2 px-3 rounded-pill fw-medium cursor-pointer text-muted transition-hover">Short Term (&lt;12 mo)</Badge>
      </div>

      <Row className="g-4">
        {marketplaceLoans.map((loan, idx) => (
          <Col md={6} xl={4} key={idx}>
            <LoanCard {...loan} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LoanMarketplace;
