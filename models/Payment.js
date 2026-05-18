// import mongoose from ' mongoose ' 
const mongoose = require('mongoose');
// Payment Schema 
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  amount: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  fullName: String, email: String, age: Number, weight: Number, goal: String, date: String, time: String, notes: String,
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  transactionId: String,
  paymentMethod: String,
  validatedByAdmin: { type: Boolean, default: false },
  validatedAt: Date
}, { timestamps: true });
// export Payment model
module.exports = mongoose.model('Payment', paymentSchema);
