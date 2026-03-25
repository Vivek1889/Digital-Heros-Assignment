import express from "express";
import {
  getAllUsers,
  getAllWinners,
  markAsPaid,
} from "../controllers/adminController.js";

import { verifyAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { runDraw } from "../controllers/drawController.js";

const router = express.Router();

// 👥 Users
router.get("/users", verifyAuth, isAdmin, getAllUsers);

// 🏆 Winners
router.get("/winners", verifyAuth, isAdmin, getAllWinners);

// 💰 Mark payout
router.put("/winners/:id/pay", verifyAuth, isAdmin, markAsPaid);

// 🎯 Run Draw (admin only)
router.post("/run-draw", verifyAuth, isAdmin, runDraw);

export default router;
