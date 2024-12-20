// src/services/trackingService.ts
interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
}

interface UserInteraction {
  timestamp: number;
  type: string;
  element: string;
  duration?: number;
}

class TrackingService {
  private static instance: TrackingService;
  private initialized: boolean = false;
  private pageViews: Set<string> = new Set();
  private uniqueVisitors: Set<string> = new Set();
  private clickData: Map<string, number> = new Map();
  private scrollDepths: number[] = [];
  private sessionStartTime: number = Date.now();
  private deviceData: Map<string, number> = new Map();
  private browserData: Map<string, number> = new Map();
  private userPaths: string[] = [];
  private interactions: UserInteraction[] = [];
  private navigationTiming: Map<string, number> = new Map();
  private errorLogs: any[] = [];
  private userSessions: Map<string, number> = new Map();

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
    this.trackPerformance();
    this.trackErrors();
    this.trackUserFlow();
    this.initialized = true;
  }

  private trackPageView() {
    const path = window.location.pathname;
    this.pageViews.add(path);
    this.uniqueVisitors.add(this.getUserId());
    
    const deviceInfo = this.getDeviceInfo();
    this.deviceData.set(deviceInfo.type, (this.deviceData.get(deviceInfo.type) || 0) + 1);
    this.browserData.set(deviceInfo.browser, (this.browserData.get(deviceInfo.browser) || 0) + 1);
  }

  private getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = Math.random().toString(36).substring(2);
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  private getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;
    const mobile = /Mobile|Android|iPhone/i.test(ua);
    const tablet = /Tablet|iPad/i.test(ua);
    
    return {
      type: mobile ? 'mobile' : tablet ? 'tablet' : 'desktop',
      browser: this.getBrowserInfo(),
      os: this.getOSInfo()
    };
  }

  private getBrowserInfo(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Other';
  }

  private getOSInfo(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Other';
  }

  private trackClicks() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id) {
        this.clickData.set(target.id, (this.clickData.get(target.id) || 0) + 1);
        this.interactions.push({
          timestamp: Date.now(),
          type: 'click',
          element: target.id
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
      }
    });
  }

  private trackTimeOnPage() {
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - this.sessionStartTime) / 1000);
      this.userSessions.set(this.getUserId(), timeSpent);
    });
  }

  private trackPerformance() {
    if (window.performance) {
      const timing = performance.timing;
      this.navigationTiming.set('pageLoad', timing.loadEventEnd - timing.navigationStart);
      this.navigationTiming.set('domReady', timing.domContentLoadedEventEnd - timing.navigationStart);
      this.navigationTiming.set('networkLatency', timing.responseEnd - timing.fetchStart);
    }
  }

  private trackErrors() {
    window.addEventListener('error', (event) => {
      this.errorLogs.push({
        message: event.message,
        source: event.filename,
        line: event.lineno,
        timestamp: new Date().toISOString()
      });
    });
  }

  private trackUserFlow() {
    this.userPaths.push(window.location.pathname);
  }

  private calculateAverageLoadTime(): number {
    const loadTimes = Array.from(this.navigationTiming.values());
    return loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
  }

  private calculateErrorRate(): number {
    return this.errorLogs.length / this.pageViews.size;
  }

  private analyzeUserFlows() {
    // Simple path analysis
    const flows: { [key: string]: number } = {};
    for (let i = 0; i < this.userPaths.length - 1; i++) {
      const flow = `${this.userPaths[i]} → ${this.userPaths[i + 1]}`;
      flows[flow] = (flows[flow] || 0) + 1;
    }
    return flows;
  }

  private getInteractionsByType() {
    const types: { [key: string]: number } = {};
    this.interactions.forEach(interaction => {
      types[interaction.type] = (types[interaction.type] || 0) + 1;
    });
    return types;
  }

  private calculateAverageSessionDuration(): number {
    const durations = Array.from(this.userSessions.values());
    return durations.reduce((a, b) => a + b, 0) / durations.length;
  }

  private calculateReturningUsers(): number {
    return this.uniqueVisitors.size;
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
      },
      performance: {
        navigationTiming: Object.fromEntries(this.navigationTiming),
        errors: this.errorLogs.length,
        averageLoadTime: this.calculateAverageLoadTime()
      },
      userFlow: {
        paths: this.userPaths,
        commonFlows: this.analyzeUserFlows(),
        deviceDistribution: Object.fromEntries(this.deviceData),
        browserDistribution: Object.fromEntries(this.browserData)
      },
      engagement: {
        interactionsByType: this.getInteractionsByType(),
        averageSessionDuration: this.calculateAverageSessionDuration(),
        returningUsers: this.calculateReturningUsers()
      },
      technical: {
        errorRate: this.calculateErrorRate(),
        performanceMetrics: Object.fromEntries(this.navigationTiming)
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

  public getActiveUsers(): number {
    // Simple implementation - could be enhanced with actual active session tracking
    return this.uniqueVisitors.size;
  }

  public getRecentActions(): string[] {
    // Return last 5 interactions
    return this.interactions
      .slice(-5)
      .map(interaction => `${interaction.type} on ${interaction.element}`);
  }
}

export const tracking = TrackingService.getInstance();
