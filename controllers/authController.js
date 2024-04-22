const bcrypt = require('bcrypt');
const { db } = require('../db'); 
const jwt = require('jsonwebtoken')
const {APP} = require('../config')
const { registerSchema, loginSchema } = require('../validations/userValidation');



// Registration controller
exports.register = async (req, res) => {
    const { username, password, phone, role } = req.body;

    // Validate incoming data
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: true,
            message: error.details[0].message,
        });
    }

   
    try {

 // Check if user already exists
        const userExistsResult = await db.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (userExistsResult.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists' }); // Should be displayed to user 
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert new user into the database
        const result = await db.query(
            'INSERT INTO users (username, password_hash, phone_number, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, hashedPassword, phone, role]
        );
        
        return res.status(201).json({
            message: "Registration successful",
            user: result.rows[0]
        });
       

    } catch (error) {
        // Log the error internally
        console.error('Registration error:', error);

        // Handle specific database errors or general errors
        if (error.code === '23505') {  // Unique violation error code
            return res.status(409).json({ message: 'Username already taken' });
        }
        
        // Return a general error message
        return res.status(500).json({ message: 'Error registering user' });
    }
};

// Login controller
exports.login = async (req, res) => {
    const { username, password } = req.body;

    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ // Use status 400 for bad requests
          error: true,
          message: error.details[0].message
        });
    }

    try {
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({userId: rows[0].id, role: rows[0].role}, APP.SECRET_KEY, {expiresIn: APP.EXPIRE_TIME || '1h'});
        

        res.json({
            message: 'Login successful',
            token: token
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in');
    }
};
