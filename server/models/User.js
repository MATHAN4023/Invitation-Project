const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is common for both Google and traditional login
  email: { type: String, required: true, unique: true }, // Email must be unique
  password: { type: String }, // For traditional email/password login
  googleId: { type: String, unique: true, sparse: true }, // Google ID, optional for traditional login
  createdAt: { type: Date, default: Date.now }, // Timestamp for user creation
});

// A sparse index allows multiple documents to omit the `googleId` field, only enforcing uniqueness when `googleId` is present.
const User = mongoose.model('User', userSchema);

module.exports = User;
