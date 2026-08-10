import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { Play, CheckCircle2, XCircle, AlertTriangle, AlertOctagon, Clock, Sparkles, RotateCcw, Code2, Terminal } from 'lucide-react';

const CodingPage = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [difficulty, setDifficulty] = useState('All');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('Click "Run Code" or "Submit" to test execution...');
  const [testResultsData, setTestResultsData] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchProblems(difficulty);
  }, [difficulty]);

  const fetchProblems = async (diff) => {
    setLoading(true);
    try {
      const res = await api.get(`/coding/problems?difficulty=${diff}`);
      if (res.success && res.problems.length > 0) {
        setProblems(res.problems);
        selectProblem(res.problems[0], language);
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const selectProblem = (prob, lang = language) => {
    setSelectedProblem(prob);
    setCode(prob.starterTemplates?.[lang] || `function ${prob.functionName || 'solution'}() {\n    // Write your solution here\n}`);
    setConsoleOutput('Console output ready.');
    setTestResultsData(null);
    setAiFeedback(null);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (selectedProblem && selectedProblem.starterTemplates?.[newLang]) {
      setCode(selectedProblem.starterTemplates[newLang]);
    }
  };

  const handleRunCode = async () => {
    if (!selectedProblem) return;
    setExecuting(true);
    setConsoleOutput('Executing visible test cases in isolated sandbox...');
    setTestResultsData(null);
    try {
      const res = await api.post('/coding/run', {
        problemId: selectedProblem.id,
        language,
        code
      });

      setTestResultsData({
        status: res.status,
        passed: res.passed,
        total: res.total,
        testResults: res.testResults || [],
        mode: 'run'
      });

      setConsoleOutput(res.output || 'Execution completed.');
      if (res.status === 'ACCEPTED') {
        setToast({ message: 'All sample test cases passed!', type: 'success' });
      } else {
        setToast({ message: `Execution completed: ${res.status.replace('_', ' ')}`, type: 'error' });
      }
    } catch (err) {
      setConsoleOutput(`Error: ${err.message}`);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setExecuting(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!selectedProblem) return;
    setSubmitting(true);
    setConsoleOutput('Evaluating solution against full test suite (visible + hidden)...');
    setTestResultsData(null);
    try {
      const res = await api.post('/coding/submit', {
        problemId: selectedProblem.id,
        language,
        code
      });

      setTestResultsData({
        status: res.status,
        passed: res.passed,
        total: res.total,
        testResults: res.testResults || [],
        mode: 'submit'
      });

      setConsoleOutput(res.output || 'Submission evaluated.');
      if (res.status === 'ACCEPTED') {
        setToast({ message: 'Accepted! All test cases passed.', type: 'success' });
      } else {
        setToast({ message: `Submission result: ${res.status.replace('_', ' ')}`, type: 'error' });
      }
    } catch (err) {
      setConsoleOutput(`Error: ${err.message}`);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAiReview = async () => {
    if (!selectedProblem) return;
    setExecuting(true);
    try {
      const res = await api.post('/coding/ai-feedback', {
        problemId: selectedProblem.id,
        code,
        language
      });
      if (res.success) {
        setAiFeedback(res.feedback);
        setToast({ message: 'AI Code Review generated!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setExecuting(false);
    }
  };

  const handleReset = () => {
    if (selectedProblem) {
      setCode(selectedProblem.starterTemplates?.[language] || '');
      setConsoleOutput('Editor reset.');
      setTestResultsData(null);
      setAiFeedback(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'badge-success';
      case 'WRONG_ANSWER':
      case 'RUNTIME_ERROR':
      case 'EXECUTION_ERROR':
        return 'badge-danger';
      case 'SYNTAX_ERROR':
      case 'TIME_LIMIT_EXCEEDED':
        return 'badge-warning';
      default:
        return 'badge-warning';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'var(--success)';
      case 'WRONG_ANSWER':
      case 'RUNTIME_ERROR':
      case 'EXECUTION_ERROR':
        return 'var(--danger)';
      case 'SYNTAX_ERROR':
      case 'TIME_LIMIT_EXCEEDED':
        return 'var(--warning)';
      default:
        return 'var(--primary)';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'Accepted';
      case 'WRONG_ANSWER':
        return 'Wrong Answer';
      case 'RUNTIME_ERROR':
        return 'Runtime Error';
      case 'SYNTAX_ERROR':
        return 'Syntax Error';
      case 'TIME_LIMIT_EXCEEDED':
        return 'Time Limit Exceeded';
      case 'EXECUTION_ERROR':
        return 'Execution Error';
      default:
        return status || 'Evaluated';
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return <CheckCircle2 size={20} color="var(--success)" />;
      case 'WRONG_ANSWER':
      case 'RUNTIME_ERROR':
      case 'EXECUTION_ERROR':
        return <XCircle size={20} color="var(--danger)" />;
      case 'SYNTAX_ERROR':
        return <AlertOctagon size={20} color="var(--warning)" />;
      case 'TIME_LIMIT_EXCEEDED':
        return <Clock size={20} color="var(--warning)" />;
      default:
        return <AlertTriangle size={20} color="var(--warning)" />;
    }
  };

  if (loading) return <LoadingSpinner label="Loading coding challenges..." />;

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="page-title">Coding Practice System</h1>
      <p className="page-subtitle">Solve algorithms, run test cases, and get real-time AI code reviews.</p>

      <div className="coding-page-layout">
        {/* Problems List Sidebar */}
        <div className="card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Code2 size={18} color="var(--primary)" />
              <span>Problems</span>
            </span>
            <select
              className="form-control"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {problems.map((p) => (
              <button
                key={p.id}
                className={`btn btn-outline ${selectedProblem?.id === p.id ? 'btn-primary' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  padding: '0.5rem 0.75rem'
                }}
                onClick={() => selectProblem(p)}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.title}
                </span>
                <span
                  className={`badge ${
                    p.difficulty === 'Easy'
                      ? 'badge-success'
                      : p.difficulty === 'Medium'
                      ? 'badge-warning'
                      : 'badge-danger'
                  }`}
                >
                  {p.difficulty}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Pane */}
        <div>
          {selectedProblem && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 className="card-title" style={{ marginBottom: 0 }}>
                  {selectedProblem.title}
                </h3>
                <select
                  className="form-control"
                  style={{ width: 'auto', padding: '0.3rem 0.75rem' }}
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python" disabled>Python (Coming Soon)</option>
                  <option value="cpp" disabled>C++ (Coming Soon)</option>
                  <option value="java" disabled>Java (Coming Soon)</option>
                </select>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {selectedProblem.statement}
              </p>

              {selectedProblem.constraints && selectedProblem.constraints.length > 0 && (
                <div style={{ marginBottom: '1rem', background: 'var(--background)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.84rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Constraints:</span>
                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {selectedProblem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              <textarea
                className="form-control code-editor-input"
                wrap="off"
                style={{
                  fontFamily: 'var(--font-mono)',
                  height: '220px',
                  background: '#0f172a',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre',
                  overflowX: 'auto'
                }}
                spellCheck="false"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <div className="coding-action-buttons" style={{ marginTop: '1rem' }}>
                <button className="btn btn-primary" onClick={handleRunCode} disabled={executing || submitting}>
                  <Play size={18} />
                  <span>{executing ? 'Running...' : 'Run Code'}</span>
                </button>
                <button className="btn btn-secondary" onClick={handleSubmitCode} disabled={executing || submitting}>
                  <CheckCircle2 size={18} />
                  <span>{submitting ? 'Submitting...' : 'Submit'}</span>
                </button>
                <button className="btn btn-outline" onClick={handleAiReview} disabled={executing || submitting}>
                  <Sparkles size={18} />
                  <span>AI Review</span>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleReset}
                  aria-label="Reset Code"
                  title="Reset starter code"
                  disabled={executing || submitting}
                >
                  <RotateCcw size={18} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

          {/* Test Results Display Card (LeetCode Style) */}
          {testResultsData && (
            <div className="card" style={{ marginBottom: '1rem', borderLeft: `4px solid ${getStatusColor(testResultsData.status)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="card-title" style={{ marginBottom: 0, gap: '0.5rem' }}>
                  {renderStatusIcon(testResultsData.status)}
                  <span>Test Results ({testResultsData.mode === 'submit' ? 'Submit' : 'Run Code'})</span>
                </h3>
                <span className={`badge ${getStatusBadgeClass(testResultsData.status)}`} style={{ fontSize: '0.88rem', padding: '0.35rem 0.75rem' }}>
                  {getStatusLabel(testResultsData.status)}
                </span>
              </div>

              {testResultsData.testResults && testResultsData.testResults.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                  {testResultsData.testResults.map((tr) => (
                    <div
                      key={tr.testCase}
                      style={{
                        background: 'var(--background)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem 1rem',
                        border: `1px solid ${tr.passed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: tr.passed ? 'var(--success)' : 'var(--danger)' }}>
                          {tr.passed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                          <span>Test Case {tr.testCase}</span>
                        </span>
                        <span style={{ fontSize: '0.82rem', color: tr.passed ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>
                          {tr.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>

                      <div className="test-case-io-grid" style={{ marginTop: '0.5rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                        <div><strong style={{ color: 'var(--text-main)' }}>Input:</strong> <code style={{ fontFamily: 'var(--font-mono)' }}>{tr.input}</code></div>
                        <div><strong style={{ color: 'var(--text-main)' }}>Expected:</strong> <code style={{ fontFamily: 'var(--font-mono)' }}>{tr.expected}</code></div>
                      </div>
                      <div style={{ marginTop: '0.25rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'var(--text-main)' }}>Your Output:</strong> <code style={{ fontFamily: 'var(--font-mono)' }}>{tr.actual}</code>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
                <span style={{ color: getStatusColor(testResultsData.status) }}>{getStatusLabel(testResultsData.status)}</span>
                <span>{testResultsData.passed} / {testResultsData.total} Test Cases Passed</span>
              </div>
            </div>
          )}

          {/* Console Output */}
          <div className="card" style={{ background: '#0f172a', color: '#f8fafc', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Terminal size={16} />
              <span>CONSOLE OUTPUT:</span>
            </div>
            <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', whiteSpace: 'pre-wrap' }}>
              {consoleOutput}
            </pre>
          </div>

          {/* AI Review Results Card */}
          {aiFeedback && (
            <div className="card" style={{ borderLeft: '4px solid #818cf8' }}>
              <h3 className="card-title">
                <Sparkles size={20} color="#818cf8" />
                <span>AI Code Analysis ({aiFeedback.scoreRating})</span>
              </h3>

              <div className="ai-feedback-metrics-grid" style={{ gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Time Complexity</div>
                  <div style={{ fontWeight: 700, color: 'var(--success)' }}>{aiFeedback.timeComplexity}</div>
                </div>
                <div style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Space Complexity</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{aiFeedback.spaceComplexity}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>Key Code Insights:</div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {aiFeedback.keyInsights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>

              {aiFeedback.optimizedCodeSnippet && (
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>Optimized Pattern Suggestion:</div>
                  <pre
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: '#0f172a',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      overflowX: 'auto'
                    }}
                  >
                    {aiFeedback.optimizedCodeSnippet}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
