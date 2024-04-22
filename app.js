const express = require('express');
const cors = require('cors'); 
const { APP } = require('./config')
const authRoutes = require('./routes/authRoutes')
const studenRoutes = require('./routes/studentRoutes')
const app = express();

app.use(express.json());
app.use(express.static('public')); 
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to campus residence portal');
});


app.use('/auth', authRoutes);  // Mounting auth routes
app.use('/students', studenRoutes)

app.listen(APP.PORT, () => console.log(`Server listen http://localhost:${APP.PORT}`));

/// I am stopped at implementing other routes

// const express = require('express');
// const router = express.Router();
// const studentController = require('../controllers/studentController');
// const staffController = require('../controllers/staffController');
// const adminController = require('../controllers/adminController');
// const { checkRole } = require('../middleware/authMiddleware'); // Assuming you have this middleware

// // Student routes
// router.get('/rooms', checkRole('Student'), studentController.viewRooms);
// router.post('/request-room', checkRole('Student'), studentController.requestRoom);
// router.post('/maintenance-request', checkRole('Student'), studentController.maintenanceRequest);
// router.get('/announcements', checkRole('Student'), studentController.viewAnnouncements);

// // Staff routes
// router.get('/manage-room-allocations', checkRole('Staff'), staffController.manageRoomAllocations);
// router.post('/manage-maintenance', checkRole('Staff'), staffController.manageMaintenance);

// // Admin routes
// router.get('/user-management', checkRole('Admin'), adminController.manageUsers);
// router.post('/generate-reports', checkRole('Admin'), adminController.generateReports);

// module.exports = router;

//https://chat.openai.com/share/9beec6f3-78b7-4134-8df8-755d4ca000c0