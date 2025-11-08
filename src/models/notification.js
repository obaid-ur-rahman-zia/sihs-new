import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: String,
}, { timestamps: true });

const Notifications = mongoose.model("Notifications", notificationSchema);
export default Notifications;
