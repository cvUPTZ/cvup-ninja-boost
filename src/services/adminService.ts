import { tracking } from './trackingService';
import { AnalyticsData, User, UserStats } from '@/types/adminTypes';

export const fetchUserStats = async (): Promise<UserStats> => {
  // Simulated user stats for demo
  return {
    totalUsers: 150,
    activeUsers: 120,
    blockedUsers: 30,
  };
};

export const fetchAllUsers = async (): Promise<User[]> => {
  // Simulated users data for demo
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      lastLogin: '2024-03-20',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      lastLogin: '2024-03-19',
    },
  ];
};

export const fetchAnalytics = async (): Promise<AnalyticsData> => {
  const stats = tracking.getCurrentStats();
  
  return {
    totalVisits: stats.metrics.pageViews,
    totalClicks: stats.behavior.clickEvents.reduce((acc, event) => acc + event.clicks, 0),
    totalInteractions: stats.behavior.clickEvents.length,
    uniqueVisitors: stats.metrics.uniqueVisitors,
    averageSessionDuration: `${stats.metrics.averageTimeSpent} min`,
    bounceRate: `${stats.metrics.bounceRate}%`,
  };
};

export const blockUser = async (userId: string): Promise<void> => {
  // Simulated API call
  console.log(`Blocking user ${userId}`);
};

export const unblockUser = async (userId: string): Promise<void> => {
  // Simulated API call
  console.log(`Unblocking user ${userId}`);
};