const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Define the registration route


router.post('/register', register)
// router.post('/login', login);
router.post('/login', login);

module.exports = router;
