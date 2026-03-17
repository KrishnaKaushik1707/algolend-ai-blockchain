import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";
import logo from "../assets/algolend-logo.svg";

const AppNavbar = ({ theme = "light", onToggleTheme }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("algoLendUser");
    setIsAuthenticated(!!user);
  }, [location]); // Re-run when navigation occurs

  return (
    <Navbar
      expand="lg"
      className="shadow-sm py-3 mb-4 bg-body-tertiary border-bottom"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
        >
          <img src={logo} alt="AlgoLend Logo" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/dashboard" className="fw-medium">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/marketplace" className="fw-medium">
                  Marketplace
                </Nav.Link>
                <Nav.Link as={Link} to="/apply-loan" className="fw-medium">
                  Apply for Loan
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <Button
              type="button"
              variant="outline-secondary"
              className="fw-semibold px-3 rounded-pill d-flex align-items-center me-2"
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} className="me-2" /> Light
                </>
              ) : (
                <>
                  <Moon size={18} className="me-2" /> Dark
                </>
              )}
            </Button>
            {isAuthenticated ? (
              <Button
                as={Link}
                to="/profile"
                variant="outline-primary"
                className="fw-semibold px-4 rounded-pill d-flex align-items-center"
              >
                <User size={18} className="me-2" /> My Profile
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2 fw-medium">
                  Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  className="fw-semibold px-4 rounded-pill"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
