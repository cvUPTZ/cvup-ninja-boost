import { supabase } from "@/integrations/supabase/client";
import { getDeviceType } from "./tracking/deviceUtils";
import { getStoredMetrics, updateStoredMetrics } from "./tracking/metricsStorage";
import { TrackingMetrics, PageMetric, TrackingBehavior } from "./tracking/types";

class TrackingService {
  private visitorId: string | null = null;
  private sessionId: string | null = null;

  constructor() {
    this.initializeSession();
  }

  private async initializeSession() {
    this.sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', this.sessionId);
    
    const storedVisitorId = localStorage.getItem('visitorId');
    if (storedVisitorId) {
      this.visitorId = storedVisitorId;
    } else {
      this.visitorId = await this.getVisitorIdentifier();
      if (this.visitorId) {
        localStorage.setItem('visitorId', this.visitorId);
      }
    }
  }

  private async getVisitorIdentifier(): Promise<string> {
    try {
      const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://api.ipify.org?format=json'));
      const data = await response.json();
      return data.ip || crypto.randomUUID();
    } catch (error) {
      console.error('Error getting IP:', error);
      return crypto.randomUUID();
    }
  }

  async trackPageView(path: string) {
    if (!this.visitorId || !this.sessionId) return;

    try {
      await supabase.from('page_views').insert({
        path,
        visitor_ip: this.visitorId,
        session_id: this.sessionId
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  async trackInteraction(type: string, elementId?: string, additionalData: any = {}) {
    if (!this.visitorId || !this.sessionId) return;

    try {
      await supabase.from('user_interactions').insert({
        type,
        element_id: elementId,
        visitor_ip: this.visitorId,
        session_id: this.sessionId,
        additional_data: additionalData
      });
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  }

  async getCurrentStats(): Promise<{
    metrics: TrackingMetrics;
    pageMetrics: PageMetric[];
    behavior: TrackingBehavior;
  }> {
    try {
      const { data: metricsData } = await supabase
        .from('aggregated_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();

      if (metricsData) {
        return {
          metrics: {
            pageViews: metricsData.total_visits || 0,
            uniqueVisitors: metricsData.unique_visitors || 0,
            returningVisitors: Math.floor((metricsData.unique_visitors || 0) * 0.4),
            averageTimeSpent: metricsData.average_session_duration || 0,
            averageSessionDuration: metricsData.average_session_duration || 0,
            bounceRate: metricsData.bounce_rate || 0
          },
          pageMetrics: [],
          behavior: {
            clickEvents: [],
            scrollDepth: [],
            deviceStats: {
              desktop: 0,
              mobile: 0,
              tablet: 0
            },
            userFlow: []
          }
        };
      }

      return {
        metrics: {
          pageViews: 0,
          uniqueVisitors: 0,
          returningVisitors: 0,
          averageTimeSpent: 0,
          averageSessionDuration: 0,
          bounceRate: 0
        },
        pageMetrics: [],
        behavior: {
          clickEvents: [],
          scrollDepth: [],
          deviceStats: {
            desktop: 0,
            mobile: 0,
            tablet: 0
          },
          userFlow: []
        }
      };
    } catch (error) {
      console.error('Error getting current stats:', error);
      return {
        metrics: {
          pageViews: 0,
          uniqueVisitors: 0,
          returningVisitors: 0,
          averageTimeSpent: 0,
          averageSessionDuration: 0,
          bounceRate: 0
        },
        pageMetrics: [],
        behavior: {
          clickEvents: [],
          scrollDepth: [],
          deviceStats: {
            desktop: 0,
            mobile: 0,
            tablet: 0
          },
          userFlow: []
        }
      };
    }
  }
}

export const tracking = new TrackingService();