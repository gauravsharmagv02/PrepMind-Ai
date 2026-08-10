import api from './api';

export const dashboardService = {
  // Fetch complete user-specific dashboard payload
  async getDashboardData() {
    return await api.get('/dashboard');
  },

  // Toggle study plan task status (pending <-> completed)
  async toggleStudyPlanTask(taskId) {
    return await api.patch(`/dashboard/study-plan/${taskId}`);
  },

  // Regenerate custom AI study plan based on latest performance metrics
  async regenerateStudyPlan() {
    return await api.post('/dashboard/study-plan/regenerate');
  }
};

export default dashboardService;
