const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const videoRoutes = require('./routes/videoRoute');
const userRoutes = require('./routes/UserRoute');


const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors({
  origin: 'https://veloura-server.onrender.com',  
  credentials: true,                // allow cookies/headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/'
}));

app.use('/api/video', videoRoutes);
app.use('/api/user',userRoutes)

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.log('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('API Working ✅');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
