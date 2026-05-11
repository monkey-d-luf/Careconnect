import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  phone: { type: String, required: true },
  role: { type: String, enum: ['Donor','Orphanage','Admin'], default: 'Donor' },
}, { timestamps: true });
const User = mongoose.model("User", userSchema);

export default User;
