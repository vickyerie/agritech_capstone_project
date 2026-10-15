import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import {
  FaSeedling,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCircleCheck,
  FaLeaf,
  FaTractor,
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(formData);
      setSuccess("Account registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #ecfdf5 100%)",
      }}
    >
      <Container style={{ maxWidth: "1040px" }}>
        <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: "24px" }}>
          <Row className="g-0">
            {/* Left Decorative Branding */}
            <Col
              lg={6}
              className="d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative"
              style={{
                backgroundImage: `linear-gradient(rgba(4, 120, 87, 0.9), rgba(2, 44, 34, 0.95)), url('https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1000&q=80')`,
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
                  Start Your Smart Agriculture Journey
                </h3>
                <p className="text-light opacity-90 small mb-4" style={{ lineHeight: 1.6 }}>
                  Join thousands of farmers tracking acres, predicting monsoon trends,
                  protecting crops against pest infestations, and accessing direct wholesale inputs.
                </p>

                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-circle bg-white bg-opacity-20 text-white">
                      <FaTractor size={14} />
                    </div>
                    <span className="small text-light">Register unlimited farms and acreage</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-circle bg-white bg-opacity-20 text-white">
                      <FaLeaf size={14} />
                    </div>
                    <span className="small text-light">Real-time crop diagnostic notifications</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-circle bg-white bg-opacity-20 text-white">
                      <FaCircleCheck size={14} />
                    </div>
                    <span className="small text-light">Direct order tracking and booking receipts</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-top border-white border-opacity-20 text-light small opacity-75">
                Compliant with agricultural sustainability standards.
              </div>
            </Col>

            {/* Right Registration Form */}
            <Col lg={6} className="p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-2 d-lg-none">
                  <div className="agri-brand-icon">
                    <FaSeedling size={18} />
                  </div>
                  <span className="fw-bold fs-5 text-success">Agri-Tech</span>
                </div>
                <h3 className="fw-bold text-dark mb-1">Create Farmer Account</h3>
                <p className="text-muted small">Register to start managing your agricultural ecosystem.</p>
              </div>

              {error && (
                <Alert variant="danger" className="py-2 px-3 small border-0 bg-danger bg-opacity-10 text-danger fw-semibold">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="py-2 px-3 small border-0 bg-success bg-opacity-10 text-success fw-semibold">
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">Full Name</Form.Label>
                  <div className="position-relative">
                    <div
                      className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
                      style={{ pointerEvents: "none" }}
                    >
                      <FaUser size={15} />
                    </div>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="e.g. Ramesh Kumar / Maria Tan"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="ps-5"
                    />
                  </div>
                </Form.Group>

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
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="ps-5"
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
                      name="password"
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
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
                  variant="success"
                  className="w-100 py-2 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Account</span>
                      <FaArrowRight size={14} />
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4 pt-3 border-top small text-muted">
                Already registered?{" "}
                <Link to="/login" className="fw-bold text-success text-decoration-none">
                  Sign In Here
                </Link>
                <div className="mt-2">
                  <Link to="/" className="text-muted small">
                    &larr; Back to Public Landing
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
