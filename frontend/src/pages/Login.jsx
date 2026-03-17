import React, { useState } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/algolend-logo.svg";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://algolend-backend.onrender.com/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("algoLendUser", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div className="text-center mb-4">
            <Link
              to="/"
              className="text-decoration-none d-inline-flex align-items-center"
            >
              <img src={logo} alt="AlgoLend Logo" height="48" />
            </Link>
          </div>

          <Card className="border-0 shadow-lg rounded-5 overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Welcome Back</h3>
                <p className="text-muted">
                  Enter your details to access your account.
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">
                    Email Address
                  </Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-3 py-2"
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label className="fw-semibold small mb-0">
                      Password
                    </Form.Label>

                    <span className="small text-muted fw-medium">
                      Forgot Password?
                    </span>
                  </div>

                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-3 py-2"
                  />
                </Form.Group>

                {/* Login Button */}
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="w-100 rounded-pill fw-bold mb-4 shadow-sm py-3"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </Button>

                {/* Divider */}
                <div className="position-relative mb-4 text-center">
                  <hr className="opacity-25 my-0" />

                  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                    or don't have an account?
                  </span>
                </div>

                {/* Register */}
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-primary"
                  className="w-100 rounded-pill fw-bold py-2"
                >
                  Create an Account
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
