const express = require('express');
const router = express.Router();
const { getCareerRecommendations } = require('../controllers/career.controller');

router.get('/recommendations', getCareerRecommendations);

module.exports = router;
