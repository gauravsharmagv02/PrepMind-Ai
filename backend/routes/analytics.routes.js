const express = require('express');
const router = express.Router();
const { getAnalyticsOverview } = require('../controllers/analytics.controller');

router.get('/overview', getAnalyticsOverview);

module.exports = router;
