const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const videoRoutes = require('./routes/videoRoute');
const userRoutes = require('./routes/UserRoute');  // 🔧 Correct casing (userRoute, not UserRoute)

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// ✅ CORS config for your frontend
app.use(cors({
  origin: ['https://veloura-client.onrender.com'],  // Your frontend URL (client, not backend/server)
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ File uploads config
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/'
}));

// ✅ API Routes
app.use('/api/video', videoRoutes);
app.use('/api/user', userRoutes);

// ✅ MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.log('❌ MongoDB connection error:', err));

// ✅ Health Check Route
app.get('/', (req, res) => {
    res.send('Welcome to Veloura API 🚀');
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
