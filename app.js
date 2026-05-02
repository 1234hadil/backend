const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));
app.use('/api/questionnaire', require('./routes/questionnaireRoutes'));
app.use('/api/nutritionists', require('./routes/nutritionistRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/meals', require('./routes/mealRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.use(errorHandler);

module.exports = app;
