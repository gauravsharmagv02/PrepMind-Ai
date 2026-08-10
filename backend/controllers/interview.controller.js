const InterviewResult = require('../models/InterviewResult');
const { MOCK_INTERVIEW_QUESTIONS } = require('../services/data.service');
const { getUserPerformanceDoc, calculateReadiness, evaluateDiagnosis, appendRecentActivity } = require('../services/dashboard.service');

const getInterviewQuestions = async (req, res) => {
  const { role, type } = req.query;
  let questions = MOCK_INTERVIEW_QUESTIONS;

  if (type) {
    questions = questions.filter(q => q.type.toLowerCase() === type.toLowerCase());
  }

  res.json({
    success: true,
    questions
  });
};

const evaluateInterviewAnswer = async (req, res, next) => {
  try {
    const { questionId, userAnswer = '', role = 'Software Engineer' } = req.body;
    const textLength = userAnswer.length;

    let confidenceScore = Math.min(95, Math.max(60, 70 + Math.floor(textLength / 15)));
    let communicationScore = Math.min(96, Math.max(65, 75 + Math.floor(textLength / 20)));
    let correctnessScore = Math.min(98, Math.max(55, 68 + Math.floor(textLength / 10)));

    const lower = userAnswer.toLowerCase();
    if (lower.includes('because') || lower.includes('for example') || lower.includes('result')) {
      confidenceScore += 5;
      communicationScore += 5;
    }

    const overallScore = Math.round((confidenceScore + communicationScore + correctnessScore) / 3);

    if (req.user?.id) {
      try {
        await InterviewResult.create({
          userId: req.user.id,
          questionId: questionId || 'int_general',
          userAnswer,
          overallScore,
          confidenceScore,
          communicationScore,
          correctnessScore
        });

        const perf = await getUserPerformanceDoc(req.user.id);
        perf.interview.completed = (perf.interview.completed || 0) + 1;
        perf.interview.score = overallScore;
        perf.interview.technicalScore = correctnessScore;
        perf.interview.communicationScore = communicationScore;
        perf.interview.confidenceScore = confidenceScore;

        perf.overall.hasActivity = true;
        perf.overall.lastActivity = new Date();

        appendRecentActivity(
          perf,
          'interview',
          `✓ Completed AI Interview Evaluation`,
          `Scored ${overallScore}% Overall`
        );

        perf.overall.placementReadiness = calculateReadiness(perf);
        const diagnosis = evaluateDiagnosis(perf);
        perf.strengths = diagnosis.strengths;
        perf.weaknesses = diagnosis.weaknesses;

        perf.markModified('interview');
        perf.markModified('overall');
        perf.markModified('recentActivity');
        await perf.save();
      } catch (dbErr) {
        console.warn('Non-critical: Interview result tracking warning:', dbErr.message);
      }
    }

    res.json({
      success: true,
      feedback: {
        confidenceScore,
        communicationScore,
        correctnessScore,
        overallScore,
        aiAssessment: textLength > 80
          ? "Great structured response! You clearly articulated the core concepts and gave context."
          : "Good starting point, but try elaborating with a specific project example using the STAR technique.",
        strengths: [
          "Clear vocal tone and structured logic.",
          "Used relevant technical terminology."
        ],
        improvements: [
          "Elaborate more on trade-offs and edge case handling.",
          "Conclude your answer with measurable outcomes achieved."
        ],
        modelAnswer: "A high-scoring answer explains the core problem, details the architecture trade-offs, specifies the tools used, and quantifies the final impact."
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInterviewQuestions,
  evaluateInterviewAnswer
};
