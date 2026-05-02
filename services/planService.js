const Plan = require('../models/Plan');

exports.getAllPlans = async () => Plan.find({ isActive: true });

exports.getPlanById = async (id) => Plan.findById(id);

exports.createPlan = async (data) => Plan.create(data);

exports.updatePlan = async (id, data) => Plan.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deletePlan = async (id) => Plan.findByIdAndDelete(id);
