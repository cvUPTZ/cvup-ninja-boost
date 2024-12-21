import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, UserCheck, BarChart3, MousePointer2, Eye, Clock, ArrowUpRight } from "lucide-react";

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
  return (
    <>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#ffbd59]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#1A1F2C]">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-[#ffbd59]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1F2C]">{analyticsData.uniqueVisitors}</div>
            <p className="text-xs text-gray-500 mt-1">Current active users</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#ffbd59]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#1A1F2C]">
              Engagement
            </CardTitle>
            <MousePointer2 className="h-4 w-4 text-[#ffbd59]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1F2C]">{analyticsData.totalClicks}</div>
            <p className="text-xs text-gray-500 mt-1">Total interactions today</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#ffbd59]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#1A1F2C]">
              Session Time
            </CardTitle>
            <Clock className="h-4 w-4 text-[#ffbd59]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1F2C]">{analyticsData.averageSessionDuration}</div>
            <p className="text-xs text-gray-500 mt-1">Average session duration</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};