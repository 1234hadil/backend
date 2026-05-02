const Consultation = require('../models/Consultation');
const Nutritionist = require('../models/Nutritionist');

exports.bookConsultation = async (userId, data) => {
  const nutritionist = await Nutritionist.findById(data.nutritionistId);
  if (!nutritionist || !nutritionist.isApproved) {
    throw Object.assign(new Error('Nutritionist not available'), { statusCode: 400 });
  }

  const slotIndex = nutritionist.availableSlots.findIndex(s => 
    new Date(s.date).toISOString() === new Date(data.scheduledAt).toISOString() && 
    !s.isBooked
  );

  if (slotIndex === -1) {
    throw Object.assign(new Error('Time slot not available or already booked'), { statusCode: 400 });
  }


  nutritionist.availableSlots[slotIndex].isBooked = true;
  
  
  nutritionist.markModified('availableSlots');
  await nutritionist.save();


  return Consultation.create({
    clientId: userId,
    nutritionistId: data.nutritionistId,
    subscription: data.subscriptionId,
    scheduledAt: data.scheduledAt
  });
};

exports.getUserConsultations = async (userId) =>
  Consultation.find({ clientId: userId }).populate('nutritionistId').sort('-createdAt');

exports.getNutritionistConsultations = async (nutritionistId) =>
  Consultation.find({ nutritionistId }).populate('clientId', 'name email').sort('-createdAt');

exports.updateStatus = async (id, status, extra = {}) =>
  Consultation.findByIdAndUpdate(id, { status, ...extra }, { new: true });

exports.cancelConsultation = async (id, userId, reason) => {
  const consultation = await Consultation.findOne({ _id: id, clientId: userId });
  if (!consultation) throw Object.assign(new Error('Consultation not found'), { statusCode: 404 });
  consultation.status = 'cancelled';
  consultation.cancelReason = reason;
  return consultation.save();

};

exports.rescheduleConsultation = async (id, userId, newDate) => {
  const consultation = await Consultation.findOne({ _id: id, clientId: userId });
  if (!consultation) throw Object.assign(new Error('Consultation not found'), { statusCode: 404 });
  consultation.status = 'rescheduled';
  consultation.rescheduledTo = newDate;
  return consultation.save();
};
