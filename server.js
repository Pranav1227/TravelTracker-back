import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./Routes/authRoutes.js";
import placeRoutes from "./Routes/placeRoutes.js";
import visitRoutes from "./Routes/visitRoutes.js";
import hiddenGemRoutes from "./Routes/hiddenGemRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import badgeRoutes from "./Routes/badgeRoutes.js";
import bucketListRoutes from "./Routes/bucketListRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Connect to database
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/hidden-gems", hiddenGemRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/bucket-lists", bucketListRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});