require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Homepage = Login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "login.html"));
});

app.listen(3000, () => {
  console.log("🚀 Server on http://localhost:3000");
});
