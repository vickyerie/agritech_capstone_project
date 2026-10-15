import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Spinner,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaBasketShopping,
  FaPlus,
  FaPenToSquare,
  FaTrashCan,
  FaTag,
  FaDollarSign,
  FaImage,
  FaCheck,
} from "react-icons/fa6";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

const emptyForm = {
  name: "",
  category: "seed",
  price: "",
  description: "",
  imageUrl: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load marketplace inventory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || "",
      imageUrl: product.imageUrl || "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const payload = { ...formData, price: Number(formData.price) };
    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setShowModal(false);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to persist product record.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this product from the marketplace?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <Container fluid className="page-container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="agri-page-title d-flex align-items-center gap-2">
            <FaBasketShopping className="text-success" /> Marketplace Inventory
          </h2>
          <p className="agri-page-subtitle">
            Catalog management for seeds, fertilizers, crop protection chemicals, and agricultural machinery
          </p>
        </div>

        <Button
          variant="success"
          onClick={openCreateModal}
          className="d-flex align-items-center gap-2 px-3 py-2 fw-semibold shadow-sm mt-3 mt-sm-0"
        >
          <FaPlus size={14} />
          <span>Add New Product</span>
        </Button>
      </div>

      {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

      <div className="agri-table-wrapper p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-dark mb-0">Active Product Catalog</h5>
          <span className="badge badge-soft-success">{products.length} Products</span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <div className="text-muted small mt-2">Loading marketplace records...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5">
            <div className="agri-icon-box agri-icon-amber mx-auto mb-3" style={{ width: 64, height: 64 }}>
              <FaBasketShopping size={28} />
            </div>
            <h5 className="fw-bold text-dark mb-1">Catalog is Empty</h5>
            <p className="text-muted small mb-3">Add your first agricultural product listing.</p>
            <Button variant="success" size="sm" onClick={openCreateModal}>
              Create Product
            </Button>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Unit Price</th>
                  <th>Description Preview</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr key={p._id}>
                    <td className="text-muted small fw-semibold">{idx + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {p.imageUrl ? (
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            style={{
                              width: 44,
                              height: 44,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                        ) : (
                          <div
                            className="bg-light border rounded d-flex align-items-center justify-content-center text-muted"
                            style={{ width: 44, height: 44 }}
                          >
                            <FaImage size={16} />
                          </div>
                        )}
                        <div>
                          <div className="fw-bold text-dark">{p.name}</div>
                          <div className="text-muted small font-monospace">
                            #{p._id.slice(-6).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-soft-info text-capitalize">
                        {p.category}
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold text-success">
                        Rp{p.price.toLocaleString("id-ID")}
                      </span>
                    </td>
                    <td>
                      <div
                        className="text-muted small text-truncate"
                        style={{ maxWidth: "260px" }}
                      >
                        {p.description || "-"}
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() => openEditModal(p)}
                        >
                          <FaPenToSquare size={12} />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(p._id)}
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

      {/* Add / Edit Product Modal (Matching PDF Page 30) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="fw-bold fs-5 text-dark d-flex align-items-center gap-2">
            <FaBasketShopping className="text-success" />
            <span>{editingId ? "Update Product Details" : "Add New Agricultural Product"}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Product Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="name"
                placeholder="e.g., Organic Wheat Flour, NPK 16-16-16 Fertilizer"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-secondary">
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="seed">Seed</option>
                    <option value="fertilizer">Fertilizer</option>
                    <option value="pesticide">Pesticide / Protection</option>
                    <option value="equipment">Farm Equipment</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-secondary">
                    Price in IDR (Rp) <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="e.g., 150000"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Description & Benefits
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe product specifications, application rates, or agronomic certifications"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-semibold text-secondary">
                Image URL (Optional)
              </Form.Label>
              <Form.Control
                placeholder="https://images.unsplash.com/photo-..."
                name="imageUrl"
                value={formData.imageUrl}
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
            disabled={saving || !formData.name || !formData.price}
            className="px-4 fw-semibold"
          >
            {saving ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                <span>Saving Product...</span>
              </>
            ) : (
              <span>{editingId ? "Update Product" : "Publish Product"}</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
