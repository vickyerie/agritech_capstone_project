import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSeedling, FaShieldHalved, FaLeaf, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="agri-footer mt-auto">
      <Container fluid className="page-container">
        <Row className="gy-4 mb-4">
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="agri-brand-icon">
                <FaSeedling size={18} />
              </div>
              <span className="fw-bold fs-5 text-dark">Agri-Tech</span>
            </div>
            <p className="text-muted small pe-lg-4 mb-3">
              Empowering farmers with smart agricultural tools, weather intelligence,
              crop diagnostic guides, and verified marketplace resources.
            </p>
            <div className="d-flex align-items-center gap-2 text-success small">
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.2)",
                }}
              />
              <span className="fw-semibold">All Systems Operational</span>
            </div>
          </Col>

          <Col lg={2} sm={6} xs={6}>
            <h6 className="fw-bold text-dark mb-3 small text-uppercase">Platform</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-muted mb-0">
              <li>
                <Link to="/" className="text-decoration-none text-muted">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/farms" className="text-decoration-none text-muted">
                  Farms
                </Link>
              </li>
              <li>
                <Link to="/crop-info" className="text-decoration-none text-muted">
                  Crop Info
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-decoration-none text-muted">
                  Weather Forecast
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} sm={6} xs={6}>
            <h6 className="fw-bold text-dark mb-3 small text-uppercase">Market</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-muted mb-0">
              <li>
                <Link to="/products" className="text-decoration-none text-muted">
                  Buy Resources
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-decoration-none text-muted">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/my-alerts" className="text-decoration-none text-muted">
                  Pest Alerts
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={6}>
            <h6 className="fw-bold text-dark mb-3 small text-uppercase">Sustainable Vision</h6>
            <p className="small text-muted mb-3">
              Dedicated to bridging digital technology with precision agricultural practices for
              increased food security and water efficiency.
            </p>
            <div className="d-flex align-items-center gap-3 text-muted small">
              <span className="d-inline-flex align-items-center gap-1">
                <FaLeaf className="text-success" /> Eco Certified
              </span>
              <span className="d-inline-flex align-items-center gap-1">
                <FaShieldHalved className="text-primary" /> Verified Data
              </span>
            </div>
          </Col>
        </Row>

        <div className="pt-3 border-top border-light-subtle d-flex flex-wrap justify-content-between align-items-center small text-muted">
          <div>&copy; {new Date().getFullYear()} Agri-Tech Ecosystem. Precision Agriculture Solutions.</div>
          <div className="d-flex gap-3 mt-2 mt-sm-0">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Security</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
