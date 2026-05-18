const express = require('express');
const router = express.Router();
const { processPayment, confirmPayment, getMyPayments, getAllPayments, validatePayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.post('/process', protect, authorize('user','client'), processPayment);
router.put('/:id/confirm', protect, confirmPayment);
router.get('/my', protect, getMyPayments);
router.get('/', protect, authorize('admin'), getAllPayments);
router.put('/:id/validate', protect, authorize('admin'), validatePayment);

module.exports = router;
