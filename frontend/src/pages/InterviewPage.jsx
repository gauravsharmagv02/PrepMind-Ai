import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { MessageSquare, Sparkles, CheckCircle2, TrendingUp, Lightbulb } from 'lucide-react';

const InterviewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [filterType, setFilterType] = useState('HR');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchQuestions(filterType);
  }, [filterType]);

  const fetchQuestions = async (type) => {
    setLoading(true);
    try {
      const res = await api.get(`/interview/questions?type=${type}`);
      if (res.success && res.questions.length > 0) {
        setQuestions(res.questions);
        setCurrentQuestion(res.questions[0]);
        setUserAnswer('');
        setFeedback(null);
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer || userAnswer.trim().length < 15) {
      setToast({ message: 'Please type a detailed answer of at least 15 characters before evaluation.', type: 'error' });
      return;
    }

    setEvaluating(true);
    try {
      const res = await api.post('/interview/evaluate', {
        questionId: currentQuestion?.id,
        userAnswer,
        role: currentQuestion?.role || 'Software Engineer'
      });

      if (res.success && res.feedback) {
        setFeedback(res.feedback);
        setToast({ message: 'Interview answer evaluated by AI!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading mock interview questions..." />;

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="page-title">AI Mock Interview System</h1>
      <p className="page-subtitle">Practice HR and Technical behavioral questions with instant AI feedback.</p>

      <div className="card">
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <button
            className={`btn btn-sm ${filterType === 'HR' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('HR')}
          >
            HR Behavioral Questions
          </button>
          <button
            className={`btn btn-sm ${filterType === 'Technical' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('Technical')}
          >
            Technical Questions
          </button>
        </div>

        {currentQuestion && (
          <div>
            <div
              style={{
                background: 'var(--primary-light)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                borderLeft: '4px solid var(--primary)'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                INTERVIEW QUESTION ({currentQuestion.type} - {currentQuestion.role}):
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e1b4b', marginTop: '0.3rem' }}>
                {currentQuestion.question}
              </h3>
            </div>

            <div className="form-group">
              <label className="form-label">Your Response (Typed or Speech Input)</label>
              <textarea
                className="form-control"
                style={{ height: '140px', fontSize: '0.92rem', lineHeight: '1.5' }}
                placeholder="Structure your answer using Situation, Task, Action, and Result (STAR method)..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={handleEvaluate}
              disabled={evaluating}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Sparkles size={18} />
              <span>{evaluating ? 'Evaluating answer with AI...' : 'Evaluate Answer with AI'}</span>
            </button>
          </div>
        )}

        {/* AI Evaluation Report */}
        {feedback && (
          <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 className="card-title">
              <MessageSquare size={20} color="#818cf8" />
              <span>AI Evaluation Rating: {feedback.overallScore}%</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'var(--background)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Confidence Score</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>
                  {feedback.confidenceScore}%
                </div>
              </div>
              <div style={{ background: 'var(--background)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Communication</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {feedback.communicationScore}%
                </div>
              </div>
              <div style={{ background: 'var(--background)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Technical Accuracy</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--warning)' }}>
                  {feedback.correctnessScore}%
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                AI Assessment:
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{feedback.aiAssessment}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--success)' }}>
                  Key Strengths:
                </div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {feedback.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--warning)' }}>
                  Areas for Improvement:
                </div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {feedback.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lightbulb size={16} color="var(--primary)" />
                <span>Model Ideal Response Pattern:</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{feedback.modelAnswer}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
