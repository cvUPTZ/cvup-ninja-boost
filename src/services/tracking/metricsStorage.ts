import { supabase } from "@/integrations/supabase/client";
import { DatabaseMetrics } from './types';

export const storePageView = async (path: string, visitorIdentifier: string, sessionId: string) => {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert([{ 
        path, 
        visitor_ip: visitorIdentifier, 
        session_id: sessionId 
      }]);
    
    if (error) {
      console.error('Error storing page view:', error);
      return;
    }
    console.log('Page view stored successfully');
  } catch (error) {
    console.error('Error storing page view:', error);
  }
};

export const storeUserInteraction = async (
  type: string,
  elementId: string | null,
  visitorIdentifier: string,
  sessionId: string,
  additionalData: any = {}
) => {
  try {
    const { error } = await supabase
      .from('user_interactions')
      .insert([{
        type,
        element_id: elementId,
        visitor_ip: visitorIdentifier,
        session_id: sessionId,
        additional_data: additionalData
      }]);
    
    if (error) {
      console.error('Error storing user interaction:', error);
      return;
    }
    console.log('User interaction stored successfully');
  } catch (error) {
    console.error('Error storing user interaction:', error);
  }
};

export const updateAggregatedMetrics = async (metrics: DatabaseMetrics) => {
  try {
    const { error } = await supabase
      .from('aggregated_metrics')
      .insert([metrics]);
    
    if (error) {
      console.error('Error updating aggregated metrics:', error);
      return;
    }
    console.log('Aggregated metrics updated successfully');
  } catch (error) {
    console.error('Error updating aggregated metrics:', error);
  }
};