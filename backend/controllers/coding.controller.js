const { MOCK_CODING_PROBLEMS } = require('../services/data.service');
const CodingSubmission = require('../models/CodingSubmission');
const { runUserCode } = require('../services/codeRunner.service');
const { getUserPerformanceDoc, calculateReadiness, evaluateDiagnosis, appendRecentActivity } = require('../services/dashboard.service');

const getCodingProblems = async (req, res) => {
  const { difficulty, category } = req.query;
  let filtered = MOCK_CODING_PROBLEMS;
  
  if (difficulty && difficulty !== 'All') {
    filtered = filtered.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  res.json({
    success: true,
    count: filtered.length,
    problems: filtered
  });
};

const getCodingProblemById = async (req, res) => {
  const problem = MOCK_CODING_PROBLEMS.find(p => p.id === req.params.id) || MOCK_CODING_PROBLEMS[0];
  res.json({
    success: true,
    problem
  });
};

/**
 * Run Code: Execute user code against visible test cases ONLY.
 * Does NOT save to database, does NOT update user solved counts.
 */
const runCode = async (req, res, next) => {
  try {
    const { problemId, language, code } = req.body;
    const problem = MOCK_CODING_PROBLEMS.find(p => p.id === problemId) || MOCK_CODING_PROBLEMS[0];

    if (language !== 'javascript') {
      return res.json({
        success: false,
        status: 'EXECUTION_ERROR',
        output: `Execution error: ${language ? language.toUpperCase() : 'Selected language'} is coming soon. Only JavaScript execution is currently supported.`,
        passed: 0,
        total: (problem.visibleTestCases || []).length,
        testResults: [],
        timeSpent: '0ms',
        memorySpent: '0 MB'
      });
    }

    const cleanCode = (code || '').trim();
    const visibleCases = problem.visibleTestCases || [];

    const result = await runUserCode({
      code: cleanCode,
      functionName: problem.functionName || 'twoSum',
      testCases: visibleCases.map(tc => ({ ...tc, isHidden: false })),
      problemId: problem.id
    });

    let outputText = '';
    if (result.status === 'ACCEPTED') {
      outputText = `All Visible Test Cases Passed (${result.passedCount}/${result.totalCount}).`;
    } else if (result.status === 'WRONG_ANSWER') {
      outputText = `Wrong Answer (${result.passedCount}/${result.totalCount} Test Cases Passed).`;
    } else if (result.status === 'SYNTAX_ERROR') {
      outputText = `Syntax Error:\n${result.error}`;
    } else if (result.status === 'RUNTIME_ERROR') {
      outputText = `Runtime Error:\n${result.error}`;
    } else if (result.status === 'TIME_LIMIT_EXCEEDED') {
      outputText = `Time Limit Exceeded:\n${result.error || 'Execution exceeded 2000ms timeout limit.'}`;
    } else {
      outputText = `Execution Error:\n${result.error || 'Execution failed.'}`;
    }

    if (result.logs && result.logs.length > 0) {
      outputText += `\n\nUser Standard Output:\n${result.logs.join('\n')}`;
    }

    res.json({
      success: true,
      status: result.status,
      passed: result.passedCount,
      total: result.totalCount,
      passedAll: result.status === 'ACCEPTED',
      output: outputText,
      testResults: result.testResults || [],
      logs: result.logs || [],
      timeSpent: '12ms',
      memorySpent: '14.2 MB'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit Code: Execute user code against visible + hidden test cases.
 * Saves submission to MongoDB and updates user performance when ACCEPTED.
 */
const submitCode = async (req, res, next) => {
  try {
    const { problemId, language, code } = req.body;
    const problem = MOCK_CODING_PROBLEMS.find(p => p.id === problemId) || MOCK_CODING_PROBLEMS[0];

    if (language !== 'javascript') {
      return res.json({
        success: false,
        status: 'EXECUTION_ERROR',
        output: `Execution error: ${language ? language.toUpperCase() : 'Selected language'} is coming soon. Only JavaScript execution is currently supported.`,
        passed: 0,
        total: (problem.visibleTestCases || []).length + (problem.hiddenTestCases || []).length,
        testResults: [],
        timeSpent: '0ms',
        memorySpent: '0 MB'
      });
    }

    const cleanCode = (code || '').trim();
    const visibleCases = (problem.visibleTestCases || []).map(tc => ({ ...tc, isHidden: false }));
    const hiddenCases = (problem.hiddenTestCases || []).map(tc => ({ ...tc, isHidden: true }));
    const allCases = [...visibleCases, ...hiddenCases];

    const result = await runUserCode({
      code: cleanCode,
      functionName: problem.functionName || 'twoSum',
      testCases: allCases,
      problemId: problem.id
    });

    const isAccepted = result.status === 'ACCEPTED';
    const userId = req.user?.id || req.user?._id;

    // Filter test results to show only visible test cases in response (protecting hidden test case inputs)
    const visibleResultsInResponse = (result.testResults || []).filter(tr => !tr.isHidden);

    // Record submission history in MongoDB
    let submissionDoc = null;
    try {
      submissionDoc = await CodingSubmission.create({
        userId: userId || null,
        problemId: problem.id,
        language,
        code: cleanCode,
        status: result.status,
        passedAll: isAccepted,
        passedTestCases: result.passedCount,
        totalTestCases: result.totalCount,
        executionTime: '16ms',
        testResults: visibleResultsInResponse,
        submittedAt: new Date()
      });
    } catch (dbErr) {
      console.warn('Non-critical: CodingSubmission log warning:', dbErr.message);
    }

    // Update user performance stats if user is authenticated
    if (userId) {
      try {
        const perf = await getUserPerformanceDoc(userId);
        perf.coding.attempted = (perf.coding.attempted || 0) + 1;

        if (isAccepted) {
          // Check if user has already solved this problem previously
          const alreadySolved = await CodingSubmission.findOne({
            userId,
            problemId: problem.id,
            status: 'ACCEPTED',
            _id: submissionDoc ? { $ne: submissionDoc._id } : { $exists: true }
          });

          if (!alreadySolved) {
            perf.coding.solved = (perf.coding.solved || 0) + 1;
            if (problem.difficulty === 'Easy') perf.coding.easySolved = (perf.coding.easySolved || 0) + 1;
            if (problem.difficulty === 'Medium') perf.coding.mediumSolved = (perf.coding.mediumSolved || 0) + 1;
            if (problem.difficulty === 'Hard') perf.coding.hardSolved = (perf.coding.hardSolved || 0) + 1;
          }
        }

        perf.coding.accuracy = Math.round((perf.coding.solved / perf.coding.attempted) * 100);
        perf.coding.score = Math.min(100, Math.round(perf.coding.solved * 25));
        perf.overall.hasActivity = true;
        perf.overall.lastActivity = new Date();

        appendRecentActivity(
          perf,
          'coding',
          `${isAccepted ? '✓ Solved' : '⚡ Attempted'} ${problem.title}`,
          isAccepted
            ? `Passed all ${result.totalCount} test cases`
            : `${result.status.replace('_', ' ')} (${result.passedCount}/${result.totalCount} passed)`
        );

        perf.overall.placementReadiness = calculateReadiness(perf);
        const diagnosis = evaluateDiagnosis(perf);
        perf.strengths = diagnosis.strengths;
        perf.weaknesses = diagnosis.weaknesses;

        perf.markModified('coding');
        perf.markModified('overall');
        perf.markModified('recentActivity');
        await perf.save();
      } catch (perfErr) {
        console.warn('Non-critical: Performance tracking error:', perfErr.message);
      }
    }

    let outputText = '';
    if (isAccepted) {
      outputText = `Accepted\nPassed all ${result.totalCount} test cases.`;
    } else if (result.status === 'WRONG_ANSWER') {
      outputText = `Wrong Answer\nPassed: ${result.passedCount}/${result.totalCount} test cases.`;
    } else if (result.status === 'SYNTAX_ERROR') {
      outputText = `Syntax Error:\n${result.error}`;
    } else if (result.status === 'RUNTIME_ERROR') {
      outputText = `Runtime Error:\n${result.error}`;
    } else if (result.status === 'TIME_LIMIT_EXCEEDED') {
      outputText = `Time Limit Exceeded:\n${result.error || 'Execution exceeded 2000ms timeout limit.'}`;
    } else {
      outputText = `Execution Error:\n${result.error || 'Submission failed.'}`;
    }

    if (result.logs && result.logs.length > 0) {
      outputText += `\n\nUser Standard Output:\n${result.logs.join('\n')}`;
    }

    res.json({
      success: true,
      status: result.status,
      passed: result.passedCount,
      total: result.totalCount,
      passedAll: isAccepted,
      output: outputText,
      testResults: visibleResultsInResponse,
      logs: result.logs || [],
      timeSpent: '16ms',
      memorySpent: '15.4 MB'
    });
  } catch (error) {
    next(error);
  }
};

const getAiFeedback = async (req, res) => {
  const { problemId, code, language } = req.body;
  const problem = MOCK_CODING_PROBLEMS.find(p => p.id === problemId) || MOCK_CODING_PROBLEMS[0];

  const feedback = {
    timeComplexity: 'O(N) - Linear Time Complexity',
    spaceComplexity: 'O(N) - Uses auxiliary space efficiently',
    keyInsights: [
      `Clean code structure for problem '${problem.title}'.`,
      'Verify handling of edge cases such as zero values or single element inputs.',
      'Consider memory optimization by reusing data structures where possible.'
    ],
    optimizedCodeSnippet: `// Optimized Pattern Suggestion\nfunction ${problem.functionName || 'solution'}(...args) {\n    // Optimal algorithm implementation pattern\n}`,
    scoreRating: '92/100'
  };

  res.json({
    success: true,
    feedback
  });
};

module.exports = {
  getCodingProblems,
  getCodingProblemById,
  runCode,
  submitCode,
  getAiFeedback
};
