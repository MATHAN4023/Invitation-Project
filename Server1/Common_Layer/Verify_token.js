const jwt = require('jsonwebtoken');
const SECRET_KEY = 'CodeFlink@Product$567';


// Middleware to Verify Token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(req.headers);
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = {verifyToken}