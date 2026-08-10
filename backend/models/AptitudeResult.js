const mongoose = require('mongoose');

const aptitudeResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    score: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    timeSpentSeconds: { type: Number, default: 0 },
    breakdown: { type: Array, default: [] },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AptitudeResult', aptitudeResultSchema);
