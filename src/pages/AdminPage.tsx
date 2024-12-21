import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { tracking } from "@/services/trackingService";
import { TrackingStats } from "@/services/tracking/types";
import { StatisticsCards } from "@/components/admin/StatisticsCards";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { UserBehaviorStats } from "@/components/analytics/UserBehaviorStats";
import { useToast } from "@/hooks/use-toast";

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<TrackingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const serviceStats = {
    cvModels: 2000,
    interviews: 125,
    hires: 83,
    atsSuccess: 96,
  };

  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated && isAdmin) {
        try {
          setIsLoading(true);
          const stats = tracking.getCurrentStats();
          setAnalyticsData(stats);
          
          toast({
            title: "Data loaded successfully",
            description: "Admin dashboard has been updated with the latest data.",
          });
        } catch (error) {
          console.error("Error loading admin data:", error);
          toast({
            title: "Error loading data",
            description: "There was a problem loading the admin dashboard data.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadData();
    // Refresh data every minute
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated, isAdmin, toast]);

  if (!isAuthenticated || !isAdmin) {
    return <div className="p-6">You must be an admin to access this page.</div>;
  }

  if (isLoading || !analyticsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cvup-peach"></div>
      </div>
    );
  }

  const formattedAnalytics = {
    totalVisits: analyticsData.metrics.pageViews,
    totalClicks: analyticsData.behavior.clickEvents.reduce((acc, event) => acc + event.clicks, 0),
    totalInteractions: analyticsData.behavior.clickEvents.length,
    uniqueVisitors: analyticsData.metrics.uniqueVisitors,
    averageSessionDuration: `${analyticsData.metrics.averageTimeSpent}m`,
    bounceRate: `${analyticsData.metrics.bounceRate}%`,
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cvup-purple">Admin Dashboard</h1>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      <StatisticsCards
        analyticsData={formattedAnalytics}
        serviceStats={serviceStats}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserBehaviorStats
          metrics={analyticsData.metrics}
          pageMetrics={analyticsData.pageMetrics}
          behavior={analyticsData.behavior}
          timeRange="last24h"
          onTimeRangeChange={() => {}}
        />
      </div>

      <UserManagementTable
        users={[
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
            status: 'active',
            lastLogin: '2024-03-20',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'user',
            status: 'active',
            lastLogin: '2024-03-19',
          },
        ]}
        onBlockUser={async () => {}}
        onUnblockUser={async () => {}}
        isLoading={false}
      />
    </div>
  );
};

export default AdminPage;