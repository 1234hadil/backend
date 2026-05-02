const express = require('express');
const router = express.Router();
const { logProgress, getProgress, updateProgress, getSummary } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.post('/', protect, logProgress);
router.get('/', protect, getProgress);
router.get('/summary', protect, getSummary);
router.put('/:id', protect, updateProgress);

module.exports = router;
