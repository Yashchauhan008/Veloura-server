const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
    // The creator who owns and offers this subscription plan.
    // Using 'owner' as you specified, linked to the User model.
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // The name of the subscription tier (e.g., "Gold Tier", "Basic Access").
    name: {
        type: String,
        required: [true, 'Subscription plan must have a name.'],
        trim: true
    },
    // The price of the subscription in the smallest currency unit (e.g., cents).
    // Storing money as an integer is a best practice to avoid floating-point errors.
    price: {
        type: Number,
        required: [true, 'Subscription plan must have a price.'],
        min: 0
    },
    // Duration of the subscription in days (e.g., 30 for monthly).
    duration: {
        type: Number,
        required: [true, 'Subscription plan must have a duration in days.'],
        min: 1
    },
    // A description of the benefits this plan offers.
    description: {
        type: String,
        trim: true
    },
    // Allows a creator to deactivate a plan without deleting it.
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Add an index on the owner field for faster lookups of a creator's plans.
subscriptionPlanSchema.index({ owner: 1 });

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

module.exports = SubscriptionPlan;
