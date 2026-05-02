const express = require('express');
const router = express.Router();
const { submit, getAll, reply, updateStatus } = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.post('/', protect, submit);
router.get('/', protect, authorize('admin'), getAll);
router.put('/:id/reply', protect, authorize('admin'), reply);
router.put('/:id/status', protect, authorize('admin'), updateStatus);

module.exports = router;
