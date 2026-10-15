import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaFloppyDisk,
  FaShieldHalved,
  FaCircleCheck,
  FaKey,
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, changePassword } from "../../api/userApi";

// Defined OUTSIDE UserProfile so React never remounts it on parent re-renders
function PasswordInput({ name, placeholder, value, onChange, show, onToggle }) {
  return (
    <div className="position-relative">
      <div
        className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
        style={{ pointerEvents: "none" }}
      >
        <FaLock size={14} />
      </div>
      <Form.Control
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="ps-5 pe-5"
      />
      <button
        type="button"
        className="position-absolute top-50 end-0 translate-middle-y pe-3 bg-transparent border-0 text-muted"
        onClick={onToggle}
        tabIndex={-1}
      >
        {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
      </button>
    </div>
  );
}

export default function UserProfile() {
  const { user, login: refreshUser } = useAuth();

  // ── Profile form state ──────────────────────────────────────────
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  // ── Password form state ─────────────────────────────────────────
  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");

  // ── Handlers ────────────────────────────────────────────────────
  const handleProfileChange = (e) =>
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });

  const handlePassChange = (e) =>
    setPassForm({ ...passForm, [e.target.name]: e.target.value });

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);
    try {
      const res = await updateProfile(profileForm);
      // Update localStorage user data
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      const updated = { ...stored, ...res.user };
      localStorage.setItem("user", JSON.stringify(updated));
      // Force re-read from localStorage (simple refresh of context)
      window.dispatchEvent(new Event("storage"));
      setProfileSuccess("Profile updated successfully.");
    } catch (err) {
      setProfileError(
        err.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    if (passForm.newPassword !== passForm.confirmPassword) {
      return setPassError("New passwords do not match.");
    }
    if (passForm.newPassword.length < 6) {
      return setPassError("New password must be at least 6 characters.");
    }

    setPassLoading(true);
    try {
      await changePassword({
        currentPassword: passForm.currentPassword,
        newPassword: passForm.newPassword,
      });
      setPassSuccess("Password changed successfully. Keep it safe.");
      setPassForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPassError(
        err.response?.data?.message || "Failed to change password."
      );
    } finally {
      setPassLoading(false);
    }
  };


  return (
    <Container fluid className="page-container py-4" style={{ maxWidth: 860 }}>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-3 mb-1">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
            style={{
              width: 52,
              height: 52,
              background: "linear-gradient(135deg, #059669, #10b981)",
              color: "#fff",
            }}
          >
            <FaUser size={22} />
          </div>
          <div>
            <h2 className="agri-page-title mb-0">{user?.name}</h2>
            <p className="agri-page-subtitle mb-0">{user?.email}</p>
          </div>
          <span
            className={`ms-auto badge text-uppercase ${
              user?.role === "admin" ? "badge-soft-danger" : "badge-soft-success"
            }`}
          >
            {user?.role || "farmer"}
          </span>
        </div>
      </div>

      <Row className="g-4">
        {/* ── Edit Profile ──────────────────────────────────────── */}
        <Col lg={6}>
          <Card className="agri-card border-0 shadow-sm h-100">
            <div
              className="px-4 pt-4 pb-3 border-bottom d-flex align-items-center gap-2"
            >
              <div className="agri-icon-box agri-icon-emerald" style={{ width: 38, height: 38 }}>
                <FaUser size={16} />
              </div>
              <div>
                <h5 className="fw-bold text-dark mb-0">Edit Profile</h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.82rem" }}>
                  Update your name and email address
                </p>
              </div>
            </div>

            <div className="p-4">
              {profileSuccess && (
                <Alert
                  variant="success"
                  className="py-2 px-3 small border-0 d-flex align-items-center gap-2"
                  style={{ backgroundColor: "#ecfdf5", color: "#065f46" }}
                >
                  <FaCircleCheck />
                  {profileSuccess}
                </Alert>
              )}
              {profileError && (
                <Alert variant="danger" className="py-2 px-3 small border-0">
                  {profileError}
                </Alert>
              )}

              <Form onSubmit={handleProfileSave}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    Full Name
                  </Form.Label>
                  <div className="position-relative">
                    <div
                      className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
                      style={{ pointerEvents: "none" }}
                    >
                      <FaUser size={14} />
                    </div>
                    <Form.Control
                      name="name"
                      placeholder="Your full name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      required
                      className="ps-5"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-semibold text-secondary">
                    Email Address
                  </Form.Label>
                  <div className="position-relative">
                    <div
                      className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
                      style={{ pointerEvents: "none" }}
                    >
                      <FaEnvelope size={14} />
                    </div>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      required
                      className="ps-5"
                    />
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                  disabled={profileLoading}
                  className="w-100 d-flex align-items-center justify-content-center gap-2 fw-bold py-2"
                >
                  {profileLoading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FaFloppyDisk size={14} />
                      <span>Save Profile</span>
                    </>
                  )}
                </Button>
              </Form>
            </div>
          </Card>
        </Col>

        {/* ── Change Password ───────────────────────────────────── */}
        <Col lg={6}>
          <Card className="agri-card border-0 shadow-sm h-100">
            <div
              className="px-4 pt-4 pb-3 border-bottom d-flex align-items-center gap-2"
            >
              <div className="agri-icon-box agri-icon-amber" style={{ width: 38, height: 38 }}>
                <FaKey size={16} />
              </div>
              <div>
                <h5 className="fw-bold text-dark mb-0">Change Password</h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.82rem" }}>
                  Keep your account secure with a strong password
                </p>
              </div>
            </div>

            <div className="p-4">
              {passSuccess && (
                <Alert
                  variant="success"
                  className="py-2 px-3 small border-0 d-flex align-items-center gap-2"
                  style={{ backgroundColor: "#ecfdf5", color: "#065f46" }}
                >
                  <FaCircleCheck />
                  {passSuccess}
                </Alert>
              )}
              {passError && (
                <Alert variant="danger" className="py-2 px-3 small border-0">
                  {passError}
                </Alert>
              )}

              <Form onSubmit={handlePasswordSave}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    Current Password
                  </Form.Label>
                  <PasswordInput
                    name="currentPassword"
                    placeholder="Enter current password"
                    value={passForm.currentPassword}
                    onChange={handlePassChange}
                    show={showCurrent}
                    onToggle={() => setShowCurrent((v) => !v)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-secondary">
                    New Password
                    <span className="text-muted fw-normal ms-1">(min. 6 characters)</span>
                  </Form.Label>
                  <PasswordInput
                    name="newPassword"
                    placeholder="Enter new password"
                    value={passForm.newPassword}
                    onChange={handlePassChange}
                    show={showNew}
                    onToggle={() => setShowNew((v) => !v)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-semibold text-secondary">
                    Confirm New Password
                  </Form.Label>
                  <PasswordInput
                    name="confirmPassword"
                    placeholder="Re-enter new password"
                    value={passForm.confirmPassword}
                    onChange={handlePassChange}
                    show={showConfirm}
                    onToggle={() => setShowConfirm((v) => !v)}
                  />
                  {/* Visual match indicator */}
                  {passForm.confirmPassword && (
                    <div
                      className={`mt-1 small fw-semibold d-flex align-items-center gap-1 ${
                        passForm.newPassword === passForm.confirmPassword
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {passForm.newPassword === passForm.confirmPassword ? (
                        <>
                          <FaCircleCheck size={12} />
                          <span>Passwords match</span>
                        </>
                      ) : (
                        <span>Passwords do not match</span>
                      )}
                    </div>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  variant="warning"
                  disabled={passLoading}
                  className="w-100 d-flex align-items-center justify-content-center gap-2 fw-bold py-2 text-dark"
                >
                  {passLoading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <FaShieldHalved size={14} />
                      <span>Change Password</span>
                    </>
                  )}
                </Button>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ── Account Info Footer ────────────────────────────────── */}
      <div
        className="mt-4 p-3 rounded-3 d-flex align-items-center gap-3"
        style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
      >
        <FaShieldHalved size={20} className="text-success flex-shrink-0" />
        <div className="small text-muted">
          <strong className="text-dark">Security notice:</strong> After changing your
          email, you may need to log in again with your updated credentials. Password changes
          take effect immediately on your next login.
        </div>
      </div>
    </Container>
  );
}
