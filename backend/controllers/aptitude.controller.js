const AptitudeResult = require('../models/AptitudeResult');
const { MOCK_APTITUDE_TESTS } = require('../services/data.service');
const { getUserPerformanceDoc, calculateReadiness, evaluateDiagnosis, appendRecentActivity } = require('../services/dashboard.service');

const getAptitudeTests = async (req, res) => {
  const { section } = req.query;
  let questions = MOCK_APTITUDE_TESTS;

  if (section && section !== 'All') {
    questions = questions.filter(q => q.section.toLowerCase().includes(section.toLowerCase()));
  }

  res.json({
    success: true,
    count: questions.length,
    questions
  });
};

const submitAptitudeTest = async (req, res, next) => {
  try {
    const { answers = {}, timeSpentSeconds = 0 } = req.body;
    let totalQuestions = MOCK_APTITUDE_TESTS.length;
    let correctCount = 0;
    let breakdown = [];

    MOCK_APTITUDE_TESTS.forEach(q => {
      const userChoice = answers[q.id];
      const isCorrect = userChoice !== undefined && Number(userChoice) === q.answerIndex;
      if (isCorrect) correctCount++;

      breakdown.push({
        questionId: q.id,
        section: q.section,
        question: q.question,
        userAnswer: userChoice !== undefined ? q.options[userChoice] : 'Not Answered',
        correctAnswer: q.options[q.answerIndex],
        isCorrect,
        explanation: q.explanation
      });
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    if (req.user?.id) {
      try {
        await AptitudeResult.create({
          userId: req.user.id,
          score: scorePercentage,
          correctCount,
          totalQuestions,
          timeSpentSeconds,
          breakdown
        });

        const perf = await getUserPerformanceDoc(req.user.id);
        perf.aptitude.testsAttempted = (perf.aptitude.testsAttempted || 0) + 1;
        perf.aptitude.questionsAttempted = (perf.aptitude.questionsAttempted || 0) + totalQuestions;
        perf.aptitude.questionsCorrect = (perf.aptitude.questionsCorrect || 0) + correctCount;
        perf.aptitude.score = scorePercentage;
        perf.aptitude.accuracy = Math.round((perf.aptitude.questionsCorrect / perf.aptitude.questionsAttempted) * 100);

        perf.overall.hasActivity = true;
        perf.overall.lastActivity = new Date();

        appendRecentActivity(
          perf,
          'aptitude',
          `✓ Completed Aptitude Assessment`,
          `Scored ${scorePercentage}% (${correctCount}/${totalQuestions})`
        );

        perf.overall.placementReadiness = calculateReadiness(perf);
        const diagnosis = evaluateDiagnosis(perf);
        perf.strengths = diagnosis.strengths;
        perf.weaknesses = diagnosis.weaknesses;

        perf.markModified('aptitude');
        perf.markModified('overall');
        perf.markModified('recentActivity');
        await perf.save();
      } catch (dbErr) {
        console.warn('Non-critical: Aptitude test tracking warning:', dbErr.message);
      }
    }

    res.json({
      success: true,
      score: scorePercentage,
      correctCount,
      totalQuestions,
      timeSpentSeconds,
      breakdown,
      aiAdvice: scorePercentage >= 80
        ? 'Outstanding aptitude speed! You are ready for top product company diagnostic rounds.'
        : 'Focus on Quantitative speed-time shortcuts and verbal antonym patterns to reach 85%+.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAptitudeTests,
  submitAptitudeTest
};
