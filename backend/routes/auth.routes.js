const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser, updateGoal } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', registerUser);
router.post('/signup', registerUser); // Alias
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', authMiddleware, getCurrentUser);
router.post('/goal', authMiddleware, updateGoal);

module.exports = router;
