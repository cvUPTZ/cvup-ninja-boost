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
  averageTimeSpent: number;
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
}

export interface TrackingStats {
  metrics: TrackingMetrics;
  pageMetrics: PageMetric[];
  behavior: TrackingBehavior;
}