import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
});

const Departments = mongoose.model("Departments", departmentsSchema);
export default Departments;
