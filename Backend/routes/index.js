import express from "express";
import userRoutes from "./user.js";
import farmRoutes from "./farm.js";
import cropRoutes from "./crop.js";
import productRoutes from "./product.js";
import bookingRoutes from "./booking.js";
import adminRoutes from "./admin.js";
import cropInfoRoutes from "./cropInfo.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/farms", farmRoutes);
router.use("/crops", cropRoutes);
router.use("/products", productRoutes);
router.use("/bookings", bookingRoutes);
router.use("/admin", adminRoutes);
router.use("/crop-info", cropInfoRoutes);

export default router;
