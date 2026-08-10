const express = require('express');
const router = express.Router();
const { getAptitudeTests, submitAptitudeTest } = require('../controllers/aptitude.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

router.get('/tests', getAptitudeTests);
router.post('/submit', optionalAuth, submitAptitudeTest);

module.exports = router;
