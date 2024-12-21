import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, UserCheck, BarChart3, MousePointer2, Eye } from "lucide-react";

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
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-cvup-peach">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-cvup-purple">
              CV Models
            </CardTitle>
            <FileCheck className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cvup-purple">{serviceStats.cvModels}</div>
            <p className="text-xs text-gray-500 mt-1">Total CV templates created</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-cvup-peach">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-cvup-purple">
              Interviews
            </CardTitle>
            <Users className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cvup-purple">{serviceStats.interviews}</div>
            <p className="text-xs text-gray-500 mt-1">Successful interviews</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-cvup-peach">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-cvup-purple">
              Hires
            </CardTitle>
            <UserCheck className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cvup-purple">{serviceStats.hires}</div>
            <p className="text-xs text-gray-500 mt-1">Successful placements</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-cvup-peach">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-cvup-purple">
              ATS Success
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cvup-purple">{serviceStats.atsSuccess}%</div>
            <p className="text-xs text-gray-500 mt-1">ATS pass rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-cvup-peach">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-cvup-purple">
              Total Visits
            </CardTitle>
            <Eye className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cvup-purple">{analyticsData.totalVisits}</div>
            <p className="text-xs text-gray-500 mt-1">Page views today</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-cvup-peach">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-cvup-purple">
              Total Clicks
            </CardTitle>
            <MousePointer2 className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cvup-purple">{analyticsData.totalClicks}</div>
            <p className="text-xs text-gray-500 mt-1">Interactions today</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-cvup-peach">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-cvup-purple">
              Unique Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cvup-purple">{analyticsData.uniqueVisitors}</div>
            <p className="text-xs text-gray-500 mt-1">Distinct users today</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};