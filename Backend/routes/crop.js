import express from "express";
import {
  createCrop, getCropsByFarm, getCropById, updateCrop, deleteCrop, getAllCrops,
} from "../controllers/cropController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", createCrop);
router.get("/", adminOnly, getAllCrops);
router.get("/farm/:farmId", getCropsByFarm);
router.get("/:id", getCropById);
router.put("/:id", updateCrop);
router.delete("/:id", deleteCrop);

export default router;
