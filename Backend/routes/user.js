import express from "express";
import { register, login, getUsers } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", protect, adminOnly, getUsers);

export default router;
