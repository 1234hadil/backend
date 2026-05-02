// import mongoose from ' mongoose '
const mongoose = require('mongoose');
// Plan Schema
const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['basic', 'premium'], required: true },
  description: String,
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // days
  features: [String],
  includesConsultation: { type: Boolean, default: false },
  includesAI: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
// export Plan model
module.exports = mongoose.model('Plan', planSchema);
