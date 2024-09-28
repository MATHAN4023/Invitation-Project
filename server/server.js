// server.js (or app.js)
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = 'your_secret_key'; // Replace with your actual secret key

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Dummy user for demonstration
const users = [{ email: 'user@example.com', password: 'password123' }]; // Replace with your actual user data

// Login route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Check for user credentials
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Generate a token
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
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
