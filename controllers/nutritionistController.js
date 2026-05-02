const nutritionistService = require('../services/nutritionistService');

exports.register = async (req, res, next) => {
  try {
    const nutritionist = await nutritionistService.registerNutritionist(req.user.id, req.body);
    res.status(201).json({ success: true, data: nutritionist });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const nutritionists = await nutritionistService.getAllNutritionists();
    res.status(200).json({ success: true, data: nutritionists });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const nutritionist = await nutritionistService.getNutritionistById(req.params.id);
    if (!nutritionist) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: nutritionist });
  } catch (err) { next(err); }
};

exports.approve = async (req, res, next) => {
  try {
    const nutritionist = await nutritionistService.approveNutritionist(req.params.id);
    res.status(200).json({ success: true, data: nutritionist });
  } catch (err) { next(err); }
};

exports.addSlot = async (req, res, next) => {
  try {
    const nutritionist = await nutritionistService.addAvailableSlot(req.user.id, req.body);
    res.status(200).json({ success: true, data: nutritionist });
  } catch (err) { next(err); }
};

exports.getClients = async (req, res, next) => {
  try {
    const clients = await nutritionistService.getClients(req.user.id);
    res.status(200).json({ success: true, data: clients });
  } catch (err) { next(err); }
};
