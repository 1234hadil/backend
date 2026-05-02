//import mongoose from 'mongoose' 
const mongoose = require('mongoose');
// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  isPublished: { type: Boolean, default: false },
  coverImage: String
}, { timestamps: true });
// export Blog model
module.exports = mongoose.model('Blog', blogSchema);
