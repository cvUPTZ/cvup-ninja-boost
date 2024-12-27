import { DeviceInfo, UserInteraction, TrackingStats, PageMetric } from './tracking/types';
import { getBrowserInfo, getOSInfo, getDeviceType } from './tracking/deviceUtils';
import { getUserId } from './tracking/storageUtils';

class TrackingService {
  private static instance: TrackingService;
  private initialized: boolean = false;
  private pageViews: Map<string, Set<string>> = new Map(); // Changed to track unique IPs per page
  private uniqueVisitors: Set<string> = new Set();
  private returningVisitors: Set<string> = new Set();
  private clickData: Map<string, Set<string>> = new Map();
  private scrollDepths: number[] = [];
  private sessionStartTime: number = Date.now();
  private pageStartTimes: Map<string, number> = new Map();
  private deviceTypes: Map<string, number> = new Map([
    ['desktop', 0],
    ['mobile', 0],
    ['tablet', 0],
  ]);
  private userJourneySteps: string[] = ['landing', 'services', 'contact'];
  private visitorIPs: Set<string> = new Set(); // New: Track unique IPs

  private constructor() {
    // Initialize maps for each page
    ['/', '/services', '/contact'].forEach(page => {
      this.pageViews.set(page, new Set());
    });
  }

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
    this.trackDeviceType();
    this.initialized = true;

    // Get visitor's IP using a public API
    this.getVisitorIP().then(ip => {
      if (ip) {
        this.visitorIPs.add(ip);
        const currentPath = window.location.pathname;
        const pageViewers = this.pageViews.get(currentPath) || new Set();
        pageViewers.add(ip);
        this.pageViews.set(currentPath, pageViewers);
      }
    });
  }

  private async getVisitorIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to get visitor IP:', error);
      return null;
    }
  }

  private trackDeviceType() {
    const deviceType = getDeviceType(navigator.userAgent);
    const current = this.deviceTypes.get(deviceType) || 0;
    this.deviceTypes.set(deviceType, current + 1);
  }

  private trackPageView() {
    const path = window.location.pathname;
    const userId = getUserId();
    
    // Get visitor's IP and update metrics
    this.getVisitorIP().then(ip => {
      if (ip) {
        const pageViewers = this.pageViews.get(path) || new Set();
        pageViewers.add(ip);
        this.pageViews.set(path, pageViewers);
      }
    });
    
    if (this.uniqueVisitors.has(userId)) {
      this.returningVisitors.add(userId);
    }
    this.uniqueVisitors.add(userId);
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

  public getCurrentStats(): TrackingStats {
    const totalPageViews = Array.from(this.pageViews.values())
      .reduce((total, viewers) => total + viewers.size, 0);

    const clickEvents = Array.from(this.clickData.entries()).map(([elementId, uniqueClickers]) => ({
      elementId,
      clicks: uniqueClickers.size,
      uniqueClicks: uniqueClickers.size
    }));

    const userFlow = this.userJourneySteps.map((step, index) => ({
      step,
      users: Math.max(0, this.visitorIPs.size - (index * Math.floor(Math.random() * 10)))
    }));

    return {
      metrics: {
        pageViews: totalPageViews,
        uniqueVisitors: this.visitorIPs.size,
        returningVisitors: this.returningVisitors.size,
        averageTimeSpent: Math.floor((Date.now() - this.sessionStartTime) / 60000),
        averageSessionDuration: Math.floor((Date.now() - this.sessionStartTime) / 1000),
        bounceRate: Math.round((this.visitorIPs.size - this.returningVisitors.size) / this.visitorIPs.size * 100)
      },
      pageMetrics: this.getPageMetrics(),
      behavior: {
        clickEvents,
        scrollDepth: this.getScrollDepthStats(),
        deviceStats: {
          desktop: this.deviceTypes.get('desktop') || 0,
          mobile: this.deviceTypes.get('mobile') || 0,
          tablet: this.deviceTypes.get('tablet') || 0,
        },
        userFlow
      }
    };
  }

  private getPageMetrics(): PageMetric[] {
    return Array.from(this.pageViews.entries()).map(([path, viewers]) => {
      const startTime = this.pageStartTimes.get(path) || Date.now();
      const timeOnPage = (Date.now() - startTime) / 1000;
      
      return {
        path,
        views: viewers.size,
        uniqueViews: viewers.size,
        averageTimeOnPage: Math.round(timeOnPage),
        bounceRate: Math.round(Math.random() * 100)
      };
    });
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