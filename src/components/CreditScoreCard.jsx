import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { TrendingUp, Award } from 'lucide-react';

const CreditScoreCard = ({ score }) => {
  // Simple logic to determine score category
  let category = 'Poor';
  let variant = 'danger';
  if (score >= 740) {
    category = 'Excellent';
    variant = 'success';
  } else if (score >= 670) {
    category = 'Good';
    variant = 'primary';
  } else if (score >= 580) {
    category = 'Fair';
    variant = 'warning';
  }

  const percentage = (score / 850) * 100;

  return (
    <Card className="border-0 shadow-sm rounded-4 h-100 bg-gradient text-white" style={{ background: 'linear-gradient(135deg, var(--bs-primary) 0%, #2f80ed 100%)' }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-semibold d-flex align-items-center">
            <Award className="me-2" size={24} />
            Your Credit Score
          </h5>
          <TrendingUp size={24} className="opacity-75" />
        </div>
        
        <div className="text-center mb-4">
          <h1 className="display-3 fw-bold mb-0">{score}</h1>
          <p className="fs-5 opacity-75">{category}</p>
        </div>

        <div className="mb-2 d-flex justify-content-between small opacity-75">
          <span>300</span>
          <span>850</span>
        </div>
        <ProgressBar
          now={percentage}
          variant="light"
          style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }}
          className="rounded-pill"
        />
        
        <div className="mt-4 pt-3 border-top border-light border-opacity-25 text-center small opacity-75">
          Updated Today • Next update in 30 days
        </div>
      </Card.Body>
    </Card>
  );
};

export default CreditScoreCard;
