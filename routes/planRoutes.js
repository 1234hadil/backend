const express = require('express');
const router = express.Router();
const { getPlans, getPlan, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.get('/', getPlans);
router.get('/:id', getPlan);
router.post('/', protect, authorize('admin'), createPlan);
router.put('/:id', protect, authorize('admin'), updatePlan);
router.delete('/:id', protect, authorize('admin'), deletePlan);

module.exports = router;
