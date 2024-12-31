import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

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

export const updateAggregatedMetrics = async (metrics: {
  totalVisits: number;
  uniqueVisitors: number;
  totalClicks: number;
  averageSessionDuration: number;
  bounceRate: number;
}) => {
  try {
    const { error } = await supabase
      .from('aggregated_metrics')
      .insert([metrics]);
    
    if (error) throw error;
    console.log('Aggregated metrics updated successfully');
  } catch (error) {
    console.error('Error updating aggregated metrics:', error);
  }
};