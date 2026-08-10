import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService from '../services/dashboardService';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import {
  Target,
  Code2,
  Brain,
  MessageSquare,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CalendarCheck2,
  History,
  RefreshCw,
  Activity,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [togglingTaskId, setTogglingTaskId] = useState(null);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getDashboardData();
      if (res.success) {
        setData(res);
      } else {
        setError(res.message || 'Unable to load your dashboard.');
      }
    } catch (err) {
      setError(err.message || 'Unable to load your dashboard.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    setTogglingTaskId(taskId);
    try {
      const res = await dashboardService.toggleStudyPlanTask(taskId);
      if (res.success) {
        setData(prev => {
          if (!prev) return prev;
          const updatedPlan = prev.studyPlan.map(t => {
            if (t.id === taskId) {
              return { ...t, status: t.status === 'completed' ? 'pending' : 'completed' };
            }
            return t;
          });
          return {
            ...prev,
            studyPlan: updatedPlan,
            scores: {
              ...prev.scores,
              placementReadiness: res.readinessScore !== undefined ? res.readinessScore : prev.scores.placementReadiness
            }
          };
        });
        setToast({ message: 'Task status updated!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setTogglingTaskId(null);
    }
  };

  const handleRegeneratePlan = async () => {
    setRegenerating(true);
    try {
      const res = await dashboardService.regenerateStudyPlan();
      if (res.success && res.studyPlan) {
        setData(prev => ({ ...prev, studyPlan: res.studyPlan }));
        setToast({ message: 'AI Study Plan regenerated!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading your personalized dashboard..." />;
  }

  if (error) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', marginTop: '2rem' }}>
        <AlertTriangle size={48} color="var(--danger)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Unable to load your dashboard
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {error}
        </p>
        <button className="btn btn-primary" onClick={fetchDashboard}>
          <RefreshCw size={16} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  const scores = data?.scores || { placementReadiness: null, coding: 0, aptitude: 0, interview: 0, resume: 0 };
  const hasActivity = data?.overall?.hasActivity || scores.placementReadiness !== null;
  const studyPlan = data?.studyPlan || [];
  const strengths = data?.strengths || [];
  const weaknesses = data?.weaknesses || [];
  const recentActivity = data?.recentActivity || [];

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="page-title">Welcome back, {data?.user?.name || user?.name || 'Student'}</h1>
      <p className="page-subtitle">Target Role: {data?.user?.targetRole || data?.user?.goal || 'Software Engineer'}</p>

      {/* Metrics Cards Grid */}
      <div className="metrics-grid">
        <div className="metric-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <Target size={18} color="var(--primary)" />
            <span className="metric-label">Placement Readiness</span>
          </div>
          <span className="metric-value" style={{ fontSize: hasActivity ? '2rem' : '1.2rem', color: hasActivity ? 'var(--text-main)' : 'var(--text-muted)' }}>
            {hasActivity ? `${scores.placementReadiness}%` : 'Not calculated yet'}
          </span>
          {!hasActivity && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Start practicing to calculate score
            </span>
          )}
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <Code2 size={18} color="var(--success)" />
            <span className="metric-label">Coding Score</span>
          </div>
          <span className="metric-value" style={{ fontSize: data?.coding?.attempted > 0 ? '2rem' : '1.1rem', color: data?.coding?.attempted > 0 ? 'var(--text-main)' : 'var(--text-muted)' }}>
            {data?.coding?.attempted > 0 ? `${scores.coding}%` : 'No activity yet'}
          </span>
          {data?.coding?.attempted === 0 && (
            <button
              className="btn btn-sm btn-outline"
              style={{ marginTop: '0.5rem', fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
              onClick={() => navigate('/coding')}
            >
              Start Coding
            </button>
          )}
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <Brain size={18} color="var(--warning)" />
            <span className="metric-label">Aptitude Score</span>
          </div>
          <span className="metric-value" style={{ fontSize: data?.aptitude?.testsAttempted > 0 ? '2rem' : '1.1rem', color: data?.aptitude?.testsAttempted > 0 ? 'var(--text-main)' : 'var(--text-muted)' }}>
            {data?.aptitude?.testsAttempted > 0 ? `${scores.aptitude}%` : 'No tests taken'}
          </span>
          {data?.aptitude?.testsAttempted === 0 && (
            <button
              className="btn btn-sm btn-outline"
              style={{ marginTop: '0.5rem', fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
              onClick={() => navigate('/aptitude')}
            >
              Take Assessment
            </button>
          )}
        </div>

        <div className="metric-card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <MessageSquare size={18} color="#3b82f6" />
            <span className="metric-label">Interview Score</span>
          </div>
          <span className="metric-value" style={{ fontSize: data?.interview?.completed > 0 ? '2rem' : '1.1rem', color: data?.interview?.completed > 0 ? 'var(--text-main)' : 'var(--text-muted)' }}>
            {data?.interview?.completed > 0 ? `${scores.interview}%` : 'No mock sessions'}
          </span>
          {data?.interview?.completed === 0 && (
            <button
              className="btn btn-sm btn-outline"
              style={{ marginTop: '0.5rem', fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
              onClick={() => navigate('/mock-interview')}
            >
              Start Interview
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Left Pane: Diagnosis & Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* AI Performance Diagnosis Card */}
          <div className="card" style={{ marginBottom: 0 }}>
            <h3 className="card-title">
              <Sparkles size={20} color="#818cf8" />
              <span>AI Performance Diagnosis</span>
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <TrendingUp size={14} color="var(--success)" />
                <span>Key Strengths:</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {strengths.map((s, idx) => (
                  <span key={idx} className="badge badge-success" style={{ gap: '0.3rem' }}>
                    <Sparkles size={12} />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <AlertTriangle size={14} color="var(--warning)" />
                <span>Focus Areas to Improve:</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {weaknesses.map((w, idx) => (
                  <span key={idx} className="badge badge-warning" style={{ gap: '0.3rem' }}>
                    <AlertTriangle size={12} />
                    <span>{w}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="card" style={{ marginBottom: 0 }}>
            <h3 className="card-title">
              <History size={20} color="#818cf8" />
              <span>Recent Activity</span>
            </h3>

            {recentActivity.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {recentActivity.map((act) => (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {act.title.replace(/^✓\s*/, '').replace(/^⚡\s*/, '')}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {act.resultText}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {act.timestamp ? new Date(act.timestamp).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <Activity size={32} color="var(--border)" style={{ marginBottom: '0.5rem' }} />
                <div>No recent activity recorded yet.</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                  Solve a coding problem or take a quiz to log your progress!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Personalized 7-Day AI Study Plan */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="card-title" style={{ marginBottom: 0 }}>
              <CalendarCheck2 size={20} color="#818cf8" />
              <span>Personalized AI Study Plan</span>
            </h3>

            <button
              className="btn btn-sm btn-outline"
              onClick={handleRegeneratePlan}
              disabled={regenerating}
              aria-label="Regenerate AI Study Plan"
              title="Regenerate plan tailored to current weaknesses"
            >
              <RefreshCw size={14} className={regenerating ? 'spin' : ''} />
              <span>Regenerate</span>
            </button>
          </div>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
            {studyPlan.map((item) => {
              const isDone = item.status === 'completed';
              const isPendingToggle = togglingTaskId === item.id;
              return (
                <li
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--background)',
                    border: `1px solid ${isDone ? 'var(--success)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    opacity: isPendingToggle ? 0.6 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    <button
                      onClick={() => handleToggleTask(item.id)}
                      disabled={isPendingToggle}
                      aria-label={`Mark Day ${item.day} task as ${isDone ? 'pending' : 'completed'}`}
                      title={isDone ? 'Mark Pending' : 'Mark Completed'}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: isDone ? 'var(--success)' : 'var(--text-dim)',
                        padding: '0.1rem'
                      }}
                    >
                      <CheckCircle2 size={20} />
                    </button>

                    <div>
                      <div
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: isDone ? 'var(--text-muted)' : 'var(--text-main)',
                          textDecoration: isDone ? 'line-through' : 'none'
                        }}
                      >
                        Day {item.day}: {item.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Category: {item.category} • {item.duration || '30 mins'}
                      </div>
                    </div>
                  </div>

                  <span className={`badge ${isDone ? 'badge-success' : 'badge-warning'}`} style={{ gap: '0.3rem' }}>
                    {isDone ? <CheckCircle2 size={12} /> : null}
                    <span>{isDone ? 'Completed' : 'Pending'}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
