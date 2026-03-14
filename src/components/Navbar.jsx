import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, User } from 'lucide-react';

const AppNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('algoLendUser');
    setIsAuthenticated(!!user);
  }, [location]); // Re-run when navigation occurs

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3 mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-primary fs-3">
          <Wallet className="me-2" size={32} />
          AlgoLend
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/dashboard" className="fw-medium">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/marketplace" className="fw-medium">Marketplace</Nav.Link>
                <Nav.Link as={Link} to="/apply-loan" className="fw-medium">Apply for Loan</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Button as={Link} to="/profile" variant="outline-primary" className="fw-semibold px-4 rounded-pill d-flex align-items-center">
                <User size={18} className="me-2" /> My Profile
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2 fw-medium">Login</Nav.Link>
                <Button as={Link} to="/register" variant="primary" className="fw-semibold px-4 rounded-pill">Sign Up</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
