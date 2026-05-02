const planService = require('../services/planService');

exports.getPlans = async (req, res, next) => {
  try {
    const plans = await planService.getAllPlans();
    res.status(200).json({ success: true, data: plans });
  } catch (err) { next(err); }
};

exports.getPlan = async (req, res, next) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.status(200).json({ success: true, data: plan });
  } catch (err) { next(err); }
};

exports.createPlan = async (req, res, next) => {
  try {
    const plan = await planService.createPlan(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (err) { next(err); }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const plan = await planService.updatePlan(req.params.id, req.body);
    res.status(200).json({ success: true, data: plan });
  } catch (err) { next(err); }
};

exports.deletePlan = async (req, res, next) => {
  try {
    await planService.deletePlan(req.params.id);
    res.status(200).json({ success: true, message: 'Plan deleted' });
  } catch (err) { next(err); }
};
