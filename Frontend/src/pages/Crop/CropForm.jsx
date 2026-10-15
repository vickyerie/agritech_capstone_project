import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Form, Button, Alert, Card, Spinner, Row, Col } from "react-bootstrap";
import {
  FaLeaf,
  FaCalendarDays,
  FaBoxesStacked,
  FaTag,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa6";
import { getCropById, createCrop, updateCrop } from "../../api/cropApi";

const emptyForm = {
  name: "",
  variety: "",
  quantity: "",
  plantedDate: "",
  harvestDate: "",
};

export default function CropForm() {
  const { farmId, id } = useParams();
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
        const crop = await getCropById(id);
        setFormData({
          name: crop.name || "",
          variety: crop.variety || "",
          quantity: crop.quantity ?? "",
          plantedDate: crop.plantedDate ? crop.plantedDate.slice(0, 10) : "",
          harvestDate: crop.harvestDate ? crop.harvestDate.slice(0, 10) : "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load crop details.");
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
      quantity: Number(formData.quantity),
      harvestDate: formData.harvestDate || undefined,
    };

    try {
      if (isEdit) {
        await updateCrop(id, payload);
      } else {
        await createCrop({ ...payload, farm: farmId });
      }
      navigate(`/farms/${farmId}/crops`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save crop.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <div className="text-muted small mt-2">Loading crop data...</div>
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
            to={`/farms/${farmId}/crops`}
            className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1"
          >
            <FaArrowLeft size={12} />
            <span>Back to Crops List</span>
          </Link>
        </div>

        <Card className="agri-card border-0 shadow-lg p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="agri-icon-box agri-icon-emerald mx-auto mb-3" style={{ width: 56, height: 56 }}>
              <FaLeaf size={26} />
            </div>
            <h3 className="fw-bold text-dark mb-1">
              {isEdit ? "Update Crop Planting" : "Add New Crop"}
            </h3>
            <p className="text-muted small mb-0">
              Fill in the details of your agricultural crop planting and projected harvest.
            </p>
          </div>

          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Crop Name <span className="text-danger">*</span>
              </Form.Label>
              <div className="position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                  <FaLeaf size={14} />
                </div>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="e.g., Basmati Rice, Durum Wheat, Sweet Corn"
                  value={formData.name}
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
                    Variety (Optional)
                  </Form.Label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                      <FaTag size={14} />
                    </div>
                    <Form.Control
                      type="text"
                      name="variety"
                      placeholder="e.g., IR64, Golden Hybrid"
                      value={formData.variety}
                      onChange={handleChange}
                      className="ps-5"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-secondary">
                    Quantity (Acres / Units) <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                      <FaBoxesStacked size={14} />
                    </div>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      name="quantity"
                      placeholder="e.g., 50"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className="ps-5"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-secondary">
                    Planted Date <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                      <FaCalendarDays size={14} />
                    </div>
                    <Form.Control
                      type="date"
                      name="plantedDate"
                      value={formData.plantedDate}
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
                    Estimated Harvest Date
                  </Form.Label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                      <FaCalendarDays size={14} />
                    </div>
                    <Form.Control
                      type="date"
                      name="harvestDate"
                      value={formData.harvestDate}
                      onChange={handleChange}
                      className="ps-5"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

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
                    <span>Saving Crop...</span>
                  </>
                ) : (
                  <>
                    <FaCheck size={14} />
                    <span>{isEdit ? "Update Crop Planting" : "Add Crop to Farm"}</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline-secondary"
                className="px-4 py-2"
                onClick={() => navigate(`/farms/${farmId}/crops`)}
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
