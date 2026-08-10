const vm = require('vm');

function formatOutputDisplay(val) {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'function') return '[Function]';
  try {
    return JSON.stringify(val);
  } catch (e) {
    return String(val);
  }
}

function compareOutputs(actual, expected, problemId) {
  if (actual === expected) return true;
  if (actual === null || expected === null) return actual === expected;
  if (actual === undefined || expected === undefined) return actual === undefined;

  // Handle Two Sum index pairs where [0,1] or [1,0] are equivalent
  if ((problemId === 'prob_1' || problemId === 'two-sum') && Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length === 2 && expected.length === 2) {
      const sortedActual = [...actual].sort((a, b) => a - b);
      const sortedExpected = [...expected].sort((a, b) => a - b);
      return sortedActual[0] === sortedExpected[0] && sortedActual[1] === sortedExpected[1];
    }
  }

  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (!compareOutputs(actual[i], expected[i], problemId)) return false;
    }
    return true;
  }

  if (typeof actual === 'object' && typeof expected === 'object') {
    const keysA = Object.keys(actual);
    const keysB = Object.keys(expected);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(expected, key)) return false;
      if (!compareOutputs(actual[key], expected[key], problemId)) return false;
    }
    return true;
  }

  if (typeof actual === 'number' && typeof expected === 'number' && Number.isNaN(actual) && Number.isNaN(expected)) {
    return true;
  }

  return false;
}

process.on('message', ({ code, functionName, testCases, problemId, timeoutMs = 2000 }) => {
  const logs = [];
  const captureLog = (...args) => {
    if (logs.length < 50) {
      logs.push(args.map(a => (typeof a === 'object' ? formatOutputDisplay(a) : String(a))).join(' '));
    }
  };

  // 1. Syntax & Compilation Check
  let script;
  try {
    script = new vm.Script(code, { filename: 'solution.js' });
  } catch (syntaxErr) {
    process.send({
      status: 'SYNTAX_ERROR',
      error: syntaxErr.message || String(syntaxErr),
      passedCount: 0,
      totalCount: testCases.length,
      testResults: [],
      logs
    });
    process.exit(0);
  }

  // 2. Create Context (Isolated Global Sandbox without Node process/fs/require/env)
  const sandbox = {
    console: {
      log: captureLog,
      error: captureLog,
      warn: captureLog,
      info: captureLog
    },
    Math,
    Array,
    String,
    Number,
    Boolean,
    Object,
    JSON,
    Map,
    Set,
    RegExp,
    Date,
    parseInt,
    parseFloat,
    isNaN,
    isFinite
  };

  const context = vm.createContext(sandbox);

  // 3. Top-level script evaluation
  try {
    script.runInContext(context, { timeout: timeoutMs });
  } catch (topErr) {
    const isTimeout = topErr.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT' || (topErr.message && topErr.message.includes('timed out'));
    process.send({
      status: isTimeout ? 'TIME_LIMIT_EXCEEDED' : 'RUNTIME_ERROR',
      error: isTimeout ? 'Time Limit Exceeded during initialization (2000ms limit).' : topErr.message || String(topErr),
      passedCount: 0,
      totalCount: testCases.length,
      testResults: [],
      logs
    });
    process.exit(0);
  }

  // 4. Verify function exists
  const userFn = context[functionName];
  if (typeof userFn !== 'function') {
    process.send({
      status: 'EXECUTION_ERROR',
      error: `Function '${functionName}' is not defined. Please implement '${functionName}' in your code.`,
      passedCount: 0,
      totalCount: testCases.length,
      testResults: [],
      logs
    });
    process.exit(0);
  }

  // 5. Execute against each test case
  const testResults = [];
  let passedCount = 0;
  let hasRuntimeError = false;
  let firstRuntimeError = null;

  for (let idx = 0; idx < testCases.length; idx++) {
    const tc = testCases[idx];
    const startTime = process.hrtime();
    let actualOutput;
    let tcPassed = false;
    let tcError = null;

    try {
      // Run function inside VM context with timeout enforcement
      context.__fnArgs = JSON.parse(JSON.stringify(tc.input));
      const evalCode = `__fnResult = ${functionName}(...__fnArgs);`;
      vm.runInContext(evalCode, context, { timeout: timeoutMs });
      actualOutput = context.__fnResult;
      tcPassed = compareOutputs(actualOutput, tc.expected, problemId);
    } catch (err) {
      const isTimeout = err.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT' || (err.message && err.message.includes('timed out'));
      if (isTimeout) {
        process.send({
          status: 'TIME_LIMIT_EXCEEDED',
          error: `Time Limit Exceeded on test case ${idx + 1} (execution exceeded 2000ms).`,
          passedCount,
          totalCount: testCases.length,
          testResults,
          logs
        });
        process.exit(0);
      }
      hasRuntimeError = true;
      tcError = err.message || String(err);
      if (!firstRuntimeError) firstRuntimeError = tcError;
    }

    const diffTime = process.hrtime(startTime);
    const timeMs = (diffTime[0] * 1000 + diffTime[1] / 1e6).toFixed(1);

    if (tcPassed) passedCount++;

    testResults.push({
      testCase: idx + 1,
      input: tc.inputDisplay,
      expected: tc.expectedDisplay,
      actual: tcError ? `Runtime Error: ${tcError}` : formatOutputDisplay(actualOutput),
      passed: tcPassed,
      error: tcError,
      timeMs: `${timeMs}ms`,
      isHidden: tc.isHidden || false
    });
  }

  let finalStatus = 'ACCEPTED';
  if (hasRuntimeError) {
    finalStatus = 'RUNTIME_ERROR';
  } else if (passedCount < testCases.length) {
    finalStatus = 'WRONG_ANSWER';
  }

  process.send({
    status: finalStatus,
    error: firstRuntimeError,
    passedCount,
    totalCount: testCases.length,
    testResults,
    logs
  });
  process.exit(0);
});
