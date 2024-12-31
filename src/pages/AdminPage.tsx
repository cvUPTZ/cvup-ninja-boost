import { StatisticsCards } from "@/components/admin/StatisticsCards";
import { PolicySection } from "@/components/admin/PolicySection";
import { ManagementPanel } from "@/components/admin/ManagementPanel";
import { tracking } from "@/services/trackingService";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserBehaviorStats } from "@/components/analytics/UserBehaviorStats";

const AdminPage = () => {
  const [analyticsData, setAnalyticsData] = useState(() => ({
    totalVisits: 0,
    totalClicks: 0,
    totalInteractions: 0,
    uniqueVisitors: 0,
    averageSessionDuration: '0s',
    bounceRate: '0%'
  }));

  const [serviceStats] = useState({
    cvModels: 2000,
    interviews: 125,
    hires: 83,
    atsSuccess: 96,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      const stats = await tracking.getCurrentStats();
      setAnalyticsData({
        totalVisits: stats.metrics.pageViews,
        totalClicks: stats.behavior.clickEvents.reduce((sum, event) => sum + event.clicks, 0),
        totalInteractions: stats.behavior.clickEvents.length,
        uniqueVisitors: stats.metrics.uniqueVisitors,
        averageSessionDuration: `${stats.metrics.averageSessionDuration}s`,
        bounceRate: `${stats.metrics.bounceRate}%`
      });
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('metrics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'aggregated_metrics'
        },
        async (payload) => {
          console.log('Metrics updated:', payload);
          const stats = await tracking.getCurrentStats();
          setAnalyticsData({
            totalVisits: stats.metrics.pageViews,
            totalClicks: stats.behavior.clickEvents.reduce((sum, event) => sum + event.clicks, 0),
            totalInteractions: stats.behavior.clickEvents.length,
            uniqueVisitors: stats.metrics.uniqueVisitors,
            averageSessionDuration: `${stats.metrics.averageSessionDuration}s`,
            bounceRate: `${stats.metrics.bounceRate}%`
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-cvup-purple mb-8">
        Tableau de Bord Administrateur
      </h1>
      
      <StatisticsCards
        analyticsData={analyticsData}
        serviceStats={serviceStats}
      />

      <div className="mt-8">
        <UserBehaviorStats
          metrics={analyticsData}
          timeRange="realtime"
          onTimeRangeChange={() => {}}
        />
      </div>

      <div className="mt-8">
        <ManagementPanel />
      </div>

      <div className="mt-12">
        <PolicySection />
      </div>
    </div>
  );
};

export default AdminPage;