import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
  Brain,
  LayoutDashboard,
  Code2,
  FileText,
  MessageSquare,
  BarChart3,
  BriefcaseBusiness,
  UserRound,
  LogOut
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Coding Practice', path: '/coding', icon: Code2 },
    { label: 'Aptitude & Reasoning', path: '/aptitude', icon: Brain },
    { label: 'ATS Resume', path: '/resume', icon: FileText },
    { label: 'AI Mock Interview', path: '/mock-interview', icon: MessageSquare },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Career Roles', path: '/career', icon: BriefcaseBusiness },
    { label: 'Profile', path: '/profile', icon: UserRound }
  ];

  const initials = user && user.name ? user.name.substring(0, 2).toUpperCase() : 'PM';

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      <div>
        <div className="brand-header">
          <Brain size={24} color="#818cf8" style={{ flexShrink: 0 }} />
          <span className="brand-name">PrepMind AI</span>
        </div>

        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} style={{ flexShrink: 0 }} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{initials}</div>
        <div className="user-details">
          <span className="user-name">{user?.name || 'Student'}</span>
          <span className="user-goal-text">{user?.goal || 'Software Engineer'}</span>
        </div>
        <button
          className="btn btn-sm btn-secondary"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          style={{ padding: '0.4rem 0.5rem', display: 'flex', alignItems: 'center' }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
