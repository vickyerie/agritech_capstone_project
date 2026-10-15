import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import {
  FaSeedling,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
  FaShieldHalved,
  FaCloudSun,
  FaLeaf,
  FaTractor,
  FaUserShield,
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [role, setRole] = useState(null); // null = role select, "farmer" or "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      // Validate role matches selection
      if (role === "admin" && loggedInUser.role !== "admin") {
        setError("This account does not have administrator privileges.");
        setLoading(false);
        return;
      }
      navigate(loggedInUser.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setRole(null);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #ecfdf5 100%)",
      }}
    >
      <Container style={{ maxWidth: "1020px" }}>
        <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: "24px" }}>
          <Row className="g-0">
            {/* Left Branding Panel */}
            <Col
              lg={6}
              className="d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative"
              style={{
                backgroundImage: `linear-gradient(rgba(4, 120, 87, 0.88), rgba(2, 44, 34, 0.94)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="agri-brand-icon bg-white text-success">
                    <FaSeedling size={20} />
                  </div>
                  <span className="fw-bold fs-4 text-white">Agri-Tech</span>
                </div>

                <h3 className="fw-extrabold mb-3 text-white">
                  Intelligent Precision Farming Platform
                </h3>
                <p className="text-light opacity-90 small mb-4" style={{ lineHeight: 1.6 }}>
                  Access real-time hyperlocal weather analytics, agricultural acreage tracking,
                  crop disease advisories, and certified input procurement.
                </p>

                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-circle bg-white bg-opacity-20 text-white">
                      <FaLeaf size={14} />
                    </div>
                    <span className="small text-light">Precision agronomic recommendations</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-circle bg-white bg-opacity-20 text-white">
                      <FaCloudSun size={14} />
                    </div>
                    <span className="small text-light">Hyperlocal weather & irrigation radar</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-circle bg-white bg-opacity-20 text-white">
                      <FaShieldHalved size={14} />
                    </div>
                    <span className="small text-light">Automated pest & disease diagnostics</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-top border-white border-opacity-20 text-light small opacity-75">
                Empowering modern agricultural productivity since 2024.
              </div>
            </Col>

            {/* Right Form / Role Selection Side */}
            <Col lg={6} className="p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
              {role === null ? (
                /* Step 1: Role Selection */
                <div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center gap-2 mb-2 d-lg-none">
                      <div className="agri-brand-icon">
                        <FaSeedling size={18} />
                      </div>
                      <span className="fw-bold fs-5 text-success">Agri-Tech</span>
                    </div>
                    <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
                    <p className="text-muted small">
                      Please select your account type to continue signing in.
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {/* Farmer Option */}
                    <button
                      type="button"
                      className="d-flex align-items-center gap-3 p-4 bg-white border rounded-4 text-start w-100"
                      style={{
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        borderColor: "#e2e8f0",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#059669";
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(5,150,105,0.12)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "none";
                      }}
                      onClick={() => setRole("farmer")}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                        style={{
                          width: 52,
                          height: 52,
                          background: "linear-gradient(135deg, #059669, #10b981)",
                          color: "#fff",
                        }}
                      >
                        <FaTractor size={22} />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fw-bold text-dark mb-1">Login as Farmer</h5>
                        <p className="text-muted small mb-0">
                          Manage your farms, crops, bookings, and resources
                        </p>
                      </div>
                      <FaArrowRight className="text-muted" size={16} />
                    </button>

                    {/* Admin Option */}
                    <button
                      type="button"
                      className="d-flex align-items-center gap-3 p-4 bg-white border rounded-4 text-start w-100"
                      style={{
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        borderColor: "#e2e8f0",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#dc2626";
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(220,38,38,0.12)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "none";
                      }}
                      onClick={() => setRole("admin")}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                        style={{
                          width: 52,
                          height: 52,
                          background: "linear-gradient(135deg, #dc2626, #ef4444)",
                          color: "#fff",
                        }}
                      >
                        <FaUserShield size={22} />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fw-bold text-dark mb-1">Login as Admin</h5>
                        <p className="text-muted small mb-0">
                          System dashboard, user management, and analytics
                        </p>
                      </div>
                      <FaArrowRight className="text-muted" size={16} />
                    </button>
                  </div>

                  <div className="text-center mt-4 pt-3 border-top small text-muted">
                    Don't have an account yet?{" "}
                    <Link to="/register" className="fw-bold text-success text-decoration-none">
                      Create Account
                    </Link>
                    <div className="mt-2">
                      <Link to="/" className="text-muted small">
                        &larr; Back to Public Landing
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                /* Step 2: Login Form */
                <div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center gap-2 mb-2 d-lg-none">
                      <div className="agri-brand-icon">
                        <FaSeedling size={18} />
                      </div>
                      <span className="fw-bold fs-5 text-success">Agri-Tech</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-transparent border-0 text-muted small fw-semibold d-inline-flex align-items-center gap-1 mb-3 p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <FaArrowLeft size={12} />
                      <span>Change account type</span>
                    </button>

                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h3 className="fw-bold text-dark mb-0">
                        {role === "admin" ? "Admin Login" : "Farmer Login"}
                      </h3>
                      <span
                        className={`badge text-uppercase ${
                          role === "admin" ? "badge-soft-danger" : "badge-soft-success"
                        }`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {role}
                      </span>
                    </div>
                    <p className="text-muted small">
                      {role === "admin"
                        ? "Sign in with your administrator credentials."
                        : "Sign in to manage your fields, crops, and bookings."}
                    </p>
                  </div>

                  {error && (
                    <Alert variant="danger" className="py-2 px-3 small border-0 bg-danger bg-opacity-10 text-danger fw-semibold">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold text-secondary">Email Address</Form.Label>
                      <div className="position-relative">
                        <div
                          className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
                          style={{ pointerEvents: "none" }}
                        >
                          <FaEnvelope size={15} />
                        </div>
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="ps-5"
                          autoFocus
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-semibold text-secondary">Password</Form.Label>
                      <div className="position-relative">
                        <div
                          className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
                          style={{ pointerEvents: "none" }}
                        >
                          <FaLock size={15} />
                        </div>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="ps-5 pe-5"
                        />
                        <button
                          type="button"
                          className="position-absolute top-50 end-0 translate-middle-y pe-3 bg-transparent border-0 text-muted"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                        </button>
                      </div>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant={role === "admin" ? "danger" : "success"}
                      className="w-100 py-2 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" />
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <FaArrowRight size={14} />
                        </>
                      )}
                    </Button>
                  </Form>

                  <div className="text-center mt-4 pt-3 border-top small text-muted">
                    Don't have an account yet?{" "}
                    <Link to="/register" className="fw-bold text-success text-decoration-none">
                      Create Account
                    </Link>
                    <div className="mt-2">
                      <Link to="/" className="text-muted small">
                        &larr; Back to Public Landing
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
