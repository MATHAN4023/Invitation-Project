const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();
require('dotenv').config();

// Signup route (Email/Password or Google OAuth)
router.post('/signup', async (req, res) => {
  const { name, email, password, googleId } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // If Google ID is provided, create the user without a password
    if (googleId) {
      const newUser = new User({ name, email, googleId });
      await newUser.save();
      return res.status(201).json({ message: 'Google signup successful', user: newUser , code:200});
    }

    // If no Google ID, create user with a hashed password (for email/password signup)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser  , code:200});
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Poor Internet Connection' });
  }
});

// Login route (Email/Password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const trimmedEmail = email.trim();
    const user = await User.findOne({ trimmedEmail });
    console.log(email ,"test enter",user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If user has a Google ID, return an error for login with password
    if (user.googleId) {
      return res.status(400).json({ message: 'Use Google Sign-In for this account' });
    }

    // Compare the provided password with the hashed password in the database
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If the login is successful, generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google OAuth login route (for handling Google Sign-In)
router.post('/google-login', async (req, res) => {
  const { email, googleId, name } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });

    // If the user doesn't exist, create a new one
    if (!user) {
      user = new User({ name, email, googleId });
      await user.save();
    }

    // Generate a token (JWT)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
