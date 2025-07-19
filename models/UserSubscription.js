const mongoose = require('mongoose');

const userSubscriptionSchema = new mongoose.Schema({
    // The user who is subscribing.
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // The specific subscription plan the user has subscribed to.
    subscriptionPlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscriptionPlan',
        required: true
    },
    // The creator the user is subscribing to.
    // While this can be found via subscriptionPlanId, storing it here
    // makes queries for "all subscribers of a creator" much faster.
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // The date when the subscription begins.
    startDate: {
        type: Date,
        required: true
    },
    // The date when the subscription is set to expire.
    endDate: {
        type: Date,
        required: true
    },
    // The current status of the subscription.
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    }
}, { timestamps: true });

// Create a compound index to quickly find a user's subscription to a specific creator.
userSubscriptionSchema.index({ userId: 1, creatorId: 1 });

// Index the endDate to efficiently find all expired subscriptions for cleanup jobs.
userSubscriptionSchema.index({ endDate: 1 });

const UserSubscription = mongoose.model('UserSubscription', userSubscriptionSchema);

module.exports = UserSubscription;
