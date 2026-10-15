import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Alert, Spinner, ListGroup, Button } from "react-bootstrap";
import {
  FaUsers,
  FaTractor,
  FaBasketShopping,
  FaBoxesPacking,
  FaChartPie,
  FaArrowRight,
  FaUser,
  FaTag,
  FaArrowTrendUp,
} from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getDashboardStats } from "../../api/adminApi";

const BAR_COLORS = ["#059669", "#0284c7", "#f59e0b", "#8b5cf6"];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load system metrics.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <div className="text-muted small mt-2">Loading executive telemetry...</div>
      </Container>
    );
  }

  if (error || !stats) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          {error || "Failed to load dashboard data. Please refresh the page."}
        </Alert>
      </Container>
    );
  }

  const totals = stats?.totals ?? { users: 0, farms: 0, products: 0, bookings: 0 };
  const recentUsers = stats?.recentUsers ?? [];
  const recentProducts = stats?.recentProducts ?? [];

  const kpis = [
    {
      label: "Total Registered Users",
      value: totals.users,
      to: "/admin/users",
      icon: FaUsers,
      color: "emerald",
      trend: "+12% this month",
    },
    {
      label: "Managed Farm Acreage",
      value: totals.farms,
      icon: FaTractor,
      color: "sky",
      trend: "Operational",
    },
    {
      label: "Marketplace Products",
      value: totals.products,
      to: "/admin/products",
      icon: FaBasketShopping,
      color: "amber",
      trend: "In Catalog",
    },
    {
      label: "Orders & Bookings",
      value: totals.bookings,
      to: "/admin/bookings",
      icon: FaBoxesPacking,
      color: "purple",
      trend: "All-time",
    },
  ];

  const chartData = [
    { name: "Users", count: totals.users },
    { name: "Farms", count: totals.farms },
    { name: "Products", count: totals.products },
    { name: "Bookings", count: totals.bookings },
  ];

  return (
    <Container fluid className="page-container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="agri-page-title d-flex align-items-center gap-2">
            <FaChartPie className="text-success" /> Admin Command Dashboard
          </h2>
          <p className="agri-page-subtitle">
            System overview of agricultural platform operations, user accounts, and commerce
          </p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-sm-0">
          <Button as={Link} to="/admin/products" variant="success" size="sm" className="px-3">
            + New Product
          </Button>
          <Button as={Link} to="/admin/alerts" variant="outline-danger" size="sm" className="px-3">
            Create Alert
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip (PDF Page 29) */}
      <Row className="g-3 mb-4">
        {kpis.map((k, idx) => {
          const Icon = k.icon;
          return (
            <Col sm={6} lg={3} key={k.label}>
              <Card
                as={k.to ? Link : "div"}
                to={k.to}
                className={`h-100 agri-card agri-card-hover p-3 text-decoration-none border-0 shadow-sm ${
                  k.to ? "agri-pointer" : ""
                }`}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className={`agri-icon-box agri-icon-${k.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="badge badge-soft-success small" style={{ fontSize: "0.72rem" }}>
                    {k.trend}
                  </span>
                </div>
                <div className="display-6 fw-extrabold text-dark mb-1">
                  {k.value}
                </div>
                <div className="text-muted small fw-semibold d-flex justify-content-between align-items-center">
                  <span>{k.label}</span>
                  {k.to && <FaArrowRight size={11} />}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* System Overview Chart Section (Matching PDF Page 29) */}
      <Card className="agri-card border-0 shadow-sm p-4 mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold text-dark mb-1">System Overview</h5>
            <p className="text-muted small mb-0">Platform scale metric distribution across entities</p>
          </div>
          <div className="d-flex align-items-center gap-2 text-success small fw-semibold">
            <FaArrowTrendUp /> Real-time database telemetry
          </div>
        </div>

        <div style={{ height: "300px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 13, fontWeight: 600 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                }}
                formatter={(val) => [val, "Total Records"]}
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Users & Products Side by Side (PDF Page 29) */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="agri-card border-0 shadow-sm h-100 p-3">
            <div className="d-flex justify-content-between align-items-center p-2 mb-2 border-bottom">
              <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                <FaUsers className="text-success" />
                <span>Recent Registered Farmers</span>
              </h6>
              <Link to="/admin/users" className="text-success small fw-semibold text-decoration-none">
                View All &rarr;
              </Link>
            </div>
            <ListGroup variant="flush">
              {recentUsers.length === 0 ? (
                <div className="text-center py-3 text-muted small">No recent user activity.</div>
              ) : (
                recentUsers.map((u) => (
                  <ListGroup.Item
                    key={u._id}
                    className="px-2 py-3 border-light-subtle d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-light border p-2 text-secondary">
                        <FaUser size={14} />
                      </div>
                      <div>
                        <div className="fw-bold text-dark small">{u.name}</div>
                        <div className="text-muted small" style={{ fontSize: "0.78rem" }}>
                          {u.email}
                        </div>
                      </div>
                    </div>
                    <span className="badge badge-soft-success text-capitalize small">
                      {u.role || "farmer"}
                    </span>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="agri-card border-0 shadow-sm h-100 p-3">
            <div className="d-flex justify-content-between align-items-center p-2 mb-2 border-bottom">
              <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                <FaBasketShopping className="text-primary" />
                <span>Recently Added Marketplace Items</span>
              </h6>
              <Link to="/admin/products" className="text-success small fw-semibold text-decoration-none">
                View All &rarr;
              </Link>
            </div>
            <ListGroup variant="flush">
              {recentProducts.length === 0 ? (
                <div className="text-center py-3 text-muted small">No products logged yet.</div>
              ) : (
                recentProducts.map((p) => (
                  <ListGroup.Item
                    key={p._id}
                    className="px-2 py-3 border-light-subtle d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-light border p-2 text-warning">
                        <FaTag size={14} />
                      </div>
                      <div>
                        <div className="fw-bold text-dark small">{p.name}</div>
                        <div className="text-muted small" style={{ fontSize: "0.78rem" }}>
                          {p.category}
                        </div>
                      </div>
                    </div>
                    <span className="badge badge-soft-info text-capitalize small">
                      {p.category}
                    </span>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
