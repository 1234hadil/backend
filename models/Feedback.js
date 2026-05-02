//import mongoose from 'mongoose'
const mongoose = require('mongoose');
//feedback Schema
const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['feedback', 'inquiry', 'complaint'], default: 'feedback' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  targetNutritionist: { type: mongoose.Schema.Types.ObjectId, ref: 'Nutritionist' },
  status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' },
  adminReply: String
}, { timestamps: true });
//export Feedback model
module.exports = mongoose.model('Feedback', feedbackSchema);

