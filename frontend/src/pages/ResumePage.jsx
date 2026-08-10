import React, { useState } from 'react';
import api from '../services/api';
import Toast from '../components/Toast';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, FileSearch } from 'lucide-react';

const ResumePage = () => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      setResumeText(text);
      setToast({ message: `Loaded ${file.name} successfully! Click "Analyze Resume" to proceed.`, type: 'info' });
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!resumeText || resumeText.trim().length < 50) {
      setToast({ message: 'Please paste or upload plain text resume content of at least 50 characters.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/resume/analyze', {
        resumeText,
        targetRole: 'Software Engineer'
      });

      if (res.success && res.analysis) {
        setAnalysis(res.analysis);
        setToast({ message: 'Resume ATS Analysis complete!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="page-title">AI Resume ATS Analyzer</h1>
      <p className="page-subtitle">Upload your resume PDF/TXT or paste text to get instant ATS scores and formatting feedback.</p>

      <div className="resume-grid" style={{ gap: '1.5rem' }}>
        {/* Upload Pane */}
        <div className="card">
          <h3 className="card-title">
            <UploadCloud size={20} color="#818cf8" />
            <span>Upload or Paste Resume</span>
          </h3>

          <div className="form-group">
            <label className="form-label">Select Text/PDF Document</label>
            <input
              type="file"
              className="form-control"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Or Paste Resume Content</label>
            <textarea
              className="form-control"
              style={{ height: '220px', fontSize: '0.88rem', lineHeight: '1.5' }}
              placeholder="Paste plain resume text here (experience, skills, projects)..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onClick={handleAnalyze}
            disabled={loading}
          >
            <FileSearch size={18} />
            <span>{loading ? 'Analyzing with AI ATS Scanner...' : 'Upload & Analyze Resume'}</span>
          </button>
        </div>

        {/* Results Pane */}
        <div>
          {analysis ? (
            <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h3 className="card-title">
                <FileText size={20} color="#818cf8" />
                <span>ATS Report Score: {analysis.overallScore}%</span>
              </h3>

              <div className="resume-scores-grid" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'var(--background)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ATS Compatibility</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>
                    {analysis.atsCompatibility}
                  </div>
                </div>
                <div style={{ background: 'var(--background)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Formatting Score</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {analysis.formattingScore}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>Detected Technical Skills:</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {analysis.detectedSkills.map((sk, idx) => (
                    <span key={idx} className="badge badge-success" style={{ gap: '0.3rem' }}>
                      <CheckCircle2 size={12} />
                      <span>{sk}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>Missing Keywords:</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {analysis.missingTargetKeywords.map((kw, idx) => (
                    <span key={idx} className="badge badge-warning" style={{ gap: '0.3rem' }}>
                      <AlertCircle size={12} />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>Actionable Recommendations:</div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {analysis.actionableSuggestions.map((sug, idx) => (
                    <li key={idx} style={{ marginBottom: '0.3rem' }}>{sug}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div
              className="card"
              style={{
                textAlign: 'center',
                color: 'var(--text-muted)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 1.5rem'
              }}
            >
              <FileText size={48} color="var(--border)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>No Resume Uploaded Yet</h3>
              <p style={{ fontSize: '0.88rem', marginTop: '0.3rem' }}>
                Paste plain text or upload a document to generate an ATS compatibility report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
