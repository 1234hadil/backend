const questionnaireService = require('../services/questionnaireService');

exports.submit = async (req, res, next) => {
  try {
    const q = await questionnaireService.submitQuestionnaire(req.params.consultationId, req.user.id, req.body);
    res.status(200).json({ success: true, data: q });
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const q = await questionnaireService.getQuestionnaire(req.params.consultationId);
    if (!q) return res.status(404).json({ success: false, message: 'Questionnaire not found' });
    res.status(200).json({ success: true, data: q });
  } catch (err) { next(err); }
};
