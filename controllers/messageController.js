const messageService = require('../services/messageService');

exports.createConversation = async (req, res, next) => {
  try {
    const { participantId, consultationId } = req.body;
    const conversation = await messageService.createConversation(req.user.id, participantId, consultationId);
    res.status(201).json({ success: true, data: conversation });
  } catch (err) { next(err); }
};

exports.getMyConversations = async (req, res, next) => {
  try {
    const conversations = await messageService.getMyConversations(req.user.id);
    res.status(200).json({ success: true, data: conversations });
  } catch (err) { next(err); }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const message = await messageService.sendMessage(req.user.id, req.params.conversationId, req.body.content);
    res.status(201).json({ success: true, data: message });
  } catch (err) { next(err); }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getMessages(req.user.id, req.params.conversationId);
    res.status(200).json({ success: true, data: messages });
  } catch (err) { next(err); }
};
