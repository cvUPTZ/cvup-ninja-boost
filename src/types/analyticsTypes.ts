export interface UserMetrics {
  pageViews: number;
  uniqueVisitors: number;
  averageTimeSpent: number;
  bounceRate: number;
  conversionRate: number;
}

export interface PageMetrics {
  path: string;
  views: number;
  uniqueViews: number;
  averageTimeOnPage: number;
  bounceRate: number;
}

export interface UserBehavior {
  clickEvents: {
    elementId: string;
    clicks: number;
    uniqueClicks: number;
  }[];
  scrollDepth: {
    percentage: number;
    count: number;
  }[];
  deviceStats: {
    device: string;
    count: number;
  }[];
}

export interface TrackingStats {
  metrics: {
    totalVisits: number;
    totalClicks: number;
    uniqueVisitors: number;
    averageSessionDuration: string;
    bounceRate: string;
  };
  pageMetrics: {
    pageViews: any[];
  };
  behavior: {
    clickEvents: any[];
    interactions: any[];
  };
}