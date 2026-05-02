const mongoose = require('mongoose');
// import bcrypt for password hashing
const bcrypt = require('bcryptjs');
// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['client', 'nutritionist', 'admin'], default: 'client' },
  phone: String,
  avatar: String,
  isActive: { type: Boolean, default: true },
  isSuspended: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });
// Pre-save hook to hash password if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};
// Export the User model
module.exports = mongoose.model('User', userSchema);
