import express from "express";
import { getCropInfoList, getCropInfo } from "../controllers/cropInfoController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getCropInfoList);
router.get("/:id", getCropInfo);

export default router;
