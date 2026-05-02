// import mongoose from ' mongoose ' 
const mongoose = require('mongoose');
// Conversation Schema
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  consultation: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
}, { timestamps: true });
// export Conversation model
module.exports = mongoose.model('Conversation', conversationSchema);
