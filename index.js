<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
=======
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
>>>>>>> 861d36777ec410519b3a6e0951a594e9be7bfc65
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const fileUpload = require('express-fileupload');
const cloudinary = require('./cloudinaryConfig');
const userRoutes = require('./routes/UserRoute');

<<<<<<< HEAD
// Parse JSON FIRST
app.use(express.json());

// CORS config
app.use(cors({
    origin: true,
    credentials: true
}));

// File upload (optional)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Routes
app.use('/api/user', userRoutes);

// DB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Welcome to veloura API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
=======
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
>>>>>>> 861d36777ec410519b3a6e0951a594e9be7bfc65
});
