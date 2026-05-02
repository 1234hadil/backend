const express = require('express');
const router = express.Router();
const { submit, get } = require('../controllers/questionnaireController');
const { protect } = require('../middleware/auth');

router.post('/:consultationId', protect, submit);
router.get('/:consultationId', protect, get);

module.exports = router;
