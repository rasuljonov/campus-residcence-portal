// staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authenticateToken, checkRole } = require('../middleware/auth');

router.get('/rooms', authenticateToken, checkRole('Staff'), staffController.manageRoomAllocations);
router.put('/rooms/:id', authenticateToken, checkRole('Staff'), staffController.updateRoomStatus);
router.get('/maintenance-requests', authenticateToken, checkRole('Staff'), staffController.viewMaintenanceRequests);
router.put('/maintenance-requests/:id', authenticateToken, checkRole('Staff'), staffController.updateMaintenanceStatus);
router.get('/students', authenticateToken, checkRole('Staff'), staffController.viewStudentDetails);

module.exports = router;
