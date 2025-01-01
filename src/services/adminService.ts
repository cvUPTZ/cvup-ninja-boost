import { supabase } from "@/integrations/supabase/client";
import { TrackingStats } from "@/types/analyticsTypes";

export const adminService = {
  async getStats(): Promise<TrackingStats> {
    try {
      const { data: metrics, error: metricsError } = await supabase
        .from("aggregated_metrics")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(1)
        .single();

      if (metricsError) throw metricsError;

      const { data: pageViews, error: pageViewsError } = await supabase
        .from("page_views")
        .select("*");

      if (pageViewsError) throw pageViewsError;

      const { data: interactions, error: interactionsError } = await supabase
        .from("user_interactions")
        .select("*");

      if (interactionsError) throw interactionsError;

      return {
        metrics: {
          totalVisits: metrics?.total_visits || 0,
          totalClicks: metrics?.total_clicks || 0,
          uniqueVisitors: metrics?.unique_visitors || 0,
          averageSessionDuration: String(metrics?.average_session_duration || 0),
          bounceRate: String(metrics?.bounce_rate || 0),
        },
        pageMetrics: {
          pageViews: pageViews || [],
        },
        behavior: {
          clickEvents: interactions?.filter((i) => i.type === "click") || [],
          interactions: interactions || [],
        },
      };
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      throw error;
    }
  },
};