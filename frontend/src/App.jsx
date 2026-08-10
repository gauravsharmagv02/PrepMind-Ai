import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import MainLayout from './layouts/MainLayout';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CodingPage from './pages/CodingPage';
import AptitudePage from './pages/AptitudePage';
import ResumePage from './pages/ResumePage';
import InterviewPage from './pages/InterviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CareerPage from './pages/CareerPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Unauthenticated Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected Authenticated Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/coding" element={<CodingPage />} />
              <Route path="/aptitude" element={<AptitudePage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/mock-interview" element={<InterviewPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
