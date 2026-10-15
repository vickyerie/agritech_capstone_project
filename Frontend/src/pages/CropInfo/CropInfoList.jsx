import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Alert, Spinner, Form, Button } from "react-bootstrap";
import {
  FaBookOpen,
  FaArrowRight,
  FaMagnifyingGlass,
  FaSeedling,
} from "react-icons/fa6";
import { getCropInfoList } from "../../api/cropInfoApi";
import { getCropImage } from "../../utils/cropImages";

export default function CropInfoList() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getCropInfoList();
        setCrops(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load Crop Information.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredCrops = crops.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="page-container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="agri-page-title d-flex align-items-center gap-2">
            <FaBookOpen className="text-success" /> Agricultural Information Directory
          </h2>
          <p className="agri-page-subtitle">
            Comprehensive botanical agronomy guides, optimal sowing windows, climate thresholds, and nutrient guides
          </p>
        </div>

        <div className="position-relative mt-3 mt-sm-0" style={{ maxWidth: "320px", width: "100%" }}>
          <FaMagnifyingGlass
            size={14}
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          />
          <Form.Control
            type="text"
            placeholder="Search crop varieties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ps-5"
          />
        </div>
      </div>

      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <div className="text-muted small mt-2">Loading crop encyclopedia...</div>
        </div>
      ) : filteredCrops.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No crops match your search term "{searchTerm}".</p>
          <Button variant="outline-success" size="sm" onClick={() => setSearchTerm("")}>
            Reset Filter
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          {filteredCrops.map((crop) => (
            <Col key={crop.id} xs={12} sm={6} lg={4}>
              <Card className="h-100 agri-card agri-card-hover border-0 shadow-sm d-flex flex-column">
                <div className="position-relative agri-overflow-hidden">
                  <img
                    src={getCropImage(crop.id)}
                    alt={crop.name}
                    className="agri-crop-card-img"
                  />
                  <span className="position-absolute top-0 end-0 m-3 badge badge-soft-success shadow-sm">
                    Agronomy Guide
                  </span>
                </div>

                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FaSeedling className="text-success" size={16} />
                    <h4 className="fw-bold text-dark mb-0">{crop.name}</h4>
                  </div>
                  <p className="text-muted small mb-4 flex-grow-1">
                    Access certified botanical information, soil tolerances, recommended fertilizers,
                    and target pesticide schedules.
                  </p>
                  <Button
                    as={Link}
                    to={`/crop-info/${crop.id}`}
                    variant="outline-success"
                    className="w-100 fw-semibold d-flex justify-content-center align-items-center gap-2 py-2"
                  >
                    <span>View Crop Details</span>
                    <FaArrowRight size={13} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
