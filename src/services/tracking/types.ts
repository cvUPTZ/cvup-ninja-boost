export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
}

export interface UserInteraction {
  timestamp: number;
  type: string;
  element: string;
  duration?: number;
}

export interface TrackingMetrics {
  pageViews: number;
  uniqueVisitors: number;
  returningVisitors: number;
  averageTimeSpent: number;
  averageSessionDuration: number;
  bounceRate: number;
}

export interface PageMetric {
  path: string;
  views: number;
  uniqueViews: number;
  averageTimeOnPage: number;
  bounceRate: number;
}

export interface TrackingBehavior {
  clickEvents: Array<{
    elementId: string;
    clicks: number;
    uniqueClicks: number;
  }>;
  scrollDepth: Array<{
    percentage: string;
    count: number;
  }>;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  userFlow: Array<{
    step: string;
    users: number;
  }>;
}

export interface TrackingStats {
  metrics: TrackingMetrics;
  pageMetrics: PageMetric[];
  behavior: TrackingBehavior;
}

export interface SupabaseMetrics {
  total_visits: number;
  unique_visitors: number;
  total_clicks: number;
  average_session_duration: number;
  bounce_rate: number;
  timestamp?: string;
}