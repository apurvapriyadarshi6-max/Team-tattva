// ==========================
// Required Packages
// ==========================
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ==========================
// Database Connection
// ==========================

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/teamtattva";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ==========================
// Schemas & Models
// ==========================

// Mentor Schema
const mentorSchema = new mongoose.Schema({
  name: String,
  email: String,
  mentor: String,
  createdAt: { type: Date, default: Date.now }
});
const Mentor = mongoose.model("Mentor", mentorSchema);

// Investor Schema
const investorSchema = new mongoose.Schema({
  name: String,
  email: String,
  startupName: String,
  ideaDescription: String,
  createdAt: { type: Date, default: Date.now }
});
const Investor = mongoose.model("Investor", investorSchema);

// Founder Schema
const founderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  ideaTitle: String,
  ideaDescription: String,
  createdAt: { type: Date, default: Date.now }
});
const Founder = mongoose.model("Founder", founderSchema);

// ==========================
// Routes
// ==========================

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Mentor Route
app.post("/mentor", async (req, res) => {
  try {
    await Mentor.create(req.body);
    res.status(200).json({ message: "Mentor registration successful ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving mentor data" });
  }
});

// Investor Route
app.post("/investor", async (req, res) => {
  try {
    await Investor.create(req.body);
    res.status(200).json({ message: "Investor application submitted ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving investor data" });
  }
});

// Founder Route
app.post("/founder", async (req, res) => {
  try {
    await Founder.create(req.body);
    res.status(200).json({ message: "Founder idea submitted ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving founder data" });
  }
});

// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
