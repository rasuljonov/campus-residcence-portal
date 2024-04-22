// middleware/checkRole.js

const jwt = require('jsonwebtoken');
const { APP } = require('../config');

const checkRole = (roleRequired) => (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authentication failed" });
    }

    try {
        const decoded = jwt.verify(token, APP.SECRET_KEY);
        if (decoded.role !== roleRequired) {
            return res.status(403).json({ message: "Access denied: insufficient permissions" });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = checkRole;
