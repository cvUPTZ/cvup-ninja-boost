import { TrackingMetrics } from './types';

export const getStoredMetrics = (key: string): TrackingMetrics => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : {
    pageViews: 0,
    uniqueVisitors: 0,
    returningVisitors: 0,
    averageTimeSpent: 0,
    averageSessionDuration: 0,
    bounceRate: 0
  };
};

export const updateStoredMetrics = (key: string, metrics: TrackingMetrics): void => {
  localStorage.setItem(key, JSON.stringify(metrics));
};