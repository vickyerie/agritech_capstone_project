import User from "../db/models/User.js";
import Farm from "../db/models/Farm.js";
import Product from "../db/models/Product.js";
import Booking from "../db/models/Booking.js";

// Admin dashboard: ringkasan jumlah data
export const getDashboardStats = async (req, res) => {
  try {
    const [users, farms, products, bookings, recentUsers, recentProducts] = await Promise.all([
      User.countDocuments(),
      Farm.countDocuments(),
      Product.countDocuments(),
      Booking.countDocuments(),
      User.find().select("name email").sort({ createdAt: -1 }).limit(5),
      Product.find().select("name category").sort({ createdAt: -1 }).limit(5),
    ]);
    res.json({ totals: { users, farms, products, bookings }, recentUsers, recentProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
