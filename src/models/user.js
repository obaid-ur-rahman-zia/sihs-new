import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  enrollmentNumber: { type: String, unique: true, sparse: true },
  department: { type: String, enum: ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Economics", "Other"] },
  year: Number,
  contact: {
    phone: String,
    address: String,
  },
  profileImage: { type: String, default: "" },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
