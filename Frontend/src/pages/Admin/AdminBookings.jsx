import { useEffect, useState } from "react";
import { Container, Table, Form, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import {
  FaBoxesPacking,
  FaClock,
  FaTruckFast,
  FaCircleCheck,
  FaCalendarDays,
  FaUser,
} from "react-icons/fa6";
import { getAllBookings, updateBookingStatus } from "../../api/bookingApi";

const STATUSES = ["pending", "on the way", "delivered"];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load booking orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order fulfillment status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <Container fluid className="page-container py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="agri-page-title d-flex align-items-center gap-2">
          <FaBoxesPacking className="text-success" /> Order & Booking Fulfillment
        </h2>
        <p className="agri-page-subtitle">
          Manage agricultural input dispatches, verification logs, and transaction settlements
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
                <div className="text-muted small fw-semibold">Total Orders Processed</div>
                <div className="fs-4 fw-bold text-dark">{bookings.length} Orders</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-amber">
                <FaClock size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Pending Fulfillment</div>
                <div className="fs-4 fw-bold text-dark">{pendingCount} Orders</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-sky">
                <FaCircleCheck size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Platform Gross Revenue</div>
                <div className="fs-5 fw-bold text-dark">Rp{totalRevenue.toLocaleString("id-ID")}</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="agri-table-wrapper p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-dark mb-0">Platform Bookings Register</h5>
          <span className="badge badge-soft-success">{bookings.length} Bookings</span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <div className="text-muted small mt-2">Loading booking orders...</div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-5 text-muted small">
            No booking transactions recorded.
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Farmer / Buyer</th>
                  <th>Product Item</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                  <th>Fulfillment Status</th>
                  <th>Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-light border p-1 text-secondary">
                          <FaUser size={12} />
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{b.user?.name || "Direct Customer"}</div>
                          <div className="text-muted small" style={{ fontSize: "0.78rem" }}>
                            {b.user?.email || "-"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{b.product?.name}</div>
                      <div className="text-muted small font-monospace">
                        #{b._id.slice(-6).toUpperCase()}
                      </div>
                    </td>
                    <td>
                      <span className="fw-semibold text-secondary">{b.quantity} Units</span>
                    </td>
                    <td>
                      <span className="fw-bold text-success">
                        Rp{b.totalAmount.toLocaleString("id-ID")}
                      </span>
                    </td>
                    <td style={{ minWidth: "160px" }}>
                      <Form.Select
                        size="sm"
                        value={b.status}
                        disabled={updatingId === b._id}
                        onChange={(e) => handleStatusChange(b._id, e.target.value)}
                        className={`fw-semibold text-capitalize ${
                          b.status === "delivered"
                            ? "border-success text-success"
                            : b.status === "on the way"
                            ? "border-info text-info"
                            : "border-warning text-warning"
                        }`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td className="text-muted small">
                      <div className="d-flex align-items-center gap-1">
                        <FaCalendarDays size={12} />
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
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </Container>
  );
}
