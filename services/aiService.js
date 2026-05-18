const MealAnalysis = require('../models/MealAnalysis');
const Alternative = require('../models/Alternative');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const AI_API_URL = process.env.AI_API_URL;

exports.analyzeMeal = async (userId, imageUrl) => {
  // send image to AI API for analysis
  const imagePath = path.join(__dirname, '..', imageUrl);
  const formData = new FormData();
  formData.append('image', fs.createReadStream(imagePath));

  const response = await fetch(`${AI_API_URL}/predict`, {
    method: 'POST',
    body: formData,
    headers: formData.getHeaders()
  });

  const aiResult = await response.json();

  //save analysis result to DB
  const mealAnalysis = await MealAnalysis.create({
    user: userId,
    imageUrl,
    mealName: aiResult.results.map(r => r.food).join(', ') || 'Unknown Meal',
    estimatedCalories: aiResult.total_calories,
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0
    },
    aiResponse: JSON.stringify(aiResult.results)
  });

  await Alternative.insertMany([
    { mealAnalysis: mealAnalysis._id, name: 'Grilled Chicken Salad', calories: mealAnalysis.estimatedCalories - 50, description: 'High protein, low carb' },
    { mealAnalysis: mealAnalysis._id, name: 'Quinoa Bowl', calories: mealAnalysis.estimatedCalories + 20, description: 'Balanced macros' },
    { mealAnalysis: mealAnalysis._id, name: 'Greek Yogurt Parfait', calories: mealAnalysis.estimatedCalories - 80, description: 'High protein snack' }
  ]);

  return mealAnalysis;
};

exports.getCalorieEstimate = async (analysisId) => {
  const analysis = await MealAnalysis.findById(analysisId);
  if (!analysis) throw Object.assign(new Error('Analysis not found'), { statusCode: 404 });
  return { mealName: analysis.mealName, estimatedCalories: analysis.estimatedCalories, macros: analysis.macros };
};

exports.suggestAlternatives = async (analysisId) =>
  Alternative.find({ mealAnalysis: analysisId });

exports.getUserAnalysisHistory = async (userId) =>
  MealAnalysis.find({ user: userId }).sort('-createdAt');

exports.getAnalysisById = async (id) => MealAnalysis.findById(id);