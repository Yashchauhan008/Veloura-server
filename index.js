const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config(); 
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const fileUpload = require('express-fileupload');
const cloudinary = require('./cloudinaryConfig');
const userRoutes = require('./routes/');



app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// app.post('/upload-video', async (req, res) => {
//     try {
//         if (!req.files || !req.files.video) {
//             return res.status(400).send('No video file uploaded.');
//         }

//         const file = req.files.video.tempFilePath;

//         const result = await cloudinary.uploader.upload(file, {
//             resource_type: 'video',
//             folder: 'my-videos',
//         });

//         res.status(200).json({
//             public_id: result.public_id,
//             url: result.secure_url, 
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Video upload failed.');
//     }
// });


  app.use('/api/user', userRoutes);






//configuration

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());





mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));


// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to veloura API');
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});