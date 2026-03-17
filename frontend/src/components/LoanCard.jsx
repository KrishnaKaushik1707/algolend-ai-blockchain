import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { CalendarDays, DollarSign, Percent } from 'lucide-react';

const LoanCard = ({ id, amount, interestRate, term, status, borrowerName, type = 'marketplace' }) => {
  const isMarketplace = type === 'marketplace';
  const isDashboard = type === 'dashboard';

  let statusBadge = null;
  if (status === 'Active') statusBadge = <Badge bg="success">Active</Badge>;
  else if (status === 'Pending') statusBadge = <Badge bg="warning" text="dark">Pending</Badge>;
  else if (status === 'Paid') statusBadge = <Badge bg="secondary">Paid</Badge>;

  return (
    <Card className="border-0 shadow-sm rounded-4 h-100 transition-hover">
      <Card.Body className="p-4">
        {isDashboard && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted fw-semibold fs-6">Loan #{id}</span>
            {statusBadge}
          </div>
        )}
        
        {isMarketplace && (
          <div className="d-flex align-items-center mb-3">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3">
              <span className="fw-bold fs-5 d-block text-center" style={{width: '32px', height: '32px', lineHeight: '32px'}}>{borrowerName.charAt(0)}</span>
            </div>
            <div>
              <h5 className="mb-0 fw-bold">{borrowerName}</h5>
              <small className="text-muted">Seeking Loan</small>
            </div>
          </div>
        )}

        <div className="d-flex align-items-baseline mb-4">
          <DollarSign size={24} className="text-primary me-1" />
          <h2 className="mb-0 fw-bold">{amount.toLocaleString()}</h2>
        </div>

        <div className="d-flex justify-content-between mb-4 bg-light p-3 rounded-3">
          <div className="d-flex flex-column">
            <span className="text-muted small mb-1 d-flex align-items-center"><Percent size={14} className="me-1" /> Interest</span>
            <span className="fw-semibold">{interestRate}% APR</span>
          </div>
          <div className="border-start"></div>
          <div className="d-flex flex-column text-end">
            <span className="text-muted small mb-1 d-flex align-items-center justify-content-end"><CalendarDays size={14} className="me-1" /> Term</span>
            <span className="fw-semibold">{term} Months</span>
          </div>
        </div>

        {isMarketplace && (
          <Button variant="primary" className="w-100 fw-semibold rounded-pill py-2">Fund this Loan</Button>
        )}
        
        {isDashboard && status === 'Active' && (
          <Button variant="outline-primary" className="w-100 fw-semibold rounded-pill py-2" href="/repay-loan">Make Payment</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default LoanCard;
