// ==========================
// Required Packages
// ==========================
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

// ==========================
// Helper Functions
// ==========================
function readFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error(`Error reading ${fileName}:`, err);
      return [];
    }
  }
  return [];
}

function writeFile(fileName, data) {
  const filePath = path.join(__dirname, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Error writing ${fileName}:`, err);
  }
}

// ==========================
// Public Form Submission Routes
// ==========================
app.post("/mentor", (req, res) => {
  try {
    const mentors = readFile("mentors.json");
    mentors.push(req.body);
    writeFile("mentors.json", mentors);
    res.status(200).json({ message: "Mentor registration saved ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving mentor data" });
  }
});

app.post("/investor", (req, res) => {
  try {
    const investors = readFile("investors.json");
    investors.push(req.body);
    writeFile("investors.json", investors);
    res.status(200).json({ message: "Investor application saved ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving investor data" });
  }
});

app.post("/founder", (req, res) => {
  try {
    const founders = readFile("founders.json");
    founders.push(req.body);
    writeFile("founders.json", founders);
    res.status(200).json({ message: "Founder idea saved ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving founder data" });
  }
});

// ==========================
// Admin Panel Routes
// ==========================
// Get all submissions
app.get("/mentors", (req, res) => res.json(readFile("mentors.json")));
app.get("/investors", (req, res) => res.json(readFile("investors.json")));
app.get("/founders", (req, res) => res.json(readFile("founders.json")));

// Update entire list (used for edit/delete from admin dashboard)
app.post("/mentors", (req, res) => {
  try {
    writeFile("mentors.json", req.body);
    res.json({ message: "Mentors updated ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating mentors" });
  }
});

app.post("/investors", (req, res) => {
  try {
    writeFile("investors.json", req.body);
    res.json({ message: "Investors updated ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating investors" });
  }
});

app.post("/founders", (req, res) => {
  try {
    writeFile("founders.json", req.body);
    res.json({ message: "Founders updated ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating founders" });
  }
});

// ==========================
// Home Route
// ==========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
