import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { Play, CheckCircle2, Sparkles, RotateCcw, Code2, Gauge, Terminal } from 'lucide-react';

const CodingPage = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [difficulty, setDifficulty] = useState('All');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('Click "Run Code" to test execution...');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
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
    setCode(prob.starterTemplates?.[lang] || `// Write your ${lang} code here...`);
    setConsoleOutput('Console output ready.');
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
    setConsoleOutput('Compiling & running test cases...');
    try {
      const res = await api.post('/coding/run', {
        problemId: selectedProblem.id,
        language,
        code
      });

      if (res.success) {
        let outputStr = res.output + '\n\nTest Cases:\n';
        (res.testResults || []).forEach(tr => {
          outputStr += `Test Case ${tr.testCase}: [PASSED] (Input: ${tr.input} => Expected: ${tr.expected})\n`;
        });
        setConsoleOutput(outputStr);
        setToast({ message: 'Code executed successfully!', type: 'success' });
      } else {
        setConsoleOutput(`Runtime / Execution Error:\n${res.output}`);
        setToast({ message: 'Execution completed with errors.', type: 'error' });
      }
    } catch (err) {
      setConsoleOutput(`Error: ${err.message}`);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setExecuting(false);
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
      setAiFeedback(null);
    }
  };

  if (loading) return <LoadingSpinner label="Loading coding challenges..." />;

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="page-title">Coding Practice System</h1>
      <p className="page-subtitle">Solve algorithms, run test cases, and get real-time AI code reviews.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
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
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {selectedProblem.statement}
              </p>

              <textarea
                className="form-control"
                style={{
                  fontFamily: 'var(--font-mono)',
                  height: '220px',
                  background: '#0f172a',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}
                spellCheck="false"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={handleRunCode} disabled={executing}>
                  <Play size={18} />
                  <span>{executing ? 'Running...' : 'Run Code'}</span>
                </button>
                <button className="btn btn-secondary" onClick={handleRunCode} disabled={executing}>
                  <CheckCircle2 size={18} />
                  <span>Submit</span>
                </button>
                <button className="btn btn-outline" onClick={handleAiReview} disabled={executing}>
                  <Sparkles size={18} />
                  <span>AI Review</span>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleReset}
                  aria-label="Reset Code"
                  title="Reset starter code"
                >
                  <RotateCcw size={18} />
                  <span>Reset</span>
                </button>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
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
