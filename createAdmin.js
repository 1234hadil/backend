require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: 'admin@admin.com' });
  if (existing) {
    console.log('Admin already exists:', existing.email);
    process.exit();
  }

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'Admin1234',
    role: 'admin',
  });

  console.log('the admin has been created successfully');
  console.log(' Email:', admin.email);
  console.log(' Password: Admin1234');
  process.exit();
}

createAdmin();