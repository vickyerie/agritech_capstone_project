import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Form, Button, Alert, Card, Spinner, Row, Col } from "react-bootstrap";
import {
  FaTractor,
  FaLocationDot,
  FaChartArea,
  FaLeaf,
  FaCalendarDays,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa6";
import { getFarmById, createFarm, updateFarm } from "../../api/farmApi";

const emptyForm = {
  name: "",
  location: "",
  areaSize: "",
  cropType: "",
  establishedDate: "",
};

export default function FarmForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const farm = await getFarmById(id);
        setFormData({
          name: farm.name || "",
          location: farm.location || "",
          areaSize: farm.areaSize ?? "",
          cropType: farm.cropType || "",
          establishedDate: farm.establishedDate
            ? farm.establishedDate.slice(0, 10)
            : "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load farm details.");
      } finally {
        setFetching(false);
      }
    })();
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...formData,
      areaSize: Number(formData.areaSize),
    };

    try {
      if (isEdit) {
        await updateFarm(id, payload);
      } else {
        await createFarm(payload);
      }
      navigate("/farms");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save farm.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <div className="text-muted small mt-2">Loading farm configuration...</div>
      </Container>
    );
  }

  return (
    <div
      className="py-5"
      style={{
        minHeight: "85vh",
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.94), rgba(240, 253, 244, 0.96)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container style={{ maxWidth: "680px" }}>
        <div className="mb-3">
          <Link
            to="/farms"
            className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1"
          >
            <FaArrowLeft size={12} />
            <span>Back to Farms Directory</span>
          </Link>
        </div>

        <Card className="agri-card border-0 shadow-lg p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="agri-icon-box agri-icon-emerald mx-auto mb-3" style={{ width: 56, height: 56 }}>
              <FaTractor size={26} />
            </div>
            <h3 className="fw-bold text-dark mb-1">
              {isEdit ? "Update Farm Profile" : "Register New Farm"}
            </h3>
            <p className="text-muted small mb-0">
              Provide acreage parameters and geographic classification for your agricultural land.
            </p>
          </div>

          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Farm Name <span className="text-danger">*</span>
              </Form.Label>
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                  <FaTractor size={14} />
                </div>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="e.g., Green Valley Farm / North Paddy Plot"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="ps-5"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Location (City / District) <span className="text-danger">*</span>
              </Form.Label>
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                  <FaLocationDot size={14} />
                </div>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="e.g., Hyderabad / Tangerang"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="ps-5"
                />
              </div>
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-secondary">
                    Area Size (Acres) <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                      <FaChartArea size={14} />
                    </div>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      name="areaSize"
                      placeholder="e.g., 5.2"
                      value={formData.areaSize}
                      onChange={handleChange}
                      required
                      className="ps-5"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-secondary">
                    Established Date
                  </Form.Label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                      <FaCalendarDays size={14} />
                    </div>
                    <Form.Control
                      type="date"
                      name="establishedDate"
                      value={formData.establishedDate}
                      onChange={handleChange}
                      className="ps-5"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold text-secondary">
                Primary Crop Type <span className="text-danger">*</span>
              </Form.Label>
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                  <FaLeaf size={14} />
                </div>
                <Form.Control
                  type="text"
                  name="cropType"
                  placeholder="e.g., Basmati Rice, Organic Wheat, Maize"
                  value={formData.cropType}
                  onChange={handleChange}
                  required
                  className="ps-5"
                />
              </div>
            </Form.Group>

            <div className="d-flex gap-2 pt-2">
              <Button
                type="submit"
                variant="success"
                className="flex-grow-1 py-2 fw-semibold d-flex justify-content-center align-items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span>Saving Farm...</span>
                  </>
                ) : (
                  <>
                    <FaCheck size={14} />
                    <span>{isEdit ? "Update Farm Profile" : "Register Farm"}</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline-secondary"
                className="px-4 py-2"
                onClick={() => navigate("/farms")}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
