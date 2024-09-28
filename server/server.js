require('dotenv').config(); // To load environment variables
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Import your authentication routes

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Use your JWT secret from .env or default value

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB(); // Connect to the database

// Routes
app.use('/api/auth', authRoutes); // Use your auth routes

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Save user info to request
    next();
  });
};

// Example protected route
app.get('/api/protected-route', authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route.", user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
