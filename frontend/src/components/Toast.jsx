import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const renderIcon = () => {
    if (type === 'success') return <CheckCircle2 size={18} color="var(--success)" />;
    if (type === 'error') return <AlertCircle size={18} color="var(--danger)" />;
    return <Info size={18} color="var(--primary)" />;
  };

  return (
    <div className={`toast toast-${type}`}>
      <span style={{ display: 'flex', alignItems: 'center' }}>{renderIcon()}</span>
      <span style={{ flex: 1, fontSize: '0.9rem' }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close notification"
          title="Close notification"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '0.2rem'
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Toast;
