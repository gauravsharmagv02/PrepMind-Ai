const { MOCK_CAREER_ROLES } = require('../services/data.service');

const getCareerRecommendations = async (req, res, next) => {
  try {
    const userGoal = req.user?.goal || 'Software Engineer';
    const readinessScore = 78;

    const roles = MOCK_CAREER_ROLES.map(role => {
      let match = role.matchScore;
      if (role.title.toLowerCase().includes(userGoal.toLowerCase())) {
        match = Math.min(98, readinessScore + 10);
      }
      return { ...role, matchScore: match };
    });

    res.json({
      success: true,
      targetGoal: userGoal,
      currentReadiness: readinessScore,
      recommendedRoles: roles
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCareerRecommendations
};
