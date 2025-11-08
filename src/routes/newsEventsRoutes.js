import express from "express";
import multer from "multer";
import path from "path";
import NewsEvents from "../models/newsAndEvents.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/events"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const events = await NewsEvents.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, date, description, facebookEmbedUrl } = req.body;
    const imageUrl = req.file ? `/uploads/events/${req.file.filename}` : "";

    const newEvent = new NewsEvents({ title, date, description, imageUrl, facebookEmbedUrl });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, date, description, facebookEmbedUrl } = req.body;
    const updateData = { title, date, description, facebookEmbedUrl };
    if (req.file) updateData.imageUrl = `/uploads/events/${req.file.filename}`;

    const updated = await NewsEvents.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ message: "Event updated", event: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await NewsEvents.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
