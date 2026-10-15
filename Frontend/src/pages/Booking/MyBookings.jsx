import { useEffect, useState } from "react";
import { Container, Table, Badge, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import {
  FaBoxesPacking,
  FaClock,
  FaTruckFast,
  FaCircleCheck,
  FaCalendarDays,
} from "react-icons/fa6";
import { getMyBookings } from "../../api/bookingApi";

const STATUS_CONFIG = {
  pending: {
    variant: "warning",
    icon: FaClock,
    label: "Pending Processing",
    badgeClass: "badge-soft-warning",
  },
  "on the way": {
    variant: "info",
    icon: FaTruckFast,
    label: "In Transit",
    badgeClass: "badge-soft-info",
  },
  delivered: {
    variant: "success",
    icon: FaCircleCheck,
    label: "Delivered to Farm",
    badgeClass: "badge-soft-success",
  },
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load order history.")
      )
      .finally(() => setLoading(false));
  }, []);

  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const inTransitCount = bookings.filter((b) => b.status === "on the way").length;
  const deliveredCount = bookings.filter((b) => b.status === "delivered").length;

  return (
    <Container fluid className="page-container py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="agri-page-title d-flex align-items-center gap-2">
          <FaBoxesPacking className="text-success" /> My Resource Orders
        </h2>
        <p className="agri-page-subtitle">
          Track procurement history, order statuses, and verified dispatch timelines
        </p>
      </div>

      {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

      {/* KPI Stats */}
      <Row className="g-3 mb-4">
        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-emerald">
                <FaBoxesPacking size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Total Orders Placed</div>
                <div className="fs-4 fw-bold text-dark">{bookings.length} Orders</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-sky">
                <FaTruckFast size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Orders In Transit</div>
                <div className="fs-4 fw-bold text-dark">{inTransitCount} Active</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-amber">
                <FaCircleCheck size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Cumulative Expenditure</div>
                <div className="fs-5 fw-bold text-dark">Rp{totalSpent.toLocaleString("id-ID")}</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Table */}
      <div className="agri-table-wrapper p-3 p-md-4">
        <h5 className="fw-bold text-dark mb-3">Order History Register</h5>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <div className="text-muted small mt-2">Loading booking history...</div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-5">
            <div className="agri-icon-box agri-icon-dark mx-auto mb-3" style={{ width: 64, height: 64 }}>
              <FaBoxesPacking size={28} />
            </div>
            <h5 className="fw-bold text-dark mb-1">No Orders Placed Yet</h5>
            <p className="text-muted small mb-0">
              Explore the Agri-Marketplace to order seeds, fertilizers, or equipment.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: "100px" }}>Order ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Total Cost</th>
                  <th>Status</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => {
                  const statusInfo = STATUS_CONFIG[b.status] || {
                    variant: "secondary",
                    icon: FaClock,
                    label: b.status,
                    badgeClass: "badge-soft-secondary",
                  };
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr key={b._id}>
                      <td className="text-muted small font-monospace">
                        #{b._id.slice(-6).toUpperCase()}
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{b.product?.name || "Direct Item"}</div>
                      </td>
                      <td>
                        <span className="badge badge-soft-secondary text-capitalize">
                          {b.product?.category || "Resource"}
                        </span>
                      </td>
                      <td>
                        <span className="fw-semibold text-secondary">{b.quantity} Units</span>
                      </td>
                      <td>
                        <span className="fw-bold text-success">
                          Rp{b.totalAmount.toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${statusInfo.badgeClass} d-inline-flex align-items-center gap-1`}
                        >
                          <StatusIcon size={11} />
                          <span>{statusInfo.label}</span>
                        </span>
                      </td>
                      <td className="text-muted small">
                        <div className="d-flex align-items-center gap-1">
                          <FaCalendarDays size={12} className="text-muted" />
                          <span>
                            {new Date(b.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
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
    </Container>
  );
}
