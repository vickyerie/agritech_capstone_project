import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaSeedling,
  FaTractor,
  FaCloudSun,
  FaDroplet,
  FaShieldHalved,
  FaArrowRight,
  FaCircleCheck,
  FaChartLine,
  FaLeaf,
  FaUsers,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

const STATS = [
  { value: "10K+", label: "Farmers Empowered", desc: "Active farmers across multiple agricultural regions" },
  { value: "30%", label: "Yield Improvement", desc: "Average increase in seasonal harvest output" },
  { value: "50%", label: "Water Savings", desc: "Optimized irrigation cycles through weather forecasting" },
  { value: "100+", label: "Innovations", desc: "Modern agronomic practices and precision workflows" },
];

const PILLARS = [
  {
    icon: FaLeaf,
    color: "emerald",
    title: "Our Mission",
    desc: "To enhance agricultural productivity and sustainability through cutting-edge technology, accessible intelligence, and data-driven farming solutions.",
  },
  {
    icon: FaGlobe,
    color: "sky",
    title: "Our Vision",
    desc: "To be a global leader in providing innovative agricultural technologies that empower farmers, cooperatives, and agribusinesses to thrive.",
  },
  {
    icon: FaShieldHalved,
    color: "amber",
    title: "Our Values",
    desc: "We stand firmly for innovation, environmental sustainability, and collaborative stewardship that benefits farmers, consumers, and nature.",
  },
  {
    icon: FaChartLine,
    color: "emerald",
    title: "Our Impact",
    desc: "Our integrated platform measurably reduces crop loss due to pests, minimizes chemical waste, and elevates household agricultural prosperity.",
  },
];

const FEATURES = [
  {
    icon: FaLeaf,
    title: "Crop Management",
    desc: "End-to-end crop tracking from sowing to harvest. Monitor plant health, varieties, and estimated harvest dates with precision record keeping.",
    points: ["Lifecycle scheduling", "Yield quantity records", "Botanical varieties mapping"],
  },
  {
    icon: FaTractor,
    title: "Farm Management",
    desc: "Centralized acreage registry for all your agricultural lands. Keep track of location, plot dimensions, established history, and active fields.",
    points: ["Acreage boundary logging", "Location-based farm profiles", "Multi-farm portfolio view"],
  },
  {
    icon: FaDroplet,
    title: "Smart Irrigation & Weather",
    desc: "Harness hyperlocal meteorological data to schedule irrigation efficiently, preventing overwatering and mitigating drought vulnerability.",
    points: ["Live OpenWeather integration", "Wind, humidity & pressure data", "Geolocation-based readings"],
  },
  {
    icon: FaShieldHalved,
    title: "Pest & Disease Advisory",
    desc: "Early warning notification system for pests and crop diseases with actionable agronomic treatment recommendations to protect your fields.",
    points: ["Severity classification", "Crop-specific diagnostic data", "Immediate action guides"],
  },
];

