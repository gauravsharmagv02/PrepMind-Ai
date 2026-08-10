const express = require('express');
const router = express.Router();
const { getInterviewQuestions, evaluateInterviewAnswer } = require('../controllers/interview.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

router.get('/questions', getInterviewQuestions);
router.post('/evaluate', optionalAuth, evaluateInterviewAnswer);

module.exports = router;
