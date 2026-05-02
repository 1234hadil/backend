const express = require('express');
const router = express.Router();
const { subscribe, getMySubscription, getMySubscriptions, cancelSubscription, updatePersonalizedPlan } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.post('/', protect, authorize('user'), subscribe);
router.get('/active', protect, getMySubscription);
router.get('/', protect, getMySubscriptions);
router.put('/:id/cancel', protect, authorize('user'), cancelSubscription);
router.put('/:id/plan', protect, authorize('nutritionist'), updatePersonalizedPlan);

module.exports = router;
