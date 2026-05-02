const express = require('express');
const router = express.Router();
const { register, getAll, getById, approve, addSlot, getClients } = require('../controllers/nutritionistController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.post('/register', protect, authorize('nutritionist'), register);
router.get('/', getAll);
router.get('/clients', protect, authorize('nutritionist'), getClients);
router.get('/:id', getById);
router.put('/:id/approve', protect, authorize('admin'), approve);
router.post('/slots', protect, authorize('nutritionist'), addSlot);

module.exports = router;
