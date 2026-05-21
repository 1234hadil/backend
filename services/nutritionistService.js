const Nutritionist = require('../models/Nutritionist');

exports.registerNutritionist = async (userId, data) => {
  const existing = await Nutritionist.findOne({ user: userId });
  if (existing) throw Object.assign(new Error('Profile already exists'), { statusCode: 400 });
  return Nutritionist.create({ user: userId, ...data });
};

exports.getAllNutritionists = async () =>
  Nutritionist.find({ isApproved: true }).populate('user', 'name email avatar');

exports.getNutritionistById = async (id) =>
  Nutritionist.findById(id).populate('user', 'name email avatar');

exports.approveNutritionist = async (id) =>
  Nutritionist.findByIdAndUpdate(id, { isApproved: true }, { new: true });

exports.addAvailableSlot = async (userId, slotData) => {
  const nutritionist = await Nutritionist.findOne({ user: userId });
  if (!nutritionist) throw Object.assign(new Error('Nutritionist profile not found'), { statusCode: 404 });
  nutritionist.availableSlots.push(slotData);
  return nutritionist.save();
};

exports.getClients = async (userId) => {
  const nutritionist = await Nutritionist.findOne({ user: userId }).populate('clients', 'name email');
  if (!nutritionist) throw Object.assign(new Error('Profile not found'), { statusCode: 404 });
  return nutritionist.clients;
};




