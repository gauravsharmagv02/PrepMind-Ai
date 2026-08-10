import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Menu, UserRound } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Navbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const initials = user && user.name ? user.name.substring(0, 2).toUpperCase() : null;

  return (
    <header className="mobile-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onToggleSidebar}
          aria-label="Open navigation menu"
          title="Open Menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <Menu size={24} />
        </button>

        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <Brain size={24} color="#818cf8" />
          <span style={{ fontWeight: 800, color: '#818cf8', fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            PrepMind AI
          </span>
        </Link>
      </div>

      <Link
        to="/profile"
        aria-label="User Profile"
        title="View Profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none'
        }}
      >
        {initials || <UserRound size={18} />}
      </Link>
    </header>
  );
};

export default Navbar;
