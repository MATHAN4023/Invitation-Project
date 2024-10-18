require('dotenv').config(); // To load environment variables
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Import your authentication routes
const axios = require('axios');


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

// Sign-up endpoint
const usersDatabase = {};
app.post('/auth/signup', async (req, res) => {
  const {token}  = req.body;
  // console.log("req :",token);
  
  try {
      // Verify Google OAuth token by sending it to Google’s API
      const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
      const { email, name, picture } = googleResponse.data;

      if (usersDatabase[email]) {
          return res.status(400).json({ message: 'User already exists, please sign in' });
      }

      const newUser = { email, name, picture };
      console.log("newUser :",newUser);

      // Store in db
      usersDatabase[email] = newUser;

      // Respond with success message or create a session token if needed
      res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({ message: 'Sign-up failed' });
  }
});

app.post('/auth/signin', async (req, res) => {
  const { token } = req.body;
  try {
      const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
      const { email } = googleResponse.data;
      // Check if user exists in the database
      const user = usersDatabase[email];
      if (!user) {
          return res.status(404).json({ message: 'User not found, please sign up' });
      }

      // User exists, create session or generate a JWT
      // You could also generate a session token here (JWT or other mechanism)
      res.status(200).json({ message: 'Sign-in successful', user });

  } catch (error) {
      console.error('Error during sign-in:', error);
      res.status(500).json({ message: 'Sign-in failed' });
  }
});



// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Save user info to request
    next(); // Continue to the next middleware or route handler
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
