import express from "express";
import multer from "multer";
import path from "path";
import Notifications from "../models/notification.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/notifications"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, message, date } = req.body;
    const imageUrl = req.file ? `/uploads/notifications/${req.file.filename}` : null;

    const notification = new Notifications({ title, message, date, imageUrl });
    const saved = await notification.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
});

router.get("/", async (req, res) => {
  try {
    const notifications = await Notifications.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Notifications.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Notification not found" });
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

export default router;
