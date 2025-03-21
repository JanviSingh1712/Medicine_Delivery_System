const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "MynameisinavisinghBhadoriyaBE###";

// Route to create a user
router.post("/createuser", 
    body('email').isEmail(), 
    body('name').isLength({ min: 5 }), 
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }), 
    async (req, res) => { 
        const errors = validationResult(req); 
        if (!errors.isEmpty()) { 
            console.log('Validation Errors:', errors.array()); 
            return res.status(400).json({ errors: errors.array() }); 
        }

        console.log('Request Body:', req.body); 
        try { 
            const salt = await bcrypt.genSalt(10); 
            let secPassword = await bcrypt.hash(req.body.password, salt); 
            
            await User.create({ 
                name: req.body.name, 
                location: req.body.location, 
                email: req.body.email, 
                password: secPassword 
            }); 
            res.json({ success: true }); 
        } catch (error) { 
            console.error(error); 
            res.status(500).json({ success: false, error: error.message }); 
        } 
    }
); 

// User login route
router.post("/loginuser", 
    body('email').isEmail(), 
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }), 
    async (req, res) => { 
        const errors = validationResult(req); 
        if (!errors.isEmpty()) { 
            console.log('Validation Errors:', errors.array()); 
            return res.status(400).json({ errors: errors.array() }); 
        }

        const { email, password } = req.body; 
        try { 
            let userData = await User.findOne({ email: email }); 
            if (!userData) { 
                return res.status(400).json({ errors: "Invalid email. Please verify the email!" }); 
            }

            const passwordMatch = await bcrypt.compare(password, userData.password); 
            if (!passwordMatch) { 
                return res.status(400).json({ errors: "Incorrect password. Please verify the password!" }); 
            }

            const data = { 
                user: {
                    id: userData.id 
                } 
            };
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken }); 
        } catch (error) { 
            console.error(error); 
            res.status(500).json({ success: false, error: error.message }); 
        } 
    }
); 

module.exports = router;
