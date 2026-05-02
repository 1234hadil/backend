// import mongoose from ' mongoose ' 
const mongoose = require('mongoose');
// Meal Schema
const mealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  time: String,
  date: { type: Date, default: Date.now },
  notes: String
}, { timestamps: true });
// export Meal model
module.exports = mongoose.model('Meal', mealSchema);
