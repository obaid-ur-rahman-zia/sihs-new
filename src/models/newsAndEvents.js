import mongoose from "mongoose";

const newsAndEventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  imageUrl: String,
  facebookEmbedUrl: { type: String, default: "" },
}, { timestamps: true });

const NewsEvents = mongoose.model("NewsEvents", newsAndEventsSchema);
export default NewsEvents;
