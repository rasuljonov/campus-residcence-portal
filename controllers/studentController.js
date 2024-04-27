const { db } = require('../db'); 
const { roomRequestSchema } = require('../validations/userValidation')

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
    const userId = req.user.userId; // Assuming userId is included in JWT
    const { roomId, requestType, requestDetails } = req.body; // Ensure these are provided in the request

    const { error } = roomRequestSchema.validate({ roomId, requestType, requestDetails });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Check if the room is available
        const available = await db.query('SELECT available FROM room WHERE room_id = $1', [roomId]);
        if (available.rows.length === 0 || !available.rows[0].available) {
            return res.status(400).json({ message: 'Room not available or does not exist' });
        }

        // Ensure no existing active request for the same room by the same user (if necessary)
        const existingRequest = await db.query('SELECT * FROM request WHERE user_id = $1 AND room_id = $2', [userId, roomId]);
        if (existingRequest.rows.length > 0) {
            return res.status(400).json({ message: 'You have already submitted a request for this room' });
        }

        // Insert the room request into the database
        const { rows } = await db.query('INSERT INTO request (user_id, room_id, request_type, request_details) VALUES ($1, $2, $3, $4) RETURNING *', 
            [userId, roomId, requestType, requestDetails]);
        res.status(201).json({ message: 'Room request submitted successfully', request: rows[0] });
    } catch (error) {
        console.error('Error submitting room request:', error);
        res.status(500).json({ message: 'Failed to submit room request' });
    }
};


// exports.submitRoomRequest = async (req, res) => {
//     const  userId = req.user.userId; // Assuming userId is included in JWT
//     const { roomId } = req.body; // Extract roomId from the client request

//      const { error } = roomRequestSchema.validate({ roomId });
//     if (error) {
//         return res.status(400).json({ message: error.details[0].message });
//     }

//     try {
//         // Check if the room is available
//         const available = await db.query('SELECT available FROM room WHERE room_id = $1', [roomId]);
//         if (available.rows.length === 0 || !available.rows[0].available) {
//             return res.status(400).json({ message: 'Room not available or does not exist' });
//         }

//         // Additional check: Ensure no existing active request for the same room
//         const existingRequest = await db.query('SELECT * FROM request WHERE user_id = $1 AND room_id = $2 AND request_details = $3', [userId, roomId, 'pending']);
//         if (existingRequest.rows.length > 0) {
//             return res.status(400).json({ message: 'You have already submitted a request for this room' });
//         }

//         // Insert the room request into the database
//         const { rows } = await db.query('INSERT INTO request (user_id, room_id) VALUES ($1, $2) RETURNING *', [userId, roomId]);
//         res.status(201).json({ message: 'Room request submitted successfully', request: rows[0] });
//     } catch (error) {
//         console.error('Error submitting room request:', error);
//         res.status(500).json({ message: 'Failed to submit room request' });
//     }
// };