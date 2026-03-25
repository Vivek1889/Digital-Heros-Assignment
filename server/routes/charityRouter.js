import express from "express";
import {
  getAllCharities,
  AddCharities,
  deleteCharity,
} from "../controllers/charityController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/getcharity", getAllCharities);
router.post("/addcharity", AddCharities);
router.delete("/deletecharity/:id", deleteCharity);
export default router;
