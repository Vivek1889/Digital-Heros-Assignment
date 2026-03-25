import express from "express";
import {
  runDraw,
  getDrawResult,
  getWinners,
} from "../controllers/drawController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin only ideally
router.post("/rundraw", verifyAuth, runDraw);

// Public/User
router.get("/result", verifyAuth, getDrawResult);
router.get("/winners", verifyAuth, getWinners);

export default router;
