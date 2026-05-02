// import mongoose from ' mongoose '
const mongoose = require('mongoose');
// Profile Schema 
const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  age: Number,
  weight: Number,
  height: Number,
  allergies: [String],
  medicalConditions: [String],
  goals: String
}, { timestamps: true });
// export Profile model
module.exports = mongoose.model('Profile', profileSchema);
