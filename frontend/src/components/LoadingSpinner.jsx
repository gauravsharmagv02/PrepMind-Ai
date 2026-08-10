import React from 'react';

const LoadingSpinner = ({ label = 'Loading PrepMind AI...' }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{label}</p>
    </div>
  );
};

export default LoadingSpinner;
