const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Define the registration route


// router.post('/register', register)
// r
router.post('/login', login);

module.exports = router;
