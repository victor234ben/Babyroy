
const express = require('express');
const { registerUser, loginUser, validateUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);
router.get('/validate', protect, validateUser)

module.exports = router;
