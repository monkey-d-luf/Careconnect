import express from "express";
import Donation from "../models/Donation.js";
import Request from "../models/Request.js";
const router = express.Router();

// Create donation (from donor)[ using request id for using a real api money transfer]
// router.post('/', async (req, res) => {
//   try {
//     const { requestId, donorId, amount } = req.body;
//     const donation = new Donation({ requestId, donorId, amount, status:'completed' });
//     await donation.save();

//     // Optionally update Request (not implemented complexly)
//     res.json({ success: true, donation });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

//temporary money transfer using just userid alone for demo 
router.post("/", async (req, res) => {
  try {
    const { donorId,donorName, amount } = req.body;

    if (!amount) {
      return res.status(400).json({ msg: "Donation amount required" });
    }
    const donation = new Donation({ donorId,donorName, amount });
    await donation.save();
    res.status(201).json({ msg: "Donation recorded successfully!" });
  } catch (err) {
    console.error("Donation Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;

// router.get('/', async (req, res) => {
//   const donations = await Donation.find().populate('requestId').populate('donorId');
//   res.json(donations);
// });

// module.exports = router;
