import express from "express";
import {
  createSubscription,
  getSubscriptionStatus,
  cancelSubscription,
} from "../controllers/subscriptionController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyAuth, createSubscription);
router.get("/status", verifyAuth, getSubscriptionStatus);
router.post("/cancel", verifyAuth, cancelSubscription);

export default router;
