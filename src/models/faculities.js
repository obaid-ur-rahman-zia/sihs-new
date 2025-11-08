import mongoose from "mongoose";

const faculitiesSchema = new mongoose.Schema({
  name: String,
  dept: String,
  designation: String,
  imageUrl: String,
});

const Faculities = mongoose.model("Faculities", faculitiesSchema);
export default Faculities;
