import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Table, Button, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import {
  FaLeaf,
  FaPlus,
  FaArrowLeft,
  FaPenToSquare,
  FaTrashCan,
  FaCalendarDays,
  FaBoxesStacked,
  FaTractor,
} from "react-icons/fa6";
import { getCropsByFarm, deleteCrop } from "../../api/cropApi";
import { getFarmById } from "../../api/farmApi";

export default function CropList() {
  const { farmId } = useParams();
  const [farm, setFarm] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [farmData, cropData] = await Promise.all([
        getFarmById(farmId),
        getCropsByFarm(farmId),
      ]);
      setFarm(farmData);
      setCrops(cropData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load crop records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crop cycle?")) return;
    try {
      await deleteCrop(id);
      setCrops((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete crop record.");
    }
  };

  const totalQuantity = crops.reduce((acc, c) => acc + (Number(c.quantity) || 0), 0);

  return (
    <Container fluid className="page-container py-4">
      {/* Back Link */}
      <div className="mb-3">
        <Link
          to="/farms"
          className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1"
        >
          <FaArrowLeft size={12} />
          <span>Back to Farms List</span>
        </Link>
      </div>

      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h2 className="agri-page-title mb-0 d-flex align-items-center gap-2">
              <FaLeaf className="text-success" /> Crops Management
            </h2>
            {farm && <span className="badge badge-soft-success">{farm.name}</span>}
          </div>
          <p className="agri-page-subtitle">
            Track planting dates, harvest estimations, and variety quantities for this farm
          </p>
        </div>

        <Button
          as={Link}
          to={`/farms/${farmId}/crops/new`}
          variant="success"
          className="d-flex align-items-center gap-2 px-3 py-2 fw-semibold shadow-sm mt-3 mt-sm-0"
        >
          <FaPlus size={14} />
          <span>Add New Crop</span>
        </Button>
      </div>

      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {/* KPI Cards */}
      <Row className="g-3 mb-4">
        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-emerald">
                <FaLeaf size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Crops in Cycle</div>
                <div className="fs-4 fw-bold text-dark">{crops.length} Plantings</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-amber">
                <FaBoxesStacked size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Total Quantity Logged</div>
                <div className="fs-4 fw-bold text-dark">{totalQuantity} Units</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="agri-card p-3 border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <div className="agri-icon-box agri-icon-sky">
                <FaTractor size={20} />
              </div>
              <div>
                <div className="text-muted small fw-semibold">Associated Farm</div>
                <div className="fs-5 fw-bold text-dark text-truncate">{farm?.name || "..."}</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Table Section */}
      <div className="agri-table-wrapper p-3 p-md-4">
        <h5 className="fw-bold text-dark mb-3">Planted Crops Register</h5>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <div className="text-muted small mt-2">Loading crop data...</div>
          </div>
        ) : crops.length === 0 ? (
          <div className="text-center py-5">
            <div className="agri-icon-box agri-icon-emerald mx-auto mb-3" style={{ width: 64, height: 64 }}>
              <FaLeaf size={28} />
            </div>
            <h5 className="fw-bold text-dark mb-1">No Crops Planted Yet</h5>
            <p className="text-muted small mb-4">
              Add your first crop planting record to log sowing and harvest timelines.
            </p>
            <Button as={Link} to={`/farms/${farmId}/crops/new`} variant="success" size="sm" className="px-4">
              Add First Crop
            </Button>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Crop Name</th>
                  <th>Variety</th>
                  <th>Quantity</th>
                  <th>Planted Date</th>
                  <th>Estimated Harvest</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {crops.map((crop, idx) => (
                  <tr key={crop._id}>
                    <td className="text-muted small fw-semibold">{idx + 1}</td>
                    <td>
                      <div className="fw-bold text-dark">{crop.name}</div>
                    </td>
                    <td>
                      <span className="badge badge-soft-info">{crop.variety || "Standard"}</span>
                    </td>
                    <td>
                      <span className="fw-semibold text-secondary">{crop.quantity}</span>
                    </td>
                    <td className="text-muted small">
                      <div className="d-flex align-items-center gap-1">
                        <FaCalendarDays size={12} className="text-muted" />
                        <span>
                          {crop.plantedDate
                            ? new Date(crop.plantedDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="text-muted small">
                      <div className="d-flex align-items-center gap-1">
                        <FaCalendarDays size={12} className="text-success" />
                        <span>
                          {crop.harvestDate
                            ? new Date(crop.harvestDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Ongoing"}
                        </span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <Button
                          as={Link}
                          to={`/farms/${farmId}/crops/edit/${crop._id}`}
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
                          onClick={() => handleDelete(crop._id)}
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
