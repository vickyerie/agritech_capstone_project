import express from "express";
import {
  createBooking, getMyBookings, getAllBookings, updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", createBooking);
router.get("/my", getMyBookings);
router.get("/", adminOnly, getAllBookings);
router.put("/:id/status", adminOnly, updateBookingStatus);

export default router;
