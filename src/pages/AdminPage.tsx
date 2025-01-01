import { StatisticsCards } from "@/components/admin/StatisticsCards";
import { PolicySection } from "@/components/admin/PolicySection";
import { ManagementPanel } from "@/components/admin/ManagementPanel";
import { tracking } from "@/services/trackingService";
import { useState, useEffect } from "react";
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
      const clickEvents = stats.behavior?.clickEvents || [];
      setAnalyticsData({
        totalVisits: stats.metrics.pageViews || 0,
        totalClicks: clickEvents.reduce((sum, event) => sum + (event.clicks || 0), 0),
        totalInteractions: clickEvents.length,
        uniqueVisitors: stats.metrics.uniqueVisitors || 0,
        averageSessionDuration: `${Math.round(stats.metrics.averageSessionDuration || 0)}s`,
        bounceRate: `${Math.round(stats.metrics.bounceRate || 0)}%`
      });
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
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
          metrics={{
            pageViews: analyticsData.totalVisits,
            uniqueVisitors: analyticsData.uniqueVisitors,
            returningVisitors: Math.floor(analyticsData.uniqueVisitors * 0.4),
            averageTimeSpent: parseInt(analyticsData.averageSessionDuration),
            averageSessionDuration: parseInt(analyticsData.averageSessionDuration),
            bounceRate: parseInt(analyticsData.bounceRate)
          }}
          pageMetrics={[]}
          behavior={{
            clickEvents: [],
            scrollDepth: [],
            deviceStats: {
              desktop: 0,
              mobile: 0,
              tablet: 0
            },
            userFlow: []
          }}
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