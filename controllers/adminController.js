const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Payment = require('../models/Payment');
const Consultation = require('../models/Consultation');
const Nutritionist = require('../models/Nutritionist');

exports.getSystemReports = async (req, res, next) => {
  try {
    const [users, subscriptions, payments, consultations, nutritionists] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Subscription.countDocuments({ status: 'active' }),
      Payment.aggregate([{ $group: { _id: '$status', total: { $sum: '$amount' }, count: { $sum: 1 } } }]),
      Consultation.countDocuments(),
      Nutritionist.countDocuments({ isApproved: true })
    ]);

    res.status(200).json({
      success: true,
      data: { users, activeSubscriptions: subscriptions, payments, consultations, approvedNutritionists: nutritionists }
    });
  } catch (err) { next(err); }
};

exports.getPendingNutritionists = async (req, res, next) => {
  try {
    const pending = await Nutritionist.find({ isApproved: false }).populate('user', 'name email');
    res.status(200).json({ success: true, data: pending });
  } catch (err) { next(err); }
};

exports.getPendingConsultations = async (req, res, next) => {
  try {
    const pending = await Consultation.find({ status: 'approved_nutritionist' })
      .populate('user', 'name email')
      .populate('nutritionist');
    res.status(200).json({ success: true, data: pending });
  } catch (err) { next(err); }
};
