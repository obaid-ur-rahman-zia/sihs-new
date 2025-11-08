import mongoose from "mongoose";

const sliderSettingsSchema = new mongoose.Schema({
  slides: [{ url: { type: String, required: true } }],
});

const SliderSettings = mongoose.model("SliderSettings", sliderSettingsSchema);
export default SliderSettings;
