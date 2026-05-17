require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Nutritionist = require('./models/Nutritionist');

async function createNutritionist() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: 'nutritionist@test.com' });
  if (existing) {
    console.log('Nutritionist already exists:', existing.email);
    process.exit();
  }

  const user = await User.create({
    name: 'Dr. Hadil',
    email: 'nutritionist@test.com',
    password: 'Nutri1234',
    role: 'nutritionist',
  });

  await Nutritionist.create({
    user: user._id,
    specialization: 'Clinical Nutrition',
    bio: 'Experienced nutritionist',
    experience: 5,
    isApproved: true,
  });

  console.log('Nutritionist has been created successfully');
  console.log(' Email:', user.email);
  console.log(' Password: Nutri1234');
  process.exit();
}

createNutritionist();