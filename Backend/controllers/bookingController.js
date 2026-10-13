import Booking from "../db/models/Booking.js";
import Product from "../db/models/Product.js";

// Farmer: create booking (total dihitung di server, bukan dari client)
export const createBooking = async (req, res) => {
  try {
    const { product: productId, quantity } = req.body;
    const qty = Number(quantity) || 1;
    if (qty < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const booking = await Booking.create({
      user: req.user.id,
      product: product._id,
      quantity: qty,
      totalAmount: product.price * qty,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Farmer: my bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("product", "name category price")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("product", "name category price")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: update status (pending / on the way / delivered)
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
