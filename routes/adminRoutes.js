
const express = require('express');
const router = express.Router();
const { getSystemReports, getPendingNutritionists, getPendingConsultations } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(protect, authorize('admin'));

router.get('/reports', getSystemReports);
router.get('/pending-nutritionists', getPendingNutritionists);
router.get('/pending-consultations', getPendingConsultations);

module.exports = router;
