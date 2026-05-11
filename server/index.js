import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import requestRoutes from "./routes/requests.js";
import donationRoutes from "./routes/donations.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();


const allowedOrigins = ["http://localhost:5173"];

const app = express();
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/amount', donationRoutes);
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server listening on', PORT));
  })
  .catch(err => console.error(err));
