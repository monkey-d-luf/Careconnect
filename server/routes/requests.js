import express from "express";
import Request from "../models/Request.js";
const router = express.Router();

// Create request (for Orphanage/Admin) - simplified, no auth middleware here
router.post('/', async (req, res) => {
  try {
    const { title, description, amountNeeded, createdByName, createdById } = req.body;
    const request = new Request({ title, description, amountNeeded, createdByName, createdById });
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all requests
router.get('/', async (req, res) => {
  try {
    const items = await Request.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
