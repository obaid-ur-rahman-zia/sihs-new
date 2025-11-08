import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
  logoUrl: { type: String, default: "/images/logo.png" },
  theme: { type: String, default: "default" },
  address: { type: String, default: "117-C Zafar Ullah Road Satellite Town Sargodha, Punjab, Pakistan" },
  phone: { type: String, default: "(048) 3252717" },
  whatsapp: { type: String, default: "03200827294" },
  email: { type: String, default: "sihs.edu.pk@gmail.com" },
  mapEmbedUrl: { type: String, default: "https://www.google.com/maps/embed?pb=..." },
  socialLinks: {
    facebook: { type: String, default: "https://www.facebook.com/SIHSsargodha" },
    instagram: { type: String, default: "https://www.instagram.com/sihs.sargodha" },
    linkedin: { type: String, default: "#" },
  },
  openingHours: {
    mondayFriday: { type: String, default: "9:00 AM - 5:00 PM" },
    saturday: { type: String, default: "9:00 AM - 1:00 PM" },
    sunday: { type: String, default: "Closed" },
  },
}, { timestamps: true });

export default mongoose.model("SiteSettings", siteSettingsSchema);
