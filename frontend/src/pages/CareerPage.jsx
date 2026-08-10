import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { BriefcaseBusiness, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';

const CareerPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/career/recommendations');
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner label="Analyzing AI career recommendations..." />;

  const roles = data?.recommendedRoles || [];

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="page-title">AI Career Recommendations</h1>
      <p className="page-subtitle">Roles matched to your skills, missing skill gaps, and target companies.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {roles.map((role, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {role.title}
                </h3>
                <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>
                  {role.matchScore}% Match
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BriefcaseBusiness size={16} color="var(--primary)" />
                <span>Salary Range: <strong>{role.avgSalary}</strong></span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Demanded Skills:
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {role.demandedSkills.map((sk, i) => (
                    <span key={i} className="badge badge-success" style={{ gap: '0.3rem' }}>
                      <CheckCircle2 size={12} />
                      <span>{sk}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--warning)', marginBottom: '0.4rem' }}>
                  Missing Skill Gaps to Learn:
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {role.missingSkills.map((gap, i) => (
                    <span key={i} className="badge badge-warning" style={{ gap: '0.3rem' }}>
                      <AlertTriangle size={12} />
                      <span>{gap}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Recommended Prep Roadmap:
                </div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {role.recommendedCourses.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Building2 size={14} />
                <span>Top Hiring Companies:</span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {role.topCompanies.join(' • ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPage;
