import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Toast from '../components/Toast';
import { UserRound, Target, Award, Save, Mail } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUserGoal } = useAuth();
  const [goal, setGoal] = useState(user?.goal || 'Software Engineer');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full Stack Developer');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSaveGoal = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateUserGoal({ targetGoal: goal, targetRole });
      if (res.success) {
        setToast({ message: 'Preparation goal updated successfully!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="page-title">User Profile & Placement Goal</h1>
      <p className="page-subtitle">Manage your account information and target career preferences.</p>

      <div className="profile-grid" style={{ gap: '1.5rem' }}>
        {/* User Info Card */}
        <div className="card">
          <h3 className="card-title">
            <UserRound size={20} color="#818cf8" />
            <span>Account Details</span>
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'PM'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{user?.name || 'Student User'}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                <Mail size={14} />
                <span>{user?.email || 'user@example.com'}</span>
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              Current Target Goal:
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
              {user?.goal || 'Software Engineer'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Core Technical Skills:
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {(user?.skills || ['JavaScript', 'Coding', 'Problem Solving']).map((sk, idx) => (
                <span key={idx} className="badge badge-success">{sk}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Goal Settings Card */}
        <div className="card">
          <h3 className="card-title">
            <Target size={20} color="#818cf8" />
            <span>Update Placement Goal</span>
          </h3>

          <form onSubmit={handleSaveGoal}>
            <div className="form-group">
              <label className="form-label">Primary Career Goal</label>
              <select className="form-control" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Frontend Specialist">Frontend Specialist</option>
                <option value="Backend & Cloud Engineer">Backend & Cloud Engineer</option>
                <option value="Data Analyst / BI Engineer">Data Analyst / BI Engineer</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Role Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. SDE-1 / Full Stack Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} disabled={saving}>
              <Save size={18} />
              <span>{saving ? 'Saving changes...' : 'Save Placement Goal'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
