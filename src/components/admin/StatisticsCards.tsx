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
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              CV Models
            </CardTitle>
            <FileCheck className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceStats.cvModels}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Interviews
            </CardTitle>
            <Users className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceStats.interviews}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Hires
            </CardTitle>
            <UserCheck className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceStats.hires}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              ATS Success
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceStats.atsSuccess}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Visits
            </CardTitle>
            <Eye className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalVisits}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Clicks
            </CardTitle>
            <MousePointer2 className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalClicks}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-cvup-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.uniqueVisitors}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};