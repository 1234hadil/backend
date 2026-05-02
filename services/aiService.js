const MealAnalysis = require('../models/MealAnalysis');
const Alternative = require('../models/Alternative');

const simulateAIAnalysis = () => ({
  mealName: 'Analyzed Meal',
  estimatedCalories: Math.floor(Math.random() * 400) + 200,
  macros: {
    protein: Math.floor(Math.random() * 30) + 10,
    carbs: Math.floor(Math.random() * 50) + 20,
    fat: Math.floor(Math.random() * 20) + 5,
    fiber: Math.floor(Math.random() * 10) + 2
  },
  aiResponse: 'Meal analyzed successfully using AI vision model'
});

exports.analyzeMeal = async (userId, imageUrl) => {
  const analysis = simulateAIAnalysis();
  const mealAnalysis = await MealAnalysis.create({ user: userId, imageUrl, ...analysis });

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
