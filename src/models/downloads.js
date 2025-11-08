import mongoose from "mongoose";

const downloadsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fileUrl: { type: String, required: true },
}, { timestamps: true });

const Downloads = mongoose.model("Downloads", downloadsSchema);
export default Downloads;
