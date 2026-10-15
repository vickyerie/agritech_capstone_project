import express from "express";
import {
  createAlert, getAlertsByCrop, getMyAlerts, resolveAlert, deleteAlert, getAllAlerts, updateAlert,
} from "../controllers/alertController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/all", adminOnly, getAllAlerts);
router.get("/my", getMyAlerts);
router.get("/crop/:cropId", getAlertsByCrop);
router.post("/", adminOnly, createAlert);
router.put("/:id/resolve", resolveAlert);
router.put("/:id", adminOnly, updateAlert);
router.delete("/:id", adminOnly, deleteAlert);

export default router;
