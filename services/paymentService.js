const Payment = require('../models/Payment');
const Subscription = require('../models/Subscription');

exports.processPayment = async (userId, subscriptionId, amount, paymentMethod) => {
  const payment = await Payment.create({
    user: userId,
    subscription: subscriptionId,
    amount,
    paymentMethod,
    status: 'pending',
    transactionId: `TXN-${Date.now()}`
  });
  return payment;
};

exports.confirmPayment = async (paymentId) => {
  const payment = await Payment.findByIdAndUpdate(paymentId, { status: 'completed' }, { new: true });
  if (!payment) throw Object.assign(new Error('Payment not found'), { statusCode: 404 });

  await Subscription.findByIdAndUpdate(payment.subscription, { status: 'active' });
  return payment;
};

exports.getUserPayments = async (userId) =>
  Payment.find({ user: userId }).populate('subscription').sort('-createdAt');

exports.validatePayment = async (paymentId) =>
  Payment.findByIdAndUpdate(paymentId, { validatedByAdmin: true, validatedAt: new Date() }, { new: true });

exports.getAllPayments = async () =>
  Payment.find().populate('user', 'name email').populate('subscription').sort('-createdAt');
