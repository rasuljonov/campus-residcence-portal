const express = require('express');
const studentController = require('../controllers/studentController')
const router = express.Router();
const checkRole = require('../middleware/auth')


router.get('/rooms', checkRole('Student'), studentController.viewRoomDetails);
router.post('/room-request', checkRole('Student'), studentController.submitRoomRequest); // Example for room request post route


module.exports = router;