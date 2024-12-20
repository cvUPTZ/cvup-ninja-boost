// services/trackingService.ts
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
    this.trackTimeOnPage();
    this.initialized = true;
  }

  private trackPageView() {
    const path = window.location.pathname;
    this.pageViews.add(path);
    this.uniqueVisitors.add(path);
    
    this.sendToAnalytics('pageview', {
      path,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      userAgent: navigator.userAgent
    });
  }

  private trackClicks() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id) {
        this.clickData.set(target.id, (this.clickData.get(target.id) || 0) + 1);
        this.sendToAnalytics('click', {
          elementId: target.id,
          path: window.location.pathname,
          timestamp: new Date().toISOString()
        });
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
        this.sendToAnalytics('scroll', { depth: maxScroll });
      }
    });
  }

  private trackTimeOnPage() {
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - this.sessionStartTime) / 1000);
      this.sendToAnalytics('timeOnPage', { seconds: timeSpent });
    });
  }

  private async sendToAnalytics(eventType: string, data: any) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          data,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.error('Error sending analytics:', error);
    }
  }

  public getCurrentStats() {
    return {
      metrics: {
        pageViews: this.pageViews.size,
        uniqueVisitors: this.uniqueVisitors.size,
        averageTimeSpent: Math.floor((Date.now() - this.sessionStartTime) / 60000),
        bounceRate: this.calculateBounceRate()
      },
      pageMetrics: Array.from(this.pageViews).map(path => ({
        path,
        views: this.getViewsForPath(path),
        uniqueViews: this.getUniqueViewsForPath(path),
        averageTimeOnPage: this.getAverageTimeOnPage(path),
        bounceRate: this.getBounceRateForPath(path)
      })),
      behavior: {
        clickEvents: Array.from(this.clickData.entries()).map(([elementId, clicks]) => ({
          elementId,
          clicks,
          uniqueClicks: clicks
        })),
        scrollDepth: this.getScrollDepthStats()
      }
    };
  }

  private getViewsForPath(path: string): number {
    return this.pageViews.has(path) ? 1 : 0;
  }

  private getUniqueViewsForPath(path: string): number {
    return this.uniqueVisitors.has(path) ? 1 : 0;
  }

  private getAverageTimeOnPage(path: string): number {
    return Math.floor((Date.now() - this.sessionStartTime) / 1000);
  }

  private getBounceRateForPath(path: string): number {
    return 0;
  }

  private calculateBounceRate(): number {
    return 0;
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
