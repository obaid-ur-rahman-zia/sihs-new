import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import SliderSettings from "../models/sliderSettings.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const slider = await SliderSettings.findOne();
    res.json(slider || { slides: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/upload", upload.single("image"), (req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

router.post("/", async (req, res) => {
  try {
    const { slides } = req.body;
    let slider = await SliderSettings.findOne();
    if (slider) slider.slides = slides;
    else slider = new SliderSettings({ slides });
    await slider.save();
    res.json({ message: "Slider updated successfully", slider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
