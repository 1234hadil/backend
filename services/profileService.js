const Profile = require('../models/Profile');

exports.getProfile = async (userId) => Profile.findOne({ user: userId });

exports.upsertProfile = async (userId, data) =>
  Profile.findOneAndUpdate({ user: userId }, data, { new: true, upsert: true, runValidators: true });
