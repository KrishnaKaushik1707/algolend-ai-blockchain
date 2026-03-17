import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, HandCoins, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="py-5 bg-primary bg-opacity-10 rounded-5 mb-5 text-center text-lg-start">
        <Container>
          <Row className="align-items-center p-4 p-md-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <Badge bg="primary" className="px-3 py-2 rounded-pill mb-3 shadow-sm bg-opacity-75">Revolutionizing Microloans</Badge>
              <h1 className="display-4 fw-bold mb-4">
                Fast, Fair, and Transparent Financial Power
              </h1>
              <p className="lead text-muted mb-5 pe-lg-5">
                AlgoLend connects borrowers directly with lenders for instant mini-loans tailored to your needs. Build your credit while getting the funds you need today.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                <Button as={Link} to="/apply-loan" variant="primary" size="lg" className="px-4 py-3 rounded-pill fw-semibold shadow-sm">
                  Apply for a Loan <ArrowRight className="ms-2" size={20} />
                </Button>
                <Button as={Link} to="/marketplace" variant="outline-primary" size="lg" className="px-4 py-3 rounded-pill fw-semibold">
                  Browse Marketplace
                </Button>
              </div>
            </Col>
            <Col lg={6}>
               <div className="position-relative">
                 <div className="position-absolute w-100 h-100 bg-primary opacity-25 rounded-circle blur-3xl" style={{ filter: 'blur(60px)', transform: 'scale(0.8)' }}></div>
                 <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" alt="Fintech Interface" className="img-fluid rounded-5 shadow-lg position-relative z-1" style={{ objectFit: 'cover', height: '400px', width: '100%' }} />
               </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 mb-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Why Choose AlgoLend?</h2>
            <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
              We've redesigned the lending experience to be simple, accessible, and fast for everyone.
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 h-100 text-center p-4 transition-hover">
                <Card.Body>
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '64px', height: '64px'}}>
                    <Zap size={32} />
                  </div>
                  <h4 className="fw-bold mb-3">Instant Approval</h4>
                  <p className="text-muted mb-0">Our AI-driven process means you get a decision in minutes, not days. Funds deposited almost instantly.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 h-100 text-center p-4 border-top border-primary border-4 transition-hover">
                <Card.Body>
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '64px', height: '64px'}}>
                    <ShieldCheck size={32} />
                  </div>
                  <h4 className="fw-bold mb-3">Secure & Transparent</h4>
                  <p className="text-muted mb-0">Bank-level encryption protects your data. What you see is what you pay—no hidden fees, ever.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm rounded-4 h-100 text-center p-4 transition-hover">
                <Card.Body>
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '64px', height: '64px'}}>
                    <HandCoins size={32} />
                  </div>
                  <h4 className="fw-bold mb-3">Build Your Credit</h4>
                  <p className="text-muted mb-0">Every successful repayment contributes positively to your credit profile, unlocking better rates.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white rounded-5 mb-5 text-center">
        <Container className="py-4">
          <h2 className="fw-bold mb-4">Ready to take control of your finances?</h2>
          <p className="lead opacity-75 mb-5 mx-auto" style={{ maxWidth: '600px' }}>Join thousands of users who have found financial freedom with AlgoLend.</p>
          <Button as={Link} to="/register" variant="light" size="lg" className="px-5 py-3 rounded-pill fw-bold text-primary shadow">
            Create Free Account
          </Button>
        </Container>
      </section>
    </div>
  );
};

// Simple badge component for the hero
const Badge = ({ bg, className, children }) => (
  <span className={`badge bg-${bg} ${className}`}>{children}</span>
);

export default Home;
