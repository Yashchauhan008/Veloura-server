// Add this to your existing userController.js
const User = require('../models/UserModel');
const Video = require('../models/VideoModel');

exports.getAdminProfile = async (req, res) => {
    try {
        const adminId = req.query.adminId; // or get from JWT token
        
        // Get admin user details
        const admin = await User.findById(adminId).select('-password');
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Get admin statistics
        const totalUsers = await User.countDocuments();
        const totalVideos = await Video.countDocuments();
        const totalViews = await Video.aggregate([
            { $group: { _id: null, totalViews: { $sum: '$views' } } }
        ]);

        // Get recent activities (you can customize this based on your needs)
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('username email createdAt role');

        const recentVideos = await Video.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('uploader', 'username')
            .select('title views createdAt uploader');

        res.status(200).json({
            admin,
            stats: {
                totalUsers,
                totalVideos,
                totalViews: totalViews[0]?.totalViews || 0
            },
            recentUsers,
            recentVideos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching admin profile' });
    }
};

// Update admin profile
exports.updateAdminProfile = async (req, res) => {
    try {
        const { adminId, username, bio, currentPassword, newPassword } = req.body;
        
        const admin = await User.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // If changing password, verify current password
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ message: 'Current password required' });
            }
            
            const isMatch = await bcrypt.compare(currentPassword, admin.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password incorrect' });
            }
            
            admin.password = await bcrypt.hash(newPassword, 12);
        }

        // Update other fields
        if (username) admin.username = username;
        if (bio !== undefined) admin.bio = bio;

        await admin.save();
        
        // Return updated admin without password
        const updatedAdmin = await User.findById(adminId).select('-password');
        res.status(200).json({ 
            message: 'Admin profile updated successfully',
            admin: updatedAdmin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating admin profile' });
    }
};



exports.UpdateVideoToRestrict = async (req, res) => {
    try {
        const videoId = req.params.videoId;

        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { accessLevel: 'restricted' },
            { new: true }
        );

        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Video access level updated to restricted.',
            video: updatedVideo
        });
    } catch (error) {
        console.error('Error updating video access level:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}; 

