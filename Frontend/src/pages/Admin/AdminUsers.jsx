import { useEffect, useState } from "react";
import { Container, Table, Badge, Alert, Spinner, Card, Form } from "react-bootstrap";
import {
  FaUsers,
  FaUser,
  FaCalendarDays,
  FaMagnifyingGlass,
  FaShieldHalved,
} from "react-icons/fa6";
import { getUsers } from "../../api/adminApi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load user accounts.")
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    return u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
  });

  return (
    <Container fluid className="page-container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="agri-page-title d-flex align-items-center gap-2">
            <FaUsers className="text-success" /> User Management
          </h2>
          <p className="agri-page-subtitle">
            Oversee registered farmer accounts, administrative roles, and verification statuses
          </p>
        </div>

        <div className="position-relative mt-3 mt-sm-0" style={{ maxWidth: "300px", width: "100%" }}>
          <FaMagnifyingGlass
            size={13}
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          />
          <Form.Control
            type="text"
            size="sm"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ps-5"
          />
        </div>
      </div>

      {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

      <div className="agri-table-wrapper p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-dark mb-0">Platform User Directory</h5>
          <span className="badge badge-soft-success">{filteredUsers.length} Users Found</span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <div className="text-muted small mt-2">Loading user accounts...</div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-5 text-muted small">
            No users match your criteria.
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registered Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, idx) => (
                  <tr key={u._id}>
                    <td className="text-muted small fw-semibold">{idx + 1}</td>
                    <td className="text-muted small font-monospace">
                      #{u._id.slice(-6).toUpperCase()}
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-light border p-1 text-secondary">
                          <FaUser size={12} />
                        </div>
                        <span className="fw-bold text-dark">{u.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-secondary small">{u.email}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          u.role === "admin" ? "badge-soft-danger" : "badge-soft-success"
                        } d-inline-flex align-items-center gap-1 text-uppercase`}
                      >
                        {u.role === "admin" && <FaShieldHalved size={10} />}
                        <span>{u.role || "farmer"}</span>
                      </span>
                    </td>
                    <td className="text-muted small">
                      <div className="d-flex align-items-center gap-1">
                        <FaCalendarDays size={12} />
                        <span>
                          {new Date(u.createdAt).toLocaleDateString("en-US", {
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
