const express = require('express');
const router = express.Router();
const {
  book, getMyConsultations, getNutritionistConsultations,
  approveByNutritionist, approveByAdmin, cancel, reschedule
} = require('../controllers/consultationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.post('/', protect, authorize('user'), book);
router.get('/my', protect, getMyConsultations);
router.get('/nutritionist/:nutritionistId', protect, authorize('nutritionist', 'admin'), getNutritionistConsultations);
router.put('/:id/approve-nutritionist', protect, authorize('nutritionist'), approveByNutritionist);
router.put('/:id/approve-admin', protect, authorize('admin'), approveByAdmin);
router.put('/:id/cancel', protect, cancel);
router.put('/:id/reschedule', protect, authorize('user'), reschedule);

module.exports = router;
