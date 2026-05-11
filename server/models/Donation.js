import mongoose from "mongoose";
// using original donor and request id for real money transfer

// const donationSchema = new mongoose.Schema({
//   requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
//   donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   amount: Number,
//   status: { type: String, default: 'completed' } // simplified
// }, { timestamps: true });

//temporary money transfer for demo
const donationSchema = new mongoose.Schema({
  donorId: {
    type: String,
    required: false, // allow guest donations
  },
  donorName: String,
  organization: String,
  title: String,
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Donation = mongoose.model("Donation", donationSchema);

export default Donation;