import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  confirmPassword: String,
});

const SignUp = mongoose.model("SignUp", signUpSchema);
export default SignUp;
