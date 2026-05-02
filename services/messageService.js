const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const Consultation = require('../models/Consultation');

const verifyAccess = async (userId, conversationId) => {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) throw Object.assign(new Error('Conversation not found'), { statusCode: 404 });

  const isParticipant = conversation.participants.some(p => p.toString() === userId);
  if (!isParticipant) throw Object.assign(new Error('Access denied'), { statusCode: 403 });

  if (conversation.consultation) {
    const consultation = await Consultation.findById(conversation.consultation);
    if (!['confirmed', 'completed'].includes(consultation?.status)) {
      throw Object.assign(new Error('Chat only available for confirmed consultations'), { statusCode: 403 });
    }
  }
  return conversation;
};

exports.createConversation = async (userId, participantId, consultationId) => {
  const existing = await Conversation.findOne({ participants: { $all: [userId, participantId] } });
  if (existing) return existing;
  return Conversation.create({
    participants: [userId, participantId],
    consultation: consultationId
  });
};

exports.getMyConversations = async (userId) =>
  Conversation.find({ participants: userId })
    .populate('participants', 'name role avatar')
    .populate('lastMessage')
    .sort('-updatedAt');

exports.sendMessage = async (userId, conversationId, content) => {
  const conversation = await verifyAccess(userId, conversationId);
  const message = await Message.create({ conversation: conversationId, sender: userId, content });
  conversation.lastMessage = message._id;
  await conversation.save();
  return message;
};

exports.getMessages = async (userId, conversationId) => {
  await verifyAccess(userId, conversationId);
  return Message.find({ conversation: conversationId }).populate('sender', 'name role').sort('createdAt');
};
