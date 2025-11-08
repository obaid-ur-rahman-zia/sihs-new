import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  fileUrl: { type: String, default: "" },
}, { timestamps: true });

const Research = mongoose.model("Research", researchSchema);
export default Research;
