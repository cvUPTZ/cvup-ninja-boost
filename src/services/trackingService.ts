import { DeviceInfo, UserInteraction, TrackingStats, PageMetric } from './tracking/types';
import { getBrowserInfo, getOSInfo, getDeviceType } from './tracking/deviceUtils';
import { getUserId } from './tracking/storageUtils';
import { storePageView, storeUserInteraction, updateAggregatedMetrics } from './tracking/metricsStorage';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

class TrackingService {
  private static instance: TrackingService;
  private initialized: boolean = false;
  private pageViews: Map<string, Set<string>> = new Map();
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
  private visitorIPs: Set<string> = new Set();
  private lastUpdateTime: number = Date.now();
  private sessionId: string;
  private fallbackVisitorId: string;

  private constructor() {
    this.sessionId = uuidv4();
    this.fallbackVisitorId = uuidv4();
    ['/', '/services', '/contact'].forEach(page => {
      this.pageViews.set(page, new Set());
    });
    console.log('TrackingService initialized');
  }

  public static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService();
    }
    return TrackingService.instance;
  }

  async init() {
    if (this.initialized) return;
    
    console.log('Initializing tracking service...');
    
    try {
      const visitorIdentifier = await this.getVisitorIdentifier();
      if (visitorIdentifier) {
        console.log('New visitor detected:', visitorIdentifier);
        this.visitorIPs.add(visitorIdentifier);
        const currentPath = window.location.pathname;
        await this.trackPageViewSafely(currentPath, visitorIdentifier);
        
        const pageViewers = this.pageViews.get(currentPath) || new Set();
        pageViewers.add(visitorIdentifier);
        this.pageViews.set(currentPath, pageViewers);
        
        console.log('Updated page views for path:', currentPath);
        console.log('Current unique visitors:', this.visitorIPs.size);
      }
    } catch (error) {
      console.error('Failed to initialize tracking:', error);
    }

    this.trackPageView();
    this.trackClicks();
    this.trackScrollDepth();
    this.trackDeviceType();
    this.initialized = true;
    console.log('Tracking service initialized successfully');
  }

  private async getVisitorIdentifier(): Promise<string> {
    try {
      // Use a CORS proxy to make the request
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = encodeURIComponent('https://api.ipify.org?format=json');
      const response = await fetch(`${proxyUrl}${targetUrl}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Successfully retrieved visitor IP:', data.ip);
      return data.ip;
    } catch (error) {
      console.error('Failed to get visitor IP, using fallback ID:', error);
      // If we already have a fallback ID stored in localStorage, use it
      const storedFallbackId = localStorage.getItem('visitorFallbackId');
      if (storedFallbackId) {
        return storedFallbackId;
      }
      // Otherwise generate a new one and store it
      const newFallbackId = this.fallbackVisitorId;
      localStorage.setItem('visitorFallbackId', newFallbackId);
      return newFallbackId;
    }
  }

  private async trackPageViewSafely(path: string, visitorIdentifier: string) {
    try {
      await storePageView(path, visitorIdentifier, this.sessionId);
      console.log('Page view stored successfully');
    } catch (error) {
      console.error('Error storing page view:', error);
    }
  }

  private trackDeviceType() {
    const deviceType = getDeviceType(navigator.userAgent);
    const current = this.deviceTypes.get(deviceType) || 0;
    this.deviceTypes.set(deviceType, current + 1);
    console.log('Device type tracked:', deviceType);
  }

  private async trackPageView() {
    const path = window.location.pathname;
    const userId = getUserId();
    
    try {
      const visitorIdentifier = await this.getVisitorIdentifier();
      if (visitorIdentifier) {
        await this.trackPageViewSafely(path, visitorIdentifier);
        const pageViewers = this.pageViews.get(path) || new Set();
        if (!pageViewers.has(visitorIdentifier)) {
          console.log('New page view tracked for visitor:', visitorIdentifier);
          pageViewers.add(visitorIdentifier);
          this.pageViews.set(path, pageViewers);
        }
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
    
    if (this.uniqueVisitors.has(userId)) {
      this.returningVisitors.add(userId);
    }
    this.uniqueVisitors.add(userId);
    this.pageStartTimes.set(path, Date.now());
    
    console.log('Page view tracked:', {
      path,
      totalViews: this.pageViews.get(path)?.size || 0,
      uniqueVisitors: this.uniqueVisitors.size
    });
  }

  private trackClicks() {
    document.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      try {
        const visitorIdentifier = await this.getVisitorIdentifier();
        if (target.id && visitorIdentifier) {
          await storeUserInteraction('click', target.id, visitorIdentifier, this.sessionId);
          const uniqueClickers = this.clickData.get(target.id) || new Set();
          uniqueClickers.add(getUserId());
          this.clickData.set(target.id, uniqueClickers);
          console.log('Click tracked:', {
            elementId: target.id,
            uniqueClickers: uniqueClickers.size
          });
        }
      } catch (error) {
        console.error('Error tracking click:', error);
      }
    });
  }

  private trackScrollDepth() {
    let maxScroll = 0;
    window.addEventListener('scroll', async () => {
      const scrollPercent = Math.round(
        (window.scrollY + window.innerHeight) / 
        document.documentElement.scrollHeight * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.scrollDepths.push(scrollPercent);
        try {
          const visitorIdentifier = await this.getVisitorIdentifier();
          if (visitorIdentifier) {
            await storeUserInteraction('scroll', null, visitorIdentifier, this.sessionId, { depth: scrollPercent });
          }
          console.log('New max scroll depth:', scrollPercent);
        } catch (error) {
          console.error('Error tracking scroll depth:', error);
        }
      }
    });
  }

  public async getCurrentStats(): Promise<TrackingStats> {
    const now = Date.now();
    if (now - this.lastUpdateTime < 5000) {
      console.log('Skipping stats update - too soon');
      return this.calculateStats();
    }

    this.lastUpdateTime = now;
    console.log('Calculating current stats...');
    const stats = this.calculateStats();
    
    // Store aggregated metrics in Supabase
    await this.storeMetrics(stats);

    return stats;
  }

  private async storeMetrics(stats: TrackingStats) {
    try {
      const { error } = await supabase
        .from('aggregated_metrics')
        .insert({
          total_visits: stats.metrics.pageViews,
          unique_visitors: stats.metrics.uniqueVisitors,
          total_clicks: stats.metrics.returningVisitors,
          average_session_duration: stats.metrics.averageSessionDuration,
          bounce_rate: stats.metrics.bounceRate
        });

      if (error) throw error;
      console.log('Metrics stored successfully');
    } catch (error) {
      console.error('Error storing metrics:', error);
    }
  }

  private calculateStats(): TrackingStats {
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

    const stats = {
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

    console.log('Current stats calculated:', {
      pageViews: stats.metrics.pageViews,
      uniqueVisitors: stats.metrics.uniqueVisitors,
      returningVisitors: stats.metrics.returningVisitors
    });

    return stats;
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
