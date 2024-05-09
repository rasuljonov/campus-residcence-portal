const { db } = require('../db'); 
const { roomRequestSchema } = require('../validations/userValidation')
const jwt = require('jsonwebtoken')


exports.viewRoomDetails = async  (req, res) => {
    try {

        const { rows } = await db.query('SELECT * FROM room WHERE available = true');
        console.log(res.json(rows))

    }catch(error) {
        console.log('Error fetching room details: ', error)
        res.status(500).json({ message: 'Failed to retrieve room details'})

    }
}

exports.submitRoomRequest = async (req, res) => {
    const  userId  = req.user
    console.log('helloFRomSubmit',req.user)
    console.log('secondHelloFromSubmit', req.user.user_Id)
    const { roomId, passportNumber, city } = req.body;
    console.log(req)

    // Validate input
    const { error } = roomRequestSchema.validate({ roomId, passportNumber, city });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const available = await db.query('SELECT * FROM room WHERE room_id = $1', [roomId]);
        if (available.rows.length === 0 || !available.rows[0].available) {
            return res.status(400).json({ message: 'Room not available' });
        }

        const existingRequest = await db.query(
            'SELECT * FROM request WHERE user_id = $1 AND room_id = $2',
            [userId, roomId]

            
        );

        if (existingRequest.rows.length > 0) {
            return res.status(400).json({ message: 'Request already submitted' });
        }

        console.log(existingRequest.rows)
        // Insert the room request with additional details
        const result = await db.query(
            'INSERT INTO request (user_id, room_id, passport_number, city) VALUES ($1, $2, $3, $4) RETURNING *', 
            [userId, roomId, passportNumber, city]
        );
        res.status(201).json({ message: 'Request submitted successfully', request: result.rows[0] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to submit request' });
    }
};
