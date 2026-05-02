const express = require('express');
const router = express.Router();
const { addMeal, getMeals, deleteMeal } = require('../controllers/mealController');
const { protect } = require('../middleware/auth');

router.post('/', protect, addMeal);
router.get('/', protect, getMeals);
router.delete('/:id', protect, deleteMeal);

module.exports = router;
