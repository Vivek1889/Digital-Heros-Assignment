import express from "express";
import {
  addScore,
  getScores,
  deleteScore,
} from "../controllers/scoreController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyAuth, addScore);
router.get("/get", verifyAuth, getScores);
router.delete("/delete/:id", verifyAuth, deleteScore);

export default router;
