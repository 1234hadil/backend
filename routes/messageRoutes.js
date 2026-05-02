const express = require('express');
const router = express.Router();
const { createConversation, getMyConversations, sendMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.post('/conversations', protect, createConversation);
router.get('/conversations', protect, getMyConversations);
router.post('/conversations/:conversationId', protect, sendMessage);
router.get('/conversations/:conversationId', protect, getMessages);

module.exports = router;
