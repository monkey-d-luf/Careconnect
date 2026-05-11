// controllers/adminController.js
import User from "../models/User.js";
import Donation from "../models/Donation.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "donor" });
    const totalOrganizations = await User.countDocuments({ role: "organization" });
    const totalDonations = await Donation.countDocuments();

    res.json({ totalUsers, totalOrganizations, totalDonations });
  } catch (error) {
    console.error("Error fetching admin summary:", error);
    res.status(500).json({ message: "Server error fetching dashboard summary" });
  }
};
