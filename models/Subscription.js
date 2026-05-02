// import mongoose from ' mongoose '
const mongoose = require('mongoose');
// Subscribtion Schema
const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  nutritionist: { type: mongoose.Schema.Types.ObjectId, ref: 'Nutritionist' },
  status: { type: String, enum: ['pending', 'active', 'expired', 'cancelled'], default: 'pending' },
  startDate: Date,
  endDate: Date,
  personalizedPlan: {
    meals: [{ name: String, calories: Number, time: String, notes: String }],
    exercises: [{ name: String, duration: Number, frequency: String }],
    notes: String,
    updatedAt: Date
  }
}, { timestamps: true });
// export Subscription model
module.exports = mongoose.model('Subscription', subscriptionSchema);
