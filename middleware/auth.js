    // // auth.js

    // const jwt = require('jsonwebtoken');
    // const { APP } = require('../config'); // Ensure APP config includes SECRET_KEY

    // // Middleware to authenticate token
    // const authenticateToken = (req, res, next) => {
    //     const authHeader = req.headers['authorization'];
    //     const token = authHeader && authHeader.split(' ')[1]; // Bearer Token

    //     if (!token) {
    //         return res.status(401).json({ message: "No token provided, authorization denied." });
    //     }

    //     jwt.verify(token, APP.SECRET_KEY, (err, decoded) => {
    //         if (err) {
    //             return res.status(403).json({ message: "Token is not valid." });
    //         }

    //         req.user = decoded; // Attach decoded token to request
    //         next();
    //     });
    // };


    // const checkRole = (roleRequired) => (req, res, next) => {
    //     const token = req.headers.authorization?.split(" ")[1];
    //     if (!token) {
    //         return res.status(401).json({message: "Authentication failed"});

    //     }

    //     try {

    //         const decoded = jwt.verify(token, APP.SECRET_KEY);
    //         if (decoded.role !== roleRequired) {
    //             return res.status(403).json({message: "Access denied insufficient permission"});

    //         }
    
            
    //         next()

    //     }catch(error) {
    //         return res.status(400).json({message: "Invalid token"});
    //     }
    // }

    // module.exports = {
    //     checkRole
    // };
    // auth.js

    const jwt = require('jsonwebtoken');
    const { APP } = require('../config'); // Ensure APP config includes SECRET_KEY

    // Middleware to authenticate token and attach user to request
    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer Token

        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied." });
        }

        jwt.verify(token, APP.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token is not valid." });
            }

            req.user = decoded; // Attach decoded token to request
            next();
        });
    };

    // Middleware to check user role
    const checkRole = (roleRequired) => (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({message: "Authentication required"});
        }

        if (req.user.role !== roleRequired) {
            return res.status(403).json({message: "Access denied: insufficient permissions"});
        }

        next();  // Proceed if role matches
    }

    module.exports = {
        authenticateToken,
        checkRole
    };
