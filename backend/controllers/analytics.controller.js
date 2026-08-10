const mongoose = require('mongoose');
const Performance = require('../models/Performance');

const getAnalyticsOverview = async (req, res, next) => {
  try {
    let perf = { codingScore: 85, aptitudeScore: 68, interviewScore: 75, resumeScore: 82 };

    if (req.user?.id && mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.user.id)) {
      try {
        const found = await Performance.findOne({ userId: req.user.id });
        if (found) {
          perf = found;
        }
      } catch (e) {}
    }

    res.json({
      success: true,
      performance: perf,
      weeklyActivity: [
        { day: "Mon", codingHours: 2.5, testHours: 1.0 },
        { day: "Tue", codingHours: 3.0, testHours: 0.5 },
        { day: "Wed", codingHours: 1.5, testHours: 2.0 },
        { day: "Thu", codingHours: 4.0, testHours: 1.0 },
        { day: "Fri", codingHours: 2.0, testHours: 1.5 },
        { day: "Sat", codingHours: 5.0, testHours: 2.5 },
        { day: "Sun", codingHours: 3.5, testHours: 1.0 }
      ],
      radarMetrics: [
        { subject: 'Coding', score: perf.codingScore || 85 },
        { subject: 'Aptitude', score: perf.aptitudeScore || 68 },
        { subject: 'Interview', score: perf.interviewScore || 75 },
        { subject: 'Resume ATS', score: perf.resumeScore || 82 },
        { subject: 'System Design', score: 72 },
        { subject: 'Communication', score: 85 }
      ]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalyticsOverview
};
