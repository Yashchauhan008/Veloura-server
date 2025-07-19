const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    subscriptionID: { type: String, required: true },
    Sdate: { type: Date, required: true },
    EDate: { type: Date, required: true }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    subscriptionStatus: [subscriptionSchema],
    historyVideo :[{type:mongoose.Schema.Types.ObjectId,ref:'Video'}],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
     role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
  },
    restricted: { type: Boolean, default: false }
}, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
