import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { getDeviceType } from './tracking/deviceUtils';
import { getStoredMetrics, updateStoredMetrics } from './tracking/metricsStorage';
import { TrackingStats, PageMetrics, UserBehaviorMetrics } from './tracking/types';

class TrackingService {
  private sessionId: string;
  private initialized: boolean = false;

  constructor() {
    this.sessionId = uuidv4();
  }

  async init() {
    if (this.initialized) return;
    
    try {
      console.info('Tracking service initialized successfully');
      const deviceType = getDeviceType();
      console.info('Device type tracked:', deviceType);
      
      await this.trackPageView(window.location.pathname);
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize tracking service:', error);
    }
  }

  private async getVisitorIdentifier(): Promise<string> {
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = encodeURIComponent('https://api.ipify.org?format=json');
      const response = await fetch(`${proxyUrl}${targetUrl}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch IP');
      }
      
      const data = await response.json();
      console.info('Successfully retrieved visitor IP:', data.ip);
      return data.ip;
    } catch (error) {
      console.warn('Failed to get visitor IP, using fallback UUID:', error);
      return uuidv4();
    }
  }

  async trackPageView(path: string) {
    try {
      const visitorId = await this.getVisitorIdentifier();
      const normalizedPath = path.replace(/:\/$/, '/');

      await supabase.from('page_views').insert({
        path: normalizedPath,
        visitor_ip: visitorId,
        session_id: this.sessionId
      });

      console.info('Page view stored successfully');

      const { data: pageViews } = await supabase
        .from('page_views')
        .select('*')
        .eq('path', normalizedPath);

      const uniqueVisitors = new Set(pageViews?.map(view => view.visitor_ip)).size;
      const totalViews = pageViews?.length || 0;

      console.info('Page view tracked:', {
        path: normalizedPath,
        totalViews,
        uniqueVisitors
      });

      console.info('Page view stored successfully');
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  async trackInteraction(type: string, elementId?: string, additionalData: any = {}) {
    try {
      const visitorId = await this.getVisitorIdentifier();

      await supabase.from('user_interactions').insert({
        type,
        element_id: elementId,
        visitor_ip: visitorId,
        session_id: this.sessionId,
        additional_data: additionalData
      });

      console.info('User interaction stored successfully');

      if (type === 'click' && elementId) {
        const { data: clicks } = await supabase
          .from('user_interactions')
          .select('*')
          .eq('type', 'click')
          .eq('element_id', elementId);

        const uniqueClickers = new Set(clicks?.map(click => click.visitor_ip)).size;

        console.info('Click tracked:', {
          elementId,
          uniqueClickers
        });
      }
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  }

  async getCurrentStats(): Promise<TrackingStats> {
    try {
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      const { data: interactions } = await supabase
        .from('user_interactions')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      const uniqueVisitors = new Set(pageViews?.map(view => view.visitor_ip)).size;
      const totalPageViews = pageViews?.length || 0;
      const totalInteractions = interactions?.length || 0;

      const pageMetrics: { [key: string]: PageMetrics } = {};
      pageViews?.forEach(view => {
        if (!pageMetrics[view.path]) {
          pageMetrics[view.path] = {
            views: 0,
            uniqueVisitors: new Set()
          };
        }
        pageMetrics[view.path].views++;
        pageMetrics[view.path].uniqueVisitors.add(view.visitor_ip);
      });

      const behavior: { [key: string]: UserBehaviorMetrics } = {};
      interactions?.forEach(interaction => {
        if (interaction.element_id) {
          if (!behavior[interaction.element_id]) {
            behavior[interaction.element_id] = {
              clicks: 0,
              uniqueUsers: new Set()
            };
          }
          behavior[interaction.element_id].clicks++;
          behavior[interaction.element_id].uniqueUsers.add(interaction.visitor_ip);
        }
      });

      // Convert Sets to numbers for the final output
      Object.keys(pageMetrics).forEach(path => {
        pageMetrics[path].uniqueVisitors = pageMetrics[path].uniqueVisitors.size;
      });

      Object.keys(behavior).forEach(elementId => {
        behavior[elementId].uniqueUsers = behavior[elementId].uniqueUsers.size;
      });

      return {
        metrics: {
          uniqueVisitors,
          totalPageViews,
          totalInteractions
        },
        pageMetrics,
        behavior
      };
    } catch (error) {
      console.error('Failed to get current stats:', error);
      return {
        metrics: {
          uniqueVisitors: 0,
          totalPageViews: 0,
          totalInteractions: 0
        },
        pageMetrics: {},
        behavior: {}
      };
    }
  }
}

export const tracking = new TrackingService();