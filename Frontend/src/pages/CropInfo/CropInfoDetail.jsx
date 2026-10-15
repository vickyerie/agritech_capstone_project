import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Row, Col, Badge, Alert, Spinner } from "react-bootstrap";
import {
  FaArrowLeft,
  FaSeedling,
  FaCalendarDays,
  FaClock,
  FaCloudSun,
  FaMountainSun,
  FaFlask,
  FaShieldHalved,
  FaDna,
} from "react-icons/fa6";
import { getCropInfo } from "../../api/cropInfoApi";
import { getCropImage } from "../../utils/cropImages";

export default function CropInfoDetail() {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");
    (async () => {
      try {
        const data = await getCropInfo(id);
        setCrop(data);
      } catch (err) {
        setError(err.response?.data?.message || "Crop specification not found.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <Container style={{ maxWidth: "920px" }} className="py-4">
      {/* Back button */}
      <div className="mb-3">
        <Link
          to="/crop-info"
          className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1"
        >
          <FaArrowLeft size={12} />
          <span>Back to Crop Information Directory</span>
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <div className="text-muted small mt-2">Loading crop agronomy dossier...</div>
        </div>
      ) : crop ? (
        <div className="d-flex flex-column gap-4">
          {/* Hero Banner (Matching PDF Page 24-25) */}
          <div
            className="rounded-4 overflow-hidden shadow-lg position-relative d-flex align-items-end p-4 p-md-5"
            style={{
              minHeight: "260px",
              backgroundImage: `linear-gradient(to top, rgba(6, 78, 59, 0.95) 0%, rgba(6, 78, 59, 0.4) 60%, transparent 100%), url('${getCropImage(
                crop.id
              )}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="position-relative text-white z-1">
              <span className="badge badge-soft-success mb-2 px-3 py-1">Agronomic Profile</span>
              <h1 className="display-5 fw-extrabold text-white mb-1">{crop.name}</h1>
              <p className="lead text-light mb-0 fst-italic opacity-90 d-flex align-items-center gap-2">
                <FaDna size={15} />
                <span>{crop.scientificName}</span>
              </p>
            </div>
          </div>

          {/* Crop Specifications Grid Card */}
          <Card className="agri-card border-0 shadow-sm p-4">
            <h4 className="fw-bold text-dark mb-4 pb-2 border-bottom">Crop Parameters & Lifecycle</h4>

            <Row className="g-4 mb-3">
              <Col sm={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="agri-icon-box agri-icon-emerald">
                    <FaDna size={18} />
                  </div>
                  <div>
                    <div className="text-muted small">Scientific Name</div>
                    <div className="fw-bold text-dark">{crop.scientificName}</div>
                  </div>
                </div>
              </Col>

              <Col sm={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="agri-icon-box agri-icon-sky">
                    <FaClock size={18} />
                  </div>
                  <div>
                    <div className="text-muted small">Growth Period</div>
                    <div className="fw-bold text-dark">{crop.growthPeriod}</div>
                  </div>
                </div>
              </Col>

              <Col sm={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="agri-icon-box agri-icon-amber">
                    <FaCloudSun size={18} />
                  </div>
                  <div>
                    <div className="text-muted small">Season</div>
                    <div className="fw-bold text-dark">{crop.season}</div>
                  </div>
                </div>
              </Col>

              <Col sm={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="agri-icon-box agri-icon-emerald">
                    <FaCalendarDays size={18} />
                  </div>
                  <div>
                    <div className="text-muted small">Sowing Window</div>
                    <div className="fw-bold text-dark">{crop.sowingTime}</div>
                  </div>
                </div>
              </Col>

              <Col sm={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="agri-icon-box agri-icon-sky">
                    <FaCloudSun size={18} />
                  </div>
                  <div>
                    <div className="text-muted small">Climate & Rainfall</div>
                    <div className="fw-bold text-dark">{crop.climate}</div>
                  </div>
                </div>
              </Col>

              <Col sm={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="agri-icon-box agri-icon-amber">
                    <FaCalendarDays size={18} />
                  </div>
                  <div>
                    <div className="text-muted small">Harvest Window</div>
                    <div className="fw-bold text-dark">{crop.harvestTime}</div>
                  </div>
                </div>
              </Col>

              <Col sm={12}>
                <div className="d-flex align-items-center gap-3">
                  <div className="agri-icon-box agri-icon-dark">
                    <FaMountainSun size={18} />
                  </div>
                  <div>
                    <div className="text-muted small">Optimal Soil Type</div>
                    <div className="fw-bold text-dark">{crop.soilType}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Recommended Pesticides & Fertilizers Side-by-Side (Matching PDF Page 25) */}
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 agri-card border-0 shadow-sm p-4" style={{ backgroundColor: "#fef2f2" }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="agri-icon-box agri-icon-danger" style={{ width: 40, height: 40 }}>
                    <FaShieldHalved size={18} />
                  </div>
                  <h5 className="fw-bold text-danger mb-0">Recommended Pesticides</h5>
                </div>
                <p className="text-muted small mb-3">
                  Certified formulations to safeguard against prevalent seasonal pests:
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {crop.pesticides?.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-pill bg-white text-danger fw-semibold small shadow-sm border border-danger-subtle"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100 agri-card border-0 shadow-sm p-4" style={{ backgroundColor: "#f0fdf4" }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="agri-icon-box agri-icon-emerald" style={{ width: 40, height: 40 }}>
                    <FaFlask size={18} />
                  </div>
                  <h5 className="fw-bold text-success mb-0">Recommended Fertilizers</h5>
                </div>
                <p className="text-muted small mb-3">
                  Balanced macronutrients and soil enrichers to maximize vegetative growth:
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {crop.fertilizers?.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1 rounded-pill bg-white text-success fw-semibold small shadow-sm border border-success-subtle"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ) : null}
    </Container>
  );
}
