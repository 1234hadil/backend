const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllUsers, suspendUser, deleteUser, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin only
router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/:id', protect, authorize('admin'), getUserById);
router.put('/:id/suspend', protect, authorize('admin'), suspendUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
