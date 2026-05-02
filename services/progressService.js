const Progress = require('../models/ProgressTracking');

exports.logProgress = async (userId, data) =>
  Progress.create({ user: userId, date: data.date, weight: data.weight, notes: data.notes });

exports.getProgress = async (userId) =>
  Progress.find({ user: userId }).sort('-date');

exports.updateProgress = async (id, userId, data) => {
  const entry = await Progress.findOne({ _id: id, user: userId });
  if (!entry) throw Object.assign(new Error('Progress entry not found'), { statusCode: 404 });
  Object.assign(entry, { weight: data.weight, notes: data.notes });
  return entry.save();
};

exports.getProgressSummary = async (userId) => {
  const entries = await Progress.find({ user: userId }).sort('-date').limit(30);
  if (!entries.length) return null;
  const latest = entries[0];
  const oldest = entries[entries.length - 1];
  return {
    currentWeight: latest.weight,
    weightChange: latest.weight - oldest.weight,
    totalEntries: entries.length
  };
};
