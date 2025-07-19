const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const Video = require('../models/VideoModel');

const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error registering user' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const { userId, username, bio,password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (username) user.username = username;
        if (bio) user.bio = bio;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
};


exports.feed = async (req, res) => {

    try {
      const videos = await Video.find({ accessLevel: 'public' })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('uploader', 'username') // Only fetch 'username' from User model
            .select('videoUrl thumbnailUrl uploader views');

        const videoData = videos.map(video => ({
            videoUrl: video.videoUrl,
            thumbnailUrl: video.thumbnailUrl,
            uploaderUsername: video.uploader?.username || 'Unknown',
            viewsCount: video.views || 0
        }));

        res.status(200).json({
            message: 'User updated successfully',
            feed: videoData
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fatching video' });
    }
};





