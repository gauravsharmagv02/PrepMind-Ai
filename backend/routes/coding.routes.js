const express = require('express');
const router = express.Router();
const { getCodingProblems, getCodingProblemById, runCode, getAiFeedback } = require('../controllers/coding.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

router.get('/problems', getCodingProblems);
router.get('/problems/:id', getCodingProblemById);
router.post('/run', optionalAuth, runCode);
router.post('/ai-feedback', optionalAuth, getAiFeedback);

module.exports = router;
