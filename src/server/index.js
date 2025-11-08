import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import authRoutes from "../routes/authRoutes.js";
import downloadsRoutes from "../routes/downloadsRoutes.js";
import newsEventsRoutes from "../routes/newsEventsRoutes.js";
import notificationRoutes from "../routes/notificationRoutes.js";
import researchRoutes from "../routes/researchRoutes.js";
import siteSettingRoutes from "../routes/siteSettingRoutes.js";
import sliderRoutes from "../routes/sliderRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse JSON and urlencoded with size limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Enable CORS for all origins - consider limiting origins in production
app.use(cors({ origin: "*" }));

// Serve uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../../build");
  if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(clientBuildPath, "index.html"));
    });
  }
}

// Ensure uploads directories exist, create if missing
const uploadDirs = [
  path.join(__dirname, "../uploads/events"),
  path.join(__dirname, "../uploads/downloads"),
  path.join(__dirname, "../uploads/notifications"),
  path.join(__dirname, "../uploads/research"),
  path.join(__dirname, "../uploads/logos"),
];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://mzeeshanmalik130_db_user:pKV96Ezq7NZXSKKs@cluster0.hjjvwmc.mongodb.net/?appName=Cluster0"
, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // You can add more options here as needed
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mount API routes with consistent base paths
app.use("/api/auth", authRoutes);
app.use("/api/downloads", downloadsRoutes);
app.use("/api/events", newsEventsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/site-settings", siteSettingRoutes);
app.use("/api/slider", sliderRoutes);

// Generic 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Centralized error handler (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
