const Meal = require('../models/Meal');

exports.addMeal = async (userId, data) => Meal.create({ user: userId, ...data });

exports.getUserMeals = async (userId, date) => {
  const query = { user: userId };
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    query.date = { $gte: start, $lt: end };
  }
  return Meal.find(query).sort('-date');
};

exports.deleteMeal = async (id, userId) => {
  const meal = await Meal.findOne({ _id: id, user: userId });
  if (!meal) throw Object.assign(new Error('Meal not found'), { statusCode: 404 });
  return meal.deleteOne();
};
