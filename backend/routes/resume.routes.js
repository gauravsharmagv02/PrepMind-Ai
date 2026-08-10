const express = require('express');
const router = express.Router();
const { analyzeResume } = require('../controllers/resume.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

router.post('/analyze', optionalAuth, analyzeResume);

module.exports = router;
