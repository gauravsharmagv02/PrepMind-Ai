const User = require('../models/User');
const Performance = require('../models/Performance');
const {
  getUserDashboardData,
  getUserPerformanceDoc,
  generatePersonalizedStudyPlan,
  evaluateDiagnosis,
  calculateReadiness
} = require('../services/dashboard.service');

// @desc    Get complete dashboard data for logged-in user
// @route   GET /api/dashboard
// @access  Private
const getDashboardSummary = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Token required to access user dashboard.'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(444 || 404).json({
        success: false,
        message: 'User profile not found.'
      });
    }

    const data = await getUserDashboardData(user);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle study plan task completion status
// @route   PATCH /api/dashboard/study-plan/:taskId
// @access  Private
const toggleStudyPlanTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const perf = await getUserPerformanceDoc(userId);
    const task = perf.studyPlan.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found in study plan.'
      });
    }

    // Toggle status
    if (task.status === 'completed') {
      task.status = 'pending';
      task.completedAt = null;
    } else {
      task.status = 'completed';
      task.completedAt = new Date();
      perf.overall.hasActivity = true;
      perf.overall.lastActivity = new Date();
    }

    // Recalculate readiness & diagnosis
    perf.overall.placementReadiness = calculateReadiness(perf);
    const diagnosis = evaluateDiagnosis(perf);
    perf.strengths = diagnosis.strengths;
    perf.weaknesses = diagnosis.weaknesses;

    await perf.save();

    res.json({
      success: true,
      message: `Task status updated to ${task.status}`,
      studyPlan: perf.studyPlan,
      readinessScore: perf.overall.placementReadiness
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Regenerate personalized AI study plan based on weak areas
// @route   POST /api/dashboard/study-plan/regenerate
// @access  Private
const generateStudyPlan = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const perf = await getUserPerformanceDoc(userId);

    const newPlan = generatePersonalizedStudyPlan(user?.goal || 'Software Engineer', perf);
    perf.studyPlan = newPlan;
    await perf.save();

    res.json({
      success: true,
      message: 'Personalized AI Study Plan regenerated!',
      studyPlan: newPlan
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardSummary,
  toggleStudyPlanTask,
  generateStudyPlan
};
