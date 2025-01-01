import { Database } from "@/integrations/supabase/types";

export type User = Database['public']['Tables']['users']['Row'];

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