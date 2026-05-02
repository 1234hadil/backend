// import mongoose from ' mongoose ' 
const mongoose = require('mongoose');
// Nutritionist Schema
const nutritionistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: String,
  bio: String,
  experience: Number,
  certifications: [String],
  isApproved: { type: Boolean, default: false },
  availableSlots: [{
    date: Date,
    startTime: String,
    endTime: String,
    isBooked: { type: Boolean, default: false }
  }],
  rating: { type: Number, default: 0 },
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
// export Nutritionist model
module.exports = mongoose.model('Nutritionist', nutritionistSchema);
