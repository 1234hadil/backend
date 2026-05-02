const express = require('express');
const router = express.Router();
const { analyzeMeal, getCalorieEstimate, getAlternatives, getHistory, getAnalysis } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const upload = require('../utils/upload');

router.post('/analyze', protect, upload.single('image'), analyzeMeal);
router.get('/history', protect, getHistory);
router.get('/:id', protect, getAnalysis);
router.get('/:id/calories', protect, getCalorieEstimate);
router.get('/:id/alternatives', protect, getAlternatives);

module.exports = router;
