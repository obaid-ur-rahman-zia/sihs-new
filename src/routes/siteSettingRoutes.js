import express from "express";
import multer from "multer";
import path from "path";
import SiteSettings from "../models/siteSettings.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/logos"),
  filename: (req, file, cb) => {
    cb(null, `logo-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) cb(null, true);
    else cb(new Error("Only image files allowed"));
  },
});

router.get("/", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch site settings" });
  }
});

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    let settings = await SiteSettings.findOne() || new SiteSettings();

    const {
      theme,
      address,
      phone,
      whatsapp,
      email,
      mapEmbedUrl,
      socialLinks,
      openingHours,
    } = req.body;

    if (theme) settings.theme = theme;
    if (address) settings.address = address;
    if (phone) settings.phone = phone;
    if (whatsapp) settings.whatsapp = whatsapp;
    if (email) settings.email = email;
    if (mapEmbedUrl) settings.mapEmbedUrl = mapEmbedUrl;

    if (socialLinks) {
      settings.socialLinks = typeof socialLinks === "string" ? JSON.parse(socialLinks) : socialLinks;
    }
    if (openingHours) {
      settings.openingHours = typeof openingHours === "string" ? JSON.parse(openingHours) : openingHours;
    }

    if (req.file) {
      settings.logoUrl = `/uploads/logos/${req.file.filename}`;
    }

    await settings.save();

    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update site settings" });
  }
});

export default router;
