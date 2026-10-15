import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  Modal,
  Badge,
} from "react-bootstrap";
import {
  FaBasketShopping,
  FaTag,
  FaCheck,
  FaMinus,
  FaPlus,
  FaShieldHalved,
  FaTruckFast,
  FaSeedling,
} from "react-icons/fa6";
import { getProducts } from "../../api/productApi";
import { createBooking } from "../../api/bookingApi";

const CATEGORIES = [
  { key: "", label: "All Catalog" },
  { key: "seed", label: "Seeds" },
  { key: "fertilizer", label: "Fertilizers" },
  { key: "pesticide", label: "Crop Protection" },
  { key: "equipment", label: "Farm Equipment" },
];

const DEFAULT_PRODUCT_IMAGES = {
  seed: "https://images.unsplash.com/photo-1599580468600-47fa364c6db2?auto=format&fit=crop&w=600&q=80",
  fertilizer: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80",
  pesticide: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80",
  equipment: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80",
  default: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80",
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buying, setBuying] = useState(false);

  const loadProducts = async (cat) => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts(cat || undefined);
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load product catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const openBuyModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowModal(true);
    setSuccess("");
    setError("");
  };

  const handleBuy = async () => {
    setBuying(true);
    setError("");
    try {
      await createBooking({ product: selectedProduct._id, quantity });
      setSuccess(`Successfully ordered ${quantity}x ${selectedProduct.name}! Track in My Bookings.`);
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setBuying(false);
    }
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Container fluid className="page-container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="agri-page-title d-flex align-items-center gap-2">
            <FaBasketShopping className="text-success" /> Agricultural Marketplace
          </h2>
          <p className="agri-page-subtitle">
            Procure verified quality seeds, organic fertilizers, pesticides, and mechanical equipment
          </p>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.key}
            variant={category === cat.key ? "success" : "outline-secondary"}
            size="sm"
            onClick={() => setCategory(cat.key)}
            className="px-3 py-2 rounded-pill fw-semibold"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
      {success && <Alert variant="success" className="py-2 small">{success}</Alert>}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <div className="text-muted small mt-2">Loading marketplace inventory...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-5">
          <div className="agri-icon-box agri-icon-amber mx-auto mb-3" style={{ width: 64, height: 64 }}>
            <FaBasketShopping size={28} />
          </div>
          <h5 className="fw-bold text-dark mb-1">No Products in This Category</h5>
          <p className="text-muted small">Please choose another category or check back soon.</p>
        </div>
      ) : (
        <Row className="g-4">
          {products.map((product) => {
            const imgSrc =
              product.imageUrl ||
              DEFAULT_PRODUCT_IMAGES[product.category] ||
              DEFAULT_PRODUCT_IMAGES.default;

            return (
              <Col key={product._id} xs={12} sm={6} lg={4}>
                <Card className="h-100 agri-card agri-card-hover border-0 shadow-sm d-flex flex-column">
                  <div className="position-relative agri-overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={product.name}
                      style={{ height: 200, width: "100%", objectFit: "cover" }}
                    />
                    <span className="position-absolute top-0 end-0 m-3 badge badge-soft-success text-capitalize shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  <Card.Body className="d-flex flex-column p-4">
                    <h5 className="fw-bold text-dark mb-1">{product.name}</h5>
                    <p className="text-muted small mb-3 flex-grow-1" style={{ minHeight: "40px" }}>
                      {product.description || "Certified agricultural resource vetted for field performance."}
                    </p>

                    <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-muted small" style={{ fontSize: "0.75rem" }}>Unit Price</div>
                        <div className="fw-extrabold fs-5 text-success">
                          Rp{product.price.toLocaleString("id-ID")}
                        </div>
                      </div>

                      <Button
                        variant="success"
                        size="sm"
                        className="px-3 py-2 fw-semibold d-flex align-items-center gap-1 shadow-sm"
                        onClick={() => openBuyModal(product)}
                      >
                        <FaBasketShopping size={13} />
                        <span>Order Now</span>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Checkout Modal (Matching PDF Page 26) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="fw-bold fs-5 text-dark d-flex align-items-center gap-2">
            <FaBasketShopping className="text-success" />
            <span>Complete Resource Booking</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {selectedProduct && (
            <div>
              <div className="d-flex gap-3 align-items-center mb-3 p-3 bg-light rounded-3">
                <img
                  src={
                    selectedProduct.imageUrl ||
                    DEFAULT_PRODUCT_IMAGES[selectedProduct.category] ||
                    DEFAULT_PRODUCT_IMAGES.default
                  }
                  alt={selectedProduct.name}
                  style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 10 }}
                />
                <div>
                  <h6 className="fw-bold text-dark mb-1">{selectedProduct.name}</h6>
                  <span className="badge badge-soft-success text-capitalize small">
                    {selectedProduct.category}
                  </span>
                  <div className="text-muted small mt-1">
                    Rp{selectedProduct.price.toLocaleString("id-ID")} / unit
                  </div>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mb-4">
                <Form.Label className="small fw-semibold text-secondary">
                  Specify Quantity
                </Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={decrementQty}
                    disabled={quantity <= 1}
                    className="px-3"
                  >
                    <FaMinus size={12} />
                  </Button>
                  <Form.Control
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="text-center fw-bold"
                    style={{ maxWidth: "100px" }}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={incrementQty}
                    className="px-3"
                  >
                    <FaPlus size={12} />
                  </Button>
                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="p-3 rounded-3 border bg-white mb-2 small">
                <div className="d-flex justify-content-between mb-2 text-secondary">
                  <span>Subtotal ({quantity} items)</span>
                  <span>Rp{(selectedProduct.price * quantity).toLocaleString("id-ID")}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 text-secondary">
                  <span>Dispatch & Inspection Fee</span>
                  <span className="text-success fw-semibold">Free (Direct Subsidy)</span>
                </div>
                <div className="d-flex justify-content-between pt-2 border-top fw-bold text-dark fs-6">
                  <span>Total Amount</span>
                  <span className="text-success">
                    Rp{(selectedProduct.price * quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 text-muted small mt-3">
                <FaTruckFast className="text-success" />
                <span>Dispatches directly to registered farm coordinates</span>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="border-top">
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleBuy}
            disabled={buying}
            className="px-4 fw-semibold"
          >
            {buying ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                <span>Confirming Order...</span>
              </>
            ) : (
              <span>Confirm Order</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
