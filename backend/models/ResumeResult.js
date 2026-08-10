const mongoose = require('mongoose');

const resumeResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    atsScore: { type: Number, required: true },
    formattingScore: { type: Number, required: true },
    detectedSkills: { type: [String], default: [] },
    missingKeywords: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    analyzedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeResult', resumeResultSchema);
