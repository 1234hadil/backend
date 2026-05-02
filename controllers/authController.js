const authService = require('../services/authService');
const { sendTokenResponse } = require('../utils/token');

exports.register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    sendTokenResponse(user, 201, res);
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body.email, req.body.password);
    sendTokenResponse(user, 200, res);
  } catch (err) { next(err); }
};

exports.logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

exports.getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const token = await authService.generateResetToken(req.body.email);
    // In production: send token via email
    res.status(200).json({ success: true, message: 'Reset token generated', resetToken: token });
  } catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const user = await authService.resetPassword(req.params.token, req.body.password);
    sendTokenResponse(user, 200, res);
  } catch (err) { next(err); }
};
