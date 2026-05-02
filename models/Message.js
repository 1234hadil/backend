// import mongoose from ' mongoose ' 
const mongoose = require('mongoose');
// Message Schema 
const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });
// export Message model
module.exports = mongoose.model('Message', messageSchema);
