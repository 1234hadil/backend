const aiService = require('../services/aiService');

exports.analyzeMeal = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const analysis = await aiService.analyzeMeal(
      req.user.id,
      imageUrl
    );

    res.status(201).json({
      success: true,
      data: analysis
    });

  } catch (err) {

    console.error("AI ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getCalorieEstimate = async (req, res) => {
  try {

    const estimate = await aiService.getCalorieEstimate(req.params.id);

    res.status(200).json({
      success: true,
      data: estimate
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getAlternatives = async (req, res) => {
  try {

    const alternatives = await aiService.suggestAlternatives(req.params.id);

    res.status(200).json({
      success: true,
      data: alternatives
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getHistory = async (req, res) => {
  try {

    const history = await aiService.getUserAnalysisHistory(req.user.id);

    res.status(200).json({
      success: true,
      data: history
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getAnalysis = async (req, res) => {
  try {

    const analysis = await aiService.getAnalysisById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.status(200).json({
      success: true,
      data: analysis
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};