import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, UserCheck, ArrowUpRight } from "lucide-react";
import { tracking } from "@/services/trackingService";
import { useEffect, useState } from "react";

interface StatisticsCardsProps {
  analyticsData: {
    totalVisits: number;
    totalClicks: number;
    totalInteractions: number;
    uniqueVisitors: number;
    averageSessionDuration: string;
    bounceRate: string;
  };
  serviceStats: {
    cvModels: number;
    interviews: number;
    hires: number;
    atsSuccess: number;
  };
}

export const StatisticsCards = ({ analyticsData, serviceStats }: StatisticsCardsProps) => {
  const [metrics, setMetrics] = useState(analyticsData);

  useEffect(() => {
    const updateMetrics = () => {
      const stats = tracking.getCurrentStats();
      setMetrics({
        totalVisits: stats.metrics.pageViews,
        totalClicks: stats.behavior.clickEvents.reduce((sum, event) => sum + event.clicks, 0),
        totalInteractions: stats.behavior.clickEvents.length,
        uniqueVisitors: stats.metrics.uniqueVisitors,
        averageSessionDuration: `${stats.metrics.averageSessionDuration}s`,
        bounceRate: `${stats.metrics.bounceRate}%`
      });
    };

    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#ffbd59]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#1A1F2C]">
            CV Models
          </CardTitle>
          <FileCheck className="h-4 w-4 text-[#ffbd59]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#1A1F2C]">{serviceStats.cvModels}</div>
          <p className="text-xs text-gray-500 mt-1">Total CV templates created</p>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#ffbd59]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#1A1F2C]">
            Success Rate
          </CardTitle>
          <ArrowUpRight className="h-4 w-4 text-[#ffbd59]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#1A1F2C]">{serviceStats.atsSuccess}%</div>
          <p className="text-xs text-gray-500 mt-1">ATS pass rate</p>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#ffbd59]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#1A1F2C]">
            Interviews
          </CardTitle>
          <Users className="h-4 w-4 text-[#ffbd59]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#1A1F2C]">{serviceStats.interviews}</div>
          <p className="text-xs text-gray-500 mt-1">Successful interviews</p>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#ffbd59]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-[#1A1F2C]">
            Placements
          </CardTitle>
          <UserCheck className="h-4 w-4 text-[#ffbd59]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#1A1F2C]">{serviceStats.hires}</div>
          <p className="text-xs text-gray-500 mt-1">Successful hires</p>
        </CardContent>
      </Card>
    </div>
  );
};