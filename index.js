const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

console.log("i am here");

//configuration

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to veloura API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
