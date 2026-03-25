import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import charrityRouter from "./routes/charityRouter.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/charity", charrityRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
