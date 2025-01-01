// src/App.tsx
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { UserBehaviorStats } from "@/components/analytics/UserBehaviorStats";
import { tracking } from "@/services/trackingService";
import AdminPage from "@/pages/AdminPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import './i18n';
import Login from "@/pages/Login";
import TrainingManagement from "@/pages/TrainingManagement";
import Registration from "@/pages/Registration";
import AdminStats from "@/pages/AdminStats";

const queryClient = new QueryClient();

interface TrackingStats {
  metrics: any;
  pageMetrics: any;
  behavior: any;
}

const AnalyticsContainer = () => {
  const [analyticsData, setAnalyticsData] = useState<TrackingStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const stats = await tracking.getCurrentStats();
      setAnalyticsData(stats);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!analyticsData) {
    return <div>Loading analytics...</div>;
  }

  return (
    <UserBehaviorStats
      metrics={analyticsData.metrics}
      pageMetrics={analyticsData.pageMetrics}
      behavior={analyticsData.behavior}
      timeRange="realtime"
      onTimeRangeChange={() => {}}
    />
  );
};

const App = () => {
  useEffect(() => {
    tracking.init();
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Registration />} />
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                    <AnalyticsContainer />
                  </ProtectedRoute>
                }
              />
                <Route
                  path="/admin/stats"
                  element={
                    <ProtectedRoute>
                      <AdminStats />
                    </ProtectedRoute>
                  }
                />
              <Route
                path="/training"
                element={
                  <ProtectedRoute>
                    <TrainingManagement />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;