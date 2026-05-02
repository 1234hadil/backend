// import mongoose from ' mongoose ' 
const mongoose = require('mongoose');
// Meal Analysis Schema
const mealAnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  mealName: String,
  estimatedCalories: Number,
  macros: {
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  aiResponse: String
}, { timestamps: true });
// export MealAnalysis model
module.exports = mongoose.model('MealAnalysis', mealAnalysisSchema);
