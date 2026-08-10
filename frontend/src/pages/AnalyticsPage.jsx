import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { BarChart3, Target } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/analytics/overview');
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading performance analytics..." />;

  const radarMetrics = data?.radarMetrics || [
    { subject: 'Coding', score: 85 },
    { subject: 'Aptitude', score: 68 },
    { subject: 'Interview', score: 75 },
    { subject: 'Resume ATS', score: 82 },
    { subject: 'System Design', score: 72 },
    { subject: 'Communication', score: 85 }
  ];

  const weeklyActivity = data?.weeklyActivity || [
    { day: "Mon", codingHours: 2.5, testHours: 1.0 },
    { day: "Tue", codingHours: 3.0, testHours: 0.5 },
    { day: "Wed", codingHours: 1.5, testHours: 2.0 },
    { day: "Thu", codingHours: 4.0, testHours: 1.0 },
    { day: "Fri", codingHours: 2.0, testHours: 1.5 },
    { day: "Sat", codingHours: 5.0, testHours: 2.5 },
    { day: "Sun", codingHours: 3.5, testHours: 1.0 }
  ];

  const radarData = {
    labels: radarMetrics.map(m => m.subject),
    datasets: [
      {
        label: 'Skill Mastery Score (%)',
        data: radarMetrics.map(m => m.score),
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: '#4f46e5',
        borderWidth: 2,
        pointBackgroundColor: '#818cf8'
      }
    ]
  };

  const barData = {
    labels: weeklyActivity.map(w => w.day),
    datasets: [
      {
        label: 'Coding Hours',
        data: weeklyActivity.map(w => w.codingHours),
        backgroundColor: '#4f46e5'
      },
      {
        label: 'Test & Prep Hours',
        data: weeklyActivity.map(w => w.testHours),
        backgroundColor: '#10b981'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8'
        }
      }
    },
    scales: {
      r: {
        angleLines: { color: '#334155' },
        grid: { color: '#334155' },
        pointLabels: { color: '#f8fafc', font: { size: 12 } },
        ticks: { color: '#94a3b8', backdropColor: 'transparent' }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94a3b8' }
      }
    },
    scales: {
      x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="page-title">Performance Analytics</h1>
      <p className="page-subtitle">Track your weekly practice statistics and monthly score progression.</p>

      <div className="analytics-grid" style={{ gap: '1.5rem' }}>
        <div className="card" style={{ height: '380px' }}>
          <h3 className="card-title">
            <Target size={20} color="#818cf8" />
            <span>Skill Competency Radar</span>
          </h3>
          <div style={{ height: '300px' }}>
            <Radar data={radarData} options={chartOptions} />
          </div>
        </div>

        <div className="card" style={{ height: '380px' }}>
          <h3 className="card-title">
            <BarChart3 size={20} color="#818cf8" />
            <span>Weekly Practice Log (Hours)</span>
          </h3>
          <div style={{ height: '300px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
