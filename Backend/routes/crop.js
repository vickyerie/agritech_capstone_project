import express from "express";
import {
  createCrop, getCropsByFarm, getCropById, updateCrop, deleteCrop,
} from "../controllers/cropController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", createCrop);
router.get("/farm/:farmId", getCropsByFarm);
router.get("/:id", getCropById);
router.put("/:id", updateCrop);
router.delete("/:id", deleteCrop);

export default router;
