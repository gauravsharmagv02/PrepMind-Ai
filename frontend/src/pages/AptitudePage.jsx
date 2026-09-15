import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { Timer, CheckCircle2, HelpCircle, ArrowLeft, ArrowRight, Lightbulb, AlertCircle, RotateCcw } from 'lucide-react';

const AptitudePage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedSection, setSelectedSection] = useState('All');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  useEffect(() => {
    fetchTests(selectedSection);
  }, [selectedSection]);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  const fetchTests = async (section = 'All') => {
    setLoading(true);
    try {
      const res = await api.get(`/aptitude/tests${section !== 'All' ? `?section=${encodeURIComponent(section)}` : ''}`);
      if (res.success && res.questions.length > 0) {
        setQuestions(res.questions);
        setCurrentIndex(0);
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.post('/aptitude/submit', {
        answers,
        timeSpentSeconds: 900 - timeLeft
      });

      if (res.success) {
        setResult(res);
        setSubmitted(true);
        setToast({ message: 'Aptitude test submitted successfully!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) return <LoadingSpinner label="Loading diagnostic aptitude test..." />;

  const currentQ = questions[currentIndex];

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.2rem' }}>Aptitude & Reasoning Diagnostic</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>Practice Quantitative, Logical Reasoning, and Verbal diagnostic quizzes.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-muted)' }}>Section:</label>
          <select
            className="form-control"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.88rem', width: 'auto' }}
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            disabled={submitted}
          >
            <option value="All">All Sections (36 Questions)</option>
            <option value="Quantitative">Quantitative Aptitude</option>
            <option value="Logical Reasoning">Logical Reasoning</option>
            <option value="Verbal Ability">Verbal Ability</option>
          </select>
        </div>
      </div>

      {!submitted ? (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              Question {currentIndex + 1} of {questions.length} ({currentQ?.section})
            </span>
            <span className="badge badge-warning" style={{ fontSize: '0.9rem', gap: '0.4rem' }}>
              <Timer size={16} />
              <span>Timer: {formatTime(timeLeft)}</span>
            </span>
          </div>

          {currentQ && (
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                {currentQ.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                      style={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        padding: '0.85rem 1.25rem',
                        fontSize: '0.95rem'
                      }}
                      onClick={() => handleSelectOption(currentQ.id, idx)}
                    >
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '2px solid currentColor',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          marginRight: '0.5rem'
                        }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="aptitude-action-bar">
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    disabled={currentIndex === questions.length - 1}
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                  <CheckCircle2 size={18} />
                  <span>{submitting ? 'Submitting...' : 'Submit Test'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Report */
        <div className="card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
            Diagnostic Results: {result?.score}%
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            You correctly answered {result?.correctCount} out of {result?.totalQuestions} questions in {formatTime(result?.timeSpentSeconds || 0)}.
          </p>

          <div
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lightbulb size={16} color="var(--primary)" />
              <span>AI Practice Advice:</span>
            </div>
            <div style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>{result?.aiAdvice}</div>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Detailed Explanations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {result?.breakdown.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--background)',
                  border: `1px solid ${item.isCorrect ? 'var(--success)' : 'var(--danger)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                    Q{idx + 1}. {item.question}
                  </span>
                  <span className={`badge ${item.isCorrect ? 'badge-success' : 'badge-danger'}`} style={{ gap: '0.3rem' }}>
                    {item.isCorrect ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    <span>{item.isCorrect ? 'Correct' : 'Incorrect'}</span>
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Your Answer: <strong style={{ color: item.isCorrect ? 'var(--success)' : 'var(--danger)' }}>{item.userAnswer}</strong> | Correct Answer: <strong style={{ color: 'var(--success)' }}>{item.correctAnswer}</strong>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', background: 'var(--surface)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <HelpCircle size={14} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setTimeLeft(900);
                setCurrentIndex(0);
              }}
            >
              <RotateCcw size={18} />
              <span>Retake Diagnostic Test</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudePage;
