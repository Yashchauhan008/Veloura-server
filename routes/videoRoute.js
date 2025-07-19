const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinaryConfig');
const fs = require('fs');
const Video = require('../models/VideoModel');

router.post('/upload-video', async (req, res) => {
    try {
        console.log(req.files);  // Check files
        console.log(req.body);   // Check body

        if (!req.files || !req.files.video || !req.files.thumbnail) {
            return res.status(400).send('Video or thumbnail file missing.');
        }

        const { title, description, tags, uploader, accessLevel } = req.body;

        // Upload video
        const videoFile = req.files.video.tempFilePath;
        const videoResult = await cloudinary.uploader.upload(videoFile, {
            resource_type: 'video',
            folder: 'my-videos',
        });
        fs.unlinkSync(videoFile);

        // Upload thumbnail
        const thumbnailFile = req.files.thumbnail.tempFilePath;
        const thumbnailResult = await cloudinary.uploader.upload(thumbnailFile, {
            resource_type: 'image',
            folder: 'my-videos/thumbnails',
        });
        fs.unlinkSync(thumbnailFile);

        const video = new Video({
            title,
            description,
            tags: tags ? tags.split(',') : [],
            videoUrl: videoResult.secure_url,
            thumbnailUrl: thumbnailResult.secure_url,
            uploader,
            accessLevel
        });

        await video.save();

        res.status(201).json({
            message: 'Video and thumbnail uploaded successfully',
            video
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Upload failed.');
    }
});


router.get('/getVideoByUserID/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const videos = await Video.find({ uploader: userId }).populate('uploader', 'username email');
        
        if (!videos || videos.length === 0) {
            return res.status(404).json({ message: 'No videos found for this user.' });
        }

        res.status(200).json({ videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching videos.' });
    }
});



module.exports = router;
