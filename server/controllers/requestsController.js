const Request = require("../models/Request");

exports.createRequest = async (req, res) => {
  try {
    const payload = req.body;
    // note: req.user can be used to set createdBy if protected
    const reqDoc = await Request.create(payload);
    res.json(reqDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listRequests = async (req, res) => {
  try {
    const items = await Request.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const item = await Request.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
