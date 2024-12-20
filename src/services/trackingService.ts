// services/trackingService.ts
class TrackingService {
  private static instance: TrackingService;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService();
    }
    return TrackingService.instance;
  }

  init() {
    if (this.initialized) return;
    
    // Track page views
    this.trackPageView();
    
    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id) {
        this.trackClick(target.id);
      }
    });

    // Track scroll depth
    this.trackScrollDepth();

    // Track time on page
    this.trackTimeOnPage();

    this.initialized = true;
  }

  private trackPageView() {
    const data = {
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };
    
    this.sendToAnalytics('pageview', data);
  }

  private trackClick(elementId: string) {
    const data = {
      elementId,
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    };
    
    this.sendToAnalytics('click', data);
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
        this.sendToAnalytics('scroll', { depth: maxScroll });
      }
    });
  }

  private trackTimeOnPage() {
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
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
}

export const tracking = TrackingService.getInstance();

// Usage in your app:
// tracking.init();
