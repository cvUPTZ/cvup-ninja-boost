import { DeviceInfo, UserInteraction, TrackingStats } from './tracking/types';
import { getBrowserInfo, getOSInfo, getDeviceType } from './tracking/deviceUtils';
import { getUserId } from './tracking/storageUtils';

class TrackingService {
  private static instance: TrackingService;
  private initialized: boolean = false;
  private pageViews: Set<string> = new Set();
  private uniqueVisitors: Set<string> = new Set();
  private clickData: Map<string, number> = new Map();
  private scrollDepths: number[] = [];
  private sessionStartTime: number = Date.now();

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
    this.pageViews.add(path);
    this.uniqueVisitors.add(getUserId());
  }

  private trackClicks() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id) {
        this.clickData.set(target.id, (this.clickData.get(target.id) || 0) + 1);
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
    return {
      metrics: {
        pageViews: this.pageViews.size,
        uniqueVisitors: this.uniqueVisitors.size,
        averageTimeSpent: Math.floor((Date.now() - this.sessionStartTime) / 60000),
        bounceRate: 0
      },
      behavior: {
        clickEvents: Array.from(this.clickData.entries()).map(([elementId, clicks]) => ({
          elementId,
          clicks
        })),
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