const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const fileUpload = require('express-fileupload');
const cloudinary = require('./cloudinaryConfig');
const userRoutes = require('./routes/UserRoute');

// Middleware - CORRECT ORDER
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Routes
app.use('/api/user', userRoutes);

// MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to veloura API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
