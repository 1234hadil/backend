//import mongoose from ' mongooose'
const mongoose = require('mongoose');
// Alternative Schema
const alternativeSchema = new mongoose.Schema({
  mealAnalysis: { type: mongoose.Schema.Types.ObjectId, ref: 'MealAnalysis', required: true },
  name: { type: String, required: true },
  calories: Number,
  description: String,
  protein: Number,
  carbs: Number,
  fat: Number
}, { timestamps: true });
// export Alternative model 
module.exports = mongoose.model('Alternative', alternativeSchema);


