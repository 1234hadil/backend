// import mongoose from ' mongoose '
const mongoose = require('mongoose');
// Progress Tracking Schema
const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: Number,
  notes: String
}, { timestamps: true });
// export Progress model
module.exports = mongoose.model('Progress', progressSchema);
