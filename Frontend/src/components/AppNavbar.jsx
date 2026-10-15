import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSeedling,
  FaArrowRightFromBracket,
  FaUser,
  FaTractor,
  FaCloudSun,
  FaBasketShopping,
  FaBookOpen,
  FaTriangleExclamation,
  FaBoxesPacking,
  FaUsers,
  FaChartPie,
  FaRightToBracket,
  FaHouse,
  FaUserPen,
} from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";
  const pathname = location.pathname;

  return (
    <Navbar
      expand="lg"
      className={`agri-navbar ${isAdmin ? "agri-navbar-admin" : ""}`}
    >
      <Container fluid className="page-container">
        {/* Brand / Logo */}
        <div className="d-flex align-items-center">
          <Link
            to={user ? (isAdmin ? "/admin" : "/") : "/"}
            onClick={() => navigate(user ? (isAdmin ? "/admin" : "/") : "/")}
            className="agri-brand d-inline-flex align-items-center text-decoration-none"
          >
            <div className="agri-brand-icon">
              <FaSeedling size={20} />
            </div>
            <span>Agri-Tech</span>
          </Link>

          {/* ADMIN clickable badge/button */}
          {isAdmin && (
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="ms-2 px-2 py-1 badge bg-danger border-0 text-white fw-bold text-uppercase d-inline-flex align-items-center"
              style={{
                fontSize: "0.68rem",
                cursor: "pointer",
                borderRadius: "6px",
                transition: "all 0.15s ease",
              }}
              title="Go to Admin Dashboard"
            >
              ADMIN
            </button>
          )}
        </div>

        <Navbar.Toggle aria-controls="main-navbar" className="border-0 shadow-none" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto align-items-lg-center mt-2 mt-lg-0 ms-lg-3">
            {!user ? (
              // Public Landing Navigation
              <>
                <a href="#features" className="nav-link agri-nav-link">
                  Features
                </a>
                <a href="#services" className="nav-link agri-nav-link">
                  Services
                </a>
                <a href="#about" className="nav-link agri-nav-link">
                  About
                </a>
                <a href="#stats" className="nav-link agri-nav-link">
                  Stats
                </a>
                <a href="#contact" className="nav-link agri-nav-link">
                  Contact
                </a>
              </>
            ) : isAdmin ? (
              // Admin Navigation (Direct Links with guaranteed programmatic navigation)
              <>
                <Link
                  to="/admin"
                  onClick={() => navigate("/admin")}
                  className={`nav-link agri-nav-link ${pathname === "/admin" ? "active" : ""}`}
                >
                  <FaChartPie size={15} />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/admin/users"
                  onClick={() => navigate("/admin/users")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/admin/users") ? "active" : ""}`}
                >
                  <FaUsers size={15} />
                  <span>Users</span>
                </Link>

                <Link
                  to="/admin/products"
                  onClick={() => navigate("/admin/products")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/admin/products") ? "active" : ""}`}
                >
                  <FaBasketShopping size={15} />
                  <span>Products</span>
                </Link>

                <Link
                  to="/admin/bookings"
                  onClick={() => navigate("/admin/bookings")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/admin/bookings") ? "active" : ""}`}
                >
                  <FaBoxesPacking size={15} />
                  <span>Bookings</span>
                </Link>

                <Link
                  to="/admin/alerts"
                  onClick={() => navigate("/admin/alerts")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/admin/alerts") ? "active" : ""}`}
                >
                  <FaTriangleExclamation size={15} />
                  <span>Alerts</span>
                </Link>

                {/* Farmer Portal Switcher for Admin */}
                <Link
                  to="/"
                  onClick={() => navigate("/")}
                  className={`nav-link agri-nav-link ${pathname === "/" ? "active" : ""}`}
                  title="Switch to Farmer Portal view"
                >
                  <FaHouse size={15} />
                  <span>Farmer Portal</span>
                </Link>
              </>
            ) : (
              // Authenticated Farmer Navigation
              <>
                <Link
                  to="/"
                  onClick={() => navigate("/")}
                  className={`nav-link agri-nav-link ${pathname === "/" ? "active" : ""}`}
                >
                  <span>Home</span>
                </Link>

                <Link
                  to="/farms"
                  onClick={() => navigate("/farms")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/farms") ? "active" : ""}`}
                >
                  <FaTractor size={15} />
                  <span>Farms</span>
                </Link>

                <Link
                  to="/crop-info"
                  onClick={() => navigate("/crop-info")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/crop-info") ? "active" : ""}`}
                >
                  <FaBookOpen size={15} />
                  <span>Crop Info</span>
                </Link>

                <Link
                  to="/weather"
                  onClick={() => navigate("/weather")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/weather") ? "active" : ""}`}
                >
                  <FaCloudSun size={15} />
                  <span>Weather</span>
                </Link>

                <Link
                  to="/products"
                  onClick={() => navigate("/products")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/products") ? "active" : ""}`}
                >
                  <FaBasketShopping size={15} />
                  <span>Buy Resources</span>
                </Link>

                <Link
                  to="/my-bookings"
                  onClick={() => navigate("/my-bookings")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/my-bookings") ? "active" : ""}`}
                >
                  <FaBoxesPacking size={15} />
                  <span>My Bookings</span>
                </Link>

                <Link
                  to="/my-alerts"
                  onClick={() => navigate("/my-alerts")}
                  className={`nav-link agri-nav-link ${pathname.startsWith("/my-alerts") ? "active" : ""}`}
                >
                  <FaTriangleExclamation size={15} />
                  <span>Alerts</span>
                </Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-lg-center gap-2 mt-3 mt-lg-0">
            {!user ? (
              <div className="d-flex align-items-center gap-2">
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-success"
                  size="sm"
                  className="px-3"
                >
                  <FaRightToBracket className="me-1" /> Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="success"
                  size="sm"
                  className="px-3 shadow-sm"
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <div
                  className={`d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill ${
                    isAdmin
                      ? "bg-secondary bg-opacity-25 text-white"
                      : "bg-light border text-dark"
                  }`}
                  style={{ fontSize: "0.86rem" }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: isAdmin ? "#ef4444" : "#10b981",
                      color: "#fff",
                    }}
                  >
                    <FaUser size={12} />
                  </div>
                  <span className="fw-semibold">{user.name}</span>
                </div>

                <Button
                  as={Link}
                  to="/profile"
                  variant={isAdmin ? "outline-light" : "outline-success"}
                  size="sm"
                  className="d-inline-flex align-items-center gap-1 px-3"
                  title="Edit Profile"
                >
                  <FaUserPen size={14} />
                  <span>Profile</span>
                </Button>

                <Button
                  variant={isAdmin ? "outline-light" : "outline-danger"}
                  size="sm"
                  onClick={handleLogout}
                  className="d-inline-flex align-items-center gap-1 px-3"
                >
                  <FaArrowRightFromBracket size={14} />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