export default function LandingPage() {
  return (
    <div className="agri-landing">
      {/* Hero Section */}
      <section
        className="position-relative text-white py-5 d-flex align-items-center"
        style={{
          minHeight: "78vh",
          backgroundImage: `linear-gradient(rgba(2, 44, 34, 0.82), rgba(6, 78, 59, 0.88)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container fluid className="page-container py-5">
          <Row className="align-items-center gy-5">
            <Col lg={7}>
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4"
                style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(52, 211, 153, 0.4)",
                  backdropFilter: "blur(8px)",
                  fontSize: "0.85rem",
                  color: "#6ee7b7",
                }}
              >
                <FaSeedling />
                <span className="fw-semibold">Next-Generation Agri-Tech Ecosystem</span>
              </div>

              <h1 className="display-4 fw-extrabold mb-3 text-white" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                Innovative Agriculture Solutions
              </h1>

              <p className="lead text-light mb-4" style={{ maxWidth: "620px", fontSize: "1.15rem", opacity: 0.9 }}>
                Empowering farmers and agricultural enterprises with data-driven weather intelligence,
                precision farm management, crop protection alerts, and direct verified resources.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  as={Link}
                  to="/register"
                  size="lg"
                  className="btn-success px-4 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow"
                >
                  <span>Get Started Free</span>
                  <FaArrowRight size={16} />
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  size="lg"
                  variant="outline-light"
                  className="px-4 py-3 fw-semibold"
                >
                  Farmer Login
                </Button>
              </div>

              <div className="d-flex align-items-center gap-4 mt-5 pt-3 border-top border-white-50 text-light small">
                <div className="d-flex align-items-center gap-2">
                  <FaCircleCheck className="text-success" />
                  <span>Real-time Weather</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaCircleCheck className="text-success" />
                  <span>Verified Agri-Store</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaCircleCheck className="text-success" />
                  <span>Instant Pest Advisory</span>
                </div>
              </div>
            </Col>

            <Col lg={5}>
              <div
                className="p-4 p-md-5 rounded-4 shadow-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                }}
              >
                <h4 className="fw-bold text-white mb-2">Smart Farm Dashboard</h4>
                <p className="text-light small mb-4 opacity-75">
                  Streamlined digital workflows designed specifically for field operations.
                </p>

                <div className="d-flex flex-column gap-3">
                  <div className="p-3 rounded-3 d-flex align-items-center gap-3" style={{ background: "rgba(0,0,0,0.25)" }}>
                    <div className="agri-icon-box agri-icon-emerald">
                      <FaTractor size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-white small">Multi-Farm Acreage</div>
                      <div className="text-light opacity-75" style={{ fontSize: "0.8rem" }}>Track soil type & plot size in acres</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-3 d-flex align-items-center gap-3" style={{ background: "rgba(0,0,0,0.25)" }}>
                    <div className="agri-icon-box agri-icon-sky">
                      <FaCloudSun size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-white small">Hyperlocal Forecast</div>
                      <div className="text-light opacity-75" style={{ fontSize: "0.8rem" }}>Predict rain & optimal sowing windows</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-3 d-flex align-items-center gap-3" style={{ background: "rgba(0,0,0,0.25)" }}>
                    <div className="agri-icon-box agri-icon-amber">
                      <FaShieldHalved size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-white small">Diagnostic Pest Radar</div>
                      <div className="text-light opacity-75" style={{ fontSize: "0.8rem" }}>Early pest warning & treatment protocols</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Us & 4 Pillars Section */}
      <section id="about" className="py-5 bg-white">
        <Container fluid className="page-container py-4">
          <div className="text-center mb-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <span className="text-uppercase fw-bold text-success small tracking-wide">About Us</span>
            <h2 className="fw-bold text-dark mt-1">Welcome to Agri-Tech</h2>
            <p className="text-muted">
              Agri-Tech is dedicated to revolutionizing the agricultural landscape by delivering
              scalable, intuitive digital solutions that empower farmers to thrive sustainably.
            </p>
          </div>

          <Row className="g-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <Col md={6} lg={3} key={p.title}>
                  <Card className="h-100 agri-card agri-card-hover p-3 border-0 shadow-sm">
                    <Card.Body className="d-flex flex-column">
                      <div className={`agri-icon-box agri-icon-${p.color} mb-3`}>
                        <Icon size={22} />
                      </div>
                      <h5 className="fw-bold text-dark mb-2">{p.title}</h5>
                      <p className="text-muted small mb-0">{p.desc}</p>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-5" style={{ backgroundColor: "#ecfdf5", borderTop: "1px solid #d1fae5", borderBottom: "1px solid #d1fae5" }}>
        <Container fluid className="page-container">
          <Row className="g-4 text-center">
            {STATS.map((s) => (
              <Col sm={6} lg={3} key={s.label}>
                <div className="p-4 rounded-4 bg-white shadow-sm h-100 d-flex flex-column justify-content-center">
                  <div className="display-5 fw-extrabold text-success mb-1" style={{ letterSpacing: "-0.03em" }}>
                    {s.value}
                  </div>
                  <div className="fw-bold text-dark mb-1">{s.label}</div>
                  <div className="text-muted small">{s.desc}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-white">
        <Container fluid className="page-container py-4">
          <div className="text-center mb-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <span className="text-uppercase fw-bold text-success small">Field Proven Solutions</span>
            <h2 className="fw-bold text-dark mt-1">Our Core Features</h2>
            <p className="text-muted">
              Built directly to tackle the most pressing agricultural challenges: unpredictable weather,
              crop pests, and disjointed farm resource management.
            </p>
          </div>

          <Row className="g-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <Col md={6} key={f.title}>
                  <Card className="h-100 agri-card agri-card-hover p-4 border">
                    <Card.Body>
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="agri-icon-box agri-icon-emerald">
                          <Icon size={22} />
                        </div>
                        <h4 className="fw-bold text-dark mb-0">{f.title}</h4>
                      </div>
                      <p className="text-muted mb-4">{f.desc}</p>
                      <div className="d-flex flex-column gap-2 pt-2 border-top">
                        {f.points.map((pt) => (
                          <div key={pt} className="d-flex align-items-center gap-2 small text-secondary">
                            <FaCircleCheck className="text-success" size={14} />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5" style={{ backgroundColor: "#f8fafc" }}>
        <Container fluid className="page-container py-4">
          <Row className="align-items-center gy-4 mb-5">
            <Col lg={6}>
              <span className="text-uppercase fw-bold text-success small">Agricultural Services</span>
              <h2 className="fw-bold text-dark mt-1">End-to-End Farming Support</h2>
              <p className="text-muted">
                From pre-planting weather analysis to verified seed and fertilizer procurement,
                Agri-Tech bridges traditional agricultural wisdom with modern precision workflows.
              </p>
            </Col>
            <Col lg={6} className="text-lg-end">
              <Button as={Link} to="/register" variant="success" size="lg" className="px-4">
                Explore The Marketplace
              </Button>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 agri-card p-3 shadow-sm">
                <Card.Body>
                  <div className="agri-icon-box agri-icon-sky mb-3">
                    <FaCloudSun size={24} />
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Weather Forecasting</h5>
                  <p className="text-muted small mb-0">
                    Live humidity, atmospheric pressure, temperature, and wind speed readings
                    to plan spraying, irrigation, and harvesting accurately.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 agri-card p-3 shadow-sm">
                <Card.Body>
                  <div className="agri-icon-box agri-icon-emerald mb-3">
                    <FaSeedling size={24} />
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Crop Information Directory</h5>
                  <p className="text-muted small mb-0">
                    Comprehensive botanical guides covering optimal soil types, sowing times,
                    growth duration, and recommended fertilizers for major crops.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 agri-card p-3 shadow-sm">
                <Card.Body>
                  <div className="agri-icon-box agri-icon-amber mb-3">
                    <FaTractor size={24} />
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Agricultural Marketplace</h5>
                  <p className="text-muted small mb-0">
                    Direct access to certified seeds, high-potency fertilizers, safety-tested
                    pesticides, and essential farm machinery with transparent pricing.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Case Study / Testimonials (Ravi's Story) */}
      <section className="py-5 bg-white">
        <Container fluid className="feed-container py-4">
          <Card className="agri-card border-0 shadow-lg p-4 p-md-5" style={{ background: "linear-gradient(135deg, #064e3b, #047857)", color: "#ffffff" }}>
            <Card.Body className="text-center">
              <div className="d-inline-flex p-3 rounded-circle bg-white text-success mb-3 shadow">
                <FaUsers size={28} />
              </div>
              <h3 className="fw-bold text-white mb-3">Real-World Case Study: Ravi's Farm</h3>
              <p className="text-light lead mx-auto mb-4" style={{ maxWidth: "750px", fontSize: "1.05rem", opacity: 0.95 }}>
                "Ravi, a diversified farmer managing rice, wheat, and vegetables, faced persistent losses
                due to unpredictable monsoons and unmonitored pest outbreaks. By adopting Agri-Tech, he leveraged
                precise weather forecasts and localized pest advisories, reducing resource wastage and increasing his overall seasonal profitability by over 30%."
              </p>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <Button as={Link} to="/register" variant="light" className="text-success fw-bold px-4 py-2">
                  Join Thousands of Farmers
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5" style={{ backgroundColor: "#f8fafc" }}>
        <Container fluid className="page-container py-4">
          <div className="text-center mb-5">
            <span className="text-uppercase fw-bold text-success small">Get in Touch</span>
            <h2 className="fw-bold text-dark mt-1">Agricultural Consultation & Support</h2>
            <p className="text-muted">Our agronomists and support engineers are here to support your farming operations.</p>
          </div>

          <Row className="justify-content-center g-4">
            <Col md={4}>
              <div className="p-4 bg-white rounded-4 border text-center h-100 shadow-sm">
                <div className="agri-icon-box agri-icon-emerald mb-3 mx-auto">
                  <FaLocationDot size={20} />
                </div>
                <h5 className="fw-bold text-dark mb-1">Headquarters</h5>
                <p className="text-muted small mb-0">Agricultural Innovation Hub, Sector 4, Hyderabad</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white rounded-4 border text-center h-100 shadow-sm">
                <div className="agri-icon-box agri-icon-sky mb-3 mx-auto">
                  <FaPhone size={20} />
                </div>
                <h5 className="fw-bold text-dark mb-1">Agronomy Hotline</h5>
                <p className="text-muted small mb-0">+62 812-3456-7890 / 1800-AGRI-TECH</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white rounded-4 border text-center h-100 shadow-sm">
                <div className="agri-icon-box agri-icon-amber mb-3 mx-auto">
                  <FaEnvelope size={20} />
                </div>
                <h5 className="fw-bold text-dark mb-1">Direct Support</h5>
                <p className="text-muted small mb-0">support@agritech.platform</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
