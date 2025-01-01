// src/types/adminTypes.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'trainer';
  status: 'active' | 'blocked';
  lastLogin?: string;
}
export interface Course {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  created_at: string;
}

export interface Trainer {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  speciality: string | null;
  created_at: string;
}

export interface Apprenant {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    created_at: string;
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