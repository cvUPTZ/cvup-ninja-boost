import { DeviceInfo, UserInteraction, TrackingStats, PageMetric } from './tracking/types';
import { getBrowserInfo, getOSInfo, getDeviceType } from './tracking/deviceUtils';
import { getUserId } from './tracking/storageUtils';

class TrackingService {
  private static instance: TrackingService;
  private initialized: boolean = false;
  private pageViews: Map<string, number> = new Map();
  private uniqueVisitors: Set<string> = new Set();
  private clickData: Map<string, Set<string>> = new Map(); // Track unique users per click
  private scrollDepths: number[] = [];
  private sessionStartTime: number = Date.now();
  private pageStartTimes: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService();
    }
    return TrackingService.instance;
  }

  init() {
    if (this.initialized) return;
    this.trackPageView();
    this.trackClicks();
    this.trackScrollDepth();
    this.initialized = true;
  }

  private trackPageView() {
    const path = window.location.pathname;
    const currentViews = this.pageViews.get(path) || 0;
    this.pageViews.set(path, currentViews + 1);
    this.uniqueVisitors.add(getUserId());
    this.pageStartTimes.set(path, Date.now());
  }

  private trackClicks() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id) {
        // Track unique users who clicked
        const uniqueClickers = this.clickData.get(target.id) || new Set();
        uniqueClickers.add(getUserId());
        this.clickData.set(target.id, uniqueClickers);
      }
    });
  }

  private trackScrollDepth() {
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY + window.innerHeight) / 
        document.documentElement.scrollHeight * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.scrollDepths.push(scrollPercent);
      }
    });
  }

  private getPageMetrics(): PageMetric[] {
    return Array.from(this.pageViews.entries()).map(([path, views]) => {
      const startTime = this.pageStartTimes.get(path) || Date.now();
      const timeOnPage = (Date.now() - startTime) / 1000; // Convert to seconds
      
      return {
        path,
        views,
        uniqueViews: this.uniqueVisitors.size,
        averageTimeOnPage: Math.round(timeOnPage),
        bounceRate: Math.round(Math.random() * 100) // Simplified for demo
      };
    });
  }

  public getCurrentStats(): TrackingStats {
    const clickEvents = Array.from(this.clickData.entries()).map(([elementId, uniqueClickers]) => ({
      elementId,
      clicks: uniqueClickers.size,
      uniqueClicks: uniqueClickers.size
    }));

    return {
      metrics: {
        pageViews: Array.from(this.pageViews.values()).reduce((a, b) => a + b, 0),
        uniqueVisitors: this.uniqueVisitors.size,
        averageTimeSpent: Math.floor((Date.now() - this.sessionStartTime) / 60000),
        bounceRate: Math.round(Math.random() * 100) // Simplified for demo
      },
      pageMetrics: this.getPageMetrics(),
      behavior: {
        clickEvents,
        scrollDepth: this.getScrollDepthStats()
      }
    };
  }

  private getScrollDepthStats() {
    return [
      { percentage: "25%", count: this.scrollDepths.filter(d => d >= 25).length },
      { percentage: "50%", count: this.scrollDepths.filter(d => d >= 50).length },
      { percentage: "75%", count: this.scrollDepths.filter(d => d >= 75).length },
      { percentage: "100%", count: this.scrollDepths.filter(d => d >= 100).length }
    ];
  }
}

export const tracking = TrackingService.getInstance();