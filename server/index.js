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
import charityRouter from "./routes/charityRouter.js"; // ✅ fixed spelling

dotenv.config();

const app = express();

// ✅ CORS FIX (IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://digital-heros-assignment-fawn.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// ✅ handle ALL preflight requests
app.options("*", cors());

// ✅ middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ DEBUG middleware (very useful)
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/charity", charityRouter);

// ✅ test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ❌ global error handler
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// ✅ start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
