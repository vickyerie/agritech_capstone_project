import express from "express";
import userRoutes from "./user.js";
import farmRoutes from "./farm.js";
import cropRoutes from "./crop.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/farms", farmRoutes);
router.use("/crops", cropRoutes);

export default router;
