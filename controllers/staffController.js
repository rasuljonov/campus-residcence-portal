// staffController.js
const { db } = require('../db'); 
const {  } = require('../validations/userValidation')



exports.manageRoomAllocations = async (req, res) => {
    try {
        const rooms = await db.query('SELECT * FROM room');
        res.json({ rooms: rooms.rows });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
    }
};
