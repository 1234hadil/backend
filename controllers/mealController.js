const mealService = require('../services/mealService');

exports.addMeal = async (req, res, next) => {
  try {
    const meal = await mealService.addMeal(req.user.id, req.body);
    res.status(201).json({ success: true, data: meal });
  } catch (err) { next(err); }
};

exports.getMeals = async (req, res, next) => {
  try {
    const meals = await mealService.getUserMeals(req.user.id, req.query.date);
    res.status(200).json({ success: true, data: meals });
  } catch (err) { next(err); }
};

exports.deleteMeal = async (req, res, next) => {
  try {
    await mealService.deleteMeal(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Meal deleted' });
  } catch (err) { next(err); }
};
