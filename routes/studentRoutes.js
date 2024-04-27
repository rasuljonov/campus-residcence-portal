const express = require('express');
const studentController = require('../controllers/studentController')
const router = express.Router();
const { checkRole, authenticateToken } = require('../middleware/auth')


router.get('/rooms', authenticateToken, checkRole('Student'), studentController.viewRoomDetails);

// Endpoint to submit a room request, accessible only to 'Student' role
router.post('/room-request', authenticateToken, checkRole('Student'), studentController.submitRoomRequest);

module.exports = router;