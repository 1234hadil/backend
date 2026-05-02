const feedbackService = require('../services/feedbackService');

exports.submit = async (req, res, next) => {
  try {
    const feedback = await feedbackService.submitFeedback(req.user.id, req.body);
    res.status(201).json({ success: true, data: feedback });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const feedbacks = await feedbackService.getAllFeedback();
    res.status(200).json({ success: true, data: feedbacks });
  } catch (err) { next(err); }
};

exports.reply = async (req, res, next) => {
  try {
    const feedback = await feedbackService.replyToFeedback(req.params.id, req.body.reply);
    res.status(200).json({ success: true, data: feedback });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const feedback = await feedbackService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, data: feedback });
  } catch (err) { next(err); }
};
