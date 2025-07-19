const cloudinary = require('../cloudinaryConfig');
const fs = require('fs');
const Video = require('../models/VideoModel');
const User = require('../models/UserModel');



exports.uploadVideo = async (req, res) => {
    try {
        if (!req.files || !req.files.video || !req.files.thumbnail) {
            return res.status(400).send('Video or thumbnail file missing.');
        }

        const { title, description, tags, uploader, accessLevel } = req.body;

        if (!uploader || uploader === "undefined") {
            return res.status(400).json({ message: 'Uploader ID is required.' });
        }

        const videoFile = req.files.video.tempFilePath;
        const videoResult = await cloudinary.uploader.upload(videoFile, {
            resource_type: 'video',
            folder: 'my-videos',
        });
        fs.unlinkSync(videoFile);

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
};



exports.getVideosByUserID = async (req, res) => {
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
};

// GET /api/video/:videoId
exports.getVideoByID = async (req, res) => {
        const videoId = req.params.videoId;
        const userId = req.query.userId; // Send userId as query param in the frontend request

        try {
            const video = await Video.findById(videoId).populate('uploader', 'username email');
            if (!video) {
                return res.status(404).json({ message: 'Video not found.' });
            }

            // 1️⃣ Increase view count
            video.views += 1;
            await video.save();

            // 2️⃣ Update User History Videos
            if (userId) {
                const user = await User.findById(userId);
                if (user) {
                    // Remove if video already exists in history to avoid duplicates
                    user.historyVideo = user.historyVideo.filter(id => id.toString() !== videoId);
                    // Add the video at the beginning (most recent first)
                    user.historyVideo.unshift(video._id);
                    // Keep only the latest 5
                    user.historyVideo = user.historyVideo.slice(0, 5);
                    await user.save();
                }
            }

            res.status(200).json({ video });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching video.' });
        }
};


exports.personalizedFeed = async (req, res) => {
    const userId = req.query.userId;

    try {
        const user = await User.findById(userId).populate('historyVideo');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const tagFrequency = {};
        user.historyVideo.forEach(video => {
            video.tags.forEach(tag => {
                tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
            });
        });

        const sortedTags = Object.keys(tagFrequency).sort((a, b) => tagFrequency[b] - tagFrequency[a]);

        let personalizedVideos = [];

        if (sortedTags.length > 0) {
            personalizedVideos = await Video.find({
                accessLevel: "public",
                tags: { $in: sortedTags }
            }).populate('uploader', 'username')
            .limit(20);
        } else {
            personalizedVideos = await Video.find({
                accessLevel: "public"
            }).populate('uploader', 'username')
            .sort({ createdAt: -1 })
            .limit(20);
        }

        res.status(200).json({ videos: personalizedVideos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating personalized feed' });
    }
};

exports.getAllPublicVideos = async (req, res) => {
    try {
        const publicVideos = await Video.find({ accessLevel: 'public' })
            .populate('uploader', 'username avatar') // Fetch uploader username and avatar
            .select('title description videoUrl thumbnailUrl views likes createdAt'); // Select only needed fields

        res.status(200).json({ publicVideos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching public videos.' });
    }};


exports.addComment = async(req,res)=>{
    const { userId,user,content, description, tags, uploader, accessLevel } = req.body;

};





