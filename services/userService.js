const User = require('../models/User');

exports.getProfile = async (userId) => User.findById(userId);

exports.updateProfile = async (userId, data) => {
  const allowed = ['name', 'phone', 'avatar'];
  const updates = Object.fromEntries(Object.entries(data).filter(([k]) => allowed.includes(k)));
  return User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
};

exports.getAllUsers = async () => User.find({ role: 'client' }).select('-password');

exports.suspendUser = async (userId) => User.findByIdAndUpdate(userId, { isSuspended: true }, { new: true });

exports.deleteUser = async (userId) => User.findByIdAndDelete(userId);

exports.getUserById = async (userId) => User.findById(userId).select('-password');
