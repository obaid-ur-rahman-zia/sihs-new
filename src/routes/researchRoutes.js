import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Research from "../models/research.js";

const router = express.Router();

const uploadPath = "uploads/research";
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const fileUrl = req.file ? `/uploads/research/${req.file.filename}` : "";

    const newResearch = new Research({ title, description, date, fileUrl });
    const saved = await newResearch.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to save research" });
  }
});

router.get("/", async (req, res) => {
  try {
    const researchList = await Research.find().sort({ createdAt: -1 });
    res.status(200).json(researchList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch research" });
  }
});

router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const fileUrl = req.file ? `/uploads/research/${req.file.filename}` : req.body.fileUrl;

    const updated = await Research.findByIdAndUpdate(
      req.params.id,
      { title, description, date, fileUrl },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update research" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Research.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Research deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete research" });
  }
});

export default router;
