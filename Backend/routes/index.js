import express from "express";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/users", userRoutes);
// farmRoutes, cropRoutes, productRoutes, bookingRoutes akan ditambahkan di Hari 2-3

export default router;
