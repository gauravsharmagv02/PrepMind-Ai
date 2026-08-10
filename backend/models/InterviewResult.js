const mongoose = require('mongoose');

const interviewResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    questionId: { type: String, required: true },
    userAnswer: { type: String, required: true },
    overallScore: { type: Number, required: true },
    confidenceScore: { type: Number, required: true },
    communicationScore: { type: Number, required: true },
    correctnessScore: { type: Number, required: true },
    evaluatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('InterviewResult', interviewResultSchema);
