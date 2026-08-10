import React from 'react';
import { Brain, Menu } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <div className="mobile-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Brain size={24} color="var(--primary)" />
        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>PrepMind AI</span>
      </div>
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle navigation menu"
        title="Toggle Menu"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-main)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.4rem'
        }}
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Navbar;
