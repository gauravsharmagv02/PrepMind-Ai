const { fork } = require('child_process');
const path = require('path');

/**
 * Execute user JavaScript code inside an isolated worker process.
 */
function runUserCode({ code, functionName, testCases, problemId, timeoutMs = 2000 }) {
  return new Promise((resolve) => {
    if (!testCases || testCases.length === 0) {
      return resolve({
        status: 'EXECUTION_ERROR',
        error: 'No test cases provided for problem.',
        passedCount: 0,
        totalCount: 0,
        testResults: [],
        logs: []
      });
    }

    const workerPath = path.join(__dirname, 'codeRunnerWorker.js');
    
    // Spawn isolated child process with empty env (protecting secrets and process.env)
    const child = fork(workerPath, [], {
      env: {},
      execArgv: []
    });

    let resolved = false;
    const totalMaxTime = Math.max(3500, testCases.length * (timeoutMs + 500) + 1500);

    // Parent-side hard kill timer to terminate process if infinite loop freezes worker
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        try { child.kill('SIGKILL'); } catch (e) {}
        resolve({
          status: 'TIME_LIMIT_EXCEEDED',
          error: 'Time Limit Exceeded: Code execution timed out.',
          passedCount: 0,
          totalCount: testCases.length,
          testResults: testCases.map((tc, i) => ({
            testCase: i + 1,
            input: tc.inputDisplay,
            expected: tc.expectedDisplay,
            actual: 'Time Limit Exceeded',
            passed: false,
            error: 'Time Limit Exceeded',
            timeMs: '>2000ms',
            isHidden: tc.isHidden || false
          })),
          logs: []
        });
      }
    }, totalMaxTime);

    child.on('message', (msg) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        try { child.kill(); } catch (e) {}
        resolve(msg);
      }
    });

    child.on('error', (err) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        try { child.kill(); } catch (e) {}
        resolve({
          status: 'EXECUTION_ERROR',
          error: err.message || 'Child process execution error',
          passedCount: 0,
          totalCount: testCases.length,
          testResults: [],
          logs: []
        });
      }
    });

    child.on('exit', (exitCode, signal) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        const isTimeLimit = signal === 'SIGKILL';
        resolve({
          status: isTimeLimit ? 'TIME_LIMIT_EXCEEDED' : 'EXECUTION_ERROR',
          error: isTimeLimit ? 'Time Limit Exceeded: Process terminated.' : `Process exited prematurely with code ${exitCode}`,
          passedCount: 0,
          totalCount: testCases.length,
          testResults: [],
          logs: []
        });
      }
    });

    // Send execution payload to child process
    child.send({ code, functionName, testCases, problemId, timeoutMs });
  });
}

module.exports = {
  runUserCode
};
