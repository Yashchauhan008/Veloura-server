const mongoose = require('mongoose');

const creatorAccountSchema = new mongoose.Schema({
    // The user (creator) who this account belongs to.
    // A one-to-one relationship with the User model.
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Each user can only have one creator account.
    },
    // Current balance available for payout, stored in the smallest currency unit (cents).
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    // The total amount of money this creator has ever successfully withdrawn.
    totalPayout: {
        type: Number,
        default: 0
    },
    // A count of users currently subscribed to this creator.
    // This will need to be updated by your application logic.
    activeSubscribers: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

const CreatorAccount = mongoose.model('CreatorAccount', creatorAccountSchema);

module.exports = CreatorAccount;
