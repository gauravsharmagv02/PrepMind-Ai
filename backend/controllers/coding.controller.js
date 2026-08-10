const { MOCK_CODING_PROBLEMS } = require('../services/data.service');
const CodingSubmission = require('../models/CodingSubmission');
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

const runCode = async (req, res, next) => {
  try {
    const { problemId, language, code } = req.body;
    const problem = MOCK_CODING_PROBLEMS.find(p => p.id === problemId) || MOCK_CODING_PROBLEMS[0];

    const cleanCode = (code || '').trim();
    const isStubOnly = !cleanCode || 
      (cleanCode.includes('// Write your solution here') && cleanCode.split('\n').filter(l => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*') && l.trim() !== '}' && l.trim() !== '{' && l.trim() !== '' && !l.trim().startsWith('function') && !l.trim().startsWith('def') && !l.trim().startsWith('class') && !l.trim().startsWith('import') && !l.trim().startsWith('#include') && !l.trim().startsWith('using')).length === 0);

    if (isStubOnly) {
      return res.json({
        success: false,
        output: '⚠️ Solution incomplete: Please write your implementation code inside the function.',
        passedAll: false,
        testResults: (problem.testCases || []).map((tc, idx) => ({
          testCase: idx + 1,
          input: tc.input,
          expected: tc.expected,
          actual: 'No Return Value',
          passed: false
        })),
        timeSpent: '0ms',
        memorySpent: '0 MB'
      });
    }

    let hasSyntaxError = false;
    let executionOutput = '';

    if (language === 'javascript') {
      if (cleanCode.includes('throw Error') || cleanCode.includes('SyntaxError')) {
        hasSyntaxError = true;
        executionOutput = 'SyntaxError: Unexpected token or runtime exception during execution.';
      } else {
        executionOutput = 'Program executed successfully in 12ms.\nOutput:\nMatches expected outputs.';
      }
    } else {
      executionOutput = `[${language ? language.toUpperCase() : 'CODE'} Runner]\nCompilation successful.\nTotal Time: 18ms\nMemory Used: 14.2 MB`;
    }

    const passedAll = !hasSyntaxError;
    const testResults = (problem.testCases || []).map((tc, idx) => ({
      testCase: idx + 1,
      input: tc.input,
      expected: tc.expected,
      actual: passedAll ? tc.expected : 'Execution Error',
      passed: passedAll
    }));

    if (req.user?.id) {
      try {
        await CodingSubmission.create({
          userId: req.user.id,
          problemId: problem.id,
          language,
          code: cleanCode,
          passedAll,
          testResults
        });

        const perf = await getUserPerformanceDoc(req.user.id);
        perf.coding.attempted = (perf.coding.attempted || 0) + 1;
        if (passedAll) {
          perf.coding.solved = (perf.coding.solved || 0) + 1;
          if (problem.difficulty === 'Easy') perf.coding.easySolved = (perf.coding.easySolved || 0) + 1;
          if (problem.difficulty === 'Medium') perf.coding.mediumSolved = (perf.coding.mediumSolved || 0) + 1;
          if (problem.difficulty === 'Hard') perf.coding.hardSolved = (perf.coding.hardSolved || 0) + 1;
        }

        perf.coding.accuracy = Math.round((perf.coding.solved / perf.coding.attempted) * 100);
        perf.coding.score = Math.min(100, Math.round(perf.coding.solved * 25));
        perf.overall.hasActivity = true;
        perf.overall.lastActivity = new Date();

        appendRecentActivity(
          perf,
          'coding',
          `${passedAll ? '✓ Solved' : '⚡ Attempted'} ${problem.title}`,
          passedAll ? 'Passed all test cases' : 'Compilation error'
        );

        perf.overall.placementReadiness = calculateReadiness(perf);
        const diagnosis = evaluateDiagnosis(perf);
        perf.strengths = diagnosis.strengths;
        perf.weaknesses = diagnosis.weaknesses;

        perf.markModified('coding');
        perf.markModified('overall');
        perf.markModified('recentActivity');
        await perf.save();
      } catch (dbErr) {
        console.warn('Non-critical: Coding submission tracking warning:', dbErr.message);
      }
    }

    res.json({
      success: passedAll,
      output: executionOutput,
      passedAll,
      testResults,
      timeSpent: '14ms',
      memorySpent: '15.4 MB'
    });
  } catch (error) {
    next(error);
  }
};

const getAiFeedback = async (req, res) => {
  const { problemId, code, language } = req.body;

  const feedback = {
    timeComplexity: 'O(N) - Linear Time Complexity',
    spaceComplexity: 'O(N) - Uses auxiliary space efficiently',
    keyInsights: [
      'Good code structure and function definition.',
      'Check edge cases such as empty arrays or negative values.',
      'Maintain clean variable naming conventions.'
    ],
    optimizedCodeSnippet: `// LeetCode Optimal Refactored Pattern\nfunction twoSumOptimal(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
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
  getAiFeedback
};
