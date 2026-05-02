// import mongoose from ' mongoose ' 
const mongoose = require('mongoose');
// Consultation Schema 
const consultationSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nutritionistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nutritionist', required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  scheduledAt: { type: Date, required: true },
  duration: { type: Number, default: 60 },
  status: {
    type: String,
    enum: ['pending', 'approved_nutritionist', 'approved_admin', 'confirmed', 'cancelled', 'completed', 'rescheduled'],
    default: 'pending'
  },
  cancelReason: String,
  rescheduledTo: Date,
  notes: String
}, { timestamps: true });
// export Consultation model
module.exports = mongoose.model('Consultation', consultationSchema);
