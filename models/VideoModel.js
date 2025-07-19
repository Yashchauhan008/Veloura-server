const mongoose = require('mongoose');



const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    tags: [{ type: String }],
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 },
    accessLevel: {
        type: String,
        enum: ['public', 'private', 'premium', 'restricted'],
        default: 'public'
    }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
