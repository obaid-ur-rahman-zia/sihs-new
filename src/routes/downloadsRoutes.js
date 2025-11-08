import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Downloads from "../models/downloads.js";

const router = express.Router();

// Ensure uploads/downloads directory exists
const uploadsDir = path.join("uploads", "downloads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Upload new download
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = `/uploads/downloads/${req.file.filename}`;

    const newDownload = new Downloads({ title, description, fileUrl });
    await newDownload.save();
    res.status(201).json(newDownload);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Get all downloads
router.get("/", async (req, res) => {
  try {
    const downloads = await Downloads.find().sort({ createdAt: -1 });
    res.json(downloads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch downloads" });
  }
});

// Delete a download
router.delete("/:id", async (req, res) => {
  try {
    const download = await Downloads.findById(req.params.id);
    if (!download) return res.status(404).json({ error: "File not found" });

    const filePath = path.join(process.cwd(), download.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Downloads.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete file" });
  }
});

export default router;
