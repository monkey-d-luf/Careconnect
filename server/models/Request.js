import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({
  title: String,
  description: String,
  amountNeeded: Number,
  createdByName: String,
  createdById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
const Request = mongoose.model("Request", requestSchema);

export default Request;
