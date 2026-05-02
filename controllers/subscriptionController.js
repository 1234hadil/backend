const subscriptionService = require('../services/subscriptionService');

exports.subscribe = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.subscribe(req.user.id, req.body.planId);
    res.status(201).json({ success: true, data: subscription });
  } catch (err) { next(err); }
};

exports.getMySubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.getUserSubscription(req.user.id);
    res.status(200).json({ success: true, data: subscription });
  } catch (err) { next(err); }
};

exports.getMySubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await subscriptionService.getUserSubscriptions(req.user.id);
    res.status(200).json({ success: true, data: subscriptions });
  } catch (err) { next(err); }
};

exports.cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.cancelSubscription(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: subscription });
  } catch (err) { next(err); }
};

exports.updatePersonalizedPlan = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.updatePersonalizedPlan(req.params.id, req.body);
    res.status(200).json({ success: true, data: subscription });
  } catch (err) { next(err); }
};
