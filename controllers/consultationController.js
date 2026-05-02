const consultationService = require('../services/consultationService');

exports.book = async (req, res, next) => {
  try {
    const consultation = await consultationService.bookConsultation(req.user.id, req.body);
    res.status(201).json({ success: true, data: consultation });
  } catch (err) { next(err); }
};

exports.getMyConsultations = async (req, res, next) => {
  try {
    const consultations = await consultationService.getUserConsultations(req.user.id);
    res.status(200).json({ success: true, data: consultations });
  } catch (err) { next(err); }
};

exports.getNutritionistConsultations = async (req, res, next) => {
  try {
    const consultations = await consultationService.getNutritionistConsultations(req.params.nutritionistId);
    res.status(200).json({ success: true, data: consultations });
  } catch (err) { next(err); }
};

exports.approveByNutritionist = async (req, res, next) => {
  try {
    const consultation = await consultationService.updateStatus(req.params.id, 'approved_nutritionist');
    res.status(200).json({ success: true, data: consultation });
  } catch (err) { next(err); }
};

exports.approveByAdmin = async (req, res, next) => {
  try {
    const consultation = await consultationService.updateStatus(req.params.id, 'confirmed');
    res.status(200).json({ success: true, data: consultation });
  } catch (err) { next(err); }
};

exports.cancel = async (req, res, next) => {
  try {
    const consultation = await consultationService.cancelConsultation(req.params.id, req.user.id, req.body.reason);
    res.status(200).json({ success: true, data: consultation });
  } catch (err) { next(err); }
};

exports.reschedule = async (req, res, next) => {
  try {
    const consultation = await consultationService.rescheduleConsultation(req.params.id, req.user.id, req.body.newDate);
    res.status(200).json({ success: true, data: consultation });
  } catch (err) { next(err); }
};
