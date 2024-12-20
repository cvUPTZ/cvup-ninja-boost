export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  lastLogin?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
}

export interface AnalyticsData {
  totalVisits: number;
  totalClicks: number;
  totalInteractions: number;
  uniqueVisitors: number;
  averageSessionDuration: string;
  bounceRate: string;
}

export interface ServiceStats {
  cvModels: number;
  interviews: number;
  hires: number;
  atsSuccess: number;
}