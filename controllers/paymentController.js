const paymentService = require('../services/paymentService');

exports.processPayment = async (req, res, next) => {
  try {
    const { subscriptionId, amount, paymentMethod } = req.body;
    const payment = await paymentService.processPayment(req.user.id, subscriptionId, amount, paymentMethod);
    res.status(201).json({ success: true, data: payment });
  } catch (err) { next(err); }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.confirmPayment(req.params.id);
    res.status(200).json({ success: true, data: payment });
  } catch (err) { next(err); }
};

exports.getMyPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getUserPayments(req.user.id);
    res.status(200).json({ success: true, data: payments });
  } catch (err) { next(err); }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json({ success: true, data: payments });
  } catch (err) { next(err); }
};

exports.validatePayment = async (req, res, next) => {
  try {
    const payment = await paymentService.validatePayment(req.params.id);
    res.status(200).json({ success: true, data: payment });
  } catch (err) { next(err); }
};
