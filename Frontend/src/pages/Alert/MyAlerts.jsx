import { useEffect, useState } from "react";
import { Container, Card, Badge, Button, Alert as BsAlert, Spinner, Row, Col } from "react-bootstrap";
import {
  FaTriangleExclamation,
  FaShieldHalved,
  FaCircleCheck,
  FaBug,
  FaVirus,
  FaLeaf,
  FaCalendarDays,
} from "react-icons/fa6";
import { getMyAlerts, resolveAlert } from "../../api/alertApi";

const SEVERITY_CONFIG = {
  high: {
    border: "#ef4444",
    bg: "#fef2f2",
    badgeClass: "badge-soft-danger",
    label: "High Severity",
    icon: FaTriangleExclamation,
  },
  medium: {
    border: "#f59e0b",
    bg: "#fffbeb",
    badgeClass: "badge-soft-warning",
    label: "Moderate Risk",
    icon: FaTriangleExclamation,
  },
  low: {
    border: "#64748b",
    bg: "#f8fafc",
    badgeClass: "badge-soft-secondary",
    label: "Low Advisory",
    icon: FaShieldHalved,
  },
};

export default function MyAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resolvingId, setResolvingId] = useState(null);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const data = await getMyAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load pest alerts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleResolve = async (id) => {
    setResolvingId(id);
    try {
      await resolveAlert(id);
      setAlerts((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update alert status.");
    } finally {
      setResolvingId(null);
    }
  };

  const highSeverityCount = alerts.filter((a) => a.severity === "high").length;

  return (
    <Container fluid className="feed-container py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="agri-page-title d-flex align-items-center gap-2">
          <FaTriangleExclamation className="text-warning" /> Pest & Crop Disease Radar
        </h2>
        <p className="agri-page-subtitle">
          Real-time agronomic pest detections and actionable mitigation measures for your fields
        </p>
      </div>

      {error && <BsAlert variant="danger" className="py-2 small">{error}</BsAlert>}

      {/* KPI Stats */}
      <Row className="g-3 mb-4">
        <Col sm={6}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-danger">
                <FaBug size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Active Field Alerts</div>
                <div className="fs-4 fw-bold text-dark">{alerts.length} Warnings</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={6}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-amber">
                <FaShieldHalved size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Critical Threats</div>
                <div className="fs-4 fw-bold text-dark">{highSeverityCount} Critical</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Alert Feed */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <div className="text-muted small mt-2">Scanning farm diagnosis telemetry...</div>
        </div>
      ) : alerts.length === 0 ? (
        <Card className="agri-card border-0 shadow-sm p-5 text-center bg-white">
          <div className="agri-icon-box agri-icon-emerald mx-auto mb-3" style={{ width: 64, height: 64 }}>
            <FaCircleCheck size={28} />
          </div>
          <h4 className="fw-bold text-dark mb-1">Your Crops are Safe!</h4>
          <p className="text-muted small mb-0">
            No active pest outbreaks or pathogen warnings detected across your registered farms.
          </p>
        </Card>
      ) : (
        <div className="d-flex flex-column gap-3">
          {alerts.map((a) => {
            const conf = SEVERITY_CONFIG[a.severity] || SEVERITY_CONFIG.medium;
            const TypeIcon = a.type === "pest" ? FaBug : FaVirus;

            return (
              <Card
                key={a._id}
                className="agri-card border-0 shadow-sm p-4 position-relative"
                style={{
                  borderLeft: `5px solid ${conf.border} !important`,
                }}
              >
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${conf.badgeClass} text-uppercase`}>
                      {conf.label}
                    </span>
                    <span className="badge badge-soft-secondary text-capitalize d-inline-flex align-items-center gap-1">
                      <TypeIcon size={11} />
                      <span>{a.type}</span>
                    </span>
                  </div>

                  <span className="text-muted small d-flex align-items-center gap-1">
                    <FaCalendarDays size={12} />
                    <span>Active Telemetry</span>
                  </span>
                </div>

                <h4 className="fw-bold text-dark mb-2">{a.name}</h4>

                <div className="d-flex align-items-center gap-2 text-secondary small mb-3">
                  <FaLeaf className="text-success" size={13} />
                  <span className="fw-semibold">Affected Crop:</span>
                  <span>{a.crop?.name} ({a.crop?.variety || "Standard"})</span>
                </div>

                {a.description && (
                  <p className="text-muted small mb-3">{a.description}</p>
                )}

                {a.recommendedAction && (
                  <div
                    className="p-3 rounded-3 mb-3 border small"
                    style={{ backgroundColor: conf.bg, borderColor: `${conf.border}30` }}
                  >
                    <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-1">
                      <FaShieldHalved className="text-success" size={13} />
                      <span>Recommended Agronomic Action:</span>
                    </div>
                    <div className="text-secondary">{a.recommendedAction}</div>
                  </div>
                )}

                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="fw-semibold d-inline-flex align-items-center gap-2 px-3 py-2"
                    onClick={() => handleResolve(a._id)}
                    disabled={resolvingId === a._id}
                  >
                    {resolvingId === a._id ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <FaCircleCheck size={14} />
                    )}
                    <span>Mark as Resolved</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}
