const mongoose = require('mongoose');

const codingSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    problemId: { type: String, required: true },
    language: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: String, default: 'WRONG_ANSWER' }, // ACCEPTED, WRONG_ANSWER, RUNTIME_ERROR, SYNTAX_ERROR, TIME_LIMIT_EXCEEDED, EXECUTION_ERROR
    passedAll: { type: Boolean, required: true },
    passedTestCases: { type: Number, default: 0 },
    totalTestCases: { type: Number, default: 0 },
    executionTime: { type: String, default: '0ms' },
    testResults: { type: Array, default: [] },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CodingSubmission', codingSubmissionSchema);
