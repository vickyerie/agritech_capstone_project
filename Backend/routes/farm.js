import express from "express";
import {
  createFarm, getMyFarms, getFarmById, updateFarm, deleteFarm,
} from "../controllers/farmController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect); // semua route farm butuh login

router.post("/", createFarm);
router.get("/", getMyFarms);
router.get("/:id", getFarmById);
router.put("/:id", updateFarm);
router.delete("/:id", deleteFarm);

export default router;
