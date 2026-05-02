const Questionnaire = require('../models/Questionnaire');
const Consultation = require('../models/Consultation');

exports.submitQuestionnaire = async (consultationId, userId, data) => {
  const consultation = await Consultation.findOne({ _id: consultationId, clientId: userId });
  if (!consultation) throw Object.assign(new Error('Consultation not found'), { statusCode: 404 });

  return Questionnaire.findOneAndUpdate(
    { consultation: consultationId },
    { consultation: consultationId, ...data },
    { new: true, upsert: true, runValidators: true }
  );
};

exports.getQuestionnaire = async (consultationId) =>
  Questionnaire.findOne({ consultation: consultationId });
