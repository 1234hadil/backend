const User = require('../models/User');
const crypto = require('crypto');

exports.registerUser = async (data) => {
  const user = await User.create(data);
  return user;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });
  }
  if (user.isSuspended) {
    throw Object.assign(new Error('Account suspended'), { statusCode: 403 });
  }
  return user;
};

exports.generateResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();
  return token;
};

exports.resetPassword = async (token, newPassword) => {
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpire: { $gt: Date.now() }
  });
  if (!user) throw Object.assign(new Error('Invalid or expired token'), { statusCode: 400 });

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  return user;
};
