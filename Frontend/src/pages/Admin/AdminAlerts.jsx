import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Badge,
  Form,
  Alert,
  Spinner,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaTriangleExclamation,
  FaPlus,
  FaPenToSquare,
  FaTrashCan,
  FaShieldHalved,
  FaBug,
  FaVirus,
  FaLeaf,
  FaCircleCheck,
} from "react-icons/fa6";
import {
  getAllAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
} from "../../api/alertApi";
import { getAllCrops } from "../../api/adminApi";

const emptyForm = {
  crop: "",
  type: "pest",
  name: "",
  description: "",
  severity: "medium",
  recommendedAction: "",
  status: "active",
};

const SEVERITY_BADGES = {
  high: "badge-soft-danger",
  medium: "badge-soft-warning",
  low: "badge-soft-secondary",
};

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [alertData, cropData] = await Promise.all([
        getAllAlerts(),
        getAllCrops(),
      ]);
      setAlerts(alertData);
      setCrops(cropData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load pest alerts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (alert) => {
    setEditingId(alert._id);
    setFormData({
      crop: alert.crop?._id || "",
      type: alert.type,
      name: alert.name,
      description: alert.description || "",
      severity: alert.severity,
      recommendedAction: alert.recommendedAction || "",
      status: alert.status,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        const { crop, ...editable } = formData;
        await updateAlert(editingId, editable);
      } else {
        await createAlert(formData);
      }
      setShowModal(false);
      setFormData(emptyForm);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save alert.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this alert?")) return;
    try {
      await deleteAlert(id);
      setAlerts((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete alert.");
    }
  };

  return (
    <Container fluid className="page-container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="agri-page-title d-flex align-items-center gap-2">
            <FaTriangleExclamation className="text-warning" /> Pest & Disease Alerts Broadcasting
          </h2>
          <p className="agri-page-subtitle">
            Issue agronomic warnings, severity levels, and treatment protocols to affected farmer plots
          </p>
        </div>

        <Button
          variant="success"
          onClick={openCreateModal}
          className="d-flex align-items-center gap-2 px-3 py-2 fw-semibold shadow-sm mt-3 mt-sm-0"
        >
          <FaPlus size={14} />
          <span>Broadcast New Alert</span>
        </Button>
      </div>

      {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

      <div className="agri-table-wrapper p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-dark mb-0">Active Advisory Broadcasts</h5>
          <span className="badge badge-soft-warning">{alerts.length} Total Warnings</span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <div className="text-muted small mt-2">Loading alert registry...</div>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-5 text-muted small">
            No alerts broadcast yet.
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Target Crop</th>
                  <th>Farm & Farmer</th>
                  <th>Type</th>
                  <th>Outbreak Name</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((a) => {
                  const TypeIcon = a.type === "pest" ? FaBug : FaVirus;
                  const severityClass = SEVERITY_BADGES[a.severity] || "badge-soft-secondary";

                  return (
                    <tr key={a._id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <FaLeaf className="text-success" size={14} />
                          <span className="fw-bold text-dark">{a.crop?.name || "Crop"}</span>
                        </div>
                      </td>
                      <td>
                        <div className="fw-semibold text-dark small">{a.crop?.farm?.name}</div>
                        <div className="text-muted small" style={{ fontSize: "0.78rem" }}>
                          {a.crop?.farm?.user?.name}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-soft-secondary text-capitalize d-inline-flex align-items-center gap-1">
                          <TypeIcon size={11} />
                          <span>{a.type}</span>
                        </span>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{a.name}</div>
                        {a.description && (
                          <div
                            className="text-muted small text-truncate"
                            style={{ maxWidth: "200px" }}
                          >
                            {a.description}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${severityClass} text-uppercase`}>
                          {a.severity}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            a.status === "active" ? "badge-soft-danger" : "badge-soft-success"
                          } d-inline-flex align-items-center gap-1 text-uppercase`}
                        >
                          {a.status === "active" ? (
                            <FaTriangleExclamation size={10} />
                          ) : (
                            <FaCircleCheck size={10} />
                          )}
                          <span>{a.status}</span>
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="d-flex align-items-center gap-1"
                            onClick={() => openEditModal(a)}
                          >
                            <FaPenToSquare size={12} />
                            <span>Edit</span>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(a._id)}
                            className="d-flex align-items-center gap-1"
                          >
                            <FaTrashCan size={12} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* Broadcast / Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="fw-bold fs-5 text-dark d-flex align-items-center gap-2">
            <FaTriangleExclamation className="text-warning" />
            <span>{editingId ? "Update Advisory Parameters" : "Broadcast New Agronomic Alert"}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Target Crop & Location <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                disabled={Boolean(editingId)}
              >
                <option value="">-- Select Target Crop & Farm --</option>
                {crops.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.farm?.name} - {c.farm?.user?.name})
                  </option>
                ))}
              </Form.Select>
              {editingId && (
                <Form.Text className="text-muted small">
                  Target crop assignment is locked after alert broadcast.
                </Form.Text>
              )}
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-secondary">
                    Advisory Classification <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select name="type" value={formData.type} onChange={handleChange}>
                    <option value="pest">Pest Outbreak</option>
                    <option value="disease">Plant Disease / Pathogen</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-secondary">
                    Risk Severity <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                  >
                    <option value="low">Low Advisory</option>
                    <option value="medium">Medium Threat</option>
                    <option value="high">Critical Severity</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Outbreak / Diagnosis Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="name"
                placeholder="e.g. Brown Planthopper, Stem Borer, Rice Blast Fungus"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Diagnostic Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Visual symptoms, foliar damage patterns, or affected farm coordinates"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-semibold text-secondary">
                Recommended Agronomic Action
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Specific pesticide formulations, biological controls, or water level adjustments"
                name="recommendedAction"
                value={formData.recommendedAction}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-top">
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSave}
            disabled={saving || !formData.crop || !formData.name}
            className="px-4 fw-semibold"
          >
            {saving ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                <span>Broadcasting...</span>
              </>
            ) : (
              <span>{editingId ? "Update Alert" : "Broadcast Alert"}</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
