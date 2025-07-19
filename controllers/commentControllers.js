// In commentController.js
const Comment = require('../models/CommentModel');
const Video = require('../models/VideoModel');

exports.postComment = async (req, res) => {
    const { userId, videoId, content } = req.body;
    try {
        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ message: 'Video not found.' });

        const newComment = new Comment({ content, user: userId, video: videoId });
        await newComment.save();

        res.status(201).json({ message: 'Comment added successfully.', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding comment.' });
    }
};


exports.getCommentByVideoId = async (req, res) => {
    try {
        const videoId = req.params.videoId;

        const comments = await Comment.find({ video: videoId })
            .populate('user', 'username avatar')  // Populate user's username and avatar
            .sort({ createdAt: -1 }); // Recent first

        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments.' });
    }
};

