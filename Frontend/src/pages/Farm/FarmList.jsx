import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table, Button, Alert, Spinner, Card, Row, Col, Form } from "react-bootstrap";
import {
  FaTractor,
  FaPlus,
  FaLocationDot,
  FaPenToSquare,
  FaTrashCan,
  FaChartArea,
  FaLeaf,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { getMyFarms, deleteFarm } from "../../api/farmApi";

export default function FarmList() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadFarms = async () => {
    setLoading(true);
    try {
      const data = await getMyFarms();
      setFarms(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load farm records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this farm? Associated crop records may be affected.")) return;
    try {
      await deleteFarm(id);
      setFarms((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete farm.");
    }
  };

  const filteredFarms = farms.filter((f) => {
    const q = searchTerm.toLowerCase();
    return (
      f.name?.toLowerCase().includes(q) ||
      f.location?.toLowerCase().includes(q) ||
      f.cropType?.toLowerCase().includes(q)
    );
  });

  const totalAcres = farms.reduce((acc, f) => acc + (Number(f.areaSize) || 0), 0);

  return (
    <Container fluid className="page-container py-4">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="agri-page-title d-flex align-items-center gap-2">
            <FaTractor className="text-success" /> Farms Management
          </h2>
          <p className="agri-page-subtitle">
            Configure agricultural acreage, geographic locations, and crop schedules
          </p>
        </div>
        <Button
          as={Link}
          to="/farms/new"
          variant="success"
          className="d-flex align-items-center gap-2 px-3 py-2 fw-semibold shadow-sm mt-3 mt-sm-0"
        >
          <FaPlus size={14} />
          <span>Add New Farm</span>
        </Button>
      </div>

      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {/* KPI Stats Strip */}
      <Row className="g-3 mb-4">
        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-emerald">
                <FaTractor size={22} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Total Registered Farms</div>
                <div className="fs-4 fw-bold text-dark">{farms.length}</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-sky">
                <FaChartArea size={22} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Total Managed Land</div>
                <div className="fs-4 fw-bold text-dark">{totalAcres.toFixed(1)} Acres</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-amber">
                <FaLeaf size={22} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Active Monitoring</div>
                <div className="fs-4 fw-bold text-dark">Full Coverage</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Content Area */}
      <div className="agri-table-wrapper p-3 p-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <h5 className="fw-bold text-dark mb-0">Registered Farms Directory</h5>
          <div className="position-relative" style={{ maxWidth: "300px", width: "100%" }}>
            <FaMagnifyingGlass
              size={13}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <Form.Control
              type="text"
              size="sm"
              placeholder="Search farm, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ps-5"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <div className="text-muted small mt-2">Loading farm records...</div>
          </div>
        ) : farms.length === 0 ? (
          <div className="text-center py-5">
            <div className="agri-icon-box agri-icon-emerald mx-auto mb-3" style={{ width: 64, height: 64 }}>
              <FaTractor size={28} />
            </div>
            <h5 className="fw-bold text-dark mb-1">No Farms Registered Yet</h5>
            <p className="text-muted small mb-4">
              Add your first agricultural farm plot to track crops and localized weather.
            </p>
            <Button as={Link} to="/farms/new" variant="success" size="sm" className="px-4">
              Register First Farm
            </Button>
          </div>
        ) : filteredFarms.length === 0 ? (
          <div className="text-center py-4 text-muted small">
            No farms match your search query "{searchTerm}".
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Farm Name</th>
                  <th>Location</th>
                  <th>Area (Acres)</th>
                  <th>Crop Type</th>
                  <th>Established</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarms.map((farm, idx) => (
                  <tr key={farm._id}>
                    <td className="text-muted small fw-semibold">{idx + 1}</td>
                    <td>
                      <div className="fw-bold text-dark">{farm.name}</div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1 text-secondary small">
                        <FaLocationDot className="text-success" size={13} />
                        <span>{farm.location}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-soft-info">{farm.areaSize} Acres</span>
                    </td>
                    <td>
                      <span className="badge badge-soft-success">{farm.cropType}</span>
                    </td>
                    <td className="text-muted small">
                      {farm.establishedDate
                        ? new Date(farm.establishedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <Button
                          as={Link}
                          to={`/farms/${farm._id}/crops`}
                          variant="outline-success"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                        >
                          <FaLeaf size={12} />
                          <span>Manage Crops</span>
                        </Button>
                        <Button
                          as={Link}
                          to={`/farms/edit/${farm._id}`}
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                        >
                          <FaPenToSquare size={12} />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(farm._id)}
                          className="d-flex align-items-center gap-1"
                        >
                          <FaTrashCan size={12} />
                        </Button>
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
