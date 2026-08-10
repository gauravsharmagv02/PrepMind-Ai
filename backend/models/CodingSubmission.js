const mongoose = require('mongoose');

const codingSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    problemId: { type: String, required: true },
    language: { type: String, required: true },
    code: { type: String, required: true },
    passedAll: { type: Boolean, required: true },
    testResults: { type: Array, default: [] },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CodingSubmission', codingSubmissionSchema);
