const progressService = require('../services/progressService');

exports.logProgress = async (req, res, next) => {
  try {
    const entry = await progressService.logProgress(req.user.id, req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (err) { next(err); }
};

exports.getProgress = async (req, res, next) => {
  try {
    const entries = await progressService.getProgress(req.user.id);
    res.status(200).json({ success: true, data: entries });
  } catch (err) { next(err); }
};

exports.updateProgress = async (req, res, next) => {
  try {
    const entry = await progressService.updateProgress(req.params.id, req.user.id, req.body);
    res.status(200).json({ success: true, data: entry });
  } catch (err) { next(err); }
};

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await progressService.getProgressSummary(req.user.id);
    res.status(200).json({ success: true, data: summary });
  } catch (err) { next(err); }
};
