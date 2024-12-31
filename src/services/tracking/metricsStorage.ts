import { supabase } from "@/integrations/supabase/client";
import { DatabaseMetrics } from './types';

export const storePageView = async (path: string, visitorIp: string, sessionId: string) => {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert([{ path, visitor_ip: visitorIp, session_id: sessionId }]);
    
    if (error) throw error;
    console.log('Page view stored successfully');
  } catch (error) {
    console.error('Error storing page view:', error);
  }
};

export const storeUserInteraction = async (
  type: string,
  elementId: string | null,
  visitorIp: string,
  sessionId: string,
  additionalData: any = {}
) => {
  try {
    const { error } = await supabase
      .from('user_interactions')
      .insert([{
        type,
        element_id: elementId,
        visitor_ip: visitorIp,
        session_id: sessionId,
        additional_data: additionalData
      }]);
    
    if (error) throw error;
    console.log('User interaction stored successfully');
  } catch (error) {
    console.error('Error storing user interaction:', error);
  }
};

export const updateAggregatedMetrics = async (metrics: DatabaseMetrics) => {
  try {
    const { error } = await supabase
      .from('aggregated_metrics')
      .insert([{
        average_session_duration: metrics.average_session_duration,
        bounce_rate: metrics.bounce_rate,
        total_clicks: metrics.total_clicks,
        total_visits: metrics.total_visits,
        unique_visitors: metrics.unique_visitors
      }]);
    
    if (error) throw error;
    console.log('Aggregated metrics updated successfully');
  } catch (error) {
    console.error('Error updating aggregated metrics:', error);
  }
};