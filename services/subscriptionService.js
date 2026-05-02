const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

exports.subscribe = async (userId, planId) => {
  const plan = await Plan.findById(planId);
  if (!plan) throw Object.assign(new Error('Plan not found'), { statusCode: 404 });

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.duration);

  return Subscription.create({ user: userId, plan: planId, startDate, endDate });
};

exports.getUserSubscription = async (userId) =>
  Subscription.findOne({ user: userId, status: 'active' }).populate('plan nutritionist');

exports.getUserSubscriptions = async (userId) =>
  Subscription.find({ user: userId }).populate('plan').sort('-createdAt');

exports.updatePersonalizedPlan = async (subscriptionId, planData) =>
  Subscription.findByIdAndUpdate(
    subscriptionId,
    { personalizedPlan: { ...planData, updatedAt: new Date() } },
    { new: true }
  );

exports.cancelSubscription = async (subscriptionId, userId) => {
  const sub = await Subscription.findOne({ _id: subscriptionId, user: userId });
  if (!sub) throw Object.assign(new Error('Subscription not found'), { statusCode: 404 });
  sub.status = 'cancelled';
  return sub.save();
};
