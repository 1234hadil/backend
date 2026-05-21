const Feedback = require('../models/Feedback');

exports.submitFeedback = async (userId, data) => Feedback.create({ user: userId, ...data });

exports.getAllFeedback = async () =>
  Feedback.find().populate('user', 'name email').sort('-createdAt');

exports.replyToFeedback = async (id, reply) =>
  Feedback.findByIdAndUpdate(id, { adminReply: reply, status: 'resolved' }, { new: true });

exports.updateStatus = async (id, status) =>
  Feedback.findByIdAndUpdate(id, { status }, { new: true });



