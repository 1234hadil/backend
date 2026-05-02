// import mongoose from ' mongoose ' 
const mongoose = require('mongoose');
// Payment Schema 
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  transactionId: String,
  paymentMethod: String,
  validatedByAdmin: { type: Boolean, default: false },
  validatedAt: Date
}, { timestamps: true });
// export Payment model
module.exports = mongoose.model('Payment', paymentSchema);
