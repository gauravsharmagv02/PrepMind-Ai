const express = require('express');
const router = express.Router();
const { getDashboardSummary, toggleStudyPlanTask, generateStudyPlan } = require('../controllers/dashboard.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', getDashboardSummary);
router.get('/summary', getDashboardSummary);
router.patch('/study-plan/:taskId', toggleStudyPlanTask);
router.post('/study-plan/regenerate', generateStudyPlan);

module.exports = router;
