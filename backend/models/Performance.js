const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    coding: {
      attempted: { type: Number, default: 0 },
      solved: { type: Number, default: 0 },
      easySolved: { type: Number, default: 0 },
      mediumSolved: { type: Number, default: 0 },
      hardSolved: { type: Number, default: 0 },
      score: { type: Number, default: 0 },
      accuracy: { type: Number, default: 0 },
      streak: { type: Number, default: 0 }
    },
    aptitude: {
      testsAttempted: { type: Number, default: 0 },
      questionsAttempted: { type: Number, default: 0 },
      questionsCorrect: { type: Number, default: 0 },
      score: { type: Number, default: 0 },
      accuracy: { type: Number, default: 0 }
    },
    interview: {
      completed: { type: Number, default: 0 },
      score: { type: Number, default: 0 },
      technicalScore: { type: Number, default: 0 },
      communicationScore: { type: Number, default: 0 },
      confidenceScore: { type: Number, default: 0 }
    },
    resume: {
      uploaded: { type: Boolean, default: false },
      atsScore: { type: Number, default: 0 },
      formattingScore: { type: Number, default: 0 },
      lastAnalyzed: { type: Date }
    },
    overall: {
      placementReadiness: { type: Number, default: null },
      hasActivity: { type: Boolean, default: false },
      streak: { type: Number, default: 0 },
      lastActivity: { type: Date }
    },
    strengths: {
      type: [String],
      default: []
    },
    weaknesses: {
      type: [String],
      default: []
    },
    studyPlan: [
      {
        id: { type: String, required: true },
        day: { type: Number, required: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        duration: { type: String, default: '30 mins' },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
        completedAt: { type: Date }
      }
    ],
    recentActivity: [
      {
        id: { type: String, required: true },
        type: { type: String, required: true }, // coding, aptitude, interview, resume
        title: { type: String, required: true },
        resultText: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Performance', performanceSchema);
