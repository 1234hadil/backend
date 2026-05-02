const userService = require('../services/userService');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (err) { next(err); }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) { next(err); }
};

exports.suspendUser = async (req, res, next) => {
  try {
    const user = await userService.suspendUser(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) { next(err); }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) { next(err); }
};
