const profileService = require('../services/profileService');

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.id);
    res.status(200).json({ success: true, data: profile });
  } catch (err) { next(err); }
};

exports.upsertProfile = async (req, res, next) => {
  try {
    const profile = await profileService.upsertProfile(req.user.id, req.body);
    res.status(200).json({ success: true, data: profile });
  } catch (err) { next(err); }
};
