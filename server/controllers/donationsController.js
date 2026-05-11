const Donation = require("../models/Donation");
const Request = require("../models/Request");

exports.createDonation = async (req, res) => {
  try {
    // body should include donor, requestId, amount, paymentReference (if any)
    const { donor, requestId, amount, paymentReference } = req.body;
    if (!amount || !requestId) return res.status(400).json({ message: "Missing fields" });

    const donation = await Donation.create({ donor, request: requestId, amount, paymentReference });

    // update request amountRaised
    await Request.findByIdAndUpdate(requestId, { $inc: { amountRaised: amount } });

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("donor request");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
