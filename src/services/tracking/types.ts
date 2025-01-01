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
    percentage: number;
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