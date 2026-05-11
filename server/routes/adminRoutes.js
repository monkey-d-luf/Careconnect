import express from "express";
import User from "../models/User.js";
import Donation from "../models/Donation.js";
import DonationRequest from "../models/Request.js";

const router = express.Router();

router.get("/dashboard-summary", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonations = await Donation.countDocuments();
    const totalAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRequests = await DonationRequest.countDocuments();
    const recentDonations = await Donation.find().sort({ date: -1 }).limit(5);

    res.json({
      totalUsers,
      totalDonations,
      totalAmount: totalAmount[0]?.total || 0,
      totalRequests,
      recentDonations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;