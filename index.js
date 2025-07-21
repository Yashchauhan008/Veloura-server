const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const videoRoutes = require('./routes/videoRoute');
const userRoutes = require('./routes/UserRoute');  // 🔧 Correct casing (userRoute, not UserRoute)
const commentRoutes = require('./routes/commentRoute');  // 🔧 Correct casing (userRoute, not UserRoute)
const adminRoutes = require('./routes/adminRoute');  // 🔧 Correct casing (userRoute, not UserRoute)


const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// ✅ CORS config for your frontend
// app.use(cors({
//   origin: 'http://localhost:3000',  // Your frontend URL (client, not backend/server)
//   credentials: true,
// }));
app.use(cors({
    origin: ['https://veloura-backup.vercel.app', 'http://localhost:3000']
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
app.use('/api/comment',commentRoutes);
app.use('/api/admin',adminRoutes);



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
