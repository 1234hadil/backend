// import mongoose from ' mongoose'
const mongoose = require('mongoose');
// Questionnaire Schema 
const questionnaireSchema = new mongoose.Schema({
  consultation: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true, unique: true },
  goals: String,
  currentDiet: String,
  healthIssues: String,
  activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'] }
}, { timestamps: true });
// export Questionnaire model
module.exports = mongoose.model('Questionnaire', questionnaireSchema);
